# Uptime Kuma

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=uptime-kuma&type=stack)

[Uptime Kuma](https://github.com/louislam/uptime-kuma) v2 - self-hosted
uptime monitoring: HTTP(S)/TCP/DNS/ping checks, alerting to 100+
notification providers, and public status pages. Single container,
SQLite on a small volume.

## Local

```bash
docker compose up -d
open http://localhost:5000   # the setup wizard creates the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `uptime-kuma` - no
variables. Open the app's domain and run the first-boot wizard (pick
SQLite; create the admin account promptly).

The UI runs over websockets (Socket.io) on the app's domain; subpath
hosting is not supported - the app's own domain is exactly right. Enable
"Trust Proxy" in Settings so client IPs resolve correctly behind the
platform ingress.

This template uses the `2-slim` image: ~400 MB lighter, no embedded
MariaDB or Chromium. If you want "real browser" (Chromium) monitors,
switch the image to `louislam/uptime-kuma:2` and raise RAM in
`compose.miget.yaml` to at least `1024`. Monitors, history and settings
live on the volume. Keep `replicas` at 1 (SQLite).
