import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isTouch, prefersReducedMotion } from '../lib/motion';
import { designNotes } from '../data';
import { Diagram, diagrams } from '../ui/Diagram';

/**
 * Design notes: three one-page design docs (problem, tenets, shape,
 * tradeoff) laid side by side. On desktop the row pins and scrolls sideways;
 * each diagram's boxes pop in as its page reaches the centre.
 */
export function DesignNotes() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLParagraphElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>('.dn-track')!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            bar.current?.style.setProperty('transform', `scaleX(${self.progress})`);
            if (count.current) {
              const page = Math.min(3, Math.max(1, Math.ceil(self.progress * 3.2)));
              count.current.textContent = `0${page} / 03`;
            }
            hint.current?.style.setProperty('opacity', self.progress > 0.02 ? '0' : '1');
          },
        },
      });
      gsap.utils.toArray<HTMLElement>('.dn-page').forEach((page) => {
        gsap.from(page.querySelectorAll('.dg-node'), {
          scale: 0.6,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: page, containerAnimation: slide, start: 'left 70%' },
        });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="notes" aria-label="Design notes" className="relative overflow-hidden border-t border-line bg-ink text-paper">
      <div className="no-print absolute inset-x-5 bottom-6 z-10 hidden items-center gap-4 sm:inset-x-8 md:flex">
        <p ref={count} className="label text-stone">01 / 03</p>
        <div className="h-px flex-1 bg-line">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-lime" />
        </div>
      </div>
      <div className="dn-track flex flex-col gap-16 px-5 py-20 md:h-screen md:w-max md:flex-row md:items-center md:gap-10 md:px-8 md:py-0">
        <div className="flex shrink-0 flex-col justify-center md:w-[34vw]">
          <p className="label text-lime">Design notes</p>
          <h2 className="mt-4 font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-7xl">
            How the
            <br />
            <span className="font-serif font-normal italic">systems</span> work
          </h2>
          <p className="mt-6 max-w-sm text-paper/70">
            One page per system, written the way I write design docs at work: the problem, the rules it follows, its
            shape and what it gives up. I kept them generic, with no internal names.
          </p>
          <p ref={hint} className="label mt-8 hidden text-stone transition-opacity md:block">Scroll →</p>
        </div>

        {designNotes.map((n, i) => (
          <article
            key={n.id}
            className="dn-page flex shrink-0 flex-col rounded-3xl border border-line bg-[#121210] p-6 md:h-[84vh] md:w-[88vw] md:max-w-[1280px] md:p-10"
          >
            <header className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{n.title}</h3>
              <span className="label text-stone">Note {String(i + 1).padStart(2, '0')}</span>
            </header>
            <div className="grid flex-1 gap-8 pt-6 md:grid-cols-[1fr_1.7fr]">
              <div className="space-y-6 text-[15px] leading-relaxed">
                <div>
                  <p className="label mb-2 text-lime">Problem</p>
                  <p className="text-paper/85">{n.problem}</p>
                </div>
                <div>
                  <p className="label mb-2 text-lime">Tenets</p>
                  <ol className="space-y-2">
                    {n.tenets.map((t, j) => (
                      <li key={j} className="flex gap-3 text-paper/85">
                        <span className="font-mono text-xs text-stone">{j + 1}.</span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="label mb-2 text-lime">Tradeoff</p>
                  <p className="font-serif text-xl italic text-paper">{n.tradeoff}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Diagram spec={diagrams[n.diagram]} title={n.title} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
