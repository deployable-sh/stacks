# Dawarich

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=dawarich&type=stack)

[Dawarich](https://dawarich.app) - self-hosted location history: a
privacy-first replacement for Google Maps Timeline. Import your location
history from Google Takeout, OwnTracks, Overland, or GPX, and explore your
trips, visited places, cities and countries, and stats on your own map -
with none of it sent to Google.

> Status: **experimental** - a four-service stack with a hard PostGIS
> dependency. Everything is wired and validated, but it is heavier than a
> single-container app.

## What runs

- **web** - the app and map UI (port 5000).
- **sidekiq** - background worker (imports, reverse geocoding, stats).
- **db** - PostgreSQL with **PostGIS**. Managed Postgres may not provide
  PostGIS, so this runs as a private sidecar on the expected image.
- **redis** - Valkey (job queue, cache). Managed on Miget.

The same image runs `web` and `sidekiq`, selected by `DAWARICH_ROLE` via a
thin wrapper; they share the storage volumes.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `dawarich`. The managed
Valkey is auto-wired; the PostGIS database and the worker run as
**private** sidecars, and only `web` is public. Required variables:

- **`SECRET_KEY_BASE`** - `openssl rand -hex 64`.
- **`DB_PASSWORD`** - the PostGIS database password.
- **`APPLICATION_HOSTS`** - the app's https domain. It **must** be listed
  here or Rails blocks every request. `APPLICATION_PROTOCOL` is set to
  `https`.

For the first login, set `ALLOW_EMAIL_PASSWORD_REGISTRATION=true` to
self-register, or use the seeded `demo@dawarich.app` / `password` account
and change it immediately. Your imported location data lives in PostGIS
and on the `storage` volume; give the stack ~4 GB of RAM.

Google Maps Timeline mines your every move; Dawarich keeps your entire
location history on infrastructure you own. AGPL-3.0.
