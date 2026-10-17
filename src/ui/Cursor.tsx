import { useEffect, useRef, useState } from 'react';
import { isTouch, prefersReducedMotion } from '../lib/motion';

/**
 * Unseen-style cursor: a dot plus a lagging ring that squeezes along its
 * direction of travel. Uses mix-blend-mode difference so it inverts over
 * light sections. Elements can set data-cursor="label" to grow the ring and
 * show a word. Hidden on touch screens.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [enabled] = useState(() => !isTouch());

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const reduce = prefersReducedMotion();
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const d = { ...mouse };
    const r = { ...mouse };
    let raf = 0;

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]');
      setActive(Boolean(t));
      setLabel(t?.dataset.cursor ?? '');
    };

    const tick = () => {
      d.x += (mouse.x - d.x) * 0.5;
      d.y += (mouse.y - d.y) * 0.5;
      r.x += (mouse.x - r.x) * 0.18;
      r.y += (mouse.y - r.y) * 0.18;
      const dx = mouse.x - r.x;
      const dy = mouse.y - r.y;
      const s = reduce ? 0 : Math.min(Math.hypot(dx, dy) / 200, 0.55);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (dot.current) dot.current.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + s}, ${1 - s})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`flex items-center justify-center rounded-full border border-white transition-[width,height,background-color] duration-300 ease-out ${
            active ? (label ? 'h-20 w-20 bg-white' : 'h-14 w-14') : 'h-9 w-9'
          }`}
        >
          {label && <span className="label !text-[10px] !tracking-[0.12em] text-black">{label}</span>}
        </div>
      </div>
      <div
        ref={dot}
        className={`absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-white transition-opacity ${active ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
