import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { numbers, stack } from '../data';

// counts with decimals on the way up, lands on the clean value ("7M", not "7.0M")
const fmt = (n: (typeof numbers)[number], v: number) =>
  n.display ?? `${v >= n.value ? n.value : v.toFixed(n.decimals ?? 0)}${n.suffix ?? ''}`;

/**
 * Headline numbers: each counts up once on enter, with what it used to be
 * struck through above it. Then a stack ticker that leans with scroll speed.
 */
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
      root.current!.querySelectorAll<HTMLElement>('.num-value').forEach((el, i) => {
        const n = numbers[i];
        if (n.display) return;
        const o = { v: 0 };
        gsap.to(o, {
          v: n.value,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
          onUpdate: () => {
            el.textContent = fmt(n, o.v);
          },
        });
      });

      gsap.to('.num-strike', {
        scaleX: 1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 1.4,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });

      // ticker: constant drift, speeds up and leans with scroll velocity
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
            skew(Math.abs(v) < 50 ? 0 : gsap.utils.clamp(-8, 8, v / -300));
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="numbers" aria-label="Numbers" className="relative border-t border-line bg-ink py-20 text-paper sm:py-28">
      <div className="grid grid-cols-2 gap-y-14 px-5 sm:px-8 lg:grid-cols-4">
        {numbers.map((n) => (
          <div key={n.small} className="overflow-hidden border-l border-line pl-4">
            <div className="num-cell">
              <p className="relative inline-block h-8 font-serif text-2xl italic text-stone">
                {n.was ?? ''}
                {n.was && <i className="num-strike absolute left-0 top-1/2 h-[2px] w-full origin-left scale-x-0 bg-lime" />}
              </p>
              <p className="num-value mt-2 font-display text-6xl font-extrabold leading-[0.85] tracking-tight text-paper lg:text-[7.5vw]">
                {fmt(n, n.value)}
              </p>
              <p className="label mt-4 max-w-[12rem] leading-relaxed text-stone">{n.small}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 overflow-hidden border-y border-line py-5" aria-hidden="true">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-serif text-4xl italic text-paper/80 sm:text-6xl">
              {s}
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-lime sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
