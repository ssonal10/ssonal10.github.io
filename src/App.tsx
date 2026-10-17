import { useEffect, useState } from 'react';
import { startSmoothScroll, getLenis, ScrollTrigger, scrollToId } from './lib/motion';
import { Cursor } from './ui/Cursor';
import { IntroGame, shouldShowIntro } from './ui/IntroGame';
import { Nav } from './ui/Nav';
import { Hero } from './sections/Hero';
import { Numbers } from './sections/Numbers';
import { WorkCases } from './sections/WorkCases';
import { Path } from './sections/Path';
import { Life } from './sections/Life';
import { Contact } from './sections/Contact';
import { profile } from './data';

export default function App() {
  const [intro, setIntro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);
  // SplitText must measure real Bricolage glyphs, not fallback metrics
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    startSmoothScroll();
    // fonts change line heights; re-measure pins once they load
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      setFontsReady(true);
      ScrollTrigger.refresh();
      // honour #work, #life etc. on first load
      const id = window.location.hash.slice(1);
      if (id && !document.querySelector('[role=dialog]')) window.setTimeout(() => scrollToId(id), 300);
    });
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    // everything behind the intro dialog is inert while it is up
    document
      .querySelectorAll('main, footer, .site-nav, nav[aria-label="Sections"]')
      .forEach((el) => (intro ? el.setAttribute('inert', '') : el.removeAttribute('inert')));
    if (intro) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
      // pins were measured while the page was locked
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [intro]);

  const replay = () => {
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });
    setReady(false);
    setIntro(true);
  };

  return (
    <>
      <Cursor />
      {intro && (
        <IntroGame
          onDone={() => {
            setIntro(false);
            setReady(true);
            // a #hash on the URL waited behind the gate; go there now
            const id = window.location.hash.slice(1);
            if (id) window.setTimeout(() => scrollToId(id), 400);
          }}
        />
      )}
      <Nav onReplay={replay} />
      <main>
        {/* print / reader header: who, what, how to reach */}
        <header className="print-only px-8 pt-8">
          <h1 className="font-display text-5xl font-extrabold">Shipra Sonal</h1>
          <p className="mt-2 text-xl">Data @ Amazon · Data Engineering Manager · Seattle, WA</p>
          <p className="mt-2">{profile.sub}</p>
          <p className="mt-2 font-mono text-sm">
            {profile.email} · linkedin.com/in/shiprasonal · github.com/ssonal10 · shiprasonal.com
          </p>
        </header>
        <Hero ready={ready && fontsReady} />
        <Numbers />
        <WorkCases />
        <Path />
        <Life />
      </main>
      <Contact onReplay={replay} />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
