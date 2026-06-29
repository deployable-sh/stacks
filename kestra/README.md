# Kestra

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=kestra&type=stack)

[Kestra](https://kestra.io) - the declarative workflow orchestrator:
flows are YAML, authored and versioned in the UI, with hundreds of
plugins (HTTP, SQL, dbt, file ops, notifications) and schedules/triggers.
The pragmatic alternative to Airflow's DAG-file machinery - one JVM
container + Postgres, no Redis, nothing to deploy per flow.

## Topology

| Service | Role | Public |
|---|---|---|
| `kestra` | server standalone: UI + API + scheduler + worker (`:5000`) | yes (basic auth) |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `kestra`. The managed
Postgres is provisioned and wired through the configuration. Required
variables: **`KESTRA_ADMIN_EMAIL`** (basic-auth username - must be an
email) and **`KESTRA_ADMIN_PASSWORD`** (8+ chars, uppercase + number).

Author flows in the UI - they live in Postgres, version with the flow
editor, and trigger on schedules, webhooks, or flow dependencies.

PaaS note, set up for you: script tasks (Python/Node/Shell) default to
Kestra's DOCKER task runner, which needs a socket this platform does not
expose - this template pins the **PROCESS runner** as the plugin default,
so scripts run inside the Kestra container (add toolchains via a derived
image if your scripts need them). HTTP/SQL/plugin tasks are unaffected.

Internal storage uses the volume; switch `kestra.storage` to S3 (Miget
Buckets) for stateless scale-out later.
