# Jellyfin

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=jellyfin&type=stack)

[Jellyfin](https://jellyfin.org) - the free, self-hosted media server:
stream your movies, TV shows, music, and photos to any device through a
web UI and native apps (Android, iOS, Android TV, Roku, Kodi, and more).
No tracking, no subscription, no features held behind a paywall. Embedded
SQLite, so it is a single self-contained container.

## Why the wrapper

Jellyfin takes its HTTP listen port from `InternalHttpPort` in
`network.xml` - there is no env var or CLI flag for it. The thin
`Dockerfile` + `entrypoint.sh` seed `network.xml` with port 5000 on first
boot (write-if-missing, so a port you change later in the UI is kept).

## Local

```bash
docker compose up -d --build
open http://localhost:5000      # complete the setup wizard (first user = admin)
```

## On Miget

Create a Compose Stack pointing at this repo, path `jellyfin`. After first
deploy set **`PUBLISHED_SERVER_URL`** to the app's https domain (used by
client auto-discovery). Complete the setup wizard immediately - the first
account created becomes admin, so the fresh instance is briefly open.
Upload media to the 100 GB `media` volume; resize it to your library.

> **GPU note:** a PaaS does not pass through a GPU, so transcoding is
> CPU-only. Direct-play (when the client supports the source format) uses
> almost no CPU and works great; software transcoding costs roughly one
> core per 1080p stream, so size the plan accordingly or prefer
> direct-play-friendly clients.

Media and the SQLite databases need a real filesystem (library scanning,
random writes), so everything lives on RWO volumes - keep `replicas` at 1.

Plex is moving features behind Plex Pass ($6.99/month, lifetime jumping to
$749.99 on Jul 1 2026); Netflix and friends rent you a rotating catalogue.
Jellyfin is one plan streaming a library that is entirely yours, with no
account upsell. GPL-2.0.
