/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { NavBar } from './components/NavBar';
import { Bio } from './components/Bio';
import { PillsList } from './components/PillsList';
import { Footer, ExpandedFooter } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showExpandedFooter, setShowExpandedFooter] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const lastScrollTop = useRef(0);
  
  const roles = ["Computer science student", "UX designer", "Backend engineer", "AI engineer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showExpandedFooter || !scrollRef.current) {
      return;
    }

    const scrollContainer = scrollRef.current;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [showExpandedFooter]);

  const handleKnowMore = () => {
    setShowExpandedFooter(true);
    lastScrollTop.current = 0;
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const currentScrollTop = scrollRef.current.scrollTop;

      if (showExpandedFooter && lastScrollTop.current > 50 && currentScrollTop < 50) {
        setShowExpandedFooter(false);
      }

      lastScrollTop.current = currentScrollTop;
    }
  };

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className={`h-screen w-full overflow-x-hidden ${showExpandedFooter ? 'overflow-y-auto' : 'overflow-y-auto md:overflow-y-hidden'} transition-colors duration-700 relative bg-[var(--color-bg)] text-[var(--color-fg)]`}
    >
      <div className="min-h-screen w-full flex flex-col justify-between relative">
      
        {/* TOPBAR */}
        <NavBar
          isDark={isDark}
          setIsDark={setIsDark}
          fade={fade}
          roles={roles}
          roleIndex={roleIndex}
        />

        {/* MAIN CONTENT (aligned to bottom) */}
        <div className="flex-1 flex flex-col justify-start md:justify-end px-6 md:px-[64px] pt-[100px] md:pt-0 pb-[32px] z-10 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-[48px] md:gap-[64px]">
            
            {/* MOBILE BIO (shows only on mobile) */}
            <div className="text-base leading-[1.5] text-[var(--color-fg-muted)] md:hidden mb-[-24px]">
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
            
            {/* LEFT CONTENT */}
            <Bio isDark={isDark} />

            {/* RIGHT CONTENT (Projects) */}
            <PillsList isDark={isDark} setActiveProject={setActiveProject} />

          </div>
        </div>

        {/* FOOTER */}
        <Footer
          showExpandedFooter={showExpandedFooter}
          handleKnowMore={handleKnowMore}
        />

      </div>

      {/* EXPANDED FOOTER (own section below the 100vh hero — scroll reveals it) */}
      {showExpandedFooter && <ExpandedFooter />}

      {/* PROJECT MODAL */}
      <ProjectModal
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />

      {/* VERCEL WEB ANALYTICS */}
      <Analytics />

    </div>
  );
}