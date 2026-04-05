import { motion } from 'framer-motion';
import { profile } from '../portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[780px] w-full overflow-hidden">
      {/* Full-bleed portrait — video with photo poster/fallback */}
      <div className="absolute inset-0 z-0">
        <motion.video
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          src="/video/hero-loop-v3.mp4"
          poster="/photos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center"
        />
        {/* Cinematic gradient overlays — stronger for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/30 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/10 to-bg/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(3,7,18,0.15) 0%, rgba(3,7,18,0.4) 45%, #030712 95%)',
          }}
        />
        {/* Dark pedestal behind subline for guaranteed contrast */}
        <div
          className="absolute left-1/2 top-[58%] h-[40%] w-[90%] max-w-3xl -translate-x-1/2 rounded-[100%]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(3,7,18,0.7) 0%, rgba(3,7,18,0.4) 40%, transparent 75%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Centered overlay content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 text-[15px] font-light tracking-wide text-slate-300 sm:text-base"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-[4.5rem] font-light leading-[0.9] tracking-tight text-slate-50 drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem]"
        >
          Shipra{' '}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-slate-50 via-emerald-100 to-violet-200">
            Sonal
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-slate-300/60 sm:w-16" />
          <span className="text-[13px] font-light tracking-wide text-slate-200 sm:text-base">
            Senior · GenAI × Data · Amazon
          </span>
          <span className="h-px w-10 bg-slate-300/60 sm:w-16" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-7 max-w-2xl text-[15px] font-medium leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-[17px]"
          style={{ textShadow: '0 1px 20px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.5)' }}
        >
          I turn <span className="italic text-emerald-300">billions of records</span> into
          decisions — building <span className="italic text-violet-300">GenAI agents</span>,
          1B+/day data pipelines, and measurement platforms that move real numbers.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-md bg-slate-50 px-6 py-3 text-[13px] font-medium text-slate-900 transition-all hover:bg-white hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
          >
            See My Work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={profile.socials.email}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300/50 bg-slate-900/40 px-6 py-3 text-[13px] font-medium text-slate-100 backdrop-blur transition-all hover:border-slate-100 hover:bg-slate-900/60"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-400"
        >
          ↓
        </motion.span>
      </motion.div>

      {/* Corner social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 z-10 hidden items-center gap-4 text-slate-400 md:flex"
      >
        <a href={profile.socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-100" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.6.23 2.78.11 3.07.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z"/></svg>
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-100" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z"/></svg>
        </a>
        <a href={profile.socials.email} className="transition-colors hover:text-slate-100" aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
        </a>
      </motion.div>

      {/* Corner meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-10 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 md:block"
      >
        Seattle · UTC-8 · 2026
      </motion.div>
    </section>
  );
}
