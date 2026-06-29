# Navidrome

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=navidrome&type=stack)

[Navidrome](https://www.navidrome.org) - self-hosted music streaming: a
fast, modern, Subsonic/OpenSubsonic-compatible server for a music
library you actually own. Stream from any Subsonic app (Symfonium,
play:Sub, DSub, Feishin, Amperfy) or the built-in web player. Single
container, embedded SQLite, ~130 MB idle.

## Local

```bash
docker compose up -d
open http://localhost:5000      # the first account created becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `navidrome` - no
variables. Open the app's domain and create the admin account on first
visit (claim it promptly). Upload your music to the 50 GB `music`
volume; Navidrome scans it (tags, art, ReplayGain) on the schedule set
in `compose.yaml`.

Music files need a real filesystem (Navidrome reads ID3/FLAC tags), so
the library lives on the volume rather than object storage - resize it
to your collection. The SQLite database and cache ride the small data
volume. Keep `replicas` at 1.

Spotify ($12.99/month) and Apple Music ($10.99) are perpetual rentals;
Plex Pass is $6.99/month (lifetime jumps to $749.99 in July 2026).
Navidrome is a $13/month plan streaming a library that is yours forever.
GPLv3.
