# Percona XtraDB Cluster (PXC)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=percona-xtradb-cluster&type=stack)

[Percona XtraDB Cluster](https://www.percona.com/software/mysql-database/percona-xtradb-cluster)
- synchronous, multi-primary MySQL high availability built on Galera. All
three nodes accept reads and writes, and a transaction is replicated to
every node before commit returns, so there is no replica lag and any node
can fail without data loss. Clustering is driven entirely by the image's
environment variables.

> Status: **experimental.** Synchronous clusters need operational care -
> in particular, a full cold start may require bootstrapping the
> most-advanced node first (the same caveat as any Galera cluster). The
> catalogue's **mariadb-galera** template is the same class of cluster on
> the MariaDB side.

## Local

```bash
cp .env.example .env && docker compose up -d
mysql -h127.0.0.1 -uroot -p"$MYSQL_ROOT_PASSWORD" \
  -e "SHOW STATUS LIKE 'wsrep_cluster_size'"     # -> 3
```

## On Miget

Create a Compose Stack pointing at this repo, path `percona-xtradb-cluster`.
All three nodes are **internal-only**. Apps connect to any node at
`pxc-node1:3306` (or `pxc-node2`/`pxc-node3`) - every node accepts writes.
Required variables: **`MYSQL_ROOT_PASSWORD`** (same on all nodes) and
**`MYSQL_PASSWORD`** (app user). `pxc-node1` bootstraps the cluster; the
others join it and sync via SST.

For asynchronous primary/replica instead, see **mariadb-replication**; for
a single node, **percona-server**. GPLv2.
