# Bugsink

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=bugsink&type=stack)

[Bugsink](https://www.bugsink.com), self-hosted error tracking compatible
with the Sentry SDKs, in a single container. The lightest way to own your
error data: one app + one managed Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `bugsink` | UI + API + ingestion (`:5000`); runs its own migrations on start | yes |
| `db` | Postgres, real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env
docker compose up -d
open http://localhost:5000     # log in with ADMIN_EMAIL / ADMIN_PASSWORD
```

## On Miget

Create a Compose Stack pointing at this repo. The managed Postgres is
provisioned and `DATABASE_URL` auto-wired; required variables are
**`SECRET_KEY`** (`openssl rand -hex 32`) plus **`ADMIN_EMAIL`** /
**`ADMIN_PASSWORD`** for the first superuser.
After first deploy, set `BASE_URL` to the app's https domain and redeploy, 
DSNs and links use it.

Create a project in the UI and point any Sentry SDK at its DSN.
