# BookStack

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=bookstack&type=stack)

[BookStack](https://www.bookstackapp.com) - a simple, self-hosted wiki
and documentation platform organized as shelves, books, chapters, and
pages. WYSIWYG and markdown editors, full-text search, draw.io diagrams,
page revisions, roles and permissions, and an API. A Laravel app backed
by a self-hosted MariaDB.

## Why the wrapper

The LinuxServer image's nginx listens on port 80 with no env var to
change it, and a compose `command:` does not reach Miget per-app deploys.
The thin `Dockerfile` patches the nginx site template so the first-boot
config listens on port 5000.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # log in as admin@admin.com / password
```

## On Miget

Create a Compose Stack pointing at this repo, path `bookstack`. The
MariaDB container is deployed alongside the app. Required variables:

- **`APP_KEY`** - a Laravel key (see `.env.example` for the generate
  command; keep the `base64:` prefix and pin it - changing it invalidates
  sessions and encrypted data).
- **`APP_URL`** - the app's https domain, matched exactly (no trailing
  slash), set after first deploy.

**Change the default admin** (`admin@admin.com` / `password`) the moment
you first log in. Uploads and config live on the `config` volume;
optionally set `STORAGE_TYPE=s3` + `STORAGE_S3_*` to move images and
attachments to a Miget Bucket and keep the app near-stateless.

Confluence Standard is ~$5-6/user/month and Notion Business is $20/seat;
BookStack is one flat plan for the whole team, with content in a MySQL you
own. MIT-licensed.
