# Fizzy

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=fizzy&type=stack)

[Fizzy](https://www.fizzy.do) - 37signals' free, open-source kanban:
fast, focused boards for bugs, issues, ideas, and small projects. "Kanban
as it should be, not as it has been" - a modern Trello / Asana
alternative from the makers of Basecamp, with auto-closing stale cards,
webhooks (Slack, Campfire), public boards, and native mobile apps. Like
the rest of the 37signals stack it is a Rails app fronted by Thruster,
backed by SQLite, in a single container.

## How it runs on port 5000

Setting **`HTTP_PORT=5000`** makes Thruster serve on Miget's public port,
and **`DISABLE_SSL=true`** stops Rails forcing HTTPS redirects (Miget
terminates TLS in front), so no proxy wrapper is needed.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # first visit sets up the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `fizzy`. Required
variables: **`SECRET_KEY_BASE`** (`openssl rand -hex 64`) and
**`BASE_URL`** (the app's https domain, set after first deploy).
Optionally set the **`SMTP_*`** block for email invites and the
**`VAPID_*`** keypair for Web Push notifications. Everything - the SQLite
database and uploads - lives on the `storage` volume, so keep `replicas`
at 1.

> Fizzy ships as a rolling release (`main` / commit-SHA tags, no
> versions). Pin to a `ghcr.io/basecamp/fizzy@sha256:...` digest for
> reproducible redeploys.

Trello Standard is $6/user/month and Premium $12.50, Asana Starter is
$13.49/user - all per seat. Fizzy is free software on one small Miget
plan for the whole team. Released under 37signals' source-available
O'Saasy License (self-hosting for your own use is free; you just cannot
resell Fizzy itself as a service).
