import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isTouch, prefersReducedMotion } from '../lib/motion';
import { clips, life } from '../data';
import { AutoVideo } from '../ui/AutoVideo';
import { Stickers } from '../ui/Stickers';

/**
 * Life: the page flips to paper. Three photo columns drift at different
 * speeds; photos are warm mono duotones that turn to full color on
 * hover. Then a swipe reel of short 9:16 edits.
 */
export function Life() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => {
          document.body.dataset.theme = self.isActive ? 'paper' : '';
        },
      });
      if (prefersReducedMotion() || isTouch()) return;
      gsap.utils.toArray<HTMLElement>('.life-col').forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: [4, 2, 8][i] },
          { yPercent: [-10, -6, -14][i], ease: 'none', scrollTrigger: { trigger: root.current, scrub: true } },
        );
      });
      gsap.from('.life-title > *', {
        yPercent: 115,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.life-title', start: 'top 85%' },
      });
    }, root);
    return () => {
      ctx.revert();
      document.body.dataset.theme = '';
    };
  }, []);

  const cols = [0, 1, 2].map((c) => life.filter((_, i) => i % 3 === c));

  return (
    <section ref={root} id="life" aria-label="Life" className="relative px-5 py-28 print:py-6 sm:px-8 sm:py-36">
      <div className="relative mb-24 grid min-h-[70vh] gap-8 pt-[22vh] print:mb-4 print:min-h-0 print:pt-0 md:grid-cols-[1.4fr_1fr] md:items-end">
        <Stickers />
        <h2 className="life-title mask font-display text-[18vw] font-extrabold leading-[0.82] tracking-[-0.045em] md:text-[11vw]">
          <span>Off the</span>
          <span className="font-serif font-normal italic">clock.</span>
        </h2>
        <p className="max-w-md text-lg leading-relaxed">
          I lift, and I cook everything high protein. Hover a photo for color, and throw the stickers around.
        </p>
      </div>

      <div className="print-hide grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {cols.map((col, c) => (
          <div key={c} className={`life-col space-y-4 md:space-y-6 ${c === 2 ? 'hidden md:block' : ''}`}>
            {(c === 1 ? [...col, ...cols[2].filter((_, i) => i % 2 === 0)] : col).map((p) => (
              <figure
                key={p.src}
                className="group relative overflow-hidden rounded-2xl"
                data-cursor="color"
                // load the colour version only when someone actually hovers
                onPointerEnter={(e) => {
                  const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-src]');
                  if (img && !img.src) img.src = img.dataset.src!;
                }}
              >
                <div className={`relative ${p.tall ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                  <img
                    src={`/life/${p.src}-duo.webp`}
                    alt={p.caption}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <img
                    data-src={`/life/${p.src}.webp`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <figcaption className="label absolute bottom-3 left-3 rounded-full bg-ink px-3 py-1.5 text-paper transition-colors group-hover:bg-lime group-hover:text-ink">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>

      <div className="print-hide mt-28">
        <div className="mb-6 flex items-end justify-between">
          <p className="label">Edits · CapCut · 9:16</p>
          <p className="label hidden opacity-60 sm:block">Drag or shift + scroll →</p>
        </div>
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8">
          {clips.map((c) => (
            <figure key={c.src} className="relative w-[58vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[240px]" data-cursor="play">
              <AutoVideo src={c.src} className="aspect-[9/16] w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 text-paper">
                <span className="block font-serif text-2xl italic">{c.title}</span>
                <span className="label opacity-70">{c.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
