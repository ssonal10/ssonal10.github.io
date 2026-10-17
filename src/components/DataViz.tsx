import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, animate } from 'framer-motion';

/* ============================================================
   Animated count-up number (with spring)
============================================================ */
function AnimatedNumber({ value, decimals = 0, prefix = '', suffix = '' }: {
  value: number; decimals?: number; prefix?: string; suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ============================================================
   Sparkline (smooth SVG area + stroke, animated draw-in)
============================================================ */
function Sparkline({ data, color = '#c8f05a', width = 220, height = 64 }: {
  data: number[]; color?: string; width?: number; height?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return [x, y] as const;
  });

  // Smooth cubic path
  const path = points.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = points[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, '');

  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;
  const gradId = `spark-grad-${color.replace('#', '')}`;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
      />
      {isInView && (
        <motion.circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="3.5"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      )}
    </svg>
  );
}

/* ============================================================
   Mini bar chart (stagger-in bars)
============================================================ */
function MiniBars({ data, color = '#c8f05a', height = 64 }: {
  data: number[]; color?: string; height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const max = Math.max(...data);

  return (
    <div ref={ref} className="flex items-end gap-1.5" style={{ height }}>
      {data.map((v, i) => {
        const h = (v / max) * 100;
        return (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, ${color}55 100%)`,
              boxShadow: `0 0 8px ${color}66`,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: `${h}%`, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.2, 0.8, 0.2, 1] }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   Radial progress ring
============================================================ */
function RadialRing({ value, size = 88, stroke = 6, color = '#c8f05a' }: {
  value: number; size?: number; stroke?: number; color?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const spring = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  const [offset, setOffset] = useState(c);
  useEffect(() => {
    const unsub = spring.on('change', (v) => setOffset(c - (v / 100) * c));
    return unsub;
  }, [spring, c]);

  return (
    <svg ref={ref} width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(179,173,162,0.15)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 0.1s linear' }}
      />
    </svg>
  );
}

/* ============================================================
   Section
============================================================ */
const membersData = [0.4, 0.7, 1.1, 1.6, 2.2, 2.9, 3.5, 4.1, 4.8, 5.4, 6.1, 6.6, 7];
const modelWeeks = [100, 92, 80, 64, 46, 28, 14, 6, 2, 1];
const sentinelBars = [100, 70, 44, 26, 12, 4, 1];

type CardProps = { label: string; chip: string; delay: number; children: React.ReactNode };

function Card({ label, chip, delay, children }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className="glass lift cursor-default rounded-2xl p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</span>
        <span className="chip chip-accent">{chip}</span>
      </div>
      {children}
    </motion.div>
  );
}

export function DataViz() {
  return (
    <section id="impact" aria-label="Impact by the numbers" className="mb-28 scroll-mt-16 lg:scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="section-label">By the numbers</span>
        <h3 className="mt-3 font-serif text-4xl leading-tight text-slate-100">
          Numbers that <span className="italic text-gradient">move strategy.</span>
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label="Deal-modeling agent" chip="launched" delay={0}>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-5xl text-gradient">minutes</span>
            <span className="text-xs text-slate-400">not weeks, per deal model</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">About 6 months of manual modeling replaced in its first week.</p>
          <div className="mt-4">
            <MiniBars data={modelWeeks} color="#c8f05a" />
          </div>
        </Card>

        <Card label="Auto-activation" chip="13 partners" delay={0.08}>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-5xl text-gradient">
              <AnimatedNumber value={7} suffix="M" />
            </span>
            <span className="text-xs text-slate-400">new active members, 5.5M engaged</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Measurement framework built in about a week; VPs approved the expansion on it.</p>
          <div className="mt-4">
            <Sparkline data={membersData} color="#c8f05a" width={280} height={64} />
          </div>
        </Card>

        <Card label="CX insight · drop-off" chip="changed the plan" delay={0.16}>
          <div className="mt-3 flex items-center gap-5">
            <div className="relative">
              <RadialRing value={96} size={96} stroke={7} color="#c8f05a" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-2xl text-gradient">
                  <AnimatedNumber value={96} suffix="%" />
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Lost before activation started</p>
              <p className="mt-1 text-xs text-slate-400">That finding moved the 2024 plan toward same-store growth.</p>
            </div>
          </div>
        </Card>

        <Card label="Sentinel · ad-hoc questions" chip="multi-agent" delay={0.24}>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-5xl text-gradient">
              <AnimatedNumber value={10} suffix=" min" />
            </span>
            <span className="text-xs text-slate-400">was about 10 days</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Built alone on Claude Code: 19 scheduled jobs, 5 specialists and a validator.</p>
          <div className="mt-4">
            <MiniBars data={sentinelBars} color="#ff8f63" />
          </div>
        </Card>
      </div>
    </section>
  );
}
