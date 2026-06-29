# Open Mercato

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=open-mercato&type=stack)

[Open Mercato](https://github.com/open-mercato/open-mercato) - the MIT
"AI-engineering foundation framework": multi-tenant CRM/ERP/commerce
modules on Next.js with RBAC, dynamic entities, and an agent-ready repo
layout (specs + skills checked in). Start business apps at "80% done".

**Experimental**: no published images upstream yet, so the app builds
from the official repo (git build context, upstream's own Dockerfile) -
first build takes a while.

## Topology

| Service | Role | Public |
|---|---|---|
| `app` | Next.js app + admin at `/backend` (`:5000`) | yes |
| `db` | Postgres + **pgvector** - deliberately not the managed Postgres (extension required) | no |
| `cache` | Valkey, bounded LRU cache | no |
| `search` | Meilisearch v1.11 | no |

Mirrors upstream's `docker-compose.fullapp.yml` minus the optional
opencode agent container and localstack.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000/backend
```

## On Miget

Create a Compose Stack pointing at this repo, path `open-mercato`.
Required variables: **`JWT_SECRET`**, **`MEILISEARCH_MASTER_KEY`**,
**`TENANT_DATA_ENCRYPTION_KEY`** (32 chars - encrypts tenant data),
**`OM_INIT_SUPERADMIN_EMAIL`** / **`OM_INIT_SUPERADMIN_PASSWORD`**.
After first deploy set **`APP_URL`** to the app's https domain and
redeploy.

The init step runs once (marker volume) and migrations run on every
deploy. Attachments persist on their own volume. Track upstream by
redeploying - the build context follows the default branch; pin a
commit/tag in `compose.yaml` for reproducibility.
