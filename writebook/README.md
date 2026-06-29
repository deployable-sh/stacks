# Writebook

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=writebook&type=stack)

[Writebook](https://once.com/writebook) - 37signals' free, self-hosted
publishing tool: write and share books, manuals, and documentation with a
clean, fast reader. It is a Rails app (the same stack behind Basecamp and
HEY) fronted by Thruster, 37signals' HTTP/2 proxy. SQLite holds the
content and uploaded images sit alongside it, so this is a single,
self-contained container.

## How it runs on port 5000

Writebook serves through Thruster, which listens on port 80 by default.
Setting **`HTTP_PORT=5000`** moves it to Miget's public port with plain
HTTP, and **`DISABLE_SSL=true`** stops Rails from forcing HTTPS redirects
(Miget terminates TLS in front), so no proxy wrapper is needed.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # first visit sets up the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `writebook`. Required
variable: **`SECRET_KEY_BASE`** (a long random string,
`openssl rand -hex 64`). On first visit you create the admin account and
your first book; claim the instance promptly. Everything - the SQLite
database and every uploaded image - lives on the `storage` volume, so
keep `replicas` at 1 and back the volume up.

> Writebook is distributed as a rolling release with no version tags
> (`latest` / `main` / commit SHAs only). Pin to a specific
> `ghcr.io/basecamp/writebook@sha256:...` digest if you need reproducible
> redeploys.

Writebook is genuinely free (37signals released it at no cost), so there
is no per-book or per-seat SaaS to compare against - the cost is just the
small Miget plan it runs on. Gumroad, Leanpub, and Notion-as-a-site all
take a cut or a monthly fee to host what Writebook serves from your own
domain. MIT-licensed source.
