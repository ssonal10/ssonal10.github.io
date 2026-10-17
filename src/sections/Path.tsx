import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { experience, recognition } from '../data';

/**
 * Obys-style index: numbered rows with big type that open on hover/focus,
 * then the recognition lines revealed under masks.
 */
export function Path() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-line').forEach((el) => {
        gsap.from(el.children, {
          yPercent: 115,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="path" aria-label="Path" className="relative border-t border-line bg-ink px-5 py-24 text-paper sm:px-8 sm:py-32">
      <div className="mb-14 flex items-end justify-between gap-6">
        <h2 className="reveal-line mask font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">
          <span>Path</span>
        </h2>
        <p className="label max-w-[16rem] text-right text-stone">9 years in data · Noida, Bengaluru, Seattle</p>
      </div>

      <ol className="border-t border-line">
        {experience.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={e.role + e.period} className="border-b border-line">
              <button
                type="button"
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_auto] sm:py-8"
                data-cursor="open"
              >
                <span className="font-mono text-sm text-stone">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span
                    className={`block font-display text-3xl font-extrabold tracking-tight transition-colors duration-300 sm:text-5xl ${
                      isOpen ? 'text-lime' : 'text-paper'
                    }`}
                  >
                    {e.role}
                  </span>
                  <span className="label mt-2 block text-stone">{e.org}</span>
                </span>
                <span className="label hidden text-stone sm:block">{e.period}</span>
              </button>
              <div
                className="path-rows grid transition-[grid-template-rows] duration-500 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <ul className="overflow-hidden pl-[3.5rem] sm:pl-[5rem]">
                  {e.lines.map((l) => (
                    <li key={l} className="pb-3 text-[15px] text-paper/80 last:pb-8">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-28">
        <p className="label relative mb-8 text-lime">Recognition</p>
        <ul className="relative space-y-6">
          {recognition.map((r) => (
            <li key={r.text} className="reveal-line mask flex flex-wrap items-baseline gap-x-6">
              <span className="font-display text-[16vw] font-extrabold leading-[0.85] tracking-[-0.04em] sm:text-[9vw]">{r.big}</span>
              <span className="max-w-md pb-2 font-serif text-2xl italic text-paper/85 sm:text-3xl">
                {r.text} <span className="label not-italic text-stone">· {r.when}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
