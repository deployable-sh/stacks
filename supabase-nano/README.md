# Supabase Nano (1 GiB, dashboard included)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=supabase-nano&type=stack)

[supabase-lite](../supabase-lite) squeezed into a **1 GiB plan** - the same
six services (Postgres, Auth, REST, Kong, Studio, postgres-meta), memory-
tuned until the whole stack, dashboard included, allocates exactly 1024 MiB.
For hobby projects, demos and side products; heavier workloads want
[supabase-lite](../supabase-lite) (2 GiB) or the full
[supabase](../supabase) template.

## The sizing

Measured on Miget under 16 and 48 concurrent REST readers
plus signup and write loops, against hard no-swap memory limits.

**Peak usage is not the sizing input here.** `kong`, `studio` and `meta`
each grow to fill whatever limit they are given, so "peak seen" tracks the
limit rather than demand -- kong measured 127/128, 151/160 and 164/192 on
the same workload. What matters is the limit below which the service stops
performing.

| Service | RAM | Peak @48 | What made it fit |
|---|---|---|---|
| `kong` | 192 | 164 | **breaks below 160.** At 128 it still reports 127/128 and never OOMs, but throughput collapses: 21/30 requests at 4965 ms |
| `auth` | 96 | 56 | GoTrue is small, but 64 left it at 87% |
| `rest` | 64 | 17 | `PGRST_DB_POOL=2` |
| `studio` | 320 | 285 | V8 heap capped at 128 MiB; RSS settles near cap + ~140 |
| `meta` | 160 | 89 | V8 heap capped at 96 MiB |
| `db` | 192 | 129 | `shared_buffers=64MB`, `max_connections=40` |

1024 MiB total. 30/30 requests at both concurrencies, 0 errors, 0 restarts.

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
