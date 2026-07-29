import React from 'react';
import { SiTailwindcss, SiJavascript, SiReact, SiPython, SiLeetcode, SiGithub, SiFigma } from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import { SkillIcon } from './SkillIcon';

interface BioProps {
  isDark: boolean;
}

export function Bio({ isDark }: BioProps) {
  return (
    <div className="w-full md:max-w-[520px] flex flex-col justify-end">
      <div className="font-serif font-medium text-[32px] leading-[1.15] text-[var(--color-fg)] mb-[24px]">
        <p>Look who it is!</p>
        <p>Welcome to my <span className="underline decoration-[1.5px] underline-offset-4">{isDark ? "darkside." : "portfolio."}</span></p>
      </div>
      
      <div className="text-[16px] leading-[1.5] font-normal text-[var(--color-fg-muted)]">
        <p>I believe in solving real problems.</p>
        <p>not a wrapper one.</p>
        <p className="mb-[24px]">I'm obsessed with problem solving now a days, it's feel I'm enjoying it.</p>
        
        <p className="mb-[32px]">I love to contribute into <span className="font-serif italic text-[17px] underline decoration-[1px] underline-offset-4 text-[var(--color-fg-strong)]">OpenSource</span> & <span className="font-serif italic text-[17px] underline decoration-[1px] underline-offset-4 text-[var(--color-fg-strong)]">AI</span>.</p>
      </div>
        
      <div className="flex gap-[24px] text-[var(--color-fg-strong)]">
        {isDark ? (
          <>
            <SkillIcon Icon={SiPython} hoverColor="hover:text-[#3776AB]" />
            <SkillIcon Icon={SiLeetcode} hoverColor="hover:text-[#FFA116]" />
            <SkillIcon Icon={SiGithub} hoverColor="hover:text-[#181717] dark:hover:text-[#ffffff]" />
            <SkillIcon Icon={SiFigma} hoverColor="hover:text-[#F24E1E]" />
          </>
        ) : (
          <>
            <SkillIcon Icon={SiTailwindcss} hoverColor="hover:text-[#06B6D4]" />
            <SkillIcon Icon={SiJavascript} hoverColor="hover:text-[#F7DF1E]" />
            <SkillIcon Icon={FaDatabase} hoverColor="hover:text-[#336791]" />
            <SkillIcon Icon={SiReact} hoverColor="hover:text-[#61DAFB]" />
          </>
        )}
      </div>
    </div>
  );
}
