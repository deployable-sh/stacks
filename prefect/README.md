# Prefect

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=prefect&type=stack)

[Prefect](https://www.prefect.io) 3 - workflow orchestration for Python
people: flows are decorated functions, deployments schedule them, and
the UI shows every run. The server here holds UI/API/schedules; your
flow code runs in WORKERS that connect outbound.

## Topology

| Service | Role | Public |
|---|---|---|
| `prefect` | server: UI + API + scheduler (`:5000`, basic auth) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `prefect`. The
managed Postgres is provisioned and auto-wired. Required variable:
**`PREFECT_AUTH_STRING`** (`user:password`). After first deploy set
**`PREFECT_SERVER_UI_API_URL`** to `https://<domain>/api` and redeploy
(the UI breaks without it behind a proxy).

Workers - where your code actually runs - deploy as separate apps in
the project, polling outbound (no ingress, the same friendly shape as
the catalogue's CI runners):

```
PREFECT_API_URL=http://prefect:5000/api
PREFECT_API_AUTH_STRING=<same user:password>
command: prefect worker start --pool default
```

Build the worker image from `prefecthq/prefect:3-latest` plus your flow
code and dependencies. Kestra or Prefect? Kestra for declarative YAML
flows authored in the UI; Prefect when the team thinks in Python.
