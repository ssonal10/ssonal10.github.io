import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';

/**
 * Big type band that drifts on its own and speeds up / reverses with scroll
 * velocity (The Weirdos / Lando Norris style rows).
 */
function Row({ items, baseVelocity, outline }: { items: string[]; baseVelocity: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-1500, 0, 1500], [-6, 0, 6]);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const text = [...items, ...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX: skew }} className="flex shrink-0 gap-10 pr-10">
        {text.map((t, i) => (
          <span
            key={i}
            className={`font-display text-[13vw] leading-[1.05] md:text-[8vw] ${
              outline
                ? 'italic text-transparent [-webkit-text-stroke:1px_rgba(243,239,230,0.45)]'
                : 'text-slate-100'
            }`}
          >
            {t}
            <span className="mx-6 align-middle text-[0.4em] text-emerald-400">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityMarquee() {
  return (
    <section aria-hidden="true" className="relative z-10 -mt-[10vh] select-none py-10">
      <Row items={['LLM agents', 'Data platforms', 'Measurement']} baseVelocity={-2} />
      <Row items={['Experimentation', 'Causal inference', 'Team of four']} baseVelocity={2} outline />
    </section>
  );
}
