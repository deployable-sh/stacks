# Chatwoot

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=chatwoot&type=stack)

[Chatwoot](https://www.chatwoot.com) - open-source customer support:
shared team inbox, website live-chat widget, email and social channels,
help center, and automations. This template runs the **community-edition
image** (`v4-ce`, pure MIT - no enterprise code).

## Topology

| Service | Role | Public |
|---|---|---|
| `web` | app + API + live chat over websockets at `/cable` (`:5000`) | yes |
| `worker` | Sidekiq (emails, automations, channel sync) | no |
| `migrate` | idempotent `db:chatwoot_prepare`, then idles | no |
| `broker` | Valkey, noeviction (Sidekiq + ActionCable) | no |
| `db` | Postgres + **pgvector** (v4 requirement - not the managed PG) | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # sign up - first account is yours
```

## On Miget

Create a Compose Stack pointing at this repo, path `chatwoot`. Required
variables: **`SECRET_KEY_BASE`** (alphanumeric) and **`REDIS_AUTH`**.
After first deploy set **`FRONTEND_URL`** to the app's https domain
(the chat widget embeds it), sign your team up, then set
`ENABLE_ACCOUNT_SIGNUP=false`.

Attachments live on the shared storage volume (S3-compatible storage
via `ACTIVE_STORAGE_SERVICE=s3_compatible` + `STORAGE_*` to go
stateless). SMTP powers agent notifications - the catalogue's `mailpit`
works for testing. Live chat needs websocket passthrough at `/cable`,
which the platform ingress provides.
