import { useLayoutEffect, useRef } from 'react';
import { gsap, isTouch } from '../lib/motion';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const stickers = [
  { src: '/fx/sticker-gym.webp', alt: 'Shipra at the gym, sticker', className: 'left-[40%] top-[4%] w-[140px] -rotate-6 md:w-[190px]' },
  { src: '/fx/sticker-peak.webp', alt: 'Shipra on a mountain, sticker', className: 'right-[6%] top-[2%] w-[170px] rotate-6 md:w-[240px]' },
];

/** Throwable photo stickers (Draggable + inertia); they tilt with throw speed. */
export function Stickers() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>('.sticker').forEach((el) => {
        const tilt = gsap.quickTo(el, 'rotation', { duration: 0.5, ease: 'power3' });
        Draggable.create(el, {
          type: 'x,y',
          inertia: true,
          bounds: root.current!.closest('section')!,
          edgeResistance: 0.7,
          onPress() {
            gsap.to(el, { scale: 1.08, duration: 0.2 });
          },
          onRelease() {
            gsap.to(el, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
          },
          onDrag() {
            tilt(gsap.utils.clamp(-25, 25, (InertiaPlugin.getVelocity(el, 'x') || 0) / 60));
          },
          onThrowUpdate() {
            tilt(gsap.utils.clamp(-25, 25, (InertiaPlugin.getVelocity(el, 'x') || 0) / 60));
          },
        });
        InertiaPlugin.track(el, 'x');
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="no-print pointer-events-none absolute inset-0 z-10" aria-hidden={isTouch() ? undefined : true}>
      {stickers.map((s) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          draggable={false}
          className={`sticker pointer-events-auto absolute select-none drop-shadow-xl ${s.className}`}
          data-cursor="throw"
        />
      ))}
    </div>
  );
}
