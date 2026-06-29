# PrestaShop

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=prestashop&type=stack)

[PrestaShop](https://www.prestashop-project.org) 9 - the open-source
storefront that runs a huge share of European e-commerce: catalogue,
checkout, multi-language/multi-currency, and a vast module marketplace.
Official image with true auto-install, behind a thin nginx proxy, backed
by a self-hosted MySQL.

## Topology

| Service | Role | Public |
|---|---|---|
| `prestashop` | shop + back office at `/admin` (`:80`) | no |
| `web` | nginx `:5000` -> `prestashop:80` | yes |
| `db` | MySQL 8 container (local and on Miget) | no |

## The one thing to get right

**`PS_DOMAIN` is baked into the database at install time.** Set it to the
final domain (custom domain or the app's `*.migetapp.com` host) BEFORE the
first deploy, together with `PS_ENABLE_SSL=1`. Changing domains later
means updating it in the back office (Shop Parameters > General), not in
env.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000        # back office at /admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `prestashop`. The
MySQL container is deployed alongside the app. Required variables:
**`PS_DOMAIN`** (final domain, see above), **`PS_ENABLE_SSL=1`**,
**`ADMIN_MAIL`** / **`ADMIN_PASSWD`** (back-office login at `/admin`).
The installer runs on first boot and removes itself.

Upgrade model: the whole shop lives on the `/var/www/html` volume, so
image-tag bumps do not upgrade an installed shop - use PrestaShop's
1-click upgrade module, like classic hosting. Keep `replicas` at 1.
