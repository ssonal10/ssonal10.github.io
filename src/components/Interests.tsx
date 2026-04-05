import { motion } from 'framer-motion';

const edits = [
  { src: '/video/ny-loop.mp4', title: 'Travel Dump', meta: 'NYC · 2024', tint: 'from-amber-500/20 to-rose-500/10' },
  { src: '/video/birthday-loop.mp4', title: 'Birthday Cut', meta: 'Self · 2026', tint: 'from-violet-500/20 to-fuchsia-500/10' },
  { src: '/video/car-loop.mp4', title: 'Morning Drive', meta: 'GRWM · 2025', tint: 'from-emerald-500/20 to-cyan-500/10' },
];

const gymStats = [
  { k: '1%', v: 'better every day' },
  { k: '4×', v: 'lifts / week' },
  { k: '2y', v: 'consistent' },
];

export function Interests() {
  return (
    <section id="interests" className="py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <span className="section-label">Off-Duty</span>
          <h3 className="mt-4 font-display text-3xl italic leading-tight text-slate-100 sm:text-4xl md:text-5xl">
            When I'm not querying tables.
          </h3>
        </div>
        <p className="hidden max-w-sm text-sm text-slate-400 md:block">
          I lift heavy things and cut vertical videos. Same discipline, different output.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Workout card — tall */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="glass lift group relative overflow-hidden rounded-3xl p-2 lg:col-span-2 lg:row-span-2"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <video
              src="/video/gym-loop.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Workout
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h4 className="font-display text-4xl italic leading-[0.95] text-white drop-shadow-lg sm:text-5xl">
                1% better
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                  every day.
                </span>
              </h4>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-slate-200">
                Strength training keeps the analytical brain honest — numbers don't lie
                under a loaded bar.
              </p>
              <div className="mt-5 flex items-center gap-5 border-t border-white/10 pt-4">
                {gymStats.map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-2xl italic leading-none text-white">
                      {s.k}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video editing header card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="glass lift relative overflow-hidden rounded-3xl p-6 lg:col-span-3"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                Video Editing
              </div>
              <h4 className="mt-4 font-display text-3xl italic leading-tight text-slate-100 sm:text-4xl">
                Frame by frame.
              </h4>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Self-taught in CapCut — turning travel dumps, GRWMs, and birthday moments
                into little 9:16 stories.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:inline-flex">
              <span>CapCut</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">9:16</span>
            </div>
          </div>
        </motion.div>

        {/* Video editing grid — 3 clips */}
        {edits.map((v, i) => (
          <motion.figure
            key={v.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="glass lift group relative overflow-hidden rounded-3xl p-2"
          >
            <div className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl">
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${v.tint}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Play ticker */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                Live
              </div>

              {/* Title overlay */}
              <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-xl italic leading-none text-white">
                      {v.title}
                    </div>
                    <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-300">
                      {v.meta}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full border border-white/20 bg-white/10 p-1.5 text-white backdrop-blur transition-all group-hover:bg-white group-hover:text-black">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
