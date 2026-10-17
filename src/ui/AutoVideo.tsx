import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/** Muted loop that only plays while at least 40% visible; poster otherwise. */
export function AutoVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const poster = src.replace('/video/', '/video/posters/').replace('.mp4', '.jpg');

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className={className} />;
}
