import { motion } from 'framer-motion';
import { navLinks, profile } from '../portfolioData';

export function TopNav({ activeId }: { activeId: string }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
    >
      <div className="glass flex w-full max-w-3xl items-center justify-between gap-2 rounded-full px-2 py-2 pr-2">
        {/* Monogram */}
        <a
          href="#top"
          className="group flex items-center gap-2 rounded-full pl-3 pr-2 py-1 transition-colors"
          aria-label="Home"
        >
          <span
            className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-slate-900"
            style={{
              background:
                'conic-gradient(from 140deg, #10b981, #8b5cf6, #f43f5e, #10b981)',
            }}
          >
            <span className="absolute inset-[2px] rounded-full bg-bg" />
            <span className="relative bg-gradient-to-br from-emerald-300 to-violet-300 bg-clip-text text-transparent">SS</span>
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:inline">
            Shipra
          </span>
        </a>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5 text-[13px]">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative rounded-full px-3 py-1.5 transition-colors duration-200 ${
                  isActive ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-slate-100/10 ring-1 ring-inset ring-emerald-400/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href={profile.socials.email}
          className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-emerald-400/90 to-emerald-500/90 px-3.5 py-1.5 text-[12px] font-semibold text-emerald-950 shadow-[0_0_24px_-4px_rgba(16,185,129,0.55)] transition-all hover:from-emerald-300 hover:to-emerald-400 sm:inline-flex"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-950 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-950" />
          </span>
          Let's talk
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}
