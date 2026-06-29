# FreeScout

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=freescout&type=stack)

[FreeScout](https://freescout.net) - the free, open-source help desk and
shared inbox: email-based ticketing, multiple mailboxes, saved replies,
tags, and a module ecosystem. The Help Scout / Zendesk alternative, AGPL.
Self-hosted MySQL.

## Topology

| Service | Role | Public |
|---|---|---|
| `freescout` | help desk (`:5000`) | yes |
| `db` | MySQL 8 container (local and on Miget) | no |

This template uses the actively-maintained
[`nfrastack/freescout`](https://github.com/nfrastack/container-freescout)
image (the popular `tiredofit/freescout` image is now deprecated). The
image's nginx is told to listen on `5000` (`NGINX_LISTEN_PORT`), so it is
the public entrypoint directly - no separate proxy.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # log in with ADMIN_EMAIL / ADMIN_PASS
```

## On Miget

Create a Compose Stack pointing at this repo, path `freescout`. The
MySQL container is deployed alongside the app; required variables:
**`ADMIN_EMAIL`** / **`ADMIN_PASS`** (first admin). `APP_URL` is wired to
`${MIGET_PUBLIC_URL}`, so FreeScout trusts its public host automatically
(the image derives trusted hosts from `APP_URL`) - no manual step.

Attachments, the app key, and installed modules all live on the `/data`
volume - keep `replicas` at 1 (modules and files are on local disk).
FreeScout uses file-based cache and sessions, so no Redis is needed.

The economics: Zendesk Suite Team is $55/agent/month, Help Scout
$25/seat, Freshdesk $19/agent. FreeScout is $13/month flat with
unlimited agents; optional one-time-license modules add features without
a subscription.
