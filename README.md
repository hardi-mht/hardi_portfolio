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

## Content

Everything the page says lives in `src/content/` (`profile`, `experience`,
`projects`, `skills`). Sections are presentational; edit the data, not the JSX.

## Motion and accessibility

Every animation is inside a `gsap.matchMedia()` block gated on
`prefers-reduced-motion: no-preference`. For anyone who prefers reduced motion:
no pinning, no parallax, no WebGL canvas, and the About panels sit in normal
document flow instead of stacking. The 3D scene is also skipped on devices with
four or fewer cores. The page is designed to look finished without it.

## Screenshots

`tools/shot.mjs` drives headless Chrome over CDP for full-page and
scroll-position captures:

```bash
node tools/shot.mjs http://localhost:3000 ./shots 1440 900
```

`SCROLL=0,900,2000` adds viewport captures at those offsets;
`REDUCED_MOTION=1` renders the page as a reduced-motion visitor sees it.

## Still to add

- `public/audio/ambient.mp3` — a royalty-free loop. Until it exists the sound
  toggle still works and drives the synthesised UI ticks; it simply has nothing
  to loop.
- Repo / live links for the personal projects in `src/content/projects.ts`.
  Cards omit their link row while `links` is empty.
- The production domain, currently `https://hardimehta.dev` in
  `src/app/layout.tsx`, `sitemap.ts` and `robots.ts`.
