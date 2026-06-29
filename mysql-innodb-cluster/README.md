# MySQL InnoDB Cluster (Group Replication)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mysql-innodb-cluster&type=stack)

3-node high availability using [MySQL Group
Replication](https://dev.mysql.com/doc/refman/8.4/en/group-replication.html)
- the engine that MySQL InnoDB Cluster is built on. The group replicates
synchronously with automatic primary election and failover; a single
primary takes writes (single-primary mode) and the others stay in sync. A
one-shot init forms the group.

> Status: **experimental.** Group Replication is the fiddliest topology in
> this catalogue: it depends on stable inter-node addressing
> (`group_replication_local_address`, seeds, and IP allowlist) and is
> sensitive to node identity changes. This template ships **no MySQL
> Router** (its 8.4 image is not on Docker Hub) - apps connect to a node
> directly, or you add a Router alongside. For simpler synchronous HA,
> **percona-xtradb-cluster** or **mariadb-galera** are easier to operate.

## Local

```bash
cp .env.example .env && docker compose up -d --build
mysql -h127.0.0.1 -uroot -p"$MYSQL_ROOT_PASSWORD" \
  -e "SELECT MEMBER_HOST,MEMBER_STATE,MEMBER_ROLE FROM performance_schema.replication_group_members"
# -> three rows, all ONLINE (one PRIMARY, two SECONDARY)
```

## On Miget

Create a Compose Stack pointing at this repo, path `mysql-innodb-cluster`.
All four services are **internal-only**; the init forms the group once and
exits. Required variables: **`MYSQL_ROOT_PASSWORD`** (same on all nodes)
and **`MYSQL_REPLICATION_PASSWORD`** (the recovery account). Apps send
writes to the primary; in single-primary mode you can discover it from
`performance_schema.replication_group_members`, or front the group with a
MySQL Router.

For a single node use **mysql**; for asynchronous primary/replica,
**mariadb-replication**. GPLv2.
