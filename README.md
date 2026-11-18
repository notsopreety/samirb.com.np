# samirb.com.np

Personal portfolio and blog of **Samir Badaila** — backend developer.

Live: [samirb.com.np](https://samirb.com.np)

Built with [Astro 7](https://astro.build), TypeScript, and plain CSS. Deployed on Vercel.

## Features

- **Portfolio** — hero, skills, recent posts, and social links.
- **Discord presence card** — live status, avatar, badges, and clan via [Lanyard](https://github.com/Phineas/lanyard), hydrated from the Discord profile API.
- **Spotify page** — server-rendered recent streams, top tracks, artists, and genres from a personal Spotify API. Calls are retried, time-boxed, and cached for 60 seconds.
- **Blog** — MDX/Markdown posts with tags, archive, pagination, RSS feed, and generated Open Graph images.
- **Theming** — light/dark toggle with Material 3–inspired colors. The dark accent syncs with the Discord banner color.
- **Extras** — Giscus comments, Web3Forms contact page, Astro view transitions, Vercel Speed Insights, and the oneko cat.

## Requirements

- Node.js `>= 22.12.0`
- [pnpm](https://pnpm.io)

## Getting started

```sh
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4321`.

Useful commands:

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm dev`     | Start the local dev server                  |
| `pnpm build`   | Build the production output                 |
| `pnpm preview` | Preview the production build locally        |
| `pnpm astro`   | Run Astro CLI commands (e.g. `astro add`)   |

## Configuration

Site-wide settings live in [`src/config/portfolioData.ts`](src/config/portfolioData.ts):

- `SITE_DOMAIN` / `SITE_URL`
- personal info, social links, and Discord ID
- light/dark accent colors and Discord accent sync flags
- Giscus and contact-form settings

The Discord ID, Web3Forms access key, and Giscus IDs are public client-side identifiers, so no environment variables are required.

## Content

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files:

```md
---
title: "Post title"
description: "Short description"
pubDatetime: 2026-01-01
tags: ["astro", "backend"]
draft: false
---

Post content…
```

Tags, archive, and RSS update automatically from the frontmatter.

## Project structure

```text
src/
├── components/     # Hero, Skills, Connect, LanyardCard, ReportModal
├── config/         # Site and personal data
├── content/blog/   # Blog posts
├── layouts/        # Shared Layout, theme, nav, footer
├── pages/          # Routes (index, about, posts, spotify, rss, robots, …)
└── styles/         # global.css and theme tokens
public/             # Static assets (fonts, icons, oneko)
```

## Deployment

The project uses the [`@astrojs/vercel`](https://docs.astro.build/en/guides/deploy/vercel/) adapter. Most routes are static; `/spotify` is server-rendered (`prerender = false`) so its data stays fresh. Push to `main` and let Vercel build and deploy.

## License

Personal project — content and design belong to Samir Badaila. Code is available for reference.
