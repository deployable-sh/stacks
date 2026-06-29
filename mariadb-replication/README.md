# MariaDB replication (primary/replica)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mariadb-replication&type=stack)

Asynchronous [MariaDB](https://mariadb.org) replication: one **primary**
accepts writes and streams its binary log to a read-only **replica**. This
is the classic read-scaling / hot-standby topology. The official MariaDB
image wires it up from environment variables - the primary creates the
replication user, and the replica auto-configures itself against
`MARIADB_MASTER_HOST` and starts replicating, so no init scripts are
needed.

## Local

```bash
cp .env.example .env && docker compose up -d
# check replication is running on the replica (host port 3307):
mariadb -h127.0.0.1 -P3307 -uroot -p"$MARIADB_ROOT_PASSWORD" -e 'SHOW REPLICA STATUS\G'
```

## On Miget

Create a Compose Stack pointing at this repo, path `mariadb-replication`.
Both nodes are **internal-only**. Apps write to `mariadb-primary:3306` and
send read traffic to `mariadb-replica:3306` (which is `--read-only`).
Required variables: **`MARIADB_ROOT_PASSWORD`** (same on both),
**`MARIADB_PASSWORD`** (app user), and **`MARIADB_REPLICATION_PASSWORD`**.

This is asynchronous replication: the replica can lag slightly and a
failed primary does not auto-promote (that is a manual or tooling step).
For synchronous, automatic multi-primary HA use **mariadb-galera**; for a
single node, use **mariadb**. GPLv2.
