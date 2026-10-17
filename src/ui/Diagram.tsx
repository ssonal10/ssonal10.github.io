/**
 * Small architecture-diagram renderer for the design notes. Boxes and
 * flowing edges in SVG, generic AWS-style shapes, no internal names.
 */

type Tone = 'plain' | 'lime' | 'solid' | 'glacier' | 'ghost';
type Node = { id: string; x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: Tone };
type Edge = { from: string; to: string; label?: string; dashed?: boolean; loop?: boolean };
export type DiagramSpec = { nodes: Node[]; edges: Edge[] };

type Palette = Record<Tone, { fill: string; stroke: string; text: string; sub: string }>;

const tones: Palette = {
  plain: { fill: 'rgba(243,239,230,0.04)', stroke: 'rgba(243,239,230,0.35)', text: '#f3efe6', sub: '#8f8a84' },
  lime: { fill: 'rgba(200,240,90,0.08)', stroke: '#c8f05a', text: '#c8f05a', sub: '#b3ada2' },
  solid: { fill: '#c8f05a', stroke: '#c8f05a', text: '#0b0b09', sub: '#2a2825' },
  glacier: { fill: 'rgba(92,200,194,0.1)', stroke: '#5cc8c2', text: '#5cc8c2', sub: '#8f8a84' },
  ghost: { fill: 'transparent', stroke: 'rgba(243,239,230,0.2)', text: '#f3efe6', sub: '#8f8a84' },
};

// same roles on paper: green for lime, teal for glacier, ink lines
const GREEN = '#2f6b1f';
const lightTones: Palette = {
  plain: { fill: 'rgba(11,11,9,0.03)', stroke: 'rgba(11,11,9,0.35)', text: '#0b0b09', sub: '#6b665f' },
  lime: { fill: 'rgba(47,107,31,0.08)', stroke: GREEN, text: GREEN, sub: '#6b665f' },
  solid: { fill: GREEN, stroke: GREEN, text: '#f3efe6', sub: '#d9e6cf' },
  glacier: { fill: 'rgba(31,122,116,0.08)', stroke: '#1f7a74', text: '#1f7a74', sub: '#6b665f' },
  ghost: { fill: 'transparent', stroke: 'rgba(11,11,9,0.22)', text: '#0b0b09', sub: '#6b665f' },
};

// colors from CSS variables on an ancestor (--fg, --accent, --accent2, --on)
const mix = (v: string, pct: number) => `color-mix(in srgb, var(${v}) ${pct}%, transparent)`;
const varTones: Palette = {
  plain: { fill: mix('--fg', 5), stroke: mix('--fg', 30), text: 'var(--fg)', sub: mix('--fg', 55) },
  lime: { fill: mix('--accent', 12), stroke: 'var(--accent)', text: 'var(--accent)', sub: mix('--fg', 55) },
  solid: { fill: 'var(--accent)', stroke: 'var(--accent)', text: 'var(--on)', sub: mix('--on', 75) },
  glacier: { fill: mix('--accent2', 12), stroke: 'var(--accent2)', text: 'var(--accent2)', sub: mix('--fg', 55) },
  ghost: { fill: 'transparent', stroke: mix('--fg', 20), text: 'var(--fg)', sub: mix('--fg', 55) },
};

function anchor(a: Node, b: Node) {
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + b.h / 2;
  const dx = bx - ax;
  const dy = by - ay;
  if (Math.abs(dx) > Math.abs(dy) * 0.6) {
    const s = Math.sign(dx);
    return { x1: ax + (s * a.w) / 2, y1: ay, x2: bx - (s * b.w) / 2, y2: by, horiz: true };
  }
  const s = Math.sign(dy);
  return { x1: ax, y1: ay + (s * a.h) / 2, x2: bx, y2: by - (s * b.h) / 2, horiz: false };
}

function edgePath(a: Node, b: Node, loop?: boolean) {
  if (loop) {
    // route under both nodes and back
    const x1 = a.x + a.w / 2;
    const y1 = a.y + a.h;
    const x2 = b.x + b.w / 2;
    const y2 = b.y + b.h;
    const low = Math.max(y1, y2) + 50;
    return `M${x1} ${y1} C${x1} ${low}, ${x2} ${low}, ${x2} ${y2}`;
  }
  const { x1, y1, x2, y2, horiz } = anchor(a, b);
  if (horiz) {
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  }
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

export function Diagram({
  spec,
  title,
  light = false,
  themed = false,
}: {
  spec: DiagramSpec;
  title: string;
  light?: boolean;
  themed?: boolean;
}) {
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  const pal = themed ? varTones : light ? lightTones : tones;
  const accent = themed ? 'var(--accent)' : light ? GREEN : '#c8f05a';
  const base = themed ? mix('--fg', 14) : light ? 'rgba(11,11,9,0.14)' : 'rgba(243,239,230,0.18)';
  const arrow = themed ? 'arrow-themed' : light ? 'arrow-light' : 'arrow';
  return (
    <svg viewBox="0 0 1000 560" className="h-auto w-full" role="img" aria-label={`Architecture: ${title}`}>
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style={{ fill: accent }} />
        </marker>
      </defs>
      {spec.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        const d = edgePath(a, b, e.loop);
        return (
          <g key={i} className="dg-edge">
            <path d={d} fill="none" style={{ stroke: base }} strokeWidth="2" className="dg-base" />
            <path
              d={d}
              fill="none"
              style={{ stroke: accent }}
              strokeWidth="2"
              className={e.dashed ? 'dg-live' : 'flow dg-live'}
              strokeDasharray={e.dashed ? '3 7' : undefined}
              markerEnd={`url(#${arrow})`}
              opacity={e.dashed ? 0.5 : 0.9}
            />
          </g>
        );
      })}
      {spec.nodes.map((n) => {
        const t = pal[n.tone ?? 'plain'];
        return (
          <g key={n.id} className="dg-node" style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="12" style={{ fill: t.fill, stroke: t.stroke }} strokeWidth="1.5" />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + (n.sub ? -5 : 7)}
              textAnchor="middle"
              style={{ fill: t.text }}
              fontFamily={themed ? 'Inter' : 'Bricolage Grotesque'}
              fontWeight="700"
              fontSize="21"
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 + 19}
                textAnchor="middle"
                style={{ fill: t.sub }}
                fontFamily="JetBrains Mono"
                fontSize="13"
              >
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export type DiagramKey = 'agent' | 'sentinel' | 'measure' | 'deepdive' | 'dealmodel' | 'funnel' | 'futures' | 'spend';

export const diagrams: Record<DiagramKey, DiagramSpec> = {
  agent: {
    nodes: [
      { id: 'leader', x: 10, y: 245, w: 150, h: 70, label: 'Leader', sub: 'asks for a model' },
      { id: 'auth', x: 200, y: 245, w: 165, h: 70, label: 'Chat + IAM', sub: 'per-exec access' },
      { id: 'router', x: 410, y: 235, w: 190, h: 90, label: 'LLM router', sub: 'Strands · AgentCore', tone: 'lime' },
      { id: 'engine', x: 660, y: 235, w: 200, h: 90, label: 'Python engine', sub: 'computes every number', tone: 'solid' },
      { id: 'sources', x: 660, y: 50, w: 200, h: 80, label: '20+ live sources', sub: 'S3 · Athena', tone: 'glacier' },
      { id: 'gates', x: 660, y: 430, w: 200, h: 70, label: 'Validation gates', sub: 'tests on every run' },
      { id: 'dash', x: 410, y: 430, w: 190, h: 70, label: 'Dashboard', sub: 'one per run' },
    ],
    edges: [
      { from: 'leader', to: 'auth' },
      { from: 'auth', to: 'router' },
      { from: 'router', to: 'engine', label: 'tool call' },
      { from: 'sources', to: 'engine' },
      { from: 'engine', to: 'gates' },
      { from: 'gates', to: 'dash' },
      { from: 'dash', to: 'leader', dashed: true, loop: true },
    ],
  },
  sentinel: {
    nodes: [
      { id: 'ask', x: 10, y: 200, w: 150, h: 70, label: 'Slack ask', sub: 'any teammate' },
      { id: 'cron', x: 10, y: 330, w: 150, h: 70, label: '19 jobs', sub: 'scheduled' },
      { id: 'orch', x: 195, y: 235, w: 185, h: 90, label: 'Orchestrator', sub: 'Claude Code', tone: 'lime' },
      { id: 's1', x: 440, y: 30, w: 150, h: 60, label: 'Slack', sub: 'read-only', tone: 'ghost' },
      { id: 's2', x: 440, y: 130, w: 150, h: 60, label: 'Tickets', sub: 'read-only', tone: 'ghost' },
      { id: 's3', x: 440, y: 230, w: 150, h: 60, label: 'Docs', sub: 'read-only', tone: 'ghost' },
      { id: 's4', x: 440, y: 330, w: 150, h: 60, label: 'Email', sub: 'read-only', tone: 'ghost' },
      { id: 's5', x: 440, y: 430, w: 150, h: 60, label: 'Code', sub: 'read-only', tone: 'ghost' },
      { id: 'kb', x: 640, y: 40, w: 180, h: 70, label: 'Knowledge base', sub: '1,995 concepts', tone: 'glacier' },
      { id: 'val', x: 640, y: 235, w: 180, h: 90, label: 'Validator', sub: 'checks claims', tone: 'solid' },
      { id: 'human', x: 850, y: 235, w: 145, h: 90, label: 'Human', sub: 'approves, sends' },
    ],
    edges: [
      { from: 'ask', to: 'orch' },
      { from: 'cron', to: 'orch' },
      { from: 'orch', to: 's1' },
      { from: 'orch', to: 's2' },
      { from: 'orch', to: 's3' },
      { from: 'orch', to: 's4' },
      { from: 'orch', to: 's5' },
      { from: 's3', to: 'val' },
      { from: 'kb', to: 'val', dashed: true },
      { from: 'val', to: 'human' },
    ],
  },
  measure: {
    nodes: [
      { id: 'e', x: 10, y: 40, w: 160, h: 60, label: 'Experiments', tone: 'ghost' },
      { id: 'st', x: 10, y: 160, w: 160, h: 60, label: 'Streaming', tone: 'ghost' },
      { id: 'w', x: 10, y: 280, w: 160, h: 60, label: 'Website', tone: 'ghost' },
      { id: 'su', x: 10, y: 400, w: 160, h: 60, label: 'Subscriptions', tone: 'ghost' },
      { id: 'id', x: 205, y: 210, w: 185, h: 90, label: 'Identity map', sub: 'one customer key', tone: 'glacier' },
      { id: 'as', x: 435, y: 200, w: 195, h: 110, label: 'Cohorts', sub: 'control | treatment', tone: 'solid' },
      { id: 'g', x: 670, y: 90, w: 160, h: 60, label: 'Glue + Spark' },
      { id: 'a', x: 670, y: 225, w: 160, h: 60, label: 'Athena' },
      { id: 'q', x: 670, y: 360, w: 160, h: 60, label: 'QuickSight' },
      { id: 'o1', x: 855, y: 170, w: 145, h: 70, label: 'Expansion', sub: '13 partners', tone: 'lime' },
      { id: 'o2', x: 855, y: 265, w: 145, h: 70, label: 'Segments', sub: 'where to deploy', tone: 'lime' },
      { id: 'o3', x: 855, y: 360, w: 145, h: 70, label: 'Standard', sub: 'every partner', tone: 'lime' },
      { id: 'o4', x: 855, y: 455, w: 145, h: 70, label: 'Exec metric', sub: 'since 2026', tone: 'lime' },
    ],
    edges: [
      { from: 'e', to: 'id' },
      { from: 'st', to: 'id' },
      { from: 'w', to: 'id' },
      { from: 'su', to: 'id' },
      { from: 'id', to: 'as' },
      { from: 'as', to: 'g' },
      { from: 'g', to: 'a' },
      { from: 'a', to: 'q' },
      { from: 'q', to: 'o1' },
      { from: 'q', to: 'o2' },
      { from: 'q', to: 'o3' },
      { from: 'q', to: 'o4' },
    ],
  },
  deepdive: {
    nodes: [
      { id: 'sub', x: 10, y: 70, w: 170, h: 60, label: 'Subscriptions', tone: 'ghost' },
      { id: 'eng', x: 10, y: 250, w: 170, h: 60, label: 'Engagement', tone: 'ghost' },
      { id: 'deal', x: 10, y: 430, w: 170, h: 60, label: 'Partner deal', tone: 'ghost' },
      { id: 'cm', x: 225, y: 230, w: 210, h: 100, label: 'Member history', sub: '3 years', tone: 'glacier' },
      { id: 'val', x: 490, y: 60, w: 200, h: 80, label: 'Shapley split', sub: 'mix vs behavior' },
      { id: 'coh', x: 490, y: 235, w: 200, h: 90, label: 'Matched cohorts', sub: 'causal study', tone: 'lime' },
      { id: 'mix', x: 760, y: 235, w: 200, h: 90, label: 'Customer mix', sub: '91% of the drop', tone: 'solid' },
      { id: 'vp', x: 760, y: 430, w: 200, h: 80, label: 'Annual plan', sub: 'deal kept', tone: 'lime' },
    ],
    edges: [
      { from: 'sub', to: 'cm' },
      { from: 'eng', to: 'cm' },
      { from: 'deal', to: 'cm' },
      { from: 'cm', to: 'val' },
      { from: 'cm', to: 'coh' },
      { from: 'val', to: 'coh', dashed: true },
      { from: 'coh', to: 'mix' },
      { from: 'mix', to: 'vp' },
    ],
  },
  dealmodel: {
    nodes: [
      { id: 'terms', x: 10, y: 70, w: 180, h: 70, label: 'Deal terms', tone: 'ghost' },
      { id: 'base', x: 10, y: 245, w: 180, h: 70, label: 'Member base', tone: 'ghost' },
      { id: 'bill', x: 10, y: 420, w: 180, h: 80, label: 'Billing tables', sub: '2 of 1,027', tone: 'ghost' },
      { id: 'fcf', x: 260, y: 60, w: 200, h: 90, label: 'Cash-flow model', sub: 'free cash flow', tone: 'lime' },
      { id: 'can', x: 260, y: 235, w: 200, h: 90, label: 'Cannibalization', sub: 'from existing members' },
      { id: 'glue', x: 260, y: 415, w: 200, h: 90, label: 'Glue pipeline', sub: '5 stages, same day', tone: 'glacier' },
      { id: 'exec', x: 530, y: 235, w: 190, h: 90, label: 'Exec metrics', sub: 'daily', tone: 'solid' },
      { id: 'go', x: 790, y: 235, w: 190, h: 90, label: 'Launch call', sub: '0.9%, not 8.2%', tone: 'lime' },
    ],
    edges: [
      { from: 'terms', to: 'fcf' },
      { from: 'base', to: 'can' },
      { from: 'bill', to: 'glue' },
      { from: 'fcf', to: 'exec' },
      { from: 'can', to: 'exec' },
      { from: 'exec', to: 'go' },
      { from: 'glue', to: 'go' },
    ],
  },
  funnel: {
    nodes: [
      { id: 'click', x: 10, y: 70, w: 180, h: 80, label: 'Clickstream', sub: '290+ pages', tone: 'ghost' },
      { id: 'fail', x: 10, y: 240, w: 180, h: 80, label: 'Failure logs', sub: '100+ reasons', tone: 'ghost' },
      { id: 'subs', x: 10, y: 410, w: 180, h: 80, label: 'Subscriptions', tone: 'ghost' },
      { id: 'join', x: 245, y: 230, w: 200, h: 100, label: 'Funnel join', sub: '1B+ records a day', tone: 'glacier' },
      { id: 'cat', x: 500, y: 230, w: 190, h: 100, label: '15 categories', sub: 'where it breaks', tone: 'lime' },
      { id: 'otp', x: 750, y: 60, w: 220, h: 80, label: 'OTP + CAPTCHA', sub: 'under 1%, not 90%' },
      { id: 'fix', x: 750, y: 240, w: 220, h: 80, label: 'Issue resolution', sub: '72h to under 1h', tone: 'solid' },
      { id: 'int', x: 750, y: 420, w: 220, h: 80, label: '15+ integrations', sub: 'measured from launch' },
    ],
    edges: [
      { from: 'click', to: 'join' },
      { from: 'fail', to: 'join' },
      { from: 'subs', to: 'join' },
      { from: 'join', to: 'cat' },
      { from: 'cat', to: 'otp', dashed: true },
      { from: 'cat', to: 'fix' },
      { from: 'cat', to: 'int' },
    ],
  },
  futures: {
    nodes: [
      { id: 'data', x: 10, y: 235, w: 170, h: 90, label: '1-min bars', sub: '2014 to 2022', tone: 'ghost' },
      { id: 'pre', x: 230, y: 230, w: 210, h: 100, label: 'Pre-registered', sub: 'written before results', tone: 'lime' },
      { id: 'rule', x: 500, y: 80, w: 190, h: 80, label: 'Entry rule', sub: 'the idea' },
      { id: 'rand', x: 500, y: 400, w: 190, h: 80, label: 'Random entries', sub: 'matched baseline', tone: 'ghost' },
      { id: 'cost', x: 760, y: 230, w: 200, h: 100, label: 'After costs', sub: 'beat it or fail', tone: 'solid' },
      { id: 'rep', x: 760, y: 430, w: 200, h: 80, label: 'Report', sub: 'published either way', tone: 'glacier' },
    ],
    edges: [
      { from: 'data', to: 'pre' },
      { from: 'pre', to: 'rule' },
      { from: 'pre', to: 'rand' },
      { from: 'rule', to: 'cost' },
      { from: 'rand', to: 'cost', dashed: true },
      { from: 'cost', to: 'rep' },
    ],
  },
  spend: {
    nodes: [
      { id: 'a', x: 10, y: 80, w: 170, h: 70, label: 'Account 1', tone: 'ghost' },
      { id: 'b', x: 10, y: 245, w: 170, h: 70, label: 'Account 2', tone: 'ghost' },
      { id: 'c', x: 10, y: 410, w: 170, h: 70, label: 'Account 3', tone: 'ghost' },
      { id: 'parse', x: 240, y: 235, w: 190, h: 90, label: 'Parser', sub: '3 years of statements' },
      { id: 'cat', x: 490, y: 235, w: 200, h: 90, label: 'Categorizer', sub: 'zero manual entry', tone: 'lime' },
      { id: 'db', x: 760, y: 90, w: 200, h: 90, label: 'SQLite', sub: '2,811 transactions', tone: 'glacier' },
      { id: 'pub', x: 760, y: 380, w: 200, h: 90, label: 'Ratios only', sub: 'Chart.js page', tone: 'solid' },
    ],
    edges: [
      { from: 'a', to: 'parse' },
      { from: 'b', to: 'parse' },
      { from: 'c', to: 'parse' },
      { from: 'parse', to: 'cat' },
      { from: 'cat', to: 'db' },
      { from: 'db', to: 'pub' },
    ],
  },
};
