import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ContributionCalendar, ContributionWeek } from '../../lib/github';
import { ContributionGrid } from './ContributionGrid';
import { MonthLabels } from './MonthLabels';
import { Legend } from './Legend';
import { Tooltip, type TooltipState } from './Tooltip';

export interface GitHubActivityProps {
  username: string;
  /** API route returning { totalContributions, weeks } — drives GitHub or LeetCode identically. */
  endpoint?: string;
  /** Sentence rendered above the grid with the year's total. */
  totalLabel?: (total: number) => string;
  blockSize?: number;   // px per cell (GitHub uses 10; compact default 9)
  blockGap?: number;    // px between cells
  theme?: 'light' | 'dark'; // optional: wrapper gets `.dark`, system theme otherwise
}

const WEEKS = 53;

/** Placeholder grid: level-0 skeleton while loading (stable layout, no jump). */
const EMPTY_WEEKS: ContributionWeek[] = Array.from({ length: WEEKS }, () => ({
  contributionDays: Array.from({ length: 7 }, () => ({
    contributionCount: 0,
    contributionLevel: 'NONE' as const,
    date: '2000-01-01',
  })),
}));

export function GitHubActivity({
  username,
  endpoint = '/api/github',
  totalLabel = (n: number) => `${n.toLocaleString('en-US')} GitHub activities in the last year`,
  blockSize = 9,
  blockGap = 3,
  theme,
}: GitHubActivityProps) {
  const [data, setData] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${endpoint}?username=${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`api/github ${res.status}`);
        return res.json();
      })
      .then((json: ContributionCalendar) => {
        if (cancelled) return;
        if (!json || !Array.isArray(json.weeks)) throw new Error('bad payload');
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) { setFailed(true); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, [username, endpoint]);

  const weeks = data?.weeks ?? EMPTY_WEEKS;
  const isPlaceholder = !data;
  const gridWidth = useMemo(() => WEEKS * (blockSize + blockGap) - blockGap, [blockSize, blockGap]);

  const handleCellEnter = (el: HTMLDivElement, content: string) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = el.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    setTooltip({
      x: rect.left - wrapRect.left + rect.width / 2,
      y: rect.top - wrapRect.top,
      content,
    });
  };
  const handleCellLeave = () => setTooltip(null);

  if (failed) {
    return (
      <div className="text-[13px] text-[var(--color-fg-soft)] select-none">
        contribution activity unavailable right now
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-start md:items-end gap-[8px] w-full select-none ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="text-[13px] leading-[1.5] text-[var(--color-fg-muted)]">
        {loading ? 'loading…' : totalLabel(data!.totalContributions)}
      </div>

      <div className="overflow-x-auto max-w-full pb-[4px]">
        <div ref={wrapRef} className="relative" style={{ width: gridWidth, minWidth: gridWidth }}>
          <MonthLabels weeks={weeks} totalWeeks={WEEKS} />
          <div style={{ opacity: isPlaceholder ? 0.5 : 1, transition: 'opacity 300ms' }}>
            <ContributionGrid
              weeks={weeks}
              blockSize={blockSize}
              blockGap={blockGap}
              onCellEnter={isPlaceholder ? () => {} : handleCellEnter}
              onCellLeave={handleCellLeave}
            />
          </div>
          <Tooltip tooltip={tooltip} />
        </div>
      </div>

      <Legend blockSize={blockSize} />
    </div>
  );
}
