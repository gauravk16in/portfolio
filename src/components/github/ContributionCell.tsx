import React, { memo } from 'react';
import { LEVEL_INDEX, tooltipText, type ContributionDay } from '../../lib/github';

interface ContributionCellProps {
  day: ContributionDay;
  blockSize: number;
  onEnter: (el: HTMLDivElement, content: string) => void;
  onLeave: () => void;
}

/** Single day square. Memoized: 371 of these must not re-render on tooltip state changes. */
export const ContributionCell = memo(function ContributionCell({ day, blockSize, onEnter, onLeave }: ContributionCellProps) {
  const level = LEVEL_INDEX[day.contributionLevel] ?? 0;
  return (
    <div
      role="gridcell"
      aria-label={tooltipText(day)}
      tabIndex={-1}
      className="transition-transform duration-150 ease-out hover:scale-[1.2]"
      style={{
        width: blockSize,
        height: blockSize,
        backgroundColor: `var(--gh-level-${level})`,
        // GitHub-true rounding: ~4px at full size, tighter on compact blocks
        borderRadius: Math.min(4, Math.max(2, Math.round(blockSize * 0.28))),
      }}
      onMouseEnter={(e) => onEnter(e.currentTarget, tooltipText(day))}
      onMouseLeave={onLeave}
    />
  );
});
