import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../portfolioData';

const ease = [0.2, 0.8, 0.2, 1] as const;

/**
 * Pinned hero (Lando Norris / Apple-style scroll scrub):
 * the name splits apart sideways, the video card grows from a portrait card
 * to full-bleed, and the tagline fades in as you scroll through 200vh.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-35%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '35%']);
  // Card starts as a small portrait window and opens to a tall frame
  // (full-bleed on phones, where the vertical clip fits the screen).
  const phone = typeof window !== 'undefined' && window.innerWidth < 768;
  const start = phone ? 'inset(18vh 10vw 18vh 10vw round 28px)' : 'inset(18vh 38vw 18vh 38vw round 28px)';
  const end = phone ? 'inset(0vh 0vw 0vh 0vw round 0px)' : 'inset(3vh 28vw 3vh 28vw round 20px)';
  const clipPath = useTransform(scrollYProgress, [0, 0.7], [start, reduce ? start : end]);
  const nameOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);
  const tagOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const tagY = useTransform(scrollYProgress, [0.55, 0.8], [40, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[200vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Video card that grows to full-bleed */}
        <motion.div style={{ clipPath }} className="absolute inset-0 z-0">
          <video
            src="/video/hero-2026.mp4"
            poster="/photos/hero-2026-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
        </motion.div>

        {/* Giant name, two halves sliding apart */}
        <motion.h1
          style={{ opacity: nameOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex select-none flex-col justify-center font-display leading-[0.82] tracking-tight text-slate-50"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            style={{ x: leftX }}
            className="block whitespace-nowrap pl-[4vw] text-left text-[22vw] md:text-[17vw]"
          >
            Shipra
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            style={{ x: rightX }}
            className="block whitespace-nowrap pr-[4vw] text-right text-[22vw] italic text-emerald-300 md:text-[17vw]"
          >
            Sonal
          </motion.span>
        </motion.h1>

        {/* Role chip, top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute left-1/2 top-24 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-slate-100/15 bg-bg/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-200 backdrop-blur sm:text-[11px]"
        >
          <span className="dot" />
          {profile.title} · Seattle
        </motion.div>

        {/* Tagline + CTAs, revealed as the video fills the screen */}
        <motion.div
          style={{ opacity: tagOpacity, y: tagY }}
          className="absolute inset-x-0 bottom-[12vh] z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center"
        >
          <p
            className="text-[17px] font-medium leading-relaxed text-white sm:text-[21px]"
            style={{ textShadow: '0 1px 24px rgba(0,0,0,0.8)' }}
          >
            I build <span className="font-display italic text-emerald-300">LLM agents</span> that leave the
            math to code, and the <span className="font-display italic text-violet-300">measurement</span>{' '}
            that shows leaders what worked.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-[13px] font-semibold text-emerald-950 transition-all hover:bg-emerald-300 hover:shadow-[0_0_40px_-5px_rgba(200,240,90,0.6)]"
            >
              See my work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={profile.socials.email}
              className="inline-flex items-center gap-2 rounded-full border border-slate-100/40 bg-bg/40 px-6 py-3 text-[13px] font-medium text-slate-100 backdrop-blur transition-all hover:border-slate-100"
            >
              Contact me
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-slate-300"
          >
            ↓
          </motion.span>
        </motion.div>

        {/* Corner meta */}
        <div className="absolute bottom-8 right-8 z-10 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 md:block">
          Seattle · UTC-8 · 2026
        </div>
        <div className="absolute bottom-8 left-8 z-10 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 md:flex">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-300">GitHub</a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-300">LinkedIn</a>
          <a href={profile.socials.email} className="transition-colors hover:text-emerald-300">Email</a>
        </div>
      </div>
    </section>
  );
}
