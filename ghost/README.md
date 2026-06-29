# Ghost

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=ghost&type=stack)

[Ghost](https://ghost.org) 6 - professional publishing: blog, newsletter,
paid memberships, and a clean editor. One app container + a self-hosted MySQL
(Ghost requires MySQL 8 in production - SQLite is dev-only upstream).

## Topology

| Service | Role | Public |
|---|---|---|
| `ghost` | Ghost 6 (site + admin at `/ghost`, `:5000`) | yes |
| `db` | MySQL 8 container (local and on Miget) | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000/ghost    # create the owner account
```

## On Miget

Create a Compose Stack pointing at this repo, path `ghost`. The MySQL
container is deployed alongside the app. After first deploy set **`GHOST_URL`**
to the app's https domain and redeploy - Ghost embeds it in every link
and redirect. Create the owner account at `/ghost` promptly.

Themes and images live on the content volume; posts and members in MySQL.
For member signup/login emails configure SMTP (`mail__*` env vars - see
[Ghost config docs](https://docs.ghost.org/config/)); bulk newsletters
additionally need Mailgun, set in the admin UI. Keep `replicas` at 1.
