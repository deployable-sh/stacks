# Rocket.Chat

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=rocketchat&type=stack)

[Rocket.Chat](https://www.rocket.chat) - the open-source team
communication platform: channels, DMs, threads, voice/video, an apps
marketplace, and omnichannel (livechat/email/social). MIT core. The app
is **stateless** - all state lives in MongoDB.

## The MongoDB requirement

Rocket.Chat **requires a MongoDB replica set** (not standalone) - it uses
change streams. This catalogue's [`mongodb`](../mongodb/) template is
exactly that: a 3-node replica set. Deploy it in the same project and
point `MONGO_URL` at it.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # the first account becomes admin
```

(The local compose bundles a single-node replica set for convenience.)

## On Miget

1. Deploy the [`mongodb`](../mongodb/) template in your project.
2. Create a Compose Stack pointing at this repo, path `rocketchat`, and
   set **`MONGO_URL`** to it:
   `mongodb://mongo-1:27017,mongo-2:27017,mongo-3:27017/rocketchat?replicaSet=rs0`
   and **`ROOT_URL`** to the app's https domain. The app container is
   stateless - no volume.

(`MONGO_OPLOG_URL` is no longer needed - modern Rocket.Chat uses change
streams.)

Rocket.Chat or Mattermost? This catalogue ships both. Mattermost is the
simpler default (one plain managed Postgres). Choose Rocket.Chat for its
apps marketplace and omnichannel features - and when you are happy
running the `mongodb` replica-set template alongside it.
