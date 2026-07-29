import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface NavBarProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  fade: boolean;
  roles: string[];
  roleIndex: number;
}

export function NavBar({ isDark, setIsDark, fade, roles, roleIndex }: NavBarProps) {
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 flex justify-between items-start z-50">
      <div className="flex flex-col gap-6">
        <div className="text-[24px] font-medium tracking-tight flex items-center gap-4 text-[var(--color-fg-strong)]">
          kr.
        </div>
        <div className="text-base leading-[1.5] text-[var(--color-fg-muted)] hidden md:block">
          {isDark ? (
            <span className="whitespace-pre-line">my interest lies in{"\n"}AI and Backend.</span>
          ) : (
            <span>
              <span className={`inline-block transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>{roles[roleIndex]}</span>
              <br />
              based in Bangalore
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-6">
        <nav className="flex gap-4 md:gap-6 text-[16px] md:text-[18px] text-[var(--color-fg-strong)] items-center">
          <div className="hidden md:flex gap-6">
            <a href="#" onClick={(e) => { e.preventDefault(); setIsDark(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:opacity-60 transition-opacity">Index</a>
            <button onClick={() => setIsDark(!isDark)} className={isDark ? 'underline decoration-[1px] underline-offset-4' : 'hover:opacity-60 transition-opacity'}>Projects</button>
            <a href="/README.md" className="hover:opacity-60 transition-opacity">Agents</a>
          </div>
          <button 
            onClick={toggleTheme} 
            className="ml-0 md:ml-2 hover:opacity-60 transition-opacity flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-[22px] h-[22px] stroke-[1.5]" /> : <Moon className="w-[22px] h-[22px] stroke-[1.5]" />}
          </button>
        </nav>
      </div>
    </div>
  );
}
