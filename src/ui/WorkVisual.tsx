import type { Work } from '../data';

/**
 * Generative backdrops for the work list, one per project. Pure SVG so they
 * stay crisp and weigh nothing; light CSS animation keeps them alive.
 * They are abstract on purpose: no screenshots of internal tools.
 */

const LIME = '#c8f05a';
const GLACIER = '#5cc8c2';
const PAPER = '#f3efe6';

// deterministic pseudo random, so the art is the same on every load
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
}

function Agent() {
  const r = rng(3);
  const cells = Array.from({ length: 14 * 8 }, (_, i) => ({
    x: 120 + (i % 14) * 100,
    y: 140 + Math.floor(i / 14) * 95,
    v: (r() * 999).toFixed(r() > 0.5 ? 2 : 0),
    on: r() > 0.82,
  }));
  return (
    <g>
      {cells.map((c, i) => (
        <text
          key={i}
          x={c.x}
          y={c.y}
          fill={c.on ? LIME : PAPER}
          opacity={c.on ? 0.95 : 0.16}
          fontFamily="JetBrains Mono"
          fontSize="22"
          className={c.on ? 'wv-blink' : undefined}
          style={{ animationDelay: `${(i % 9) * 0.3}s` }}
        >
          {c.v}
        </text>
      ))}
      <circle cx="800" cy="500" r="150" fill="none" stroke={LIME} strokeWidth="2" opacity="0.6" />
      <text x="800" y="540" textAnchor="middle" fill={LIME} fontFamily="Instrument Serif" fontStyle="italic" fontSize="140">
        ƒ(x)
      </text>
    </g>
  );
}

function Sentinel() {
  const pts = [
    [520, 330], [1080, 300], [1180, 650], [600, 720], [820, 220],
  ];
  return (
    <g>
      {[110, 220, 330, 440].map((r) => (
        <circle key={r} cx="800" cy="500" r={r} fill="none" stroke={GLACIER} strokeWidth="1.5" opacity="0.35" />
      ))}
      <g className="wv-spin" style={{ transformOrigin: '800px 500px' }}>
        <path d="M800 500 L800 60 A440 440 0 0 1 1180 280 Z" fill={`url(#sweep)`} />
      </g>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <line x1="800" y1="500" x2={x} y2={y} stroke={PAPER} strokeOpacity="0.2" strokeDasharray="4 8" />
          <circle cx={x} cy={y} r="14" fill={PAPER} className="wv-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      <circle cx="800" cy="500" r="40" fill={LIME} />
      <path d="M782 500 l12 13 l24 -28" fill="none" stroke="#0b0b09" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Activation() {
  const r = rng(11);
  let a = 300;
  let b = 300;
  const ctrl: string[] = [];
  const test: string[] = [];
  for (let i = 0; i <= 26; i++) {
    a += (r() - 0.48) * 22;
    b += (r() - 0.48) * 22 - (i > 8 ? 13 : 0);
    ctrl.push(`${100 + i * 54},${a + 300}`);
    test.push(`${100 + i * 54},${b + 300}`);
  }
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="100" x2="1500" y1={180 + i * 85} y2={180 + i * 85} stroke={PAPER} strokeOpacity="0.08" />
      ))}
      <line x1="532" x2="532" y1="140" y2="900" stroke={PAPER} strokeOpacity="0.4" strokeDasharray="6 10" />
      <polyline points={ctrl.join(' ')} fill="none" stroke={PAPER} strokeOpacity="0.5" strokeWidth="4" />
      <polyline points={test.join(' ')} fill="none" stroke={LIME} strokeWidth="6" className="wv-draw" pathLength={1} />
      <text x="1510" y={Number(test[26].split(',')[1]) + 8} fill={LIME} fontFamily="JetBrains Mono" fontSize="26">
        test
      </text>
      <text x="1510" y={Number(ctrl[26].split(',')[1]) + 8} fill={PAPER} opacity="0.6" fontFamily="JetBrains Mono" fontSize="26">
        control
      </text>
    </g>
  );
}

function Futures() {
  const r = rng(29);
  let p = 500;
  const candles = Array.from({ length: 46 }, (_, i) => {
    const o = p;
    p += (r() - 0.5) * 60;
    const c = p;
    const hi = Math.min(o, c) - r() * 30;
    const lo = Math.max(o, c) + r() * 30;
    return { x: 120 + i * 30, o, c, hi, lo };
  });
  return (
    <g>
      {candles.map((k, i) => (
        <g key={i} opacity="0.85">
          <line x1={k.x} x2={k.x} y1={k.hi} y2={k.lo} stroke={PAPER} strokeOpacity="0.5" />
          <rect
            x={k.x - 9}
            y={Math.min(k.o, k.c)}
            width="18"
            height={Math.max(3, Math.abs(k.c - k.o))}
            fill={k.c < k.o ? GLACIER : '#ff5a4e'}
          />
        </g>
      ))}
      <line x1="100" x2="1500" y1="500" y2="500" stroke={LIME} strokeWidth="3" strokeDasharray="14 10" />
      <text x="1500" y="485" textAnchor="end" fill={LIME} fontFamily="JetBrains Mono" fontSize="26">
        costs
      </text>
    </g>
  );
}

function Finance() {
  const parts = [0.34, 0.22, 0.17, 0.12, 0.09, 0.06];
  const colors = [LIME, GLACIER, PAPER, '#ffab85', '#8f8a84', '#47443f'];
  const R = 300;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <g transform="translate(800 500) rotate(-90)">
      {parts.map((p, i) => {
        const el = (
          <circle
            key={i}
            r={R}
            fill="none"
            stroke={colors[i]}
            strokeWidth="110"
            strokeDasharray={`${p * C - 6} ${C}`}
            strokeDashoffset={-acc * C}
          />
        );
        acc += p;
        return el;
      })}
    </g>
  );
}

function Classifier() {
  const r = rng(5);
  const n = 8;
  return (
    <g transform="translate(400 100)">
      {Array.from({ length: n * n }, (_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const v = x === y ? 0.75 + r() * 0.25 : r() * 0.18;
        return (
          <rect key={i} x={x * 100} y={y * 100} width="94" height="94" rx="8" fill={x === y ? LIME : GLACIER} opacity={v} />
        );
      })}
    </g>
  );
}

const map = { agent: Agent, sentinel: Sentinel, activation: Activation, futures: Futures, finance: Finance, classifier: Classifier };

export function WorkVisual({ kind }: { kind: Work['visual'] }) {
  const V = map[kind];
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="sweep" cx="800" cy="500" r="440" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={GLACIER} stopOpacity="0" />
          <stop offset="1" stopColor={GLACIER} stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="#0b0b09" />
      <V />
    </svg>
  );
}
