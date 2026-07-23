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
