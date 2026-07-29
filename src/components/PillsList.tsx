import React from 'react';
import { Pill } from './Pill';
import { CodingActivity } from './github/CodingActivity';

interface PillsListProps {
  isDark: boolean;
  setActiveProject: (project: string | null) => void;
}

export function PillsList({ isDark, setActiveProject }: PillsListProps) {
  if (isDark) {
    // Projects view (FindTogether opens the typewriter modal).
    return (
      <div className="flex flex-col items-start md:items-end gap-[12px] w-full pb-[4px]">
        <div className="flex flex-col items-start md:items-end gap-[12px] w-full">
          <Pill text="FindTogether" hasArrow onClick={(e) => { e.preventDefault(); setActiveProject('findtogether'); }} />
          <Pill text="Receipts" hasArrow href="https://github.com/gauravk16in/receipts" />
          <Pill text="MCP Dash" hasArrow href="https://github.com/foss42/apidash/blob/main/doc/proposals/2026/gsoc/application_GauravKumar_MCP-Testing.md" />
          <Pill text="more soon" empty />
        </div>
      </div>
    );
  }

  // Experience view: live monochrome contribution graphs, tab-swapped (data via api/github.ts + api/leetcode.ts).
  return (
    <div className="flex flex-col items-start md:items-end gap-[12px] w-full pb-[4px]">
      <CodingActivity blockSize={9} blockGap={3} />
    </div>
  );
}
