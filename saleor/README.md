# Saleor

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=saleor&type=stack)

[Saleor](https://saleor.io) - headless, GraphQL-first e-commerce (BSD-3):
the API your custom storefront talks to, with a polished dashboard for
the team. Official images, mirrored from the saleor-platform compose.

## Topology

| Service | Role | Public |
|---|---|---|
| `api` | Saleor core - GraphQL at `/graphql/` (`:8000`) | no |
| `worker` | Celery worker + beat | no |
| `migrate` | idempotent migrations + superuser bootstrap, then idles | no |
| `dashboard` | admin SPA (`:80`, API_URL substituted at runtime) | no |
| `web-api` / `web-dashboard` | nginx `:5000` proxies - the two public apps | yes |
| `broker` | Valkey, noeviction (Celery queues + cache) | no |
| `db` | Postgres 15 - **managed Postgres on Miget** | no |

Two proxies because the platform gives each app exactly one public port:
the API and the dashboard each get their own domain. The media volume is
shared by api and worker (RWX).

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5001            # dashboard (login: ADMIN_EMAIL/PASSWORD)
curl http://localhost:5000/graphql/   # API
```

## On Miget

Create a Compose Stack pointing at this repo, path `saleor`. Required
variables: **`SECRET_KEY`**, **`REDIS_AUTH`**, **`ADMIN_EMAIL`** /
**`ADMIN_PASSWORD`**. After first deploy, set **`PUBLIC_URL`** +
**`API_URL`** (api domain, `/graphql/` suffix on API_URL),
**`DASHBOARD_URL`** (dashboard domain), and **`ALLOWED_HOSTS`** /
**`ALLOWED_CLIENT_HOSTS`** (both domains) - then redeploy.

Saleor is headless: bring a storefront (their Next.js starter works out
of the box against your API). Keep the api and dashboard image tags on
the same minor version when upgrading.
