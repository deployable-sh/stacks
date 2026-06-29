# Mattermost

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mattermost&type=stack)

[Mattermost](https://mattermost.com) - open-source team chat: channels,
threads, DMs, voice calls, slash commands, integrations, and plugins.
Team Edition image on a managed Postgres - it listens on :5000 directly,
so no proxy.

## Topology

| Service | Role | Public |
|---|---|---|
| `mattermost` | server + web/mobile API (`:5000`) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # the first account becomes the system admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `mattermost`. The
managed Postgres is provisioned and the datasource auto-wired (plain
single Postgres - no replica set). After first deploy set
**`MM_SITE_URL`** to the app's https domain and redeploy. Create the
first account promptly - it becomes the system admin.

Config, uploads, plugins, and the search index live on volumes. Connect
the official desktop and mobile apps to your domain.

Mattermost or Rocket.Chat? This catalogue ships Mattermost as the
default team-chat pick because it runs on one plain managed Postgres.
Rocket.Chat mandates a 3-node MongoDB replica set - deployable here via
the `mongodb` template, but a heavier setup; reach for it only if you
specifically want Rocket.Chat.
