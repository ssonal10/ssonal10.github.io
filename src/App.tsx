import { useEffect, useState } from 'react';
import { startSmoothScroll, getLenis, ScrollTrigger } from './lib/motion';
import { Cursor } from './ui/Cursor';
import { IntroGame, shouldShowIntro } from './ui/IntroGame';
import { Nav } from './ui/Nav';
import { Hero } from './sections/Hero';
import { Numbers } from './sections/Numbers';
import { WorkList } from './sections/WorkList';
import { DesignNotes } from './sections/DesignNotes';
import { Path } from './sections/Path';
import { Life } from './sections/Life';
import { Contact } from './sections/Contact';

export default function App() {
  const [intro, setIntro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!intro);

  useEffect(() => {
    startSmoothScroll();
    // fonts change line heights; re-measure pins once they load
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (intro) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
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
          }}
        />
      )}
      <Nav onReplay={replay} />
      <main>
        <Hero ready={ready} />
        <Numbers />
        <WorkList />
        <DesignNotes />
        <Path />
        <Life />
      </main>
      <Contact onReplay={replay} />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
