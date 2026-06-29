# SearXNG

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=searxng&type=stack)

[SearXNG](https://docs.searxng.org) - a privacy-respecting metasearch
engine: it queries 200+ search engines and aggregates the results with no
tracking, no profiling, and no ads. Run it as your private search
homepage, or point AI / RAG tools at it as a web-search backend. The
image self-serves HTTP (via Granian) on port 5000 - no separate proxy
needed.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `searxng`.
`SEARXNG_PORT=5000` puts it on Miget's public port. Required variables:

- **`SEARXNG_SECRET`** - a long random string. Set it explicitly so it
  survives redeploys (otherwise sessions reset on restart).
- **`SEARXNG_BASE_URL`** - the app's https domain, with a trailing slash.

The generated `settings.yml` and cache live on small volumes. For a
**public, rate-limited** instance, attach a managed Valkey and set
`SEARXNG_VALKEY_URL=valkey://...` plus `SEARXNG_LIMITER=true`; a private
personal or RAG instance runs fine without it.

Pairs naturally with this catalogue's LLM stack - open-webui, litellm,
dify, and flowise can all use SearXNG as their web-search tool, keeping
search queries on your own infrastructure instead of a third-party API.
AGPL-3.0.
