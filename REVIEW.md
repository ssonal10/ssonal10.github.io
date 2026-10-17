# v2 review: "Data @ Amazon" (branch `redesign-v2`)

Nothing is pushed. `main` and the live site are unchanged. v1 (lime theme) is still on `redesign-2026-10`; its notes are in `REVIEW-v1.md`.

## Open it

```bash
cd ~/Documents/Claude/Projects/PersonalWebsite-v2
npm run dev          # prints a localhost URL
```

Already running tonight: **v2 at http://localhost:5174**, v1 at http://localhost:5173.


Add `?play` to replay the intro game; it shows once per browser session.

## What it is

Built from four rounds of critique (three design, one code review) by a Fable "creative director" agent, using your references:

| Piece | Inspired by | What you'll see |
|---|---|---|
| Intro game "Fill the model" | your idea | Catch 7 tokens in 10 s with a bar-chart paddle; the red "LLM ≈ ?" bounces off ("Python computes. The LLM only routes."). Skip any time. |
| Hero | Unseen | "Shipra Sonal" (with "Data @ Amazon" above it) and a cutout of you in front of the type; on scroll the words shrink to the corners and a portrait video window opens. Move the cursor over the window to scrub the clip. |
| Stack ticker | Obys | Tools strip in lime Bricolage caps, slow drift (the number cells were removed 2026-10-17). |
| Work | Design-notes scroll | Paper cards in a sideways pinned row (slower than before): Problem / Built / Result on the left, an architecture diagram on the right for all 8 projects, headline number as a green pill. Replaces the separate Design notes section (2026-10-17). |
| Path | Obys index | Numbered roles that open on hover, then Recognition (1st, Top 20, IEEE). |
| Life | paper theme | Page flips to cream; mono photos turn to color on hover; two throwable stickers of you; short-video reel. |
| Contact | | "Got a messy dataset?", magnetic Say hi, and **Query me**: type SQL against the site (`select name, impact from work where year = 2026`, or press `/`). Footer echoes what you caught in the game. |
| Cursor | Unseen | Dot plus a ring that stretches along its direction; labels on links (open, scrub, throw, run). |

Tech: React + GSAP 3.13 (ScrollTrigger, SplitText, DrawSVG, Draggable, Inertia, all free now) + Lenis smooth scroll. About 136 KB gzipped JS. Phones get a simpler layout without pinning.

## Built for reviewers too

- **Print / Save as PDF** gives a clean 10-page document: name, title and contacts first, then numbers, every project, all three design notes with diagrams, path and recognition. Preview: `print-preview.pdf` in this folder.
- Keyboard: work names are buttons, query rows open with Enter, the intro is a proper dialog with Skip focused first.
- Reduced-motion users get no pins, no loops and no intro game.

## Photos and video

- From your Photos library, favorites and non-favorites, location data stripped. New: Bellevue street shoot (hero cutout), gym mirror, Seattle Ferris wheel, Brooklyn Bridge at night, Andaman night sky, Mt. Baker road, plus earlier picks.
- Cutouts made on your Mac with Apple Vision (free, on-device). Duotones, contour lines and stickers made with ImageMagick and a small script (`scripts/make-topo.mjs`).
- New hero clip `hero-2026-hd.mp4` (2026 Seattle denim clips, Glacier, Squamish). The old hero clip had a CapCut watermark and is not in v2.

## Copy source (2026-10-17)

All write-ups follow the **v9** resume (`resume/output/2026-10-13_v9-marked/`, Data-Engineering-Manager YAML), at your choice over v10-public: impact first, then the hard part, then the stack. So the site carries the internal figures v10-public removed: 7M / 5.5M members, 4M + 3M customers, 4M subscriptions in 3 months, ~30K overlap, 0.9% vs 8.2%, "a major US cable partner", "a top Latin American market's biggest telecom deal". Work list follows your resume ranking: Deal agent, Auto-activation, Sentinel, Deal deep dive, Launch-day model, Activation funnel, then the two side projects. The injury classifier is in Path only.

## Decisions for you

1. **Headline "Data @ Amazon"** puts the employer in the hero, as you asked. Your LinkedIn voice rule keeps it out of prose; check you're fine with it here, and with employer PR for the 7M figure.
2. **Claims on your word**, now public: launched, 6 months replaced in week one, 7M / 5.5M, 10 days to 10 min, top 20 of 1,100.
3. **Mauricio**: the futures card says "with a research partner". Name him?
4. **Stickers** use a gym mirror selfie and the Naches photo. Swap if you prefer others.
5. **Game length**: 7 catches or 10 seconds. Shorter or longer?
6. Which version ships: v1 (`redesign-2026-10`), v2, or a mix.

## Known gaps

- Phone layout checked only in narrow iframes, not on a real phone.
- The browser test tool disconnected late in the night; the last changes were checked by code review and unit tests instead of screenshots.
