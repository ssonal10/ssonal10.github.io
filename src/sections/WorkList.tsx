import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, getLenis, isTouch, prefersReducedMotion } from '../lib/motion';
import { work } from '../data';
import { WorkVisual } from '../ui/WorkVisual';

/**
 * by-kin.com/work style list. The section pins; scrolling moves the list
 * with its own lag so the item at the vertical centre becomes active. The
 * active name fills through a mask opened from the side you scrolled from,
 * and its backdrop zooms in from 1.3 to 1. Phones get stacked cards.
 */
export function WorkList() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);
  const dir = useRef<1 | -1>(1);
  const counter = useRef<HTMLParagraphElement>(null);
  const st = useRef<ScrollTrigger | null>(null);

  // jump to project i (click or keyboard on its name)
  const goTo = (i: number) => {
    const t = st.current;
    if (!t) return;
    const y = t.start + (i / (work.length - 1)) * (t.end - t.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    if (isTouch() || prefersReducedMotion()) {
      setPinned(false);
      return;
    }
    const ctx = gsap.context(() => {
      const list = root.current!.querySelector<HTMLElement>('.wl-list')!;
      const items = gsap.utils.toArray<HTMLElement>('.wl-item');
      let itemH = items[0].offsetHeight; // cached; refreshed on resize
      const y = gsap.quickTo(list, 'y', { duration: 0.9, ease: 'power3' });
      const op = items.map((el) => gsap.quickTo(el, 'opacity', { duration: 0.6, ease: 'power3' }));
      const sc = items.map((el) => gsap.quickTo(el, 'scale', { duration: 0.6, ease: 'power3' }));
      gsap.set(items, { transformOrigin: 'left center' });
      let current = -1;

      st.current = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => `+=${work.length * window.innerHeight * 0.6}`,
        pin: true,
        snap: { snapTo: 1 / (work.length - 1), duration: { min: 0.3, max: 0.7 }, delay: 0.3, ease: 'power2.inOut' },
        onRefresh: () => {
          itemH = items[0].offsetHeight;
        },
        onUpdate: (self) => {
          const f = self.progress * (work.length - 1);
          y(-f * itemH);
          // items fade and shrink with distance from the centre line
          items.forEach((_, i) => {
            const d = Math.abs(i - f);
            op[i](1 - gsap.utils.clamp(0, 0.85, d * 0.38));
            sc[i](1 - Math.min(d, 3) * 0.06);
          });
          if (counter.current) counter.current.textContent = `${String(Math.round(f) + 1).padStart(2, '0')} / ${String(work.length).padStart(2, '0')}`;
          const idx = Math.round(f);
          if (idx !== current) {
            dir.current = idx > current ? 1 : -1;
            current = idx;
            setActive(idx);
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // reveal the active name + zoom its backdrop. Plain tweens (no context
  // revert) so earlier states are not rolled back between changes.
  useLayoutEffect(() => {
    if (!pinned || !root.current) return;
    const fills = root.current.querySelectorAll<HTMLElement>('.wl-fill');
    const bgs = root.current.querySelectorAll<HTMLElement>('.wl-bg');
    const from = dir.current === 1 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
    const exit = dir.current === 1 ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)';
    gsap.killTweensOf([...fills, ...bgs]);
    fills.forEach((f, i) => {
      if (i === active) gsap.fromTo(f, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out' });
      else gsap.to(f, { clipPath: exit, duration: 0.6, ease: 'power3.inOut' });
    });
    gsap.fromTo(bgs[active], { scale: 1.3 }, { scale: 1, duration: 1.1, ease: 'expo.out' });
    gsap.fromTo(
      root.current.querySelectorAll('.wl-detail > *'),
      { yPercent: 40, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: 'power3.out', overwrite: true },
    );
  }, [active, pinned]);

  if (!pinned) return <WorkCards />;

  const w = work[active];
  return (
    <>
    {/* printable / no-JS-friendly copy of the list */}
    <div className="hidden print:block">
      <WorkCards print />
    </div>
    <section ref={root} id="work" aria-label="Work" className="relative h-screen overflow-hidden bg-ink text-paper print:hidden">
      {work.map((p, i) => (
        <div
          key={p.id}
          className={`wl-bg absolute inset-0 transition-[opacity,visibility] duration-700 ${i === active ? '' : 'wl-off'}`}
          style={{ opacity: i === active ? 0.55 : 0, visibility: i === active ? 'visible' : 'hidden' }}
          aria-hidden="true"
        >
          <WorkVisual kind={p.visual} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />

      <p className="label absolute left-5 top-24 text-lime sm:left-8">Selected work</p>
      <p ref={counter} className="label absolute bottom-8 left-5 text-stone sm:left-8">
        01 / {String(work.length).padStart(2, '0')}
      </p>

      {/* list: item at index `active` sits on the centre line */}
      <div
        className="absolute inset-0 px-5 [mask-image:linear-gradient(to_bottom,transparent_6%,black_28%,black_72%,transparent_94%)] sm:px-8"
        style={{ paddingTop: '50vh' }}
      >
        <ol className="wl-list" style={{ marginTop: '-0.5em' }}>
          {work.map((p, i) => (
            <li key={p.id} className="wl-item relative font-display text-[13vw] font-extrabold leading-[1] tracking-[-0.04em] md:text-[7vw]">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? 'true' : undefined}
                className="block text-left text-transparent [-webkit-text-stroke:1px_rgba(243,239,230,0.28)] focus-visible:outline-lime"
                data-cursor="view"
              >
                {p.name}
              </button>
              <span
                className="wl-fill pointer-events-none absolute inset-0 text-paper"
                style={{ clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                aria-hidden="true"
              >
                {p.name}
                <sup className="ml-3 align-top font-mono text-[0.12em] font-normal tracking-normal text-lime">
                  {String(i + 1).padStart(2, '0')}
                </sup>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* detail column */}
      <aside className="wl-detail absolute bottom-8 right-5 w-[min(420px,85vw)] space-y-3 sm:right-8" aria-live="polite">
        <p className="label text-lime">
          {w.year} · {w.kind}
        </p>
        <p className="text-[15px] leading-relaxed text-paper/85">{w.context}</p>
        <p className="font-serif text-2xl italic leading-snug text-paper">{w.impact}</p>
        <p className="label text-stone">{w.stack.join(' · ')}</p>
        {w.link && (
          <a href={w.link} target="_blank" rel="noreferrer" className="label inline-block border-b border-lime text-lime" data-cursor="open">
            Open ↗
          </a>
        )}
      </aside>
    </section>
    </>
  );
}

function WorkCards({ print = false }: { print?: boolean }) {
  return (
    <section id={print ? undefined : 'work'} aria-label="Work" className="bg-ink px-5 py-20 text-paper">
      <p className="label mb-8 text-stone">Selected work ({work.length})</p>
      <ol className="space-y-14">
        {work.map((p, i) => (
          <li key={p.id}>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl">
              <WorkVisual kind={p.visual} />
            </div>
            <h3 className="mt-4 font-display text-5xl font-extrabold tracking-tight">
              {p.name}
              <sup className="ml-2 font-mono text-xs font-normal text-lime">{String(i + 1).padStart(2, '0')}</sup>
            </h3>
            <p className="label mt-2 text-lime">
              {p.year} · {p.kind}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-paper/85">{p.context}</p>
            <p className="mt-3 font-serif text-xl italic text-paper">{p.impact}</p>
            <p className="label mt-3 text-stone">{p.stack.join(' · ')}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="label mt-3 inline-block border-b border-lime text-lime">
                Open ↗
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
