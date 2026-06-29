# Karakeep

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=karakeep&type=stack)

[Karakeep](https://karakeep.app) (formerly Hoarder) - a self-hosted
"bookmark everything" app: save links, notes, and images, and it
automatically crawls and archives the page (so your links never rot),
takes a screenshot, full-text indexes everything, and can auto-tag with
AI. Native mobile apps and a browser extension included.

## What runs

Three services:

- **karakeep** - the app and built-in workers (port 5000).
- **meilisearch** - full-text search index (private).
- **chrome** - a headless Chromium for crawling and screenshots, reached
  over its remote-debugging port; a thin wrapper bakes the launch flags
  (private).

The database is embedded SQLite under `/data`, so no external Postgres or
Redis is needed.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # the first signup becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `karakeep`. Meilisearch
and Chrome run as **private** sidecars; only `karakeep` is public.
Required variables:

- **`NEXTAUTH_SECRET`** - `openssl rand -base64 36`.
- **`MEILI_MASTER_KEY`** - identical on the app and Meilisearch.
- **`NEXTAUTH_URL`** - the app's https domain, set after first deploy.

The first signup becomes admin; then set `DISABLE_SIGNUPS=true` and
redeploy to lock it down. AI auto-tagging is optional - set
`OLLAMA_BASE_URL` to point at this catalogue's **ollama** or **litellm**
(keeping inference on your own infrastructure), or `OPENAI_API_KEY`.

Raindrop.io's Pro plan is $3/month and Pocket shut down in 2025; Karakeep
gives you archiving, search, and AI tagging on infrastructure you own.
AGPL-3.0.
