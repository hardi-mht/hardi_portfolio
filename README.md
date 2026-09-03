# Hardi Mehta — Portfolio

Personal site for Hardi Mehta, Senior Software Engineer. A single scroll-driven
page: hero → about → experience → Clara case study → projects → skills →
education → contact.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript), `output: "export"` |
| Styling | Tailwind CSS v4 — tokens live in `@theme` in `src/app/globals.css` |
| Scroll | Lenis + GSAP `ScrollTrigger` |
| 3D | three.js via `@react-three/fiber` / `drei` — procedural, no model assets |
| Audio | Web Audio for UI ticks; Howler (lazy) for an optional ambient loop |
| Icons | lucide-react |

## Develop

```bash
npm run dev     # dev server
npm run build   # static export to ./out
```

`npm run build` emits a fully static site — deploy `out/` anywhere (Vercel,
Cloudflare Pages, Netlify, S3).

## Theming

Three states: **system** (the default), **light**, **dark**. The choice cycles
from the control dock at the bottom-right and persists in `localStorage`; a
blocking script in `<head>` applies it before first paint so there is no flash.

The palette is two *groups*, not two themes:

| group | tokens |
|---|---|
| base | `bg` `surface` `border` `text` `muted` `accent` `on-accent` |
| inverted | `inverted` `inverted-surface` `ink` `ink-muted` `accent-ink` |

Alternating sections (Experience, Skills) render in the inverted group.
Switching theme swaps the two groups wholesale, so those sections keep
inverting — they just start from the other end, and no component needs a
light-mode variant.

Accent values are *not* mirrored: `#22d3ee` on `#f4f4f5` is 1.9:1. Light mode
uses cyan-800 / violet-700, which clear 4.5:1 as text, as a 10% tint behind
accent-coloured text, and behind white on a filled button.

`useTheme` is backed by a module-level store via `useSyncExternalStore`,
because the WebGL scene reads the theme too — with per-hook `useState` the
canvas kept rendering the previous palette after a toggle.

## Content

Everything the page says lives in `src/content/` (`profile`, `experience`,
`projects`, `skills`). Sections are presentational; edit the data, not the JSX.

## Motion, performance and accessibility

Every animation is inside a `gsap.matchMedia()` block gated on
`prefers-reduced-motion: no-preference`. For anyone who prefers reduced motion:
no pinning, no parallax, no WebGL canvas, and the About panels sit in normal
document flow instead of stacking.

`SceneMount` decides whether the WebGL chunk is fetched **before** importing
it — the check itself pulls in no three.js. It rejects four-or-fewer-core
machines, small-core touch devices, and *software rasterisers* (SwiftShader,
llvmpipe), which cost seconds of main-thread time rather than milliseconds.
Putting that check inside the scene instead still made every visitor download
and parse three.js before deciding to render nothing. The page is designed to
look finished without it.

Lighthouse on the production build: **100 / 100 / 100 / 100** desktop and
**95-99** mobile, in both themes. Measure on an unloaded machine — Lighthouse's
CPU throttling amplifies background load badly enough to swing TBT by 50x.

## Screenshots

`tools/shot.mjs` drives headless Chrome over CDP for full-page and
scroll-position captures:

```bash
node tools/shot.mjs http://localhost:3000 ./shots 1440 900
```

`SCROLL=0,900,2000` adds viewport captures at those offsets;
`REDUCED_MOTION=1` renders the page as a reduced-motion visitor sees it.

## The character

The hero shows a figure working at a desk who stands and turns toward the
reader as you scroll into About. Two implementations share one rig:

- `public/models/avatar.glb` — a rigged full-body GLB (built for a **Ready
  Player Me** export). Used whenever the file is present.
- `src/components/three/Figure.tsx` — a stand-in built from primitives, used
  when it is not.

`next.config.ts` checks for the file at build time and sets
`NEXT_PUBLIC_HAS_AVATAR`, so no model request is made when there is no model.
**Adding the file needs a dev-server restart.**

No animation clips are involved. `src/components/three/poses.ts` holds a seated
and a standing pose as rest-relative bone rotations, and scroll progress slerps
between them. Rig naming is Mixamo-style (`Hips`, `Spine`, `LeftArm`,
`LeftForeArm`, `LeftUpLeg`, `LeftLeg`, `Head`, …); a `mixamorig:` prefix is
stripped automatically. Expect to tune the arm and leg axes in `poses.ts` once
a real rig is in place — sign conventions differ between exporters.

## Still to add

- `public/audio/ambient.mp3` — a royalty-free loop. Until it exists the sound
  toggle still works and drives the synthesised UI ticks; it simply has nothing
  to loop.
- Repo / live links for the personal projects in `src/content/projects.ts`.
  Cards omit their link row while `links` is empty.
- The production domain, currently `https://hardimehta.dev` in
  `src/app/layout.tsx`, `sitemap.ts` and `robots.ts`.
- `public/models/avatar.glb` — see **The character** above. Without it the
  scene falls back to the coded stand-in.
