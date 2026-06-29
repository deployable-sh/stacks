# Factorio Server

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=factorio&type=stack)

Headless [Factorio](https://factorio.com) via
[factoriotools/factorio](https://github.com/factoriotools/factorio-docker) -
the community-standard image. Saves, mods, and server settings live on
the `/factorio` volume; a new map generates on first boot and the latest
save loads thereafter.

## Local

```bash
docker compose up -d
# connect to localhost:34197
```

## On Miget

1. Create a Compose Stack pointing at this repo, path `factorio` - no
   required variables.
2. The game speaks **UDP**: add a custom public UDP port on the app
   (internal 34197, expose publicly) and give players
   `your-app-host:<public port>`.

Server settings (name, password, admins) live in
`/factorio/config/server-settings.json` on the volume - edit via the
app shell, restart to apply. Mods go in `/factorio/mods`
(`UPDATE_MODS_ON_START=true` keeps them current). 2 GiB RAM carries
megabase-sized factories further than you would expect; the volume
holds rolling autosaves. Keep `replicas` at 1.
