# Supabase (self-hosted)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=supabase&type=stack)

The full [Supabase](https://supabase.com) stack, Postgres (supabase
image with extensions), Auth (GoTrue), REST (PostgREST), Realtime,
Storage, postgres-meta, Studio, behind the Kong gateway, adapted from the
official self-hosting compose. **Experimental**: validate on a dev project
first; this is the largest template in the catalogue.

## Topology

Only **`kong`** is public (`:5000`): it fronts the APIs and Studio, with
the dashboard behind Kong's basic auth (`DASHBOARD_USERNAME`/`PASSWORD`).
Optional components ride **compose profiles**: `pooler` (supavisor),
`functions` (edge runtime), `imgproxy` (image transforms), enable them on
the stack to deploy them.

The database is supabase's own postgres image (custom extensions and
roles), deliberately NOT a managed Postgres.

## Local

```bash
cp .env.upstream-example .env    # then fill in the secrets (see below)
docker compose up -d --build
open http://localhost:5000       # Studio via Kong (dashboard basic auth)
```

## On Miget

Create a Compose Stack pointing at this repo. Required variables are the
secrets: `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`,
`SERVICE_ROLE_KEY`, `DASHBOARD_USERNAME`/`DASHBOARD_PASSWORD`,
`SECRET_KEY_BASE`, `VAULT_ENC_KEY` plus the URL settings (`SITE_URL`,
`API_EXTERNAL_URL`, `SUPABASE_PUBLIC_URL`, set these to the kong app's
https domain). Generate JWT keys with supabase's
[self-hosting key generator](https://supabase.com/docs/guides/self-hosting/docker#securing-your-services).

## Keeping up with upstream

`./update-upstream.sh` re-vendors the pinned upstream files
(`upstream-docker-compose.yml`, kong config, db init SQL). Diff the
upstream compose after running it and fold relevant changes into
`compose.yaml` (its header lists the platform adaptations).
