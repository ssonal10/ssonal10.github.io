import { motion } from 'framer-motion';
import { skillTiers } from '../portfolioData';

const marqueeItems = [
  'Python', 'PySpark', 'SQL', 'AWS Bedrock', 'Lambda', 'Glue', 'Athena', 'Delta Lake',
  'Airflow', 'NumPy', 'XGBoost', 'QuickSight', 'Tableau', 'CDK', 'GenAI Agents', 'NLP',
];

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="mb-28 scroll-mt-16 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-bg/80 px-6 py-4 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Skills</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="section-label">Stack</span>
      </motion.div>

      <div className="space-y-4">
        {skillTiers.map((tier, i) => (
          <motion.div
            key={tier.tier}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="glass rounded-2xl p-5 lift"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{tier.tier}</h3>
              <span className="font-mono text-[10px] text-slate-600">/ {String(i + 1).padStart(2, '0')}</span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {tier.items.map((item) => (
                <li key={item}><span className="chip">{item}</span></li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="marquee-mask mt-8 overflow-hidden py-3">
        <div className="marquee-track gap-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="chip shrink-0">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
