# Hasura

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=hasura&type=stack)

[Hasura](https://hasura.io) v2 CE - instant GraphQL over Postgres:
track tables and get queries, mutations, and live subscriptions with
row-level permissions, remote schemas, and event triggers. Stateless
single container; everything lives in the database.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000/console
```

## On Miget

Create a Compose Stack pointing at this repo, path `hasura`. The
managed Postgres is provisioned and auto-wired (Hasura creates its
metadata schema and the pgcrypto extension itself). Required variable:
**`HASURA_ADMIN_SECRET`** - the console and admin APIs are gated by it.

Connect more databases as additional sources from the console - other
stacks in your project (the catalogue's `timescaledb`, your apps'
managed Postgres) are reachable by service name. For client auth beyond
the admin secret, wire `HASURA_GRAPHQL_JWT_SECRET` to an IdP from the
catalogue (`keycloak`/`authentik`/`zitadel`/`logto` all issue compatible
JWTs).

Note on versions: v2 CE (Apache-2.0) is the self-hosted product; v3/DDN
is Hasura's cloud-first successor priced per active model. This template
deliberately ships v2.
