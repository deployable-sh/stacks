# AudioBookshelf

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=audiobookshelf&type=stack)

[AudioBookshelf](https://www.audiobookshelf.org) - a self-hosted
audiobook and podcast server: a clean web player, native iOS and Android
apps with offline playback and progress sync, multi-user support,
bookmarks, sleep timers, and built-in podcast search and auto-download. A
single container with an embedded SQLite database.

## Local

```bash
docker compose up -d
open http://localhost:5000      # the first account created becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `audiobookshelf` - no
variables. `PORT=5000` puts it on Miget's public port. Open the app's
domain and create the admin account on first visit (claim it promptly).
Upload audiobooks and podcasts to their volumes; AudioBookshelf scans and
indexes them.

Audio files need a real filesystem (the server reads tags and streams
from disk), so the library lives on RWO volumes - resize them to your
collection. The SQLite database and cache ride the config and metadata
volumes. Keep `replicas` at 1.

Audible is ~$14.95/month and you only rent listening rights; podcast apps
upsell subscriptions. AudioBookshelf is one ~$13/month plan serving a
library you own, on every device. GPL-3.0.
