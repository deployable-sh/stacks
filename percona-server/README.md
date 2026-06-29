# Percona Server (standalone)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=percona-server&type=stack)

[Percona Server for MySQL](https://www.percona.com/software/mysql-database/percona-server)
- a free, fully MySQL-compatible drop-in with extra instrumentation
(detailed `INFORMATION_SCHEMA` and `PERFORMANCE_SCHEMA` tables),
improved diagnostics, and performance enhancements. Single node,
configured with the same `MYSQL_*` environment variables as MySQL.

> Miget offers **managed MySQL** for hands-off operation. Choose Percona
> Server when you specifically want its instrumentation and tuning, or as
> a private in-project database.

## Local

```bash
cp .env.example .env && docker compose up -d
mysql -h127.0.0.1 -uroot -p"$MYSQL_ROOT_PASSWORD"
```

## On Miget

Create a Compose Stack pointing at this repo, path `percona-server`. It is
**internal-only** (no public port) - apps connect at `percona:3306`.
Required variables: **`MYSQL_ROOT_PASSWORD`** and **`MYSQL_PASSWORD`** (the
app user); an `app` database and user are created on first boot. Data
persists on the volume; keep `replicas` at 1.

For synchronous multi-primary high availability, see the
**percona-xtradb-cluster** template. GPLv2.
