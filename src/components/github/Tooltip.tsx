import React from 'react';

export interface TooltipState {
  x: number;
  y: number;
  content: string;
}

/** Single shared tooltip — inverted monochrome chip, positioned over the hovered cell. */
export function Tooltip({ tooltip }: { tooltip: TooltipState | null }) {
  if (!tooltip) return null;
  return (
    <div
      className="pointer-events-none absolute z-50 whitespace-nowrap rounded-[6px] bg-[var(--color-fg)] text-[var(--color-bg)] text-[12px] leading-none px-[10px] py-[7px] shadow-sm"
      style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -118%)' }}
      role="status"
    >
      {tooltip.content}
    </div>
  );
}
