# Portfolio Context

- Repo: portfolioo (Astro 7.4.2)
- Branch: master
- Last commit: f4828a7 "chore: track pnpm-lock.yaml"
- Note: Dual-agent setup (OpenCode + Antigravity) running concurrently. Always check git status before editing.

## Current State
- Starter files replaced with clean minimal portfolio layout and home page
- Background dev server active

## Plan
Building minimal dev portfolio. Keep changes small per ponytail rules. Coordinate non-conflicting edits via git and CONTEXT.md.

## Changes Log
- [2026-10-28] Init: noted other agent presence, created context tracking structure
- [2026-10-28] OpenCode: set title to "Dev Portfolio" and created minimal home page (commits 82116e3, 86cf76f)
- [2026-10-28] Antigravity: added .temp/ to .gitignore, committed agent rules & skills, verified dev runner
- [2026-10-28] Setup: copied astrofolio structure (config/content/pages/components/layouts/styles, astro config, deps)
- [2026-10-28] Rollback: reverted to after setup (before audit/env)
- [2026-10-28] Fixes: added missing assets, converted http->https shares, removed unused Welcome, cleaned dead ref
- [2026-10-28] Lanyard: improved profile/badges rendering from dcdn API
- [2026-10-28] Spotify: improved timestamp sync
- [2026-10-28] Fix: duplicate elapsedSpan
- [2026-10-28] Fix: added missing font
- [2026-10-28] Posts: added blog content and posts/tags/rss
- [2026-10-28] A11y: light contrast, reduced motion, sr-only, viewport
- [2026-10-28] Rollback: removed M3 changes
- [2026-10-28] Rollback: to responsive timeline
- [2026-10-28] Rollback: back to responsive timeline
- [2026-10-28] Rollback: to education matrix
- [2026-10-28] Refactor: globalize site domain
- [2026-10-28] SEO: meta tags
- [2026-10-28] Perf: lazy load badges
- [2026-10-28] SEO: use light.zip icons/manifest
- [2026-10-28] Chore: remove unused icons
- [2026-10-28] SEO: remove deleted favicons
- [2026-11-02] Fix: bust avatar/decor cache
- [2026-11-02] UI: responsive personal info
- [2026-11-02] Feat: add spotify page
- [2026-11-02] Rollback: spotify page
- [2026-11-02] UI: remake spotify page
- [2026-11-03] Feat: last played spotify
- [2026-11-03] Fix: parse spotify recent api
- [2026-11-03] Feat: separate last played card
- [2026-11-03] UI: no rotation for last played
- [2026-11-03] Feat: build spotify page
- [2026-11-03] UI: add ranking indicators
- [2026-11-03] Feat: show more for spotify lists
- [2026-11-03] UI: minimal show more
- [2026-11-03] UI: center show more
- [2026-11-03] UI: leaderboard style for artists
- [2026-11-03] Rollback: genre style
- [2026-11-03] UI: genres like tags
- [2026-11-03] UI: top artists like top tracks
- [2026-11-03] Feat: link spotify cards to /spotify
- [2026-11-03] Feat: add spotify links
