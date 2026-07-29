import React, { useEffect, useRef, useState, useMemo } from 'react';

interface ProjectModalProps {
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;
}

interface Beat {
  text: string;
  /** ms to hold after this beat finishes typing, before the next one starts */
  pauseAfter: number;
  strong?: boolean;
  link?: { label: string; href: string };
}

const PROJECT_BEATS: Record<string, Beat[]> = {
  findtogether: [
    {
      text: 'every second matters when a loved one goes missing, right?',
      pauseAfter: 2000,
      strong: true,
    },
    {
      text: 'introducing FindTogether — it matches missing and found-person cases across description, location and time, scores them by similarity, and surfaces the strongest matches on a real-time dashboard.',
      pauseAfter: 1500,
    },
    {
      text: 'built with React, Node.js and Supabase. led the team to institute-level selection at Smart India Hackathon 2025.',
      pauseAfter: 3000,
    },
    {
      text: "let's have a look at the project yourself. ",
      pauseAfter: 0,
      link: { label: '(click me)', href: 'https://findtogether.vercel.app' },
    },
  ],
};

const TYPE_MS = 34; // base ms per character, plus jitter for a human feel

export function ProjectModal({ activeProject, setActiveProject }: ProjectModalProps) {
  const beats = activeProject ? PROJECT_BEATS[activeProject] : null;

  const [beatIndex, setBeatIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const timeout = useRef<number | null>(null);
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  // Esc closes (mirrors the "esc" button)
  useEffect(() => {
    if (activeProject === null) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeProject, setActiveProject]);

  // Typewriter engine: one timeout chain across beats, restarted per project
  useEffect(() => {
    if (!beats) return;

    const totalChars = (i: number) => beats[i].text.length + (beats[i].link?.label.length ?? 0);

    setBeatIndex(0);
    setCharCount(0);
    setDone(false);

    if (reduced) {
      setBeatIndex(beats.length);
      setDone(true);
      return;
    }

    let cancelled = false;
    const step = (bi: number, cc: number) => {
      if (cancelled) return;
      if (bi >= beats.length) { setDone(true); return; }
      if (cc < totalChars(bi)) {
        timeout.current = window.setTimeout(() => { setCharCount(cc + 1); step(bi, cc + 1); }, TYPE_MS + Math.random() * 26);
      } else {
        timeout.current = window.setTimeout(() => { setBeatIndex(bi + 1); setCharCount(0); step(bi + 1, 0); }, beats[bi].pauseAfter || 500);
      }
    };
    step(0, 0);

    return () => {
      cancelled = true;
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, [activeProject, beats, reduced]);

  const finishAll = () => {
    if (!beats || done) return;
    if (timeout.current) window.clearTimeout(timeout.current);
    setBeatIndex(beats.length);
    setCharCount(0);
    setDone(true);
  };

  if (!beats) return null;

  const renderBeat = (beat: Beat, i: number) => {
    const isFinishedBeat = i < beatIndex || done;
    const isActive = i === beatIndex && !done;
    const total = beat.text.length + (beat.link?.label.length ?? 0);
    const chars = isFinishedBeat ? total : isActive ? charCount : 0;

    const shownText = beat.text.slice(0, Math.min(chars, beat.text.length));
    const shownLabel = beat.link ? beat.link.label.slice(0, Math.max(0, chars - beat.text.length)) : null;

    return (
      <p key={i} className={`leading-[1.6] text-[15px] md:text-[17px] ${beat.strong ? 'text-[var(--color-modal-text-strong)] text-[17px] md:text-[20px]' : 'text-[var(--color-modal-text-muted)]'}`}>
        {shownText}
        {beat.link && shownLabel && (
          <a
            href={beat.link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[var(--color-modal-text-strong)] underline decoration-[1px] underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {shownLabel}
          </a>
        )}
        {isActive && <span className="caret-blink text-[var(--color-modal-text-strong)]">▍</span>}
      </p>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-[var(--color-overlay)] backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300"
      onClick={finishAll}
    >
      {/* Close / Home Button */}
      <div className="fixed top-8 right-8 z-[210]">
        <button
          onClick={(e) => { e.stopPropagation(); setActiveProject(null); }}
          className="flex items-center justify-center text-[var(--color-modal-text)] opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close Project"
        >
          <span className="text-sm font-medium tracking-wide">esc</span>
        </button>
      </div>

      <div className="min-h-full max-w-2xl mx-auto px-6 py-24 flex flex-col justify-center gap-8">
        {beats.map(renderBeat)}

        {!done && !reduced && (
          <span className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-[var(--color-modal-text-muted)] opacity-50 tracking-widest pointer-events-none">
            click anywhere to skip
          </span>
        )}
      </div>
    </div>
  );
}
