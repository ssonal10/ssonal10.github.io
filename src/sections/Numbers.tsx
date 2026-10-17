import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { numbers, stack } from '../data';

/** Four headline numbers that rise in, then a stack ticker that leans with scroll speed. */
export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.num-cell', {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      // ticker: constant drift, skews with scroll velocity
      const track = root.current!.querySelector<HTMLElement>('.ticker-track')!;
      const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power3' });
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = self.getVelocity();
            loop.timeScale(1 + Math.min(Math.abs(v) / 400, 6) * (v < 0 ? -1 : 1));
            skew(gsap.utils.clamp(-8, 8, v / -300));
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="Numbers" className="relative border-t border-line bg-ink py-20 text-paper sm:py-28">
      <div className="grid grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
        {numbers.map((n) => (
          <div key={n.small} className="overflow-hidden border-l border-line pl-4">
            <div className="num-cell">
              <p className="font-display text-5xl font-extrabold tracking-tight text-paper sm:text-7xl">
                {n.big}
              </p>
              <p className="label mt-3 max-w-[12rem] leading-relaxed text-stone">{n.small}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 overflow-hidden border-y border-line py-5" aria-hidden="true">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="font-serif text-4xl italic text-paper/80 sm:text-6xl">
              {s} <span className="not-italic text-lime">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
