# Temporal

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=temporal&type=stack)

[Temporal](https://temporal.io) - durable execution: write workflows as
ordinary code and Temporal makes them crash-proof, with automatic
retries, timers that survive restarts, and a complete event history.
**Experimental**: built on `temporalio/auto-setup` (single-process,
which upstream deprecated in favor of the multi-service server image -
it remains the simplest self-host, and this template marks it honestly).

## Topology

| Service | Role | Public |
|---|---|---|
| `temporal` | server (frontend gRPC :7233) | no |
| `ui` | web UI (`:5000`) | yes |
| `db` | Postgres (two databases) - **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `temporal`. The
managed Postgres has a single role, so once - via the database shell -
create the two databases Temporal needs and set `SKIP_DB_CREATE=true`:

```sql
CREATE DATABASE temporal;
CREATE DATABASE temporal_visibility;
```

Temporal then runs only schema DDL inside them (no CREATEDB needed).
Workers in the same project dial the server over raw gRPC at
`temporal:7233` (no public ingress for the server - gRPC is internal);
the UI is the public entry. Register namespaces via the UI or the
`temporal` CLI.

Production note: auto-setup runs schema setup at boot in one process -
fine for small-to-medium use, but read upstream's guidance before
betting a critical system on it; the multi-service server image is the
scale-up path.
