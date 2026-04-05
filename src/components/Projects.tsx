import { motion } from 'framer-motion';
import { projects } from '../portfolioData';
import { AgentVisual } from './AgentVisual';

const sizeMap: Record<string, string> = {
  lg: 'md:col-span-2 md:row-span-2 min-h-[340px]',
  md: 'md:col-span-2 min-h-[200px]',
  sm: 'md:col-span-1 min-h-[200px]',
};

export function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="mb-28 scroll-mt-16 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-bg/80 px-6 py-4 backdrop-blur-md md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Projects</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <span className="section-label">Featured work</span>
          <h3 className="mt-3 font-serif text-4xl leading-tight text-slate-100">
            Shipped, measured, <span className="italic text-gradient">loved.</span>
          </h3>
        </div>
      </motion.div>

      <div className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((p, i) => {
          const isHero = p.accent;
          const Wrapper = isHero ? 'div' : 'div';
          return (
            <motion.a
              key={p.title}
              href={p.link ?? '#'}
              target={p.link ? '_blank' : undefined}
              rel={p.link ? 'noreferrer noopener' : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl ${sizeMap[p.size]} ${isHero ? 'conic-border' : ''}`}
            >
              <Wrapper className="glass relative flex h-full flex-col justify-between rounded-2xl p-6">
                {isHero && (
                  <>
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.45), transparent 65%)' }}
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
                      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 65%)' }}
                      aria-hidden="true"
                    />
                    <AgentVisual />
                  </>
                )}

                <div className="relative">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      / {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.link && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </div>
                  <h3
                    className={`font-semibold text-slate-100 transition-colors group-hover:text-accent ${
                      isHero ? 'font-serif text-3xl leading-[1.1]' : 'text-[17px] leading-snug'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p className={`mt-3 leading-relaxed text-slate-400 ${isHero ? 'text-[15px]' : 'text-[13.5px]'}`}>
                    {p.context}
                  </p>
                </div>

                <div className="relative mt-5">
                  <div className="mb-4 flex items-start gap-2">
                    <span className="dot mt-[7px] shrink-0" />
                    <p className={`font-semibold text-accent ${isHero ? 'text-[17px]' : 'text-sm'}`}>{p.impact}</p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                    {p.stack.map((s) => (
                      <li key={s}>
                        <span className="chip">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Wrapper>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
