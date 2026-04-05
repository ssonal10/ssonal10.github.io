import { motion } from 'framer-motion';
import { profile, navLinks } from '../portfolioData';

type Props = { activeId: string };

export function Sidebar({ activeId }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 inline-block"
        >
          <div className="group relative h-24 w-24 rounded-full p-[2px]" style={{ background: 'conic-gradient(from 140deg, #10b981, #8b5cf6, #f43f5e, #10b981)' }}>
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-bg">
              {/* Replace src with your photo path: /src/assets/shipra.jpg or public URL */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 font-serif text-3xl italic text-slate-500 transition-colors group-hover:text-accent">
                SS
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-bg bg-accent shadow-[0_0_12px_rgba(16,185,129,0.9)]" aria-label="Available" />
          </div>
        </motion.div>

        <h1 className="font-serif text-[64px] leading-[0.95] tracking-tight text-slate-100 sm:text-[76px]">
          {profile.name.split(' ')[0]}{' '}
          <span className="italic text-gradient">{profile.name.split(' ')[1]}</span>
        </h1>

        <h2 className="mt-4 font-mono text-[13px] uppercase tracking-[0.2em] text-slate-400">
          {profile.title}
        </h2>
        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-400">
          {profile.tagline}
        </p>

        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-14 w-max">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="group flex items-center py-3">
                    <span
                      className={`mr-4 h-px transition-all duration-300 ${
                        isActive
                          ? 'w-16 bg-gradient-to-r from-accent to-transparent'
                          : 'w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400'
                      }`}
                    />
                    <span
                      className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                        isActive ? 'text-accent' : 'text-slate-500 group-hover:text-slate-200'
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="ml-1 mt-12 flex items-center gap-4" aria-label="Social media">
        {[
          {
            href: profile.socials.github,
            label: 'GitHub',
            path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z',
          },
          {
            href: profile.socials.linkedin,
            label: 'LinkedIn',
            path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
          },
        ].map((s) => (
          <li key={s.label}>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          </li>
        ))}
        <li>
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
            href={profile.socials.email}
            aria-label="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
            </svg>
          </a>
        </li>
        <li className="ml-auto">
          <a
            href={profile.socials.email}
            className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-bg"
          >
            Get in touch
            <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </li>
      </ul>
    </motion.header>
  );
}
