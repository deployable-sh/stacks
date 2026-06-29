# GlitchTip

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=glitchtip&type=stack)

[GlitchTip](https://glitchtip.com), open-source, Sentry-API-compatible
error tracking (point any Sentry SDK at its DSN) at a fraction of
self-hosted Sentry's footprint.

## Topology

| Service | Role | Public |
|---|---|---|
| `web` | UI + API (`:5000`) | yes |
| `worker` | Celery worker + beat | no |
| `migrate` | idempotent Django migrations, then idles | no |
| `db` / `queue` | Postgres / Valkey, real containers locally, **managed services on Miget** | no |

## Local

```bash
cp .env.example .env
docker compose up -d
open http://localhost:5000     # register the first user (becomes superuser)
```

## On Miget

Create a Compose Stack pointing at this repo. Managed Postgres + Valkey are
provisioned and auto-wired; the only required variable is **`SECRET_KEY`**
(`openssl rand -hex 32`). After first deploy, set `GLITCHTIP_DOMAIN` on the
web app to its https domain (used in emails and DSN display) and redeploy.

Then create an organization + project in the UI and point your Sentry SDK
at the project's DSN. Open user registration is disabled by default
(`ENABLE_OPEN_USER_REGISTRATION`).
