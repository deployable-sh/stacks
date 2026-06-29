# Twenty

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=twenty&type=stack)

[Twenty](https://twenty.com) - the open-source CRM rethought for this
decade: a modern data model (any object, custom fields), pipelines,
notes, tasks, email sync, and workflows. Server + worker from one image
on a managed Postgres, with a noeviction Valkey for the job queue.

## Topology

| Service | Role | Public |
|---|---|---|
| `server` | app + API (`:5000`); runs migrations on start | yes |
| `worker` | BullMQ jobs: email sync, imports, workflows, webhooks | no |
| `broker` | Valkey, noeviction (BullMQ requirement) | no |
| `db` | Postgres 16 - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `twenty`. The managed
Postgres is provisioned and auto-wired. Required variables:
**`ENCRYPTION_KEY`** (`openssl rand -base64 32`) and **`REDIS_AUTH`**.
After first deploy set **`SERVER_URL`** to the app's https domain - it
must match exactly (mismatch is the classic Twenty 403). First signup
creates your workspace.

File attachments live on the shared volume (S3 supported via
`STORAGE_TYPE=s3` + `STORAGE_S3_*` for a stateless pair). License:
AGPL core with a handful of enterprise-marked files - the CRM itself is
not gated.
