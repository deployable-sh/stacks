# Supabase Lite (core API only)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=supabase-lite&type=stack)

The budget cut of the [supabase](../supabase) template: Postgres, Auth
(GoTrue) and REST (PostgREST) behind the Kong gateway - the four services
most Supabase apps actually use - plus the Studio dashboard. No Realtime,
Storage, edge functions or pooler. The whole stack, dashboard included,
fits a 2 GiB plan (~1.7 GiB allocated) with room to spare.

Studio + postgres-meta deploy by default so the dashboard works out of
the box. Don't need it? Locally run only the core four
(`docker compose up db rest auth kong`); on Miget stop or remove the
`studio` and `meta` apps - the APIs keep working without them.

## The sizing

Measured on Miget under 16 and 48 concurrent REST readers
plus signup and write loops, with the supabase-js example in `example/`
running concurrently, against hard no-swap memory limits.

As in supabase-nano, the services with their own allocators grow into
whatever limit they are given, so these numbers are the limits that keep
the stack responsive rather than the memory it strictly needs.

| Service | RAM | Peak @48 | What made it fit |
|---|---|---|---|
| `kong` | 192 | 164 | breaks below 160 -- see [supabase-nano](../supabase-nano#the-sizing) |
| `auth` | 128 | 56 | GoTrue is small |
| `rest` | 192 | 22 | `PGRST_DB_POOL=4` |
| `studio` | 384 | 229 | V8 heap capped at 160 MiB. Uncapped it reached 353/384 and never released it |
| `meta` | 160 | 85 | V8 heap capped at 96 MiB |
| `db` | 512 | 146 | roomy on purpose, so Postgres keeps a real page cache |

1568 MiB total. 30/30 requests at both concurrencies, 0 errors, 0 restarts,
and the supabase-js example ran clean throughout.

## Topology

| Service | Role | Public |
|---|---|---|
| `kong` | gateway: APIs + Studio basic auth (`:5000`) | yes |
| `auth` | GoTrue - signups, logins, JWTs | via kong |
| `rest` | PostgREST auto API | via kong |
| `db` | supabase-postgres (own image, own volume) | no |
| `studio` + `meta` | dashboard | via kong |

## Local

```bash
cp .env.upstream-example .env    # fill in the secrets
docker compose up -d --build
open http://localhost:5000       # Studio via Kong (dashboard basic auth)
```

## On Miget

Create a Compose Stack pointing at this repo, path `supabase-lite`.
Required variables: `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`,
`SERVICE_ROLE_KEY`, `DASHBOARD_USERNAME`/`DASHBOARD_PASSWORD`,
`PG_META_CRYPTO_KEY`. Generate JWT keys with supabase's
[key generator](https://supabase.com/docs/guides/self-hosting/docker#securing-your-services).
Set `SITE_URL`/`API_EXTERNAL_URL` handling is wired from the kong app's
public domain.

Need Realtime, Storage or edge functions later? Deploy the full
[supabase](../supabase) template and move the database volume over.
