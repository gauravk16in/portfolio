import React from 'react';

interface LegendProps {
  blockSize: number;
}

/** "Less active □□□□□ More active", cells reuse the same --gh-level-* tokens as the grid. */
export function Legend({ blockSize }: LegendProps) {
  return (
    <div className="flex items-center justify-end gap-[4px] text-[11px] leading-none text-[var(--color-fg-soft)] select-none">
      <span className="mr-[2px]">Less active</span>
      {[0, 1, 2, 3, 4].map((level) => (
        <span
          key={level}
          className="block"
          style={{
            width: Math.min(10, blockSize),
            height: Math.min(10, blockSize),
            backgroundColor: `var(--gh-level-${level})`,
            borderRadius: 3,
          }}
        />
      ))}
      <span className="ml-[2px]">More active</span>
    </div>
  );
}
