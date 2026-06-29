# Bagisto

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=bagisto&type=stack)

[Bagisto](https://bagisto.com) - the open-source Laravel ecommerce
platform: catalog, cart, checkout, multi-channel and multi-currency
storefronts, and a full admin. MIT-licensed. The official all-in-one
image in external-DB mode on a self-hosted MySQL, behind a thin nginx proxy.

## Topology

| Service | Role | Public |
|---|---|---|
| `bagisto` | storefront + admin at `/admin` (`:80`) | no |
| `web` | nginx `:5000` -> `bagisto:80` | yes |
| `db` | MySQL 8 container (local and on Miget) | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # admin at /admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `bagisto`. The MySQL
container is deployed alongside the app - and because `DB_HOST` points
off-localhost, the image's bundled MySQL stays disabled. Required
variables: **`APP_KEY`** (`base64:...` - set it explicitly, never rely
on the per-boot default, or sessions break on redeploy) and **`APP_URL`**
(the app's https domain).

Bagisto is MySQL-only (no Postgres). Uploaded media and cache live on
the storage volume; the database persists on the `db` container's own
volume (the image's bundled MySQL stays disabled in external-DB mode).

Bagisto, PrestaShop, or Saleor? Bagisto for a Laravel-native store you
will extend in PHP; PrestaShop for the turnkey European storefront;
Saleor for headless GraphQL. All three are in this catalogue.
