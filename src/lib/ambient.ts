/**
 * "Glass piano": sparse pentatonic bell notes over a slow bass, generated
 * with Web Audio (no file, no license). Starts only on a click, fades in
 * and out, and goes quiet while the tab is hidden.
 */
let ctx: AudioContext | null = null;
let out: GainNode;
let timer = 0;
let next = 0;
let n = 0;

const LEVEL = 0.3;
const hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const scale = [69, 72, 74, 76, 79, 81, 84];
const bass = [45, 41, 36, 43];

function setup() {
  ctx = new AudioContext();
  out = ctx.createGain();
  out.gain.value = 0;
  // generated reverb tail
  const len = ctx.sampleRate * 3;
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
  }
  const rev = ctx.createConvolver();
  rev.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  out.connect(ctx.destination);
  out.connect(rev);
  rev.connect(wet);
  wet.connect(ctx.destination);
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !timer) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });
}

function tone(m: number, t: number, dur: number, type: OscillatorType, gain: number, attack: number, cutoff: number) {
  const c = ctx!;
  const o = c.createOscillator();
  const g = c.createGain();
  const f = c.createBiquadFilter();
  o.type = type;
  o.frequency.value = hz(m);
  f.type = 'lowpass';
  f.frequency.value = cutoff;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f);
  f.connect(g);
  g.connect(out);
  o.start(t);
  o.stop(t + dur + 0.1);
}

function schedule() {
  const c = ctx!;
  while (next < c.currentTime + 0.5) {
    if (Math.random() < 0.55) tone(scale[Math.floor(Math.random() * scale.length)], next, 3.5, 'sine', 0.09, 0.005, 4000);
    if (n % 8 === 0) tone(bass[(n / 8) % 4], next, 6, 'triangle', 0.06, 0.5, 600);
    next += 0.75;
    n++;
  }
}

export function startAmbient() {
  if (!ctx) setup();
  const c = ctx!;
  c.resume();
  if (timer) return;
  next = c.currentTime + 0.1;
  n = 0;
  out.gain.cancelScheduledValues(c.currentTime);
  out.gain.setTargetAtTime(LEVEL, c.currentTime, 0.8);
  timer = window.setInterval(schedule, 100);
}

export function stopAmbient() {
  if (!ctx || !timer) return;
  clearInterval(timer);
  timer = 0;
  out.gain.cancelScheduledValues(ctx.currentTime);
  out.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
}
