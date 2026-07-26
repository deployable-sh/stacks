# Supabase Nano (1 GiB, dashboard included)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=supabase-nano&type=stack)

[supabase-lite](../supabase-lite) squeezed into a **1 GiB plan** - the same
six services (Postgres, Auth, REST, Kong, Studio, postgres-meta), memory-
tuned until the whole stack, dashboard included, allocates exactly 1024 MiB.
For hobby projects, demos and side products; heavier workloads want
[supabase-lite](../supabase-lite) (2 GiB) or the full
[supabase](../supabase) template.

## The sizing

Measured under load (signups + RLS queries via supabase-js, 600 concurrent
REST requests, Studio browsing, pgbench at 10k tps) against hard no-swap
memory limits:

| Service | RAM | Peak seen | What made it fit |
|---|---|---|---|
| `kong` | 128 | 105 | 1 nginx worker, proxy buffers 8x160k |
| `auth` | 64 | 33 | nothing - GoTrue is just small |
| `rest` | 224 | 174 | `PGRST_DB_POOL=2` |
| `studio` | 256 | 196 | V8 heap capped at 160 MiB |
| `meta` | 160 | 80 | V8 heap capped at 96 MiB |
| `db` | 192 | 121 | `shared_buffers=64MB`, `max_connections=40` |

## Trade-offs (read before production)

- **2 PostgREST pool connections**: fine for hobby APIs, a bottleneck under
  real concurrency. Raise `PGRST_DB_POOL` if you also raise `rest` RAM
  (pool 10 costs ~290 MiB).
- **40 Postgres connections** total across all services.
- Studio's capped heap means very large SQL-editor result sets get slow
  before they get done.
- A big schema grows PostgREST's cache past its allocation. If you add
  dozens of tables, move to supabase-lite - same files, same database
  image, roomier numbers.

## Topology

| Service | Role | Public |
|---|---|---|
| `kong` | gateway: APIs + Studio basic auth (`:5000`) | yes |
| `auth` | GoTrue - signups, logins, JWTs | via kong |
| `rest` | PostgREST auto API | via kong |
| `studio` + `meta` | dashboard | via kong |
| `db` | supabase-postgres (own image, own volume) | no |

## Local

```bash
cp .env.upstream-example .env    # fill in the secrets
docker compose up -d --build
open http://localhost:5000       # Studio via Kong (dashboard basic auth)
```

## On Miget

Create a Compose Stack pointing at this repo, path `supabase-nano`.
Required variables: `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`,
`SERVICE_ROLE_KEY`, `DASHBOARD_USERNAME`/`DASHBOARD_PASSWORD`,
`PG_META_CRYPTO_KEY`. Generate JWT keys with supabase's
[key generator](https://supabase.com/docs/guides/self-hosting/docker#securing-your-services).
`SITE_URL`/`API_EXTERNAL_URL` are wired from the kong app's public domain.

Outgrown it? [supabase-lite](../supabase-lite) uses the same database
image and volume layout - deploy it and move the volume over.
