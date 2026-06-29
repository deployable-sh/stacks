# Umami

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=umami&type=stack)

[Umami](https://umami.is) v3 - privacy-first web analytics: no cookies,
no cross-site tracking, GDPR/PECR-friendly, with a clean dashboard and a
~2 KB tracking script. One stateless container + a managed Postgres
(Umami v3 dropped MySQL - Postgres only).

## Topology

| Service | Role | Public |
|---|---|---|
| `umami` | dashboard + collection API (`:5000`) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env       # one secret
docker compose up -d
open http://localhost:5000 # admin / umami - change it immediately
```

## On Miget

Create a Compose Stack pointing at this repo, path `umami`. The managed
Postgres is provisioned and `DATABASE_URL` auto-wired; one required
variable: **`APP_SECRET`** (`openssl rand -hex 32`). Log in as
`admin` / `umami` and change the password immediately.

Add your websites in the dashboard and drop the tracking snippet
(`<script defer src="https://<app-domain>/script.js" data-website-id="...">`)
into your pages. Unlimited sites and events - the database is the only
meter. The app container is stateless; migrations run on start.
