import React, { useState } from 'react';
import { GitHubActivity } from './GitHubActivity';

const GITHUB_USER = 'gauravk16in';
const LEETCODE_USER = 'tendsxgaurav';

type Source = 'github' | 'leetcode';

const SOURCES: Record<Source, { endpoint: string; username: string; label: (n: number) => string }> = {
  github: {
    endpoint: '/api/github',
    username: GITHUB_USER,
    label: (n) => `${n.toLocaleString('en-US')} GitHub activities in the last year`,
  },
  leetcode: {
    endpoint: '/api/leetcode',
    username: LEETCODE_USER,
    label: (n) => `${n.toLocaleString('en-US')} LeetCode submissions in the last year`,
  },
};

/** Text-tab swap between the GitHub and LeetCode contribution graphs (site's duplex grammar). */
export function CodingActivity({ blockSize = 9, blockGap = 3 }: { blockSize?: number; blockGap?: number }) {
  const [source, setSource] = useState<Source>('github');
  const active = SOURCES[source];

  return (
    <div className="flex flex-col items-start md:items-end gap-[10px] w-full">
      <div role="tablist" aria-label="Contribution source" className="flex gap-[16px] text-[13px] leading-none select-none">
        {(Object.keys(SOURCES) as Source[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={source === key}
            onClick={() => setSource(key)}
            className={`transition-colors duration-200 ${
              source === key
                ? 'text-[var(--color-fg-strong)] underline decoration-[1px] underline-offset-4'
                : 'text-[var(--color-fg-soft)] hover:text-[var(--color-fg-muted)]'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* key remount = fresh fetch + fade; server caches each endpoint 24h */}
      <div key={source} className="fade-in w-full flex flex-col items-start md:items-end">
        <GitHubActivity
          username={active.username}
          endpoint={active.endpoint}
          totalLabel={active.label}
          blockSize={blockSize}
          blockGap={blockGap}
        />
      </div>
    </div>
  );
}
