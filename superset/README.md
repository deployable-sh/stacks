# Apache Superset

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=superset&type=stack)

[Superset](https://superset.apache.org) - the Apache BI platform:
dashboards, the no-code chart builder, SQL Lab, and alerts/reports, over
practically every database. App + Celery worker + beat + init sidecar on
a managed Postgres, with a noeviction Valkey for queues and caches.

## Topology

| Service | Role | Public |
|---|---|---|
| `app` | UI + API (gunicorn, `:5000`) | yes |
| `worker` / `beat` | async queries, thumbnails, scheduled reports | no |
| `init` | migrations + admin bootstrap (idempotent), then idles | no |
| `broker` | Valkey, noeviction | no |
| `db` | Postgres metadata - **managed Postgres on Miget** | no |

The dict-style config Superset needs (Celery, caches) is baked into a
small `superset_config.py` (the officially documented pattern) that
reads everything simple from env - you never edit it for normal use.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # admin / ADMIN_PASSWORD
```

## On Miget

Create a Compose Stack pointing at this repo, path `superset`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`SUPERSET_SECRET_KEY`** (`openssl rand -base64 42`),
**`REDIS_AUTH`**, **`ADMIN_PASSWORD`** (login: `admin`).

Connect data sources by service name for in-project databases - the
catalogue's `clickhouse`, `timescaledb`, `mssql`, `mariadb-galera` and
friends are all reachable directly. Metabase or Superset? Metabase for
self-serve simplicity; Superset for SQL-heavy teams, fine-grained
charting, and dashboard-as-product work. Both are here - taste the
difference for $25-49/month.
