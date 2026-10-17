import { motion } from 'framer-motion';
import { recognition } from '../portfolioData';

export function Recognition() {
  return (
    <section aria-label="Recognition" className="mb-28">
      <span className="section-label">Recognition</span>
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {recognition.map((r, i) => (
          <motion.li
            key={r.v}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass lift rounded-2xl p-5"
          >
            <div className="font-serif text-4xl italic text-gradient">{r.k}</div>
            <p className="mt-2 text-sm text-slate-200">{r.v}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">{r.d}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
