import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  showExpandedFooter: boolean;
  handleKnowMore: () => void;
}

export function Footer({ showExpandedFooter, handleKnowMore }: FooterProps) {
  return (
    <footer className="w-full px-6 md:px-[48px] pb-[24px] pt-[20px] flex justify-end items-center text-[14px] md:text-[16px] text-[var(--color-fg-soft)] z-10">
      {!showExpandedFooter && (
        <button
          type="button"
          onClick={handleKnowMore}
          className="hover:opacity-70 transition-opacity underline decoration-[1px] underline-offset-4 flex items-center gap-2"
        >
          know more <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}

// Rendered as a standalone section BELOW the 100vh hero screen (see App.tsx) —
// never a flex sibling of the hero content, so it can't disturb its layout.
export function ExpandedFooter() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-between relative bg-[var(--color-bg)] pt-16 md:pt-24 mt-12 border-t border-[var(--color-border-subtle)]">

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 px-6 md:px-[64px] z-10 w-full">

        {/* Col 1 */}
        <div className="flex gap-4 md:gap-8">
          <span className="text-[var(--color-fg-soft)] text-[14px] w-16 shrink-0">Social</span>
          <div className="flex flex-col gap-2 text-[14px] text-[var(--color-fg)]">
            <a href="https://linkedin.com/in/tendsxgaurav" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">LinkedIn</a>
            <a href="https://github.com/gauravk16in" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">GitHub</a>
            <a href="https://x.com/tendsgaurav" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">X (Twitter)</a>
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex gap-4 md:gap-8 md:border-l md:border-[var(--color-border-subtle)] md:pl-8">
          <span className="text-[var(--color-fg-soft)] text-[14px] w-16 shrink-0">Contact</span>
          <div className="flex flex-col gap-2 text-[14px] text-[var(--color-fg)]">
            <a href="mailto:tendsgaurav@gmail.com" className="hover:opacity-70 transition-opacity">Email</a>
            <a href="public/resume.pdf" className="hover:opacity-70 transition-opacity">Resume</a>
          </div>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-4 md:border-l md:border-[var(--color-border-subtle)] md:pl-8">
          <span className="text-[var(--color-fg-soft)] text-[14px]">{'© ${getCurrentYear()} Gaurav Kumar'}</span>
        </div>

      </div>

      {/* Giant Text */}
      <div className="w-full flex justify-center items-end mt-20 mb-[-3vw] px-4 pointer-events-none overflow-hidden">
        <h1 className="text-[14vw] font-serif font-semibold tracking-tighter text-[var(--color-watermark)] leading-[0.75] select-none text-center w-full">
          figuring.out(<span className="text-[var(--color-mark-soft)]">*</span>)
        </h1>
      </div>

    </div>
  );
}
