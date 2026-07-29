import React, { useMemo } from 'react';
import { monthLabelPositions, type ContributionWeek } from '../../lib/github';

interface MonthLabelsProps {
  weeks: ContributionWeek[];
  totalWeeks: number;
}

/** Month names aligned above the week column where each new month begins. */
export function MonthLabels({ weeks, totalWeeks }: MonthLabelsProps) {
  const labels = useMemo(() => monthLabelPositions(weeks), [weeks]);
  return (
    <div className="relative h-[14px] text-[11px] leading-[14px] text-[var(--color-fg-soft)] select-none">
      {labels.map(({ col, label }) => (
        <span key={label + col} className="absolute top-0" style={{ left: `${(col / totalWeeks) * 100}%` }}>
          {label}
        </span>
      ))}
    </div>
  );
}
