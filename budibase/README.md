# Budibase

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=budibase&type=stack)

[Budibase](https://budibase.com) - open-source low-code platform for
internal tools, forms, and approval workflows. All-in-one image (embedded
CouchDB, Redis, MinIO, app server and worker) behind a thin nginx proxy.

## Topology

| Service | Role | Public |
|---|---|---|
| `budibase` | Budibase all-in-one (`:80`) | no |
| `web` | nginx `:5000` -> `budibase:80`, websocket passthrough | yes |

The proxy exists because the image serves on `:80` with no port override
env, and the platform's public HTTP port is `5000`.

## Local

```bash
docker compose up -d --build
open http://localhost:5000        # create the first admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `budibase` - no
required variables. Secrets (JWT, MinIO keys, CouchDB credentials)
auto-generate on first boot and persist in a `.env` on the `/data` volume,
so they survive redeploys. Create the first admin account promptly after
deploy.

All state (CouchDB documents, uploaded files in MinIO) lives on the
`/data` volume. Keep `replicas` at 1.
