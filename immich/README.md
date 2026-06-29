# Immich

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=immich&type=stack)

[Immich](https://immich.app) - self-hosted photo and video management: a
genuine Google Photos alternative with first-class iOS and Android apps,
automatic phone backup, face recognition, smart and semantic search,
albums, shared libraries, and a timeline. Your whole photo history on
your own infrastructure.

> Status: **experimental** - a heavy, multi-service stack (~6-8 GB) and
> Immich ships fast-moving releases. Pin upgrades and read the release
> notes; major versions sometimes need a database migration.

## What runs

Four self-contained services:

- **immich-server** - the API and web app, bound to port 5000.
- **immich-machine-learning** - face detection and CLIP search models.
- **database** - Postgres built with the **VectorChord** vector
  extension (Immich's own image). This is why it does not use Miget's
  managed Postgres - the extension is required and not standard.
- **redis** - Valkey, for the background job queue.

Photos are stored on a filesystem volume, not object storage - Immich
needs a real filesystem for its library layout and thumbnails.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000          # create the first admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `immich`. Only
`immich-server` is public; the ML worker, database, and Valkey run as
**private** sidecars. Required variable: **`DB_PASSWORD`** (a long random
string). Give the stack a plan with at least 8 GB of RAM - the ML worker
alone wants ~3 GB while it loads models.

The 100 GB `library` volume holds your photos and videos (resize it to
your collection); the database and model cache ride their own volumes.
Keep `replicas` at 1 - the library volume is single-writer.

Google One is $9.99/month for 2 TB and Apple iCloud+ is $9.99 for 2 TB,
both renting space and mining your library. Immich is one plan plus a
volume sized to your photos, entirely yours. AGPL-3.0.
