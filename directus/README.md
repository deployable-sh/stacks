# Directus

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=directus&type=stack)

[Directus](https://directus.io) 11 - an instant headless CMS and
REST/GraphQL API over Postgres, with a data studio your editors will
actually enjoy. One app container + a managed Postgres + an uploads
volume.

## Topology

| Service | Role | Public |
|---|---|---|
| `directus` | studio + REST/GraphQL API (`:5000`) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `directus`. The
managed Postgres is provisioned and auto-wired; required variables:
**`SECRET`** (`openssl rand -hex 32`), **`ADMIN_EMAIL`** /
**`ADMIN_PASSWORD`** (bootstrap admin, first init only). After first
deploy set **`PUBLIC_URL`** to the app's https domain and redeploy.

File uploads live on the volume; everything else (collections, content,
users, permissions) in Postgres. Realtime websockets are opt-in upstream
(`WEBSOCKETS_ENABLED=true`) if you need live queries.

License note: Directus is BSL-1.1 (source-available) - free to self-host
for internal use; check upstream terms if you resell Directus itself.
