# ToolJet

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=tooljet&type=stack)

[ToolJet](https://www.tooljet.ai) CE - open-source low-code platform for
internal tools: visual app builder, 50+ datasource connectors, JS/Python
where you need logic. One app container + a managed Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `tooljet` | server + builder UI (`:5000`); bundles PostgREST for the ToolJet Database | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env       # fill in the three secrets
docker compose up -d
open http://localhost:5000 # create the first admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `tooljet`. The managed
Postgres is provisioned and auto-wired; required variables:
**`SECRET_KEY_BASE`** (`openssl rand -hex 64`), **`LOCKBOX_MASTER_KEY`**
(`openssl rand -hex 32`; encrypts datasource credentials - losing it
orphans them) and **`PGRST_JWT_SECRET`** (`openssl rand -hex 32`). After
first deploy set **`TOOLJET_HOST`** to the app's https domain and redeploy.

The ToolJet Database feature uses its own database (`tooljet_db`) on the
same Postgres server; the server creates it on first boot. If your
Postgres user lacks `CREATEDB`, create it manually once.

The app container is stateless (everything lives in Postgres) - no volume.
Note: the ToolJet image is x86_64-only (no arm64).
