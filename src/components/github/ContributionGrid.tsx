import React, { useMemo } from 'react';
import { flattenDays, type ContributionWeek } from '../../lib/github';
import { ContributionCell } from './ContributionCell';

interface ContributionGridProps {
  weeks: ContributionWeek[];
  blockSize: number;
  blockGap: number;
  onCellEnter: (el: HTMLDivElement, content: string) => void;
  onCellLeave: () => void;
}

/**
 * 53-week × 7-day grid, column-major via grid-auto-flow: day-of-week order
 * matches GitHub exactly (weeks × Sun→Sat as delivered by the API).
 */
export function ContributionGrid({ weeks, blockSize, blockGap, onCellEnter, onCellLeave }: ContributionGridProps) {
  const days = useMemo(() => flattenDays(weeks), [weeks]);
  return (
    <div
      role="grid"
      aria-label="GitHub contribution activity"
      className="grid"
      style={{ gridTemplateRows: `repeat(7, ${blockSize}px)`, gridAutoFlow: 'column', gap: blockGap }}
    >
      {days.map((day) => (
        <ContributionCell key={day.date} day={day} blockSize={blockSize} onEnter={onCellEnter} onLeave={onCellLeave} />
      ))}
    </div>
  );
}
