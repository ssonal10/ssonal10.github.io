import { useLayoutEffect, useRef } from 'react';
import { gsap, isTouch } from '../lib/motion';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const stickers = [
  { src: '/fx/sticker-me.webp', alt: 'Shipra in sunglasses, sticker', className: 'left-[40%] top-[4%] w-[140px] -rotate-6 md:w-[190px]' },
  { src: '/fx/sticker-peak.webp', alt: 'Shipra on a mountain, sticker', className: 'right-[6%] top-[2%] w-[170px] rotate-6 md:w-[240px]' },
];

/** Throwable photo stickers (Draggable + inertia); they tilt with throw speed. */
export function Stickers() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // touch: stickers stay put so they never block thumb scrolling
    if (isTouch()) return;
    const els = Array.from(root.current!.querySelectorAll<HTMLElement>('.sticker'));
    const drags = els.flatMap((el) => {
      const tilt = gsap.quickTo(el, 'rotation', { duration: 0.5, ease: 'power3' });
      InertiaPlugin.track(el, 'x');
      const lean = () => {
        tilt(gsap.utils.clamp(-25, 25, (InertiaPlugin.getVelocity(el, 'x') || 0) / 60));
      };
      return Draggable.create(el, {
        type: 'x,y',
        inertia: true,
        bounds: root.current!.closest('section')!,
        edgeResistance: 0.7,
        onPress: () => {
          gsap.to(el, { scale: 1.08, duration: 0.2 });
        },
        onRelease: () => {
          gsap.to(el, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        },
        onDrag: lean,
        onThrowUpdate: lean,
      });
    });
    // explicit cleanup: gsap.context does not revert Draggables (StrictMode would double them)
    return () => {
      drags.forEach((d) => d.kill());
      els.forEach((el) => {
        InertiaPlugin.untrack(el);
        gsap.killTweensOf(el);
      });
    };
  }, []);

  return (
    <div ref={root} className="no-print pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {stickers.map((s) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          draggable={false}
          className={`sticker absolute select-none drop-shadow-xl ${isTouch() ? 'pointer-events-none' : 'pointer-events-auto'} ${s.className}`}
          data-cursor="throw"
        />
      ))}
    </div>
  );
}
