import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Pill({ text, hasArrow = false, empty = false, onClick, href }: { text: string; hasArrow?: boolean; empty?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void; href?: string }) {
  const className = `group flex items-center justify-start md:justify-center w-full md:w-auto min-w-[180px] px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-[64px] border border-[var(--color-border)] text-[16px] md:text-[17px] leading-[1.5] text-[var(--color-fg-strong)] font-normal whitespace-nowrap bg-transparent ${empty ? 'min-h-[46px] md:min-h-[52px]' : ''}`;
  const interactiveClass = 'hover:opacity-65 transition-all duration-300';

  if (empty) {
    return (
      <span className={`${className} text-[var(--color-fg-muted)]`}>
        <span>{text}</span>
      </span>
    );
  }

  const content = (
    <>
      <span>{text}</span>
      {hasArrow && (
        <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[1.5]" />
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${className} ${interactiveClass}`}>
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} ${interactiveClass}`}>
        {content}
      </a>
    );
  }

  return (
    <span className={className}>
      <span>{text}</span>
    </span>
  );
}
