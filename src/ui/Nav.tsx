import { scrollToId } from '../lib/motion';
import { profile } from '../data';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'notes', label: 'Design notes' },
  { id: 'path', label: 'Path' },
  { id: 'life', label: 'Life' },
  { id: 'contact', label: 'Contact' },
];

/** Obys-style nav: plain mono links in difference blend, so it reads on any section. */
export function Nav({ onReplay }: { onReplay: () => void }) {
  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 flex items-center justify-between p-5 text-white mix-blend-difference sm:p-8">
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('top');
        }}
        className="font-display text-lg font-extrabold tracking-tight"
        data-cursor="top"
      >
        S<span className="text-lime">@</span>S
      </a>
      <nav aria-label="Sections" className="flex items-center gap-4 sm:gap-7">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(l.id);
            }}
            className={`label group relative ${l.id === 'notes' || l.id === 'path' ? 'hidden md:inline' : ''}`}
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <button type="button" onClick={onReplay} className="label hidden text-lime lg:inline" data-cursor="play">
          ▶ game
        </button>
        <a href={`mailto:${profile.email}`} className="sr-only">
          Email
        </a>
      </nav>
    </header>
  );
}
