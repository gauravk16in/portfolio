// Vercel Serverless Function — server-side proxy for the GitHub GraphQL API.
//
// SECURITY: GITHUB_TOKEN lives here only. NEVER expose it via a VITE_* env var —
// Vite inlines those into the client bundle. Set GITHUB_TOKEN in the Vercel
// dashboard (Project Settings → Environment Variables). Classic PAT, read:user scope.
//
// Caching: Cache-Control s-maxage=86400 mirrors Next's `revalidate: 86400` —
// Vercel's edge serves a cached calendar for 24h, then refreshes in background.
// GraphQL equivalent of the user's spec; no scraping, no third-party services.

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            contributionLevel
            date
          }
        }
      }
    }
  }
}`;

interface VercelLikeRequest {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { json: (body: unknown) => void };
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'GITHUB_TOKEN is not configured on the server' });
    return;
  }

  const raw = req.query?.username;
  const username = (Array.isArray(raw) ? raw[0] : raw) || 'gauravk16in';

  try {
    const gh = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'gauravk-space-portfolio',
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    });

    const json = await gh.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      res.status(502).json({ error: 'Unexpected GitHub GraphQL response', details: json?.errors ?? null });
      return;
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).json(calendar);
  } catch {
    res.status(500).json({ error: 'Failed to reach api.github.com' });
  }
}
