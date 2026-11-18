# samirb.com.np

Personal portfolio and blog of **Samir Badaila** — backend developer based in Kathmandu, Nepal.

Live: [samirb.com.np](https://samirb.com.np)

Built with [Astro 7](https://astro.build), TypeScript, and plain CSS. Deployed on Vercel.

## Tech stack

| Layer      | Choice                                              |
| :--------- | :-------------------------------------------------- |
| Framework  | Astro 7 (static output + one server-rendered route) |
| Language   | TypeScript, MDX/Markdown                            |
| Styling    | Plain CSS with theme tokens                         |
| Deployment | Vercel (`@astrojs/vercel`)                          |
| Extras     | Satori + Sharp (OG images), Giscus, Web3Forms       |

## Features

- **Portfolio** — hero, skills, journey/education, recent posts, and social links.
- **Discord presence card** — live status, avatar, badges, and clan via [Lanyard](https://github.com/Phineas/lanyard), hydrated from the Discord profile API. Survives Astro view transitions.
- **Spotify page** — server-rendered recent streams, top tracks, artists, and genres. Each call is time-boxed, retried once, cached for 60 seconds, and falls back to the last good data.
- **Blog** — MDX/Markdown posts with tags, archive, pagination, RSS, Giscus comments, and generated Open Graph images.
- **Theming** — light/dark toggle with Material 3–inspired colors. The dark accent syncs with the Discord banner color; the light accent is used as the pre-sync default.
- **Extras** — Astro view transitions, Vercel Speed Insights, Web3Forms contact page, post-report modal, and the oneko cat.

## Requirements

- Node.js `>= 22.12.0` (Vercel builds with Node 24)
- [pnpm](https://pnpm.io) (lockfile is `pnpm-lock.yaml`)

## Setup

```sh
# 1. Clone
git clone https://github.com/notsopreety/samirb.com.np.git
cd samirb.com.np

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

The site runs at `http://localhost:4321`.

### Build and preview

```sh
pnpm build
pnpm preview
```

`pnpm build` writes the static output and the Vercel server function to `dist/` and
`.vercel/output/`.

### Background dev server

Astro can manage the dev server in the background:

```sh
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

## Configuration guide

Almost everything site-specific lives in
[`src/config/portfolioData.ts`](src/config/portfolioData.ts).

### Site and metadata

```ts
SITE_DOMAIN; // used in titles, RSS, robots and canonical URLs
SITE_URL; // derived from SITE_DOMAIN
```

Change `SITE_DOMAIN` when deploying under a different hostname. `astro.config.mjs`
also contains the canonical `site` URL.

### Personal content

| Export           | Used for                                                    |
| :--------------- | :---------------------------------------------------------- |
| `personalInfo`   | Name, birthdate, location, email, bio, extra fields          |
| `heroData`       | Hero status line, title, subtitle, description, tagline      |
| `socialsData`    | Connect section (icon path, name, URL, brand color)          |
| `skillsData`     | "Stuff I Use" groups and badges                              |
| `journeyData`    | "My Journey" timeline                                        |
| `educationData`  | "Education Path" nodes and branches                          |
| `footerSocials`  | Footer GitHub, X, LinkedIn, and email links                  |

### Discord card

- `discordId` — the Discord user ID shown on the card.
- The card fetches the profile from `https://dcdn.dstn.to/profile/<id>` at render time
  and live presence from the Lanyard WebSocket.
- Name and username link to `https://discord.com/users/<id>`.

### Theme accents

```ts
lightModeAccentColor = "#006cac";
darkModeAccentColor = "#c78196";
syncDiscordAccentInDark = true; // dark accent follows Discord banner color
syncDiscordAccentInLight = false;
```

Base colors and all other theme tokens are CSS variables in
[`src/styles/global.css`](src/styles/global.css). Dark mode is the `:root` default;
light mode is under `[data-theme="light"]`. An inline head script applies the chosen
accent before first paint to avoid a flash.

### Contact form

The message page posts to [Web3Forms](https://web3forms.com). Replace
`web3FormsAccessToken` with your own access key. It is a public, client-side key by
design — there are no server secrets in the repo.

### Comments

`giscusConfig` holds the GitHub repo, category, and IDs for
[Giscus](https://giscus.app). Update these after installing the Giscus app on your
repository.

## Writing posts

Add `.md` or `.mdx` files to `src/content/blog/`. The filename is the URL slug.

```md
---
title: "Understanding APIs"
description: "A short summary used for cards, SEO, and RSS."
pubDatetime: 2026-01-01
modDatetime: 2026-02-01 # optional
tags: ["backend", "api"]
draft: false # true hides the post
ogImage: "/android-chrome-512x512.png" # optional
---

Post content…
```

Tags, archive pages, RSS, and pagination are generated automatically. Open Graph
images are generated from post data at build time using Satori and Sharp.

### Routes

| Route                  | Description                              |
| :--------------------- | :--------------------------------------- |
| `/`                    | Home: hero, skills, connect, latest post |
| `/about`               | Profile, education, and journey          |
| `/posts`               | Blog index with pagination               |
| `/posts/[slug]`        | Post page with comments                  |
| `/archive`             | All posts by year                        |
| `/tags`, `/tags/[tag]` | Tag index and filtered lists             |
| `/spotify`             | Server-rendered listening stats          |
| `/message`             | Contact form                             |
| `/rss.xml`             | RSS feed                                 |
| `/robots.txt`          | Robots + sitemap                         |

## Project structure

```text
src/
├── assets/         # SVG artwork
├── components/     # Hero, Skills, Connect, LanyardCard, ReportModal
├── config/         # Site, personal, skills, journey data
├── content/blog/   # Blog posts
├── layouts/        # Shared layout, theme, nav, footer
├── pages/          # Routes and endpoints
└── styles/         # global.css and theme tokens
public/             # Fonts, icons, oneko.js/oneko.gif, manifest
```

## How live data works

**Discord card** — `LanyardCard.astro` renders the profile server-side, then opens a
Lanyard WebSocket for presence updates (`window.__lanyardWS`). The socket is
re-established on `astro:after-swap` so it keeps updating across view transitions.
DOM updates are guarded by fingerprints to avoid image/API loops.

**Spotify page** — `src/pages/spotify.astro` is server-rendered (`prerender = false`)
and pulls from:

```text
https://api.samirbadaila.com.np/api/spotify/recent
https://api.samirbadaila.com.np/api/spotify/top/tracks
https://api.samirbadaila.com.np/api/spotify/top/artists
https://api.samirbadaila.com.np/api/spotify/top/genres
```

Each request has a 5-second timeout, one retry, and a 60-second in-memory cache.
If the API is unreachable, the last successful response is reused instead of showing
an empty section.

## Deployment

The project uses the Vercel adapter. Most pages are static; `/spotify` is the only
server-rendered route, so it is built as a Vercel function.

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Keep the detected framework preset as **Astro** and build with `pnpm build`.

No environment variables are required. Vercel may warn if your local Node version
differs from its Node 24 runtime; the build still succeeds.

## Troubleshooting

| Symptom                              | Check                                                                 |
| :----------------------------------- | :-------------------------------------------------------------------- |
| Discord card shows placeholders      | `discordId` is correct and Lanyard/dcdn are reachable                  |
| Spotify page shows no data           | The Spotify API above returns `{ success: true, data: {...} }`         |
| Accent color looks stale             | Clear `localStorage` keys `theme` and `discord-accent`                 |
| Fonts or oneko return 404            | Assets must exist under `public/fonts` and `public/oneko.*`           |
| Theme flashes on load                | Keep the inline theme script in `<head>` before styles                |

## Scripts

| Command        | Action                            |
| :------------- | :-------------------------------- |
| `pnpm dev`     | Start the dev server              |
| `pnpm build`   | Build for production              |
| `pnpm preview` | Preview the production build      |
| `pnpm astro`   | Run Astro CLI commands            |
| `pnpm stop`    | Stop a background dev server      |

## Credits

- [Astro](https://astro.build) — framework
- [Lanyard](https://github.com/Phineas/lanyard) and [dcdn](https://dcdn.dstn.to) — Discord presence
- [oneko.js](https://github.com/adryd325/oneko.js) — the cat
- [Giscus](https://giscus.app) — comments
- [Web3Forms](https://web3forms.com) — contact form
- [Satori](https://github.com/vercel/satori) + [Sharp](https://sharp.pixelplumbing.com) — OG images

## License

Personal project — content, writing, and design belong to Samir Badaila. The code is
shared for reference.
