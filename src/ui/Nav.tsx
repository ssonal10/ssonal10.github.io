import { scrollToId } from '../lib/motion';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'path', label: 'Path' },
  { id: 'life', label: 'Life' },
  { id: 'contact', label: 'Contact' },
];

/** Obys-style nav: plain mono links; colour follows the page theme (ink on the paper section). */
export function Nav({ onReplay }: { onReplay: () => void }) {
  return (
    <>
      {/* logo keeps its colours (themed); the links blend so they read on any photo */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('top');
        }}
        className="site-nav no-print fixed left-5 top-5 z-50 font-display text-lg font-extrabold tracking-tight text-paper transition-colors duration-500 sm:left-8 sm:top-8"
        data-cursor="top"
      >
        S<span className="text-lime [text-shadow:0_0_1px_currentColor]">@</span>S
      </a>
      <nav
        aria-label="Sections"
        className="no-print fixed right-5 top-5 z-50 flex items-center gap-4 text-white mix-blend-difference sm:right-8 sm:top-8 sm:gap-7"
      >
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(l.id);
            }}
            className={`label group relative ${l.id === 'path' ? 'hidden md:inline' : ''}`}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <button type="button" onClick={onReplay} className="label hidden lg:inline" data-cursor="play">
          ▶ game
        </button>
      </nav>
    </>
  );
}
