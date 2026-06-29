# Metabase

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=metabase&type=stack)

[Metabase](https://www.metabase.com) OSS - the BI tool non-analysts
actually use: point-and-click questions, dashboards, and SQL when you
want it. One JVM container + a managed Postgres for the app database.

## Topology

| Service | Role | Public |
|---|---|---|
| `metabase` | Metabase UI + API (`:5000`) | yes |
| `db` | Postgres app DB - real container locally, **managed on Miget** | no |

The app database stores questions/dashboards/users - your analytics data
stays in the warehouses Metabase connects to. With an external app DB the
container is stateless (the embedded H2 default is non-production
upstream, which is why this template wires Postgres from the start).

## Local

```bash
docker compose up -d
open http://localhost:5000      # first-run setup wizard
```

## On Miget

Create a Compose Stack pointing at this repo, path `metabase` - no
required variables. The managed Postgres is provisioned and auto-wired.
Run the setup wizard promptly; set **`MB_SITE_URL`** to the app's https
domain after first deploy (links and embeds bake it in).

Startup takes a minute or two (JVM). Connect data sources by service name
for in-project databases - the catalogue's `clickhouse`, `mongodb`,
`timescaledb` and `mssql` templates are all reachable as `<service>:<port>`
from the same project. 2 GiB RAM is the working floor; raise it alongside
heavy concurrent use.
