# Convex (self-hosted)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=convex&type=stack)

[Convex](https://convex.dev) backend-as-a-service, self-hosted: reactive
database + functions + scheduler, with the dashboard. SQLite state on a
volume; the open-source backend serves one deployment.

## Topology

| Service | Role | Public |
|---|---|---|
| `backend` | Convex backend (API `:3210`, HTTP actions `:3211`) | no |
| `api` | nginx → `backend:3210`, the client/deploy origin | yes |
| `site` | nginx → `backend:3211`, HTTP actions origin | yes |
| `dashboard` | web dashboard (admin-key login) | yes |

Two proxies because Convex serves two origins from one process and each
platform app publishes exactly one port.

## Local

```bash
cp .env.example .env && docker compose up -d --build
docker compose exec backend ./generate_admin_key.sh   # login for dashboard/CLI
open http://localhost:6791
```

## On Miget

Create a Compose Stack pointing at this repo. One required variable:
**`INSTANCE_SECRET`** (`openssl rand -hex 32`). After the first deploy:

1. Set `CONVEX_CLOUD_ORIGIN` to the **api** app's https domain and
   `CONVEX_SITE_ORIGIN` to the **site** app's https domain; redeploy.
2. Generate the admin key from the backend app's console:
   `./generate_admin_key.sh`, use it to log into the dashboard and for
   `npx convex deploy` (`CONVEX_SELF_HOSTED_URL` = the api domain,
   `CONVEX_SELF_HOSTED_ADMIN_KEY` = the key).

Keep every service at 1 replica; the backend is single-instance (SQLite).
Postgres-backed mode is an upstream option for a future variant.
