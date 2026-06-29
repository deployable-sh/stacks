# NocoDB

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=nocodb&type=stack)

[NocoDB](https://nocodb.com) - the open-source Airtable alternative: a
smart-spreadsheet UI over a real database, with grid/gallery/kanban/form
views, APIs, webhooks, and automations. One app container + a managed
Postgres + a small volume for file attachments.

## Topology

| Service | Role | Public |
|---|---|---|
| `nocodb` | UI + API (`:5000`) | yes |
| `db` | Postgres (NocoDB metadata + data) - **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000     # create the first admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `nocodb`. The managed
Postgres is provisioned and `NC_DB` auto-wired; required variable:
**`NC_AUTH_JWT_SECRET`** (`openssl rand -hex 32`). After first deploy set
**`NC_SITE_URL`** to the app's https domain (invite and share links embed
it).

NocoDB can also connect to *external* databases as data sources - point
it at other stacks in your project (Postgres, MySQL) by service name and
get a spreadsheet UI over data you already have. File attachments live on
the volume. Keep `replicas` at 1.
