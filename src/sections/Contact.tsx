import { useEffect, useRef, useState } from 'react';
import { gsap, isTouch } from '../lib/motion';
import { profile } from '../data';
import { Query } from '../ui/Query';

/** Footer with a magnetic "Say hi" button that leans toward the cursor. */
export function Contact({ onReplay }: { onReplay: () => void }) {
  const btn = useRef<HTMLAnchorElement>(null);
  const [tally, setTally] = useState('');

  // echo the intro game: what did this visitor catch?
  useEffect(() => {
    const read = () => {
      try {
        const t = JSON.parse(sessionStorage.getItem('intro-tally') || 'null') as Record<string, number> | null;
        if (!t) return setTally('');
        const parts = [
          [t.dot, 'data point', 'data points'],
          [t.bell, 'dumbbell', 'dumbbells'],
          [t.peak, 'peak', 'peaks'],
          [t.play, 'play button', 'play buttons'],
        ]
          .filter(([n]) => (n as number) > 0)
          .map(([n, one, many]) => `${n} ${n === 1 ? one : many}`);
        setTally(parts.length ? `You caught ${parts.join(', ')}. Python did the math.` : '');
      } catch {
        setTally('');
      }
    };
    read();
    window.addEventListener('intro-tally', read);
    return () => window.removeEventListener('intro-tally', read);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (isTouch() || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(btn.current, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' });
  };
  const onLeave = () => btn.current && gsap.to(btn.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line bg-ink px-5 pb-10 pt-28 text-paper sm:px-8">
      <img src="/fx/topo.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] invert" />
      <p className="label relative text-lime">Contact</p>
      <h2 className="relative mt-6 font-display text-[15vw] font-extrabold leading-[0.85] tracking-[-0.045em] sm:text-[10vw]">
        Got a messy
        <br />
        <span className="font-serif font-normal italic">dataset?</span>
      </h2>

      <Query />

      <div className="relative mt-16 flex flex-col items-start gap-10 sm:flex-row sm:items-center sm:justify-between" onPointerMove={onMove} onPointerLeave={onLeave}>
        <a
          ref={btn}
          href={`mailto:${profile.email}`}
          className="flex h-40 w-40 items-center justify-center rounded-full bg-lime font-display text-2xl font-extrabold text-ink sm:h-52 sm:w-52 sm:text-3xl"
          data-cursor="write"
        >
          Say hi
        </a>
        <ul className="space-y-3 text-lg">
          <li>
            <a href={`mailto:${profile.email}`} className="border-b border-paper/30 hover:border-lime hover:text-lime">
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="border-b border-paper/30 hover:border-lime hover:text-lime">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="border-b border-paper/30 hover:border-lime hover:text-lime">
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>

      {tally && <p className="label relative mt-20 text-lime">{tally}</p>}
      <div className="relative mt-6 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row">
        <p className="label text-stone">© 2026 {profile.name} · Seattle</p>
        <button type="button" onClick={onReplay} className="label text-left text-stone hover:text-lime" data-cursor="play">
          Replay the intro game ▶
        </button>
        <p className="label text-stone">Built with React, GSAP and Lenis</p>
      </div>
    </footer>
  );
}
