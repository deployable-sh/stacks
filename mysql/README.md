# MySQL (standalone)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mysql&type=stack)

[MySQL](https://www.mysql.com) 8.4 LTS - the world's most popular open-
source relational database, as a single self-hosted node. Configured
entirely through the official image's environment variables, with data on
a volume.

> Miget offers **managed MySQL** as an addon (backups, failover handled
> for you) - prefer it for most apps. This template is for full control of
> the version and configuration, or a private in-project database.

## Local

```bash
cp .env.example .env && docker compose up -d
mysql -h127.0.0.1 -uroot -p"$MYSQL_ROOT_PASSWORD"
```

## On Miget

Create a Compose Stack pointing at this repo, path `mysql`. It is
**internal-only** (no public port) - apps in the same project connect at
`mysql:3306`. Required variables: **`MYSQL_ROOT_PASSWORD`** and
**`MYSQL_PASSWORD`** (the app user); an `app` database and user are
created on first boot. Data persists on the volume; keep `replicas` at 1
(a single node is not HA).

For high availability see **mysql-innodb-cluster** (Group Replication) or
**percona-xtradb-cluster**. AWS RDS for MySQL starts around $15/month for
the smallest instance and more for Multi-AZ; this is one flat plan on your
own infrastructure. GPLv2.
