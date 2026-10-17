import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isTouch, prefersReducedMotion } from '../lib/motion';
import { work, type Work } from '../data';
import { Diagram, diagrams, type DiagramKey } from '../ui/Diagram';

const diagramFor: Record<string, DiagramKey> = {
  'deal-agent': 'agent',
  activation: 'measure',
  sentinel: 'sentinel',
  'deep-dive': 'deepdive',
  'deal-model': 'dealmodel',
  'cx-funnel': 'funnel',
  futures: 'futures',
  finance: 'spend',
};

/**
 * Work on paper, one card per project: Problem / Built / Result on the
 * left, its architecture diagram on the right. On desktop the row pins and
 * scrolls sideways (the old design-notes scroll); each diagram's boxes pop
 * in as its card reaches the centre. Touch and reduced motion get a stack.
 */
export function WorkCases() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLParagraphElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);
  const [pinned] = useState(() => !isTouch() && !prefersReducedMotion());

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // logo and nav switch to ink while the paper section is under them.
      // Created after the pin so its end includes the pinned scroll length.
      const themeToggle = (pinEnd?: () => number) =>
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 55%',
          // pinned: the section's bottom reaches 45% of the screen 55vh after the pin ends
          end: pinEnd ? () => pinEnd() + window.innerHeight * 0.55 : 'bottom 45%',
          onToggle: (self) => {
            document.body.dataset.theme = self.isActive ? 'paper' : '';
          },
        });
      if (!pinned) {
        themeToggle();
        return;
      }

      const track = root.current!.querySelector<HTMLElement>('.wc-track')!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const pages = gsap.utils.toArray<HTMLElement>('.wc-page');
      // card centres in track coordinates, cached (no layout reads per frame)
      let centres = pages.map((pg) => pg.offsetLeft + pg.offsetWidth / 2);
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          // 1.5px of scroll per px of travel: a calm pace for reading
          end: () => `+=${distance() * 1.5}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            centres = pages.map((pg) => pg.offsetLeft + pg.offsetWidth / 2);
          },
          onUpdate: (self) => {
            bar.current?.style.setProperty('transform', `scaleX(${self.progress})`);
            if (count.current) {
              const mid = window.innerWidth / 2 + self.progress * distance();
              let best = 0;
              centres.forEach((c, i) => {
                if (Math.abs(c - mid) < Math.abs(centres[best] - mid)) best = i;
              });
              count.current.textContent = `${String(best + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
            }
            hint.current?.style.setProperty('opacity', self.progress > 0.02 ? '0' : '1');
          },
        },
      });
      // per card: boxes pop, then edges draw, then the flowing lines fade in
      pages.forEach((page) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: page, containerAnimation: slide, start: 'left 70%' } });
        tl.from(page.querySelectorAll('.dg-node'), { scale: 0.6, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.6)' })
          .from(page.querySelectorAll('.dg-base'), { drawSVG: '0%', duration: 0.8, stagger: 0.06, ease: 'power2.inOut' }, '-=0.2')
          .from(page.querySelectorAll('.dg-live'), { opacity: 0, duration: 0.5, stagger: 0.04 }, '-=0.3');
      });
      themeToggle(() => slide.scrollTrigger!.end);
      ScrollTrigger.refresh();
    }, root);
    return () => {
      ctx.revert();
      document.body.dataset.theme = '';
    };
  }, [pinned]);

  return (
    <section ref={root} id="work" aria-label="Work" className="relative overflow-hidden bg-paper text-ink">
      <div className={`no-print absolute inset-x-5 bottom-6 z-10 hidden items-center gap-4 sm:inset-x-8 ${pinned ? 'md:flex' : ''}`}>
        <p ref={count} className="label text-ink/60">
          01 / {String(work.length).padStart(2, '0')}
        </p>
        <div className="h-px flex-1 bg-ink/15">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-[#2f6b1f]" />
        </div>
      </div>

      <div
        className={`wc-track dn-track flex flex-col gap-16 px-5 py-20 ${pinned ? 'md:h-screen md:w-max md:flex-row md:items-center md:gap-10 md:px-8 md:py-0' : ''}`}
      >
        <div className={`flex shrink-0 flex-col justify-center ${pinned ? 'md:w-[30vw]' : ''}`}>
          <p className="label text-[#2f6b1f]">Selected work · {work.length} projects</p>
          <h2 className="mt-4 font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-7xl">
            What I
            <br />
            <span className="font-serif font-normal italic">built</span>
          </h2>
          <p className="mt-6 max-w-sm text-ink/70">
            Each card has the problem, what I built and what it changed, with the system drawn the way I sketch design docs at work.
            Generic shapes, no internal names.
          </p>
          <p ref={hint} className="label mt-8 hidden text-ink/50 transition-opacity md:block">
            Scroll →
          </p>
        </div>

        {work.map((w, i) => (
          <Card key={w.id} w={w} i={i} pinned={pinned} />
        ))}
      </div>
    </section>
  );
}

function Card({ w, i, pinned }: { w: Work; i: number; pinned: boolean }) {
  return (
    <article
      id={`work-${w.id}`}
      className={`wc-page dn-page flex shrink-0 flex-col rounded-3xl border border-ink/12 bg-[#ebe6da] p-6 md:p-10 ${pinned ? 'md:h-[84vh] md:w-[88vw] md:max-w-[1280px]' : ''}`}
    >
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/12 pb-4">
        <div>
          <p className="label text-[#2f6b1f]">
            {String(i + 1).padStart(2, '0')} · {w.kind} · {w.year}
          </p>
          <h3 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{w.name}</h3>
        </div>
        <p className="rounded-full bg-[#2f6b1f] px-4 py-1.5 font-display text-lg font-bold text-paper">
          {w.big} <span className="font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-paper/80">{w.bigSmall}</span>
        </p>
      </header>
      <div className="grid flex-1 gap-8 pt-6 md:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col">
          <dl className="space-y-5 text-[15px] leading-relaxed">
            {(
              [
                ['Problem', w.problem],
                ['Built', w.built],
                ['Result', w.result],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="label mb-1.5 text-[#2f6b1f]">{k}</dt>
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
              className="label mt-5 inline-block self-start border-b border-[#2f6b1f] text-[#2f6b1f]"
              data-cursor="open"
            >
              Open ↗
            </a>
          )}
        </div>
        <div className="flex items-center">
          <Diagram spec={diagrams[diagramFor[w.id]]} title={w.name} light />
        </div>
      </div>
    </article>
  );
}
