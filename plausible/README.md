# Plausible (Community Edition)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=plausible&type=stack)

[Plausible](https://plausible.io) - privacy-friendly web analytics: a
lightweight, cookie-free, open-source Google Analytics alternative. A
clean single-page dashboard, no personal data collection, no consent
banner needed, and a script ~75x smaller than GA. This is the
self-hosted **Community Edition**.

## What runs

- **plausible** - the app (port 5000). A thin wrapper bakes the database
  create/migrate step that Plausible does not run automatically.
- **clickhouse** - stores the analytics events. Plausible needs
  ClickHouse and Miget has no managed equivalent, so it runs as a
  **private** sidecar; a thin wrapper bakes the four tuning configs from
  Plausible's official setup (it otherwise assumes a 16 GB+ box).
- **db** - managed Postgres for app data (users, sites, settings).

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # the first registration becomes the owner
```

## On Miget

Create a Compose Stack pointing at this repo, path `plausible`. The
managed Postgres is provisioned and auto-wired; ClickHouse runs as a
private sidecar with a 20 GB volume. Required variables:

- **`SECRET_KEY_BASE`** - at least 64 bytes (`openssl rand -base64 48`);
  keep it stable across deploys.
- **`BASE_URL`** - the app's https domain, matched exactly (login and
  WebSocket origin checks depend on it), set after first deploy.

The first account you register becomes the owner; later sign-ups are
invite-only by default. Give the stack ~3 GB total (the app ~1 GB,
ClickHouse ~2 GB).

You already have lighter analytics here (umami); Plausible adds funnels,
goals, and a more polished dashboard. Plausible's own cloud starts at
$9/month metered by pageviews; self-hosted is one flat plan with your
visitor data on your own infrastructure. AGPL-3.0.
