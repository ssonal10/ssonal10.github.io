import { useEffect, useState } from 'react';
import { Spotlight } from './components/Spotlight';
import { ScrollProgress } from './components/ScrollProgress';
import { VelocityMarquee } from './components/VelocityMarquee';
import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { DataViz } from './components/DataViz';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Recognition } from './components/Recognition';
import { PhotoStrip } from './components/PhotoStrip';
import { Interests } from './components/Interests';
import { navLinks } from './portfolioData';

export default function App() {
  const [activeId, setActiveId] = useState<string>('about');

  useEffect(() => {
    // Active nav item = last section whose top has passed 40% of the viewport.
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current = navLinks[0].id;
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < line) current = l.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg leading-relaxed text-slate-400 selection:bg-accent/30 selection:text-slate-100">
      {/* Aurora mesh background */}
      <div className="aurora" aria-hidden="true"><span /></div>
      {/* Grid texture */}
      <div className="bg-grid pointer-events-none fixed inset-0 z-[1] opacity-70" aria-hidden="true" />
      {/* Mouse spotlight */}
      <Spotlight />
      {/* Film grain */}
      <div className="grain" aria-hidden="true" />

      <ScrollProgress />

      {/* Floating pill nav */}
      <TopNav activeId={activeId} />

      <main className="relative z-10">
        <Hero />
        <VelocityMarquee />

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <About />
          <DataViz />
          <Experience />
          <Projects />
          <Recognition />
          <Skills />
          <Interests />
        </div>

        <PhotoStrip />

        <div className="mx-auto max-w-6xl px-6 md:px-10">

          <footer className="border-t border-slate-800/60 py-14 text-xs text-slate-500">
            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <p className="font-display text-2xl italic leading-tight text-slate-200 sm:text-3xl">
                P.S. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300">portfolios don't have to be boring.</span>
              </p>
              <p className="max-w-md text-[13px] text-slate-500">
                So I made mine loud and a little extra, like a good deadlift or a well-cut
                edit. Thanks for scrolling this far.
              </p>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-800/60 pt-8 sm:flex-row sm:items-center">
              <p className="max-w-md">
                Hand-built with React, TypeScript, Tailwind &amp; Framer Motion. Typeset in
                Inter &amp; Instrument Serif. Designed with warmth &amp; a little caffeine.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
                © 2026 · Shipra Sonal · No boring allowed
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
