// Vercel Serverless Function — server-side proxy for LeetCode's public GraphQL
// (unofficial but public endpoint; no token required for public profile data).
// Browsers cannot call leetcode.com/graphql cross-origin, so this proxy exists.
//
// The response is normalized into the SAME shape as api/github.ts
// ({ totalContributions, weeks[53][day × 7] }) so every graph component is
// reused unchanged. LeetCode provides no quartile levels — computed here from
// daily submission counts with fixed thresholds (documented below).

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

const QUERY = `query($username: String!) {
  matchedUser(username: $username) {
    submissionCalendar
  }
}`;

const DAY_MS = 86_400_000;
const WEEKS = 53;

type Level = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';

/** submissions/day → level. LeetCode days are quieter than GitHub's, so the ladder is scaled down. */
function levelFor(count: number): Level {
  if (count === 0) return 'NONE';
  if (count <= 2) return 'FIRST_QUARTILE';
  if (count <= 5) return 'SECOND_QUARTILE';
  if (count <= 9) return 'THIRD_QUARTILE';
  return 'FOURTH_QUARTILE';
}

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

  const raw = req.query?.username;
  const username = (Array.isArray(raw) ? raw[0] : raw) || 'tendsxgaurav';

  try {
    const lc = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    });

    const json = await lc.json();
    const rawCalendar = json?.data?.matchedUser?.submissionCalendar;

    if (!rawCalendar) {
      res.status(404).json({ error: `LeetCode user "${username}" not found or calendar unavailable`, details: json?.errors ?? null });
      return;
    }

    // submissionCalendar: JSON string of { "<unix seconds>": <submissions that day>, ... } (UTC midnights)
    const byDay = new Map<string, number>();
    for (const [ts, count] of Object.entries(JSON.parse(rawCalendar) as Record<string, number>)) {
      byDay.set(new Date(Number(ts) * 1000).toISOString().slice(0, 10), count as number);
    }

    // Build 53 weeks ending with the current week (Sat), starting on a Sunday — GitHub-parity.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const end = new Date(today.getTime() + (6 - today.getUTCDay()) * DAY_MS); // this week's Saturday
    const start = new Date(end.getTime() - (WEEKS * 7 - 1) * DAY_MS); // a Sunday

    let totalContributions = 0;
    const weeks = Array.from({ length: WEEKS }, (_, w) => ({
      contributionDays: Array.from({ length: 7 }, (_, d) => {
        const date = new Date(start.getTime() + (w * 7 + d) * DAY_MS).toISOString().slice(0, 10);
        const count = byDay.get(date) ?? 0;
        totalContributions += count;
        return { contributionCount: count, contributionLevel: levelFor(count), date };
      }),
    }));

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).json({ totalContributions, weeks });
  } catch {
    res.status(500).json({ error: 'Failed to reach leetcode.com' });
  }
}
