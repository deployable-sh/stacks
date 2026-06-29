# MariaDB (standalone)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mariadb&type=stack)

[MariaDB](https://mariadb.org) 11.8 - the community-developed MySQL fork,
as a single self-hosted node. Drop-in compatible with MySQL for most
applications, configured through the official image's environment
variables, with data on a volume.

> Miget offers **managed MySQL** for hands-off operation. This template is
> for running MariaDB specifically, with full control of version and
> tuning, or as a private in-project database.

## Local

```bash
cp .env.example .env && docker compose up -d
mariadb -h127.0.0.1 -uroot -p"$MARIADB_ROOT_PASSWORD"
```

## On Miget

Create a Compose Stack pointing at this repo, path `mariadb`. It is
**internal-only** (no public port) - apps in the same project connect at
`mariadb:3306`. Required variables: **`MARIADB_ROOT_PASSWORD`** and
**`MARIADB_PASSWORD`** (the app user); an `app` database and user are
created on first boot. Data persists on the volume; keep `replicas` at 1.

This is the standalone mode. For high availability this catalogue also has
**mariadb-replication** (primary/replica async) and **mariadb-galera**
(synchronous multi-primary cluster). GPLv2.
