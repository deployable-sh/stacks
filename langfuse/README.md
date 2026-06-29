# Langfuse

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=langfuse&type=stack)

[Langfuse](https://langfuse.com) v3 - open-source LLM engineering
platform: tracing, evaluations, prompt management, and usage dashboards.
This template mirrors the official self-host topology.

## Topology

| Service | Role | Public |
|---|---|---|
| `web` | Langfuse UI + API (`:5000`) | yes |
| `worker` | async ingestion/processing | no |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |
| `clickhouse` | single-node ClickHouse (traces/analytics) | no |
| `cache` | Valkey wrapper - `maxmemory-policy=noeviction` (required) | no |
| `blob` | MinIO wrapper - S3 event/media store, bucket pre-created | no |

ClickHouse runs single-node with `CLICKHOUSE_CLUSTER_ENABLED=false` (no
Keeper needed). The Valkey wrapper exists because Langfuse queues jobs in
it and eviction would lose events.

## Local

```bash
cp .env.example .env        # six secrets, openssl one-liners inline
docker compose up -d --build
open http://localhost:5000  # create the first user + organization
```

## On Miget

Create a Compose Stack pointing at this repo, path `langfuse`. The managed
Postgres is provisioned and auto-wired; required variables:
**`NEXTAUTH_SECRET`**, **`SALT`** (both `openssl rand -base64 32`),
**`ENCRYPTION_KEY`** (`openssl rand -hex 32`, exactly 64 hex chars),
**`CLICKHOUSE_PASSWORD`**, **`REDIS_AUTH`**, **`MINIO_ROOT_PASSWORD`**.
After first deploy set **`NEXTAUTH_URL`** to the web app's https domain
and redeploy.

Point SDKs at the web app's domain (`LANGFUSE_HOST`) with keys from the
project settings. In-project apps can use `http://web:5000` instead.

Notes: media uploads from the browser need a browser-reachable S3
endpoint - the internal MinIO covers SDK event ingestion (the critical
path); expose a public blob endpoint only if you need media in the UI.
ClickHouse is the scaling dial: give it more RAM as trace volume grows.
