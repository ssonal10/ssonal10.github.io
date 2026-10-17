import type { CSSProperties } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { work, type Work } from '../data';
import { Diagram, diagrams, type DiagramKey } from '../ui/Diagram';
import { Globe } from '../ui/Globe';

const diagramFor: Record<string, DiagramKey> = {
  'deal-agent': 'agent',
  activation: 'measure',
  sentinel: 'sentinel',
  'deep-dive': 'deepdive',
  'cx-funnel': 'funnel',
  futures: 'futures',
  finance: 'spend',
};

// Birka cases get one of Shipra's own landscapes, darkened
const photos = ['/life/baker-road.webp', '/life/squamish.webp', '/life/kullu.webp', '/life/andaman-blue.webp'];

const CAMEL = '#d4a979';
const themes = {
  // style 2, after the Birka template: photo, camel, square corners
  birka: { '--fg': '#f2efe9', '--accent': CAMEL, '--accent2': '#8fb8c9', '--on': '#111111' },
  // style 4: Payza black, dotted globe behind the text, gradient title, camel
  globe: { '--fg': '#f2efe9', '--accent': CAMEL, '--accent2': '#e5e5e5', '--on': '#111111' },
} as const;

/**
 * Work: one full screen per project, normal scroll, alternating two looks
 * (Birka photo / black with a globe). Text on the left, the system's
 * diagram on the right; both rise in and the diagram's boxes pop as the
 * case arrives.
 */
export function WorkCases() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.wc-case').forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 65%', once: true } });
        tl.from(el.querySelectorAll('.wc-reveal'), { y: 48, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
          .from(el.querySelectorAll('.dg-node'), { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.6)' }, 0.4)
          .from(el.querySelectorAll('.dg-base'), { drawSVG: '0%', duration: 0.7, stagger: 0.05, ease: 'power2.inOut' }, '-=0.3')
          .from(el.querySelectorAll('.dg-live'), { opacity: 0, duration: 0.4, stagger: 0.03 }, '-=0.3');
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" aria-label="Work" className="bg-[#050505] text-[#f2efe9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="mx-auto flex max-w-[1240px] items-end justify-between border-b border-white/10 px-5 pb-8 pt-28 sm:px-8">
        <h2 className="text-[clamp(44px,7vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em]">What I&apos;ve built</h2>
        <p className="hidden font-mono text-xs uppercase tracking-[0.18em] text-white/50 sm:block">{work.length} projects</p>
      </div>
      {work.map((w, i) => (
        <Case key={w.id} w={w} i={i} />
      ))}
    </section>
  );
}

function Case({ w, i }: { w: Work; i: number }) {
  const birka = i % 2 === 0;
  const n = String(i + 1).padStart(2, '0');
  return (
    <article
      id={`work-${w.id}`}
      className="wc-case relative overflow-hidden border-b border-white/10"
      style={(birka ? themes.birka : themes.globe) as CSSProperties}
    >
      {/* backdrop */}
      {birka ? (
        <>
          <img src={photos[(i / 2) % photos.length]} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover print:hidden" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.96)_30%,rgba(8,8,8,.6))]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_75%_45%,rgba(212,169,121,.16),transparent_70%)]" />
      )}

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 md:min-h-screen md:grid-cols-[1fr_1.1fr] md:gap-14">
        <div className="wc-reveal relative">
          {/* style 4: the globe turns behind the write-up */}
          {!birka && <Globe className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2" />}
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs">
              <i className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {n} · {w.kind} · {w.year}
            </span>
            <h3
              className={`mb-7 mt-5 leading-[0.98] ${
                w.name.length > 20 ? 'text-[clamp(34px,3.9vw,60px)]' : 'text-[clamp(40px,5.2vw,80px)]'
              } ${
                birka
                  ? 'font-bold uppercase tracking-[-0.01em]'
                  : 'bg-[linear-gradient(180deg,#fff_30%,#8a8a8a)] bg-clip-text font-semibold tracking-[-0.04em] text-transparent'
              }`}
            >
              {w.name}
            </h3>
            <dl className="grid grid-cols-[86px_1fr] gap-x-[18px] gap-y-3.5 text-[15px] leading-relaxed">
              {(
                [
                  ['Problem', w.problem],
                  ['Built', w.built],
                  ['Result', w.result],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">{k}</dt>
                  <dd className="text-white/80">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {w.stack.map((t) => (
                <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/85">
                  {t}
                </li>
              ))}
            </ul>
            {w.link && (
              <a
                href={w.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block border-b border-[var(--accent)] font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]"
                data-cursor="open"
              >
                Open ↗
              </a>
            )}
          </div>
        </div>

        <div
          className={`wc-reveal relative flex flex-col justify-center border border-white/10 p-7 backdrop-blur-md md:min-h-[66vh] ${
            birka ? 'rounded bg-[rgba(10,10,10,0.55)]' : 'rounded-[22px] bg-white/[0.035]'
          }`}
        >
          <p
            className={`mb-3.5 self-start px-4 py-1.5 text-[17px] font-semibold ${
              birka ? 'rounded-sm bg-[var(--accent)] text-[#111]' : 'rounded-full bg-[#f2efe9] text-[#050505]'
            }`}
          >
            {w.big}
            <small className="ml-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.12em] opacity-75">{w.bigSmall}</small>
          </p>
          <Diagram spec={diagrams[diagramFor[w.id]]} title={w.name} themed />
        </div>
      </div>
    </article>
  );
}
