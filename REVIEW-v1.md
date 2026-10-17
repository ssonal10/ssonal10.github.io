# Redesign review (branch `redesign-2026-10`)

Nothing is pushed. `main` and the live site are unchanged.

## See it

```bash
cd ~/Documents/Claude/Projects/PersonalWebsite-redesign
npm run dev        # http://localhost:5173
```

Compare a step: `git diff main..763fcf3` (content), `763fcf3..ce1151f` (colors), `ce1151f..40c6f02` (scroll).
Drop a step you don't like: `git revert <hash>`.

## Step 1: write-up, photos, videos (763fcf3)

- Title is now Data Engineering Manager (was "Senior IC", "GenAI × Decision Intelligence").
- Removed claims your resume retired: 150×, 3h to 20min, 60% cost, 100+ users, "1B+/day pipelines" as a headline.
- Leads with: deal-modeling agent (launched), auto-activation measurement (7M), Sentinel (10 days to 10 min).
- New: Recognition (hackathon 1st, poster top 20 of 1,100, IEEE BigData PC), futures research lab card, 4-role Experience timeline.
- Amazon appears only in the Experience timeline; prose says "in Seattle" (your voice rule).
- Old trading card said "beat buy-and-hold"; replaced with the honest result from the trading repo.
- Photos from Photos favorites (GPS stripped): Naches, Maui, One WTC, Squamish, tulips, Kullu, Andaman. Spheres photo removed (a friend is in it).
- Clips: Squamish, Glacier Highline, Seattle denim (2026).

## Step 2: colors (ce1151f)

Warm black `#0b0b09`, cream text, lime `#c8f05a`, coral second accent. Body text brighter (old slate-500 on near-black failed contrast). Palette lives in `tailwind.config.js`; change the `emerald` scale to try another accent.

## Step 3: scroll (40c6f02)

- Hero pins for one screen: name splits sideways, the video opens from a small card (Lando Norris / Apple style). New clean hero clip `hero-2026.mp4`; the old one had a CapCut watermark.
- Big type marquee that speeds up with scroll (Weirdos rows).
- Postcards pin and scroll sideways on desktop (wibe-studio), swipe on phones.
- Progress bar, nav highlight fixed, clips as a swipe reel.
- Respects reduced-motion settings.

## Decisions for you

1. Claims that rest on your word, now public: "launched", 6 months replaced in week one, 7M / 5.5M members, 10 days to 10 min, top 20 of 1,100. Also check employer PR comfort with 7M.
2. Name Mauricio on the trading card, or keep "with a partner"? The card links the old public backtester; the research repo is private.
3. Smooth scrolling (Lenis, ~3 KB) would match locomotive-scroll sites. Needs `npm i lenis`.
4. Unused files still in `public/` (old hero clips, hero-maroon, car-beige, lake-pink, nyc-edge, seattle-balcony, lake-sunset, portrait-lake-2026, gym-bw). Delete or use.
5. Phone layout built but not checked in a real phone-width browser.
