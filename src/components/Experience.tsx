import { motion } from 'framer-motion';
import { experience } from '../portfolioData';

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="mb-28 scroll-mt-16 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-bg/80 px-6 py-4 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Experience</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="section-label">Experience</span>
      </motion.div>

      <ol className="group/list relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-slate-800 to-transparent" aria-hidden="true" />
        {experience.map((job, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="relative mb-10 pl-8 last:mb-0"
          >
            <span className="absolute left-0 top-2 h-[14px] w-[14px] rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
            <div className="group relative rounded-2xl p-5 transition-all hover:bg-slate-900/40 hover:shadow-[0_1px_0_0_rgba(148,163,184,0.1)_inset]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{job.period}</p>
                {job.location && <p className="text-[10px] text-slate-600">{job.location}</p>}
              </div>
              <h3 className="mt-2 text-[17px] font-semibold leading-snug text-slate-100 group-hover:text-accent transition-colors">
                {job.role}
                <span className="text-slate-500"> · </span>
                <span className="text-slate-300">{job.company}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{job.summary}</p>
              <ul className="mt-3 list-none space-y-1.5 text-sm text-slate-400">
                {job.highlights.map((h, j) => (
                  <li key={j} className="flex">
                    <span className="mr-3 mt-[9px] block h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {job.stack.map((t) => (
                  <li key={t}>
                    <span className="chip">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
