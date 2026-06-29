# Penpot

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=penpot&type=stack)

[Penpot](https://penpot.app) - the open-source design and prototyping
platform (the Figma alternative): SVG-native, web-based, with real
design-to-dev handoff. MPL-2.0. Frontend + backend + exporter on a
managed Postgres and a noeviction Valkey.

## Topology

| Service | Role | Public |
|---|---|---|
| `frontend` | SPA + API proxy (nginx, :8080 fixed) | no |
| `web` | nginx `:5000` -> `frontend:8080` (websockets) | yes |
| `backend` | Clojure/JVM API (:6060) | no |
| `exporter` | Chromium PDF/PNG export (:6061) | no |
| `broker` | Valkey, noeviction | no |
| `db` | Postgres - **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # register the first account
```

## On Miget

Create a Compose Stack pointing at this repo, path `penpot`. The
managed Postgres is auto-wired. Required variables: **`PENPOT_SECRET_KEY`**
(512-bit base64) and **`REDIS_AUTH`**. After first deploy set
**`PENPOT_PUBLIC_URI`** to the app's https domain.

Strongly recommended: set **`PENPOT_OBJECTS_STORAGE_BACKEND=s3`** with a
Miget Bucket (the S3_* vars) - design assets then live in the bucket and
the shared RWX volume disappears, making the backend stateless.

The economics: Figma Professional is $16/full-seat/month; a 10-designer
team is $160+/month, climbing with seats. Penpot self-hosted is
$49/month flat, unlimited designers, files on your infrastructure.
