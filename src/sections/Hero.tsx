import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion, isTouch } from '../lib/motion';
import { profile } from '../data';
import { AutoVideo } from '../ui/AutoVideo';

/**
 * Hero: giant "Data @ Amazon" with a cutout of Shipra standing in front of
 * the type. Pinned for 150vh: the lines shrink to the corners and frame a
 * portrait video window that opens in the middle. Inside the window the
 * cursor scrubs the clip.
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const touch = isTouch() || prefersReducedMotion();

  useLayoutEffect(() => {
    if (!ready) return;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.hero-line');
      const splits = lines.map((l) => new SplitText(l, { type: 'chars', mask: 'chars' }));
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      if (!reduce) {
        splits.forEach((s, i) => intro.from(s.chars, { yPercent: 120, duration: 1.3, stagger: 0.035 }, i * 0.12));
        intro
          .from('.hero-cutout', { yPercent: 18, opacity: 0, duration: 1.4 }, 0.25)
          .from('.hero-meta', { opacity: 0, y: 12, duration: 0.8, stagger: 0.08 }, 0.6);
      }

      if (reduce || isTouch()) {
        gsap.set('.hero-sub', { opacity: 1 });
        return;
      }
      const v = video.current!;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            if (self.progress > 0.05 && v.paused && !v.dataset.scrubbing) v.play().catch(() => {});
            if (self.progress <= 0.05 && !v.paused) v.pause();
          },
          onLeave: () => v.pause(),
          onEnterBack: () => v.play().catch(() => {}),
        },
      });
      tl.to('.hero-line-a', { yPercent: -32, scale: 0.38, transformOrigin: 'left top', ease: 'none' }, 0)
        .to('.hero-line-b', { yPercent: 55, scale: 0.42, transformOrigin: 'right bottom', ease: 'none' }, 0)
        .to('.hero-cutout', { yPercent: 40, opacity: 0, ease: 'none' }, 0)
        .to('.hero-meta', { opacity: 0, duration: 0.15, ease: 'none' }, 0)
        .fromTo(
          '.hero-window',
          { scale: 0.25, clipPath: 'inset(30% round 24px)', autoAlpha: 0 },
          { scale: 1, clipPath: 'inset(0% round 24px)', autoAlpha: 1, ease: 'power2.inOut' },
          0.05,
        )
        .fromTo('.hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none' }, 0.55)
        // last stretch: drift the window up and dim it so it hands off to Numbers
        .to('.hero-window', { yPercent: -8, opacity: 0.6, ease: 'none', duration: 0.2 }, 0.8);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // cursor scrubs the clip while it hovers the window (rAF-throttled)
  const scrubFrame = useRef(0);
  const onScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v || !v.duration || isTouch()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const t = ((e.clientX - r.left) / r.width) * v.duration;
    cancelAnimationFrame(scrubFrame.current);
    scrubFrame.current = requestAnimationFrame(() => {
      v.dataset.scrubbing = '1';
      v.pause();
      if (Math.abs(v.currentTime - t) < 0.05) return;
      const fv = v as HTMLVideoElement & { fastSeek?: (t: number) => void };
      if (fv.fastSeek) fv.fastSeek(t);
      else v.currentTime = t;
    });
  };
  const endScrub = () => {
    const v = video.current;
    if (!v) return;
    delete v.dataset.scrubbing;
    v.play().catch(() => {});
  };

  if (touch) return <HeroStatic ready={ready} />;

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink text-paper">
      <img
        src="/fx/topo.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.09] invert"
      />

      {/* portrait window at native resolution, opens on scroll */}
      <div
        className="hero-window invisible absolute inset-0 z-[1] m-auto h-[78svh] w-[calc(78svh*9/16)] overflow-hidden rounded-3xl"
        onPointerMove={onScrub}
        onPointerLeave={endScrub}
        data-cursor="scrub"
      >
        <video
          ref={video}
          src="/video/hero-2026-hd.mp4"
          poster="/photos/hero-2026-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (bar.current && v.duration) bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-paper/15">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-lime" />
        </div>
      </div>

      {/* type */}
      <h1 className="absolute inset-0 z-[2] flex flex-col justify-center px-[3vw] font-display font-extrabold leading-[0.82] tracking-[-0.045em]">
        <span className="hero-line hero-line-a block whitespace-nowrap text-[19vw] md:text-[17vw]">Data</span>
        <span className="hero-line hero-line-b block self-end whitespace-nowrap text-[19vw] md:text-[17vw]">
          <span className="text-lime">@</span>Amazon
        </span>
      </h1>

      {/* cutout in front of the type */}
      <img
        src="/fx/cutout-3.webp"
        alt="Shipra Sonal"
        className="hero-cutout pointer-events-none absolute bottom-0 left-1/2 z-[3] h-[78svh] max-w-none -translate-x-[30%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:-translate-x-[10%]"
      />

      {/* meta */}
      <div className="absolute inset-x-0 top-0 z-[4] flex items-start justify-between p-5 pt-24 sm:p-8 sm:pt-24">
        <p className="hero-meta label text-paper/70">{profile.name}</p>
        <p className="hero-meta label hidden text-paper/70 sm:block">{profile.city} · 2026</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between p-5 sm:p-8">
        <p className="hero-meta label max-w-[14rem] text-paper/70">LLM agents · data platforms · measurement</p>
        <p className="hero-meta label text-paper/70">Scroll ↓</p>
      </div>

      <p className="hero-sub pointer-events-none absolute bottom-[18%] left-[3vw] z-[4] max-w-sm font-serif text-2xl italic leading-snug text-paper opacity-0 sm:text-3xl">
        {profile.sub}
      </p>
    </section>
  );
}

/** Touch / reduced motion: no pin. Type, cutout, then the clip in flow. */
function HeroStatic({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const splits = gsap.utils.toArray<HTMLElement>('.hero-line').map((l) => new SplitText(l, { type: 'chars', mask: 'chars' }));
      splits.forEach((sp, i) => gsap.from(sp.chars, { yPercent: 120, duration: 1.2, stagger: 0.035, ease: 'expo.out', delay: i * 0.12 }));
      gsap.from('.hero-cutout', { yPercent: 15, opacity: 0, duration: 1.3, ease: 'expo.out', delay: 0.25 });
    }, root);
    return () => ctx.revert();
  }, [ready]);
  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-ink px-5 pb-16 pt-28 text-paper">
      <img src="/fx/topo.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.09] invert" />
      <p className="label relative text-paper/70">{profile.name} · {profile.city}</p>
      <div className="relative mt-6 h-[62svh]">
        <h1 className="relative z-[1] font-display font-extrabold leading-[0.85] tracking-[-0.045em]">
          <span className="hero-line block text-[22vw]">Data</span>
          <span className="hero-line block text-[22vw]">
            <span className="text-lime">@</span>Amazon
          </span>
        </h1>
        <img src="/fx/cutout-3.webp" alt="Shipra Sonal" className="hero-cutout absolute bottom-0 right-0 z-[2] h-[48svh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
      </div>
      <p className="relative mt-8 font-serif text-2xl italic leading-snug">{profile.sub}</p>
      <div className="relative mx-auto mt-10 aspect-[9/16] h-[62svh] max-w-full overflow-hidden rounded-3xl">
        <AutoVideo src="/video/hero-2026-hd.mp4" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}
