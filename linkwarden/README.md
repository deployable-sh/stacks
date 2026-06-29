# Linkwarden

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=linkwarden&type=stack)

[Linkwarden](https://linkwarden.app) - a bookmark manager that actually
keeps your links: every save is preserved as a screenshot, PDF, readable
HTML, and an archive.org snapshot, so a dead page is still readable years
later. Collections, tags, full-text search, sharing. One app + a managed
Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `linkwarden` | app + archiving (`:3000`, fixed) | no |
| `web` | nginx `:5000` -> `linkwarden:3000` | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `linkwarden`. The
managed Postgres is auto-wired. Required variables: **`NEXTAUTH_SECRET`**
and **`NEXTAUTH_URL`** - which must include the **`/api/v1/auth`**
suffix (e.g. `https://links.example.com/api/v1/auth`). Set
`DISABLE_REGISTRATION=true` once your accounts exist.

Archiving runs an in-container headless Chromium (screenshots, PDFs),
so give it ~1 GiB; set `DISABLE_PRESERVATION=true` for a lighter
bookmarks-only mode. Archives live on the `/data/data` volume.

Why self-host this: Pocket shut down in 2025 and deleted everyone's
saved articles; Raindrop holds your data on their servers. Linkwarden
keeps your library - and readable copies of it - on infrastructure you
control.
