# Miniflux

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=miniflux&type=stack)

[Miniflux](https://miniflux.app) - a minimalist, blazing-fast RSS/Atom
reader: a clean distraction-free UI, keyboard-driven, with full-text
fetching, a REST API, and Google Reader / Fever API compatibility (so
mobile clients like Reeder and NetNewsWire connect). A single stateless
Go binary on a managed Postgres.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # log in with ADMIN_USERNAME / ADMIN_PASSWORD
```

## On Miget

Create a Compose Stack pointing at this repo, path `miniflux`. The
managed Postgres is provisioned and auto-wired (migrations run on start -
no extensions or superuser needed). Required variable:
**`ADMIN_PASSWORD`** (with `ADMIN_USERNAME`). After first deploy set
**`BASE_URL`** to the app's https domain.

The app is fully stateless - all feeds and read state live in Postgres,
so redeploys and rollbacks are trivial. It idles in ~50 MB.

Feedly Pro is $7/month, Inoreader Pro ~$7-9 - Miniflux self-hosted is
$7/month flat with no source limit and your reading data on your own
infrastructure. Apache-2.0.
