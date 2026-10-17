// Generates public/fx/topo.svg: contour lines of a smooth noise field (marching squares).
// Run: node scripts/make-topo.mjs
import { writeFileSync } from 'node:fs';

const W = 120, H = 75, CELL = 13, LEVELS = 11;
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// Value noise with a few octaves
const grid = (n) => Array.from({ length: n + 2 }, () => Array.from({ length: n + 2 }, rand));
const octaves = [3, 6, 12].map((n) => ({ n, g: grid(n) }));
const smooth = (t) => t * t * (3 - 2 * t);
function noise(x, y) {
  let v = 0, amp = 1, sum = 0;
  for (const { n, g } of octaves) {
    const fx = (x / W) * n, fy = (y / H) * n;
    const ix = Math.floor(fx), iy = Math.floor(fy);
    const tx = smooth(fx - ix), ty = smooth(fy - iy);
    const a = g[iy][ix], b = g[iy][ix + 1], c = g[iy + 1][ix], d = g[iy + 1][ix + 1];
    v += amp * (a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty);
    sum += amp; amp *= 0.45;
  }
  return v / sum;
}

const f = Array.from({ length: H + 1 }, (_, y) => Array.from({ length: W + 1 }, (_, x) => noise(x, y)));
const paths = [];
for (let l = 1; l < LEVELS; l++) {
  const t = 0.25 + (l / LEVELS) * 0.5;
  let d = '';
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const v = [f[y][x], f[y][x + 1], f[y + 1][x + 1], f[y + 1][x]];
    const idx = (v[0] > t) * 8 + (v[1] > t) * 4 + (v[2] > t) * 2 + (v[3] > t);
    if (idx === 0 || idx === 15) continue;
    const lerp = (a, b) => (t - a) / (b - a);
    const P = {
      top: [x + lerp(v[0], v[1]), y], right: [x + 1, y + lerp(v[1], v[2])],
      bottom: [x + lerp(v[3], v[2]), y + 1], left: [x, y + lerp(v[0], v[3])],
    };
    const segs = {
      1: [['left', 'bottom']], 2: [['bottom', 'right']], 3: [['left', 'right']], 4: [['top', 'right']],
      5: [['left', 'top'], ['bottom', 'right']], 6: [['top', 'bottom']], 7: [['left', 'top']], 8: [['left', 'top']],
      9: [['top', 'bottom']], 10: [['left', 'bottom'], ['top', 'right']], 11: [['top', 'right']], 12: [['left', 'right']],
      13: [['bottom', 'right']], 14: [['left', 'bottom']],
    }[idx];
    for (const [a, b] of segs) {
      const p = P[a], q = P[b];
      d += `M${(p[0] * CELL).toFixed(1)} ${(p[1] * CELL).toFixed(1)}L${(q[0] * CELL).toFixed(1)} ${(q[1] * CELL).toFixed(1)}`;
    }
  }
  paths.push(`<path d="${d}" opacity="${(0.35 + (l % 4 === 0 ? 0.45 : 0)).toFixed(2)}"/>`);
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W * CELL} ${H * CELL}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">${paths.join('')}</g></svg>`;
writeFileSync(new URL('../public/fx/topo.svg', import.meta.url), svg);
console.log('topo.svg', (svg.length / 1024).toFixed(0), 'KB');
