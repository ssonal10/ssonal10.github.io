/**
 * Small architecture-diagram renderer for the design notes. Boxes and
 * flowing edges in SVG, generic AWS-style shapes, no internal names.
 */

type Tone = 'plain' | 'lime' | 'solid' | 'glacier' | 'ghost';
type Node = { id: string; x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: Tone };
type Edge = { from: string; to: string; label?: string; dashed?: boolean; loop?: boolean };
export type DiagramSpec = { nodes: Node[]; edges: Edge[] };

const tones: Record<Tone, { fill: string; stroke: string; text: string; sub: string }> = {
  plain: { fill: 'rgba(243,239,230,0.04)', stroke: 'rgba(243,239,230,0.35)', text: '#f3efe6', sub: '#8f8a84' },
  lime: { fill: 'rgba(200,240,90,0.08)', stroke: '#c8f05a', text: '#c8f05a', sub: '#b3ada2' },
  solid: { fill: '#c8f05a', stroke: '#c8f05a', text: '#0b0b09', sub: '#2a2825' },
  glacier: { fill: 'rgba(92,200,194,0.1)', stroke: '#5cc8c2', text: '#5cc8c2', sub: '#8f8a84' },
  ghost: { fill: 'transparent', stroke: 'rgba(243,239,230,0.2)', text: '#f3efe6', sub: '#8f8a84' },
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

export function Diagram({ spec, title }: { spec: DiagramSpec; title: string }) {
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox="0 0 1000 560" className="h-auto w-full" role="img" aria-label={`Architecture: ${title}`}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#c8f05a" />
        </marker>
      </defs>
      {spec.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        const d = edgePath(a, b, e.loop);
        return (
          <g key={i} className="dg-edge">
            <path d={d} fill="none" stroke="rgba(243,239,230,0.18)" strokeWidth="2" className="dg-base" />
            <path
              d={d}
              fill="none"
              stroke="#c8f05a"
              strokeWidth="2"
              className={e.dashed ? 'dg-live' : 'flow dg-live'}
              strokeDasharray={e.dashed ? '3 7' : undefined}
              markerEnd="url(#arrow)"
              opacity={e.dashed ? 0.5 : 0.9}
            />
          </g>
        );
      })}
      {spec.nodes.map((n) => {
        const t = tones[n.tone ?? 'plain'];
        return (
          <g key={n.id} className="dg-node" style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="12" fill={t.fill} stroke={t.stroke} strokeWidth="1.5" />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + (n.sub ? -5 : 7)}
              textAnchor="middle"
              fill={t.text}
              fontFamily="Bricolage Grotesque"
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
                fill={n.tone === 'solid' ? '#2a2825' : '#8f8a84'}
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

export const diagrams: Record<'agent' | 'sentinel' | 'measure', DiagramSpec> = {
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
      { id: 'as', x: 435, y: 200, w: 195, h: 110, label: 'Date-bounded', sub: 'control | test', tone: 'solid' },
      { id: 'g', x: 670, y: 90, w: 160, h: 60, label: 'Glue + Spark' },
      { id: 'a', x: 670, y: 225, w: 160, h: 60, label: 'Athena' },
      { id: 'q', x: 670, y: 360, w: 160, h: 60, label: 'QuickSight' },
      { id: 'vp', x: 865, y: 215, w: 130, h: 80, label: 'VP call', sub: 'expand?', tone: 'lime' },
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
      { from: 'q', to: 'vp' },
    ],
  },
};
