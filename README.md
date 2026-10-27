# Hardi Mehta — Portfolio

Personal site for Hardi Mehta, Senior Software Engineer. A single scroll-driven
page — hero → about → services → skills → experience → projects → education →
contact — with the long detail on `/experience` and `/projects/<id>`.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript), `output: "export"` |
| Styling | Tailwind CSS v4 — tokens live in `@theme` in `src/app/globals.css` |
| Scroll | Lenis + GSAP `ScrollTrigger` |
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

`useTheme` is backed by a module-level store via `useSyncExternalStore` so
every consumer reads one value. With per-hook `useState` the toggle and the
chrome could disagree about the current theme.

## Contact form

The site is a static export, so it has no server of its own.
`tools/contact-relay.gs` is one: a Google Apps Script web app that appends each
message to a Google Sheet and pushes it to Telegram. Its header has the setup
steps — create the sheet, make a bot with `@BotFather`, add the token and chat
id as Script Properties, deploy as a web app, then set:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=<the /exec URL>
```

Without that variable the form composes a prefilled message in the visitor's
own mail client instead, so nothing is lost before the relay exists.

The relay is there so the bot token stays server-side. Calling Telegram
straight from the page would work, but the token would ship in the JavaScript
bundle, and a leaked bot token lets a stranger post as the bot and read
everything it receives. The endpoint URL *is* public — it only accepts
messages, and a hidden honeypot field drops the obvious bots.

## Content

Everything the page says lives in `src/content/` (`profile`, `experience`,
`projects`, `skills`). Sections are presentational; edit the data, not the JSX.

## Motion, performance and accessibility

Every animation is inside a `gsap.matchMedia()` block gated on
`prefers-reduced-motion: no-preference`. For anyone who prefers reduced motion:
no reveals, no stagger, no card lift — the page is the plain document.

There was a WebGL backdrop here once, behind a capability check that rejected
software rasterisers before importing three.js. The scene was removed in
favour of illustrations, and three.js, `@react-three/fiber` and `drei` went
with it.

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

## Illustrations

The hero, About and contact sections each use a 3D-rendered illustration from
`public/`: `hero-desk.webp`, `about-wave.webp` and `contact-point.webp`. They
carry their own backgrounds, so they are placed without a card or border —
anything added around them competes with the artwork.

`public/hardi-mehta.jpg` is a photograph, currently unused: the illustrations
took both slots it was a candidate for.

## Still to add

- `public/audio/ambient.mp3` — a royalty-free loop. Until it exists the sound
  toggle still works and drives the synthesised UI ticks; it simply has nothing
  to loop.
- Repo / live links for the personal projects in `src/content/projects.ts`.
  Cards omit their link row while `links` is empty.
- The production domain, currently `https://hardimehta.dev` in
  `src/app/layout.tsx`, `sitemap.ts` and `robots.ts`.
- A GitHub URL in `src/content/profile.ts`. While `github` is empty the hero
  and footer omit that icon rather than linking to a guess.
