# Paperless-ngx

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=paperless-ngx&type=stack)

[Paperless-ngx](https://docs.paperless-ngx.com) - the document
management system that ends the filing cabinet: feed it scans and PDFs,
it OCRs, tags, indexes, and makes everything full-text searchable. The
most-loved self-hosted document app, on your infrastructure.

## Topology

| Service | Role | Public |
|---|---|---|
| `paperless` | web + OCR worker + consumer (all-in-one, `:5000`) | yes |
| `broker` | Valkey, noeviction (Celery queue) | no |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # log in with PAPERLESS_ADMIN_USER/PASSWORD
```

## On Miget

Create a Compose Stack pointing at this repo, path `paperless-ngx`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`PAPERLESS_SECRET_KEY`**, **`PAPERLESS_ADMIN_PASSWORD`**,
**`REDIS_AUTH`**. After first deploy set **`PAPERLESS_URL`** to the
app's https domain (it auto-derives the allowed hosts and CSRF origins).

Documents, the search index, and the consume directory all live on the
single 20 GB volume (media has no S3 backend upstream - the volume is
mandatory). Upload through the web UI or API, or drop files into the
consume directory. Set `PAPERLESS_OCR_LANGUAGE` for your documents;
OCR is the RAM-hungry step, so give batches headroom. Keep `replicas`
at 1 (single index, single consumer).
