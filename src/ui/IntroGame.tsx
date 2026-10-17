import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/**
 * "Fill the model": a 15 second catch game before the site.
 * Catch data points, dumbbells, mountains and play buttons with a little bar
 * chart. A red "LLM guess" bounces off: Python computes, the LLM only routes.
 * 10 catches build the model, then the gate opens onto the hero.
 * Skippable at any time, shown once per session (?play replays it), skipped
 * for reduced motion and Save-Data.
 */

type Kind = 'dot' | 'bell' | 'peak' | 'play' | 'guess';
type Token = { x: number; y: number; vy: number; vx: number; kind: Kind; spin: number; bounced?: boolean };

const GOAL = 10;
const LIME = '#c8f05a';
const PAPER = '#f3efe6';
const RED = '#ff5a4e';

export function shouldShowIntro() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has('play')) return true;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (prefersReducedMotion() || conn?.saveData) return false;
  try {
    return sessionStorage.getItem('intro-done') !== '1';
  } catch {
    return true;
  }
}

function drawToken(ctx: CanvasRenderingContext2D, t: Token, s: number) {
  ctx.save();
  ctx.translate(t.x, t.y);
  ctx.rotate(t.spin);
  ctx.lineWidth = 2.5 * s;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  switch (t.kind) {
    case 'dot':
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.arc(0, 0, 9 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200,240,90,0.35)';
      ctx.beginPath();
      ctx.arc(0, 0, 15 * s, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'bell':
      ctx.fillStyle = PAPER;
      ctx.fillRect(-14 * s, -2 * s, 28 * s, 4 * s);
      ctx.fillRect(-18 * s, -9 * s, 6 * s, 18 * s);
      ctx.fillRect(12 * s, -9 * s, 6 * s, 18 * s);
      break;
    case 'peak':
      ctx.fillStyle = '#5cc8c2';
      ctx.beginPath();
      ctx.moveTo(-18 * s, 12 * s);
      ctx.lineTo(-4 * s, -12 * s);
      ctx.lineTo(4 * s, 0);
      ctx.lineTo(9 * s, -6 * s);
      ctx.lineTo(18 * s, 12 * s);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = PAPER;
      ctx.beginPath();
      ctx.moveTo(-8 * s, -5 * s);
      ctx.lineTo(-4 * s, -12 * s);
      ctx.lineTo(0, -5 * s);
      ctx.closePath();
      ctx.fill();
      break;
    case 'play':
      ctx.strokeStyle = PAPER;
      ctx.beginPath();
      ctx.arc(0, 0, 13 * s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = PAPER;
      ctx.beginPath();
      ctx.moveTo(-4 * s, -6 * s);
      ctx.lineTo(7 * s, 0);
      ctx.lineTo(-4 * s, 6 * s);
      ctx.closePath();
      ctx.fill();
      break;
    case 'guess':
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.roundRect(-26 * s, -11 * s, 52 * s, 22 * s, 11 * s);
      ctx.fill();
      ctx.rotate(-t.spin);
      ctx.fillStyle = '#0b0b09';
      ctx.font = `600 ${10 * s}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('LLM ≈ ?', 0, 0.5 * s);
      break;
  }
  ctx.restore();
}

export function IntroGame({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [caught, setCaught] = useState(0);
  const [toast, setToast] = useState('');
  const [finished, setFinished] = useState(false);
  const doneRef = useRef(false);

  const close = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem('intro-done', '1');
    } catch {
      /* private mode */
    }
    const el = root.current;
    if (!el) return onDone();
    gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'power4.inOut' });
    // start the hero while the gate is still lifting; timer, not onComplete,
    // so a throttled background tab cannot leave the page locked
    window.setTimeout(onDone, 650);
  };

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let S = 1;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      S = Math.max(0.8, Math.min(1.3, W / 1200));
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const paddle = { x: W / 2, target: W / 2, w: 120 };
    const tokens: Token[] = [];
    let score = 0;
    let last = performance.now();
    let spawnIn = 0;
    let raf = 0;
    let ended = false;
    let guesses = 0;
    const keys = { left: false, right: false };

    const onPointer = (e: PointerEvent) => {
      paddle.target = e.clientX;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keys.left = e.type === 'keydown';
      if (e.key === 'ArrowRight') keys.right = e.type === 'keydown';
      if (e.type === 'keydown' && e.key === 'Escape') close();
    };
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    const spawn = () => {
      const r = Math.random();
      // a guess about every fifth token, but not before the second catch
      const kind: Kind =
        score >= 2 && r < 0.2 && guesses < 3 ? 'guess' : (['dot', 'dot', 'bell', 'peak', 'play'] as Kind[])[Math.floor(Math.random() * 5)];
      if (kind === 'guess') guesses++;
      // keep tokens inside the reach of the paddle
      const x = Math.max(60, Math.min(W - 60, paddle.x + (Math.random() - 0.5) * Math.min(W * 0.8, 900)));
      tokens.push({ x, y: -30, vy: (180 + Math.random() * 90 + score * 12) * S, vx: 0, kind, spin: 0 });
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (keys.left) paddle.target -= 900 * dt;
      if (keys.right) paddle.target += 900 * dt;
      paddle.target = Math.max(paddle.w / 2, Math.min(W - paddle.w / 2, paddle.target));
      paddle.x += (paddle.target - paddle.x) * Math.min(1, dt * 14);

      if (!ended) {
        spawnIn -= dt;
        if (spawnIn <= 0) {
          spawn();
          spawnIn = 0.55 + Math.random() * 0.35;
        }
      }

      ctx.clearRect(0, 0, W, H);

      // paddle: a little bar chart, its bars grow with the score
      const py = H - 90 * S;
      const pw = paddle.w * S;
      ctx.fillStyle = 'rgba(243,239,230,0.08)';
      ctx.fillRect(paddle.x - pw / 2, py + 26 * S, pw, 3 * S);
      const bars = 5;
      for (let i = 0; i < bars; i++) {
        const bw = pw / bars - 6 * S;
        const grow = Math.min(1, score / GOAL + 0.15);
        const bh = (10 + ((i * 37) % 23) * 1.2) * S * (0.6 + grow);
        ctx.fillStyle = i === bars - 1 ? LIME : PAPER;
        ctx.fillRect(paddle.x - pw / 2 + i * (pw / bars) + 3 * S, py + 26 * S - bh, bw, bh);
      }

      for (let i = tokens.length - 1; i >= 0; i--) {
        const t = tokens[i];
        t.y += t.vy * dt;
        t.x += t.vx * dt;
        t.spin += (t.kind === 'guess' ? 0.6 : 1.4) * dt;
        const hit = !t.bounced && t.y > py - 10 * S && t.y < py + 30 * S && Math.abs(t.x - paddle.x) < pw / 2 + 12 * S;
        if (hit) {
          if (t.kind === 'guess') {
            t.bounced = true;
            t.vy = -420 * S;
            t.vx = (t.x < paddle.x ? -1 : 1) * 260 * S;
            setToast('Python computes. The LLM only routes.');
            window.setTimeout(() => setToast(''), 1600);
          } else if (!ended) {
            tokens.splice(i, 1);
            score++;
            setCaught(score);
            if (score >= GOAL) {
              ended = true;
              setFinished(true);
              window.setTimeout(close, 1300);
            }
            continue;
          }
        }
        if (t.bounced) t.vy += 900 * dt;
        if (t.y > H + 60 || t.y < -200 || t.x < -100 || t.x > W + 100) {
          tokens.splice(i, 1);
          continue;
        }
        drawToken(ctx, t, S);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round((caught / GOAL) * 100);

  return (
    <div
      ref={root}
      role="dialog"
      aria-label="Intro game: catch the data to build the model, or skip"
      className="no-print fixed inset-0 z-[90] touch-none select-none overflow-hidden bg-ink"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      data-cursor="catch"
    >
      <img src="/fx/topo.svg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] invert" />
      <canvas ref={canvas} className="absolute inset-0" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-8">
        <div>
          <p className="label text-stone">Shipra Sonal</p>
          <p className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Data <span className="text-lime">@</span> Amazon
          </p>
        </div>
        <button
          type="button"
          autoFocus
          onClick={close}
          className="label rounded-full border border-paper/40 px-5 py-3 text-paper transition hover:bg-paper hover:text-ink"
        >
          Skip intro →
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
        {!finished ? (
          <>
            <p className="font-display text-[11vw] font-extrabold leading-[0.85] tracking-tight text-paper/90 sm:text-[7vw]">
              Fill the model
            </p>
            <p className="mt-4 text-sm text-stone sm:text-base">
              Catch {GOAL}. Dodge the red guess. Mouse, finger or arrow keys.
            </p>
          </>
        ) : (
          <p className="font-display text-[10vw] font-extrabold leading-[0.85] tracking-tight text-lime sm:text-[6vw]">
            Model built.
            <span className="mt-3 block font-serif text-[0.4em] font-normal italic text-paper">Python did the math.</span>
          </p>
        )}
      </div>

      {toast && (
        <p className="label pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 rounded-full bg-[#ff5a4e] px-4 py-2 text-ink">
          {toast}
        </p>
      )}

      <div className="absolute inset-x-5 bottom-6 sm:inset-x-8">
        <div className="mb-2 flex justify-between">
          <span className="label text-stone">deal model</span>
          <span className="label text-lime" aria-live="polite">
            {pct}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper/10">
          <div className="h-full rounded-full bg-lime transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
