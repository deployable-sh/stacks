# Pocketbase

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=pocketbase&type=stack)

[Pocketbase](https://pocketbase.io), an entire backend (SQLite, auth,
realtime subscriptions, file storage, admin UI) in one container. The
simplest template in the catalogue: one service, one 2 GB volume.

## Local

```bash
docker compose up -d
open http://localhost:5000/_/    # create the first superuser
```

## On Miget

Create a Compose Stack pointing at this repo, no variables. The admin UI
is at `https://<app-domain>/_/`; create the first superuser on first visit
(do it promptly, until then anyone with the URL could).

Data (SQLite + uploads) lives on the persistent volume at `/pb_data` and
survives redeploys. Keep `replicas` at 1, SQLite is single-writer.

Image: [`ghcr.io/muchobien/pocketbase`](https://github.com/muchobien/pocketbase-docker)
(the de-facto community image; Pocketbase ships no official one). Pin a
version tag for production.
