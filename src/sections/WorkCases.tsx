import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import { work } from '../data';

/**
 * Work as full-screen cases (Unseen style) on paper. Normal scroll, no pin:
 * each project gets one screen with its hero number on the left and
 * Problem / Built / Result on the right; both rise in as the case arrives.
 */
export function WorkCases() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // logo and nav switch to ink while the paper section is under them
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => {
          document.body.dataset.theme = self.isActive ? 'paper' : '';
        },
      });
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('.wc-case').forEach((el) => {
        gsap.from(el.querySelectorAll('.wc-reveal'), {
          y: 48,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        });
      });
    }, root);
    return () => {
      ctx.revert();
      document.body.dataset.theme = '';
    };
  }, []);

  return (
    <section ref={root} id="work" aria-label="Work" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex items-end justify-between border-b border-ink/15 pb-8 pt-28">
          <h2 className="font-display text-[clamp(48px,8vw,120px)] font-extrabold leading-[0.9] tracking-[-0.04em]">Selected work</h2>
          <p className="label hidden text-ink/60 sm:block">{work.length} projects</p>
        </div>

        {work.map((w, i) => (
          <article
            key={w.id}
            id={`work-${w.id}`}
            className="wc-case grid items-center gap-10 border-b border-ink/15 py-16 md:min-h-screen md:grid-cols-[1.1fr_1fr] md:gap-14"
          >
            <div className="wc-reveal relative flex min-h-[40vh] items-end overflow-hidden rounded-[20px] bg-[#e7e1d3] p-7 md:min-h-[70vh]">
              <img src="/fx/topo.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] print:hidden" />
              <p className="relative font-display text-[clamp(56px,8vw,120px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#2f6b1f]">
                {w.big}
                <span className="label mt-3 block text-ink">{w.bigSmall}</span>
              </p>
            </div>

            <div className="wc-reveal">
              <p className="label text-[#2f6b1f]">
                {String(i + 1).padStart(2, '0')} · {w.kind} · {w.year}
              </p>
              <h3 className="mb-7 mt-2 font-display text-[clamp(44px,6.5vw,96px)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                {w.name}
              </h3>
              <dl className="grid grid-cols-[90px_1fr] gap-x-5 gap-y-4 text-[16px] leading-relaxed">
                {(
                  [
                    ['Problem', w.problem],
                    ['Built', w.built],
                    ['Result', w.result],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="label pt-1 text-[#2f6b1f]">{k}</dt>
                    <dd className="text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {w.stack.map((t) => (
                  <li key={t} className="rounded-full border border-ink/25 px-2.5 py-1 font-mono text-[11px] text-ink/75">
                    {t}
                  </li>
                ))}
              </ul>
              {w.link && (
                <a
                  href={w.link}
                  target="_blank"
                  rel="noreferrer"
                  className="label mt-6 inline-block border-b border-[#2f6b1f] text-[#2f6b1f]"
                  data-cursor="open"
                >
                  Open ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
