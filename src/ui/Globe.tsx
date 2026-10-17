import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Dotted globe (after the Payza template): points on a slowly turning
 * sphere, joined when close. Fills its parent; only animates on screen.
 */
export function Globe({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const cx = cv.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 180; i++) {
      const u = Math.random() * 2 - 1;
      const t = Math.random() * Math.PI * 2;
      pts.push([Math.sqrt(1 - u * u) * Math.cos(t), u, Math.sqrt(1 - u * u) * Math.sin(t)]);
    }
    let W = 0;
    let H = 0;
    const size = () => {
      W = cv.width = cv.clientWidth * dpr;
      H = cv.height = cv.clientHeight * dpr;
    };
    size();
    window.addEventListener('resize', size);

    let a = 0;
    let raf = 0;
    const draw = () => {
      a += 0.0016;
      cx.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.44;
      const ox = W / 2;
      const oy = H / 2;
      const P = pts.map(([x, y, z]) => {
        const X = x * Math.cos(a) - z * Math.sin(a);
        const Z = x * Math.sin(a) + z * Math.cos(a);
        return [ox + X * R, oy + y * R, Z] as const;
      });
      cx.lineWidth = dpr * 0.6;
      const near = R * 0.22;
      for (let i = 0; i < P.length; i++)
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
          if (d < near) {
            cx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - d / near) * ((P[i][2] + P[j][2]) / 4 + 0.6)})`;
            cx.beginPath();
            cx.moveTo(P[i][0], P[i][1]);
            cx.lineTo(P[j][0], P[j][1]);
            cx.stroke();
          }
        }
      P.forEach((p) => {
        cx.fillStyle = `rgba(255,255,255,${0.2 + (0.45 * (p[2] + 1)) / 2})`;
        cx.beginPath();
        cx.arc(p[0], p[1], dpr * (1 + (p[2] + 1) * 0.6), 0, 7);
        cx.fill();
      });
    };
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    // one still frame for reduced motion; otherwise spin only while visible
    if (prefersReducedMotion()) {
      draw();
      return () => window.removeEventListener('resize', size);
    }
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) loop();
    });
    io.observe(cv);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none print:hidden ${className}`} />;
}
