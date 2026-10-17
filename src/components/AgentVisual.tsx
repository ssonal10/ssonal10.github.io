import { motion } from 'framer-motion';

/**
 * Animated agent architecture diagram for the GenAI hero card.
 * Shows LLM → router → Python compute handoff with flowing data pulses.
 */
export function AgentVisual() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[220px] w-[360px] -translate-x-1/2 -translate-y-1/2 md:block lg:h-[260px] lg:w-[420px]">
      <svg
        viewBox="0 0 340 220"
        fill="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="flowPath" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8f05a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8f63" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="nodeBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1917" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f0e0c" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8f05a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c8f05a" stopOpacity="0" />
          </radialGradient>
          {/* Pulse filter */}
          <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Background glow behind network */}
        <circle cx="170" cy="110" r="90" fill="url(#glow)" opacity="0.4" />

        {/* --- Connection lines --- */}
        {/* LLM → Router */}
        <motion.path
          d="M 60 50 Q 110 70 160 95"
          stroke="url(#flowPath)"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
        {/* Router → Python */}
        <motion.path
          d="M 185 120 Q 230 150 275 170"
          stroke="url(#flowPath)"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        />
        {/* Python → back to LLM (feedback loop) */}
        <motion.path
          d="M 275 150 Q 200 30 80 35"
          stroke="#c8f05a"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="2 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
        />

        {/* --- Flowing pulses along paths --- */}
        <motion.circle
          r="2.5"
          fill="#d4f56a"
          filter="url(#pulseGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 1.2 }}
          style={{ offsetPath: 'path("M 60 50 Q 110 70 160 95")' } as React.CSSProperties}
        />
        <motion.circle
          r="2.5"
          fill="#ffab85"
          filter="url(#pulseGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 1.8 }}
          style={{ offsetPath: 'path("M 185 120 Q 230 150 275 170")' } as React.CSSProperties}
        />

        {/* --- Node: LLM (top-left) --- */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <circle cx="50" cy="45" r="26" fill="url(#nodeBg)" stroke="#c8f05a" strokeWidth="1.2" strokeOpacity="0.55" />
          <circle cx="50" cy="45" r="26" fill="none" stroke="#c8f05a" strokeWidth="1" strokeOpacity="0.25">
            <animate attributeName="r" values="26;32;26" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.25;0;0.25" dur="2.8s" repeatCount="indefinite" />
          </circle>
          {/* Sparkle icon */}
          <g transform="translate(50 45)">
            <path d="M 0 -9 L 2 -2 L 9 0 L 2 2 L 0 9 L -2 2 L -9 0 L -2 -2 Z" fill="#d4f56a" opacity="0.95" />
            <circle cx="6" cy="-6" r="1.5" fill="#d4f56a" opacity="0.7" />
          </g>
          <text x="50" y="84" textAnchor="middle" fill="#b3ada2" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">LLM</text>
        </motion.g>

        {/* --- Node: Router (center) --- */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <rect x="146" y="96" width="40" height="40" rx="8" fill="url(#nodeBg)" stroke="#f3efe6" strokeWidth="1.2" strokeOpacity="0.5" />
          {/* Router icon — 3 chevrons */}
          <g transform="translate(166 116)" stroke="#f3efe6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M -6 -4 L -2 0 L -6 4" opacity="0.9" />
            <path d="M 0 -4 L 4 0 L 0 4" opacity="0.7" />
            <path d="M 6 -4 L 10 0 L 6 4" opacity="0.5" />
          </g>
          <text x="166" y="152" textAnchor="middle" fill="#b3ada2" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">ROUTE</text>
        </motion.g>

        {/* --- Node: Python/Compute (bottom-right) --- */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <circle cx="285" cy="170" r="26" fill="url(#nodeBg)" stroke="#ff8f63" strokeWidth="1.2" strokeOpacity="0.55" />
          <circle cx="285" cy="170" r="26" fill="none" stroke="#ff8f63" strokeWidth="1" strokeOpacity="0.25">
            <animate attributeName="r" values="26;32;26" dur="2.8s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.25;0;0.25" dur="2.8s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          {/* sigma / function symbol */}
          <text x="285" y="177" textAnchor="middle" fill="#ffab85" fontSize="22" fontFamily="serif" fontStyle="italic" fontWeight="500">ƒ</text>
          <text x="285" y="209" textAnchor="middle" fill="#b3ada2" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">PYTHON</text>
        </motion.g>

        {/* --- 150× speed badge, orbiting --- */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -4; 0 0"
              dur="3s"
              repeatCount="indefinite"
            />
            <rect x="206" y="20" width="126" height="36" rx="18" fill="url(#nodeBg)" stroke="#c8f05a" strokeWidth="1.2" strokeOpacity="0.6" />
            <text x="222" y="43" fill="#d4f56a" fontSize="17" fontFamily="serif" fontStyle="italic" fontWeight="500">minutes</text>
            <text x="282" y="41" fill="#b3ada2" fontSize="8" fontFamily="monospace" letterSpacing="0.12em">NOT WEEKS</text>
          </g>
        </motion.g>

        {/* --- Status ticker bottom-left --- */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <circle cx="18" cy="180" r="3" fill="#d4f56a">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="28" y="184" fill="#8f8a84" fontSize="8.5" fontFamily="monospace" letterSpacing="0.15em">agent.live</text>
        </motion.g>
      </svg>
    </div>
  );
}
