import { motion } from 'framer-motion';
import { profile } from '../portfolioData';

const stats = [
  { value: '9+', label: 'Years in data' },
  { value: '150×', label: 'GenAI agent speedup' },
  { value: '1B+', label: 'Daily records processed' },
  { value: '50+', label: 'Countries in prod' },
];

export function About() {
  return (
    <section id="about" aria-label="About" className="mb-28 scroll-mt-16 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-bg/80 px-6 py-4 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">About</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="section-label">About</span>
      </motion.div>

      <div className="space-y-5 text-[15px] leading-[1.75] text-slate-400">
        {profile.about.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl p-4">
            <div className="font-serif text-3xl italic text-gradient">{s.value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
