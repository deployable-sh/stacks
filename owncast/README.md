# Owncast

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=owncast&type=stack)

[Owncast](https://owncast.online) - your own self-hosted live streaming
server: a Twitch / YouTube Live alternative with a built-in web video
player, live chat, and federation. Stream to it over RTMP from OBS (or
any broadcaster); viewers watch adaptive HLS straight in the browser, on
your domain, with no platform cut and no ads.

## Why the wrapper

Owncast takes its web port from the `-webserverport` flag, and a compose
`command:` does not reach per-app deploys on Miget. The thin `Dockerfile`
bakes `-webserverport 5000` (Miget's public port) and `-rtmpport 1935`
into the entrypoint.

## Local

```bash
docker compose up -d --build
open http://localhost:5000          # player; admin at /admin (admin / abc123)
# OBS: Server rtmp://localhost:1935/live , Stream Key abc123
```

## On Miget

Create a Compose Stack pointing at this repo, path `owncast`. No
variables. Port 5000 (player + admin) is public automatically; expose
the RTMP ingest **port 1935 as a public custom TCP port** so OBS can
reach `rtmp://your-app.migetapp.com:1935/live`. On first login at
`/admin` change the default password and stream key. Everything - config,
chat history, recorded HLS - lives on the 20 GB data volume; keep
`replicas` at 1.

Twitch and YouTube monetize your audience and your data; Restream is
$16+/month just to multistream. Owncast is one ~$13/month plan for a
channel that is entirely yours. GPL-3.0.
