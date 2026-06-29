# Docmost

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=docmost&type=stack)

[Docmost](https://docmost.com) - open-source collaborative wiki and
documentation: real-time block editing, nested spaces, granular
permissions, diagrams (Draw.io, Excalidraw, Mermaid), inline comments,
and full-text search. A genuine Confluence / Notion alternative you host
yourself. Backed by Postgres (pgvector for search), Valkey, and
S3-compatible storage for attachments.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # create the first workspace and admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `docmost`. The managed
Postgres (with the `vector` extension) and Valkey are provisioned and
auto-wired. Required variables:

- **`APP_SECRET`** - a long random string (`openssl rand -hex 32`).
- **`STORAGE_DRIVER=s3`** plus the **`AWS_S3_*`** block - point these at a
  Miget Bucket so attachments live in object storage, not on a volume.

After first deploy set **`APP_URL`** to the app's https domain. The first
account you create becomes the workspace owner.

With attachments on a Bucket the app itself is stateless - state is in
Postgres and object storage, so it scales and rolls back cleanly.

Confluence Standard is ~$5.16/user/month and Notion Business is
$20/seat - Docmost is one $13-25/month plan for the whole team, with no
per-seat metering. AGPL-3.0 (source) - the published image is the
official build.
