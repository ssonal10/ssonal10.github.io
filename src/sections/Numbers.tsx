import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { stack } from '../data';

/** Stack ticker: slow drift that speeds up a little and leans with scroll speed. */
export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // ticker: constant drift, speeds up and leans with scroll velocity
      const track = root.current!.querySelector<HTMLElement>('.ticker-track')!;
      const loop = gsap.to(track, { xPercent: -50, duration: 90, ease: 'none', repeat: -1 });
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power3' });
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = self.getVelocity();
            loop.timeScale(1 + Math.min(Math.abs(v) / 1200, 1.5) * (v < 0 ? -1 : 1));
            skew(Math.abs(v) < 80 ? 0 : gsap.utils.clamp(-4, 4, v / -600));
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="numbers" aria-label="Stack" className="print-hide relative border-y border-line bg-ink py-10 text-paper sm:py-14">
      <div className="print-hide overflow-hidden py-2" aria-hidden="true">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-4xl font-extrabold uppercase tracking-[-0.02em] text-lime sm:text-7xl">
              {s}
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-paper/60 sm:h-9 sm:w-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
