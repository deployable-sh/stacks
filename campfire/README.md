# Campfire

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=campfire&type=stack)

[Campfire](https://once.com/campfire) - 37signals' free, open-source
group chat: rooms, direct messages, file sharing, full-text search,
@mentions, sounds, and Web Push. It was the first ONCE app (a one-time
paid product) and is now MIT-licensed and free. A single self-contained
Rails container - web, background jobs, caching, and file serving all in
one - fronted by Thruster and backed by SQLite.

## How it runs on port 5000

Setting **`HTTP_PORT=5000`** makes Thruster serve on Miget's public port,
and **`DISABLE_SSL=true`** stops Rails forcing HTTPS redirects (Miget
terminates TLS in front), so no proxy wrapper is needed.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # first visit sets up the admin + account name
```

## On Miget

Create a Compose Stack pointing at this repo, path `campfire`. Required
variable: **`SECRET_KEY_BASE`** (`openssl rand -hex 64`). On first visit
you create the admin account and name the chat; claim it promptly.
**`VAPID_*`** (Web Push) is auto-generated on first boot - set a fixed
pair if you want push to survive a volume reset. Messages and uploaded
files live on the `storage` volume, so size it to your history and keep
`replicas` at 1.

> Campfire ships as a rolling release (`main` / commit-SHA tags, no
> versions). Pin to a `ghcr.io/basecamp/once-campfire@sha256:...` digest
> for reproducible redeploys.

Slack bills $8.75/user/month (Pro) and meters message history; Microsoft
Teams rides a Microsoft 365 subscription. Campfire is free software on
one small Miget plan for the whole team, with full history and files on
your own infrastructure. MIT-licensed.
