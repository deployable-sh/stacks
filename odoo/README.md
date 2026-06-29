# Odoo

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=odoo&type=stack)

[Odoo](https://www.odoo.com) Community 18 - the open-source business
suite: CRM, sales, inventory, accounting, projects, manufacturing,
website, and ecommerce, with a vast app store. LGPL-3 Community edition
on a managed Postgres.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # create the first database
```

## On Miget

Create a Compose Stack pointing at this repo, path `odoo`. The managed
Postgres is provisioned and auto-wired. Required variable:
**`ODOO_ADMIN_PASSWORD`** (the master password that gates database
create/drop/backup).

Design choices, all to fit a single public port cleanly:

- **Pinned to Odoo 18** (the `odoo` latest tag has moved to 19 - pin
  protects you from a surprise major bump).
- **Threaded mode** (`workers=0`): websockets and live chat stay on the
  one HTTP port, so everything serves from `:5000` with no second
  longpolling port to route.
- **Master password via generated odoo.conf**: Odoo has no env var for
  it, so a thin entrypoint writes the conf from `ODOO_ADMIN_PASSWORD` at
  boot (the secret never lives in the image).
- **Database manager**: needs a Postgres role with `CREATEDB`. If the
  managed role lacks it, pre-create one database and set
  `ODOO_LIST_DB=False`.

Filestore lives on `/var/lib/odoo`; drop custom modules into
`/mnt/extra-addons`. For heavy production (multiprocessing `workers>0`),
Odoo splits websockets onto port 8072 and needs a two-port-aware proxy -
out of scope for this single-port template.
