# Minecraft Server

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=minecraft&type=stack)

Minecraft Java Edition via
[itzg/minecraft-server](https://docker-minecraft-server.readthedocs.io) -
the standard image: env-driven, supports Paper/Fabric/Forge/Vanilla, and
downloads the server jar at runtime (nothing redistributed).

## EULA first

Mojang requires each server operator to accept the
[Minecraft EULA](https://aka.ms/MinecraftEULA). Set **`EULA=TRUE`**
yourself - the template will not pre-accept it for you, by design.

## Local

```bash
cp .env.example .env      # set EULA=TRUE
docker compose up -d
# connect to localhost:25565
```

## On Miget

1. Create a Compose Stack pointing at this repo, path `minecraft`, with
   **`EULA=TRUE`** (plus TYPE/VERSION/MEMORY to taste).
2. The game speaks raw TCP, not HTTP: add a **custom public TCP port**
   on the app (Settings > Ports: internal 25565, expose publicly) and
   give players `your-app-host:<public port>`.

World data lives on the `/data` volume. Sizing: `MEMORY=2G` (Paper)
carries 10-20 players; raise heap and plan together - container RAM
should be heap + ~50% JVM overhead. Console: attach to the app shell and
use `rcon-cli`. Keep `replicas` at 1 (one world, one server).
