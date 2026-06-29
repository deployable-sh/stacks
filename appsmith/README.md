# Appsmith

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=appsmith&type=stack)

[Appsmith](https://www.appsmith.com) CE - the open-source low-code builder
for internal tools: drag-and-drop UI over your databases and APIs, with JS
everywhere you need logic. All-in-one image (embedded MongoDB, Redis and
Postgres).

## Topology

Single service. Appsmith's bundled Caddy honours the `PORT` env, so it
serves the whole stack (UI + `/api` backend + Socket.IO realtime, all with
websockets) directly on `:5000` - the platform's public HTTP port. No
separate proxy is needed.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000        # create the first admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `appsmith`. No required
variables, but set **`APPSMITH_ENCRYPTION_PASSWORD`** and
**`APPSMITH_ENCRYPTION_SALT`** from day one - they encrypt datasource
credentials, and backups/migrations are unreadable without the original
values. Sign-ups after the first account are invite-only by default.

All state (embedded databases, config) lives on the `/appsmith-stacks`
volume. Keep `replicas` at 1.

Scaling note: the embedded databases make this the simplest shape, not the
most scalable one. Appsmith supports an external MongoDB (must be a
replica set, 5.0+, `APPSMITH_DB_URL`) and external Redis
(`APPSMITH_REDIS_URL`) - this catalogue's `mongodb` template is exactly
that replica set if you outgrow the embedded one.
