# WordPress

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=wordpress&type=stack)

The official [WordPress](https://wordpress.org) image (Apache variant)
behind a thin nginx proxy, backed by a self-hosted MySQL. Plugins, themes and
uploads persist on the `/var/www/html` volume.

## Topology

| Service | Role | Public |
|---|---|---|
| `wordpress` | WordPress + Apache (`:80`) | no |
| `web` | nginx `:5000` -> `wordpress:80` | yes |
| `db` | MySQL 8 container (local and on Miget) | no |

The proxy exists because the Apache variant listens on `:80` with no port
env, and the platform's public HTTP port is `5000`. The template already
handles `X-Forwarded-Proto`, so https behind the platform ingress works
without redirect loops.

## Local

```bash
docker compose up -d --build
open http://localhost:5000      # run the 5-minute installer
```

## On Miget

Create a Compose Stack pointing at this repo, path `wordpress` - no
required variables. The MySQL container is deployed alongside the app. Run
the installer promptly after deploy (until then the setup page is open),
then set the site URL to the app's https domain in Settings > General.

The whole WordPress install (core, plugins, themes, uploads) lives on the
volume, so plugin installs and updates survive redeploys. Keep `replicas`
at 1 unless you move uploads to object storage and sessions out of process.
