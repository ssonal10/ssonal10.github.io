import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type Media = { src: string; caption: string; tilt: number };

const photos: Media[] = [
  { src: '/photos/rainier-snow.jpg', caption: 'Naches · Washington', tilt: -2 },
  { src: '/photos/maui-cliff.jpg', caption: 'Kapalua · Maui', tilt: 2 },
  { src: '/photos/nyc-wtc.jpg', caption: 'One World Trade · NYC', tilt: -1.5 },
  { src: '/photos/squamish.jpg', caption: 'Sea to Sky · Squamish', tilt: 1.5 },
  { src: '/photos/nyc-bridge.jpg', caption: 'Brooklyn Bridge · NYC', tilt: -3 },
  { src: '/photos/tulips.jpg', caption: 'Tulip season · 2023', tilt: 2.5 },
  { src: '/photos/kullu.jpg', caption: 'Kullu · India', tilt: -2 },
  { src: '/photos/andaman-sunset.jpg', caption: 'Andaman Sea · India', tilt: 1.5 },
  { src: '/photos/space-needle.jpg', caption: 'Space Needle · Seattle', tilt: -1 },
];

function Postcard({ p, i }: { p: Media; i: number }) {
  return (
    <figure
      className="glass group relative w-[68vw] shrink-0 snap-center overflow-hidden rounded-2xl p-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] sm:w-[300px] md:w-[340px]"
      style={{ rotate: `${p.tilt}deg` }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
        <img
          src={p.src}
          alt={p.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
      </div>
      <figcaption className="flex items-center justify-between px-2 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
        <span className="truncate">{p.caption}</span>
        <span className="ml-2 shrink-0 text-slate-500">{String(i + 1).padStart(2, '0')}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Pinned horizontal gallery (wibe-studio "new arrivals" / Weirdos shop row):
 * on md+ the section pins and vertical scroll moves the strip sideways.
 * On phones it falls back to a native swipe row with snap points.
 */
export function PhotoStrip() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-62%']);

  const header = (
    <div className="mb-10 flex items-end justify-between gap-6 px-6 md:px-10">
      <div>
        <span className="section-label">Postcards</span>
        <h3 className="mt-4 font-display text-3xl italic leading-tight text-slate-100 sm:text-5xl">
          Seattle, and wherever the weekend goes.
        </h3>
      </div>
      <p className="hidden max-w-xs text-sm text-slate-300 md:block">
        Seattle is home. Most weekends end up on a mountain or a coastline.
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop: pinned, scroll-driven */}
      <section ref={ref} aria-label="Postcards" className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl">{header}</div>
          <motion.div style={{ x }} className="flex gap-8 pl-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))]">
            {photos.map((p, i) => (
              <Postcard key={p.src} p={p} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Phones: swipe row */}
      <section aria-label="Postcards" className="py-20 md:hidden">
        {header}
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none]">
          {photos.map((p, i) => (
            <Postcard key={p.src} p={p} i={i} />
          ))}
        </div>
      </section>
    </>
  );
}
