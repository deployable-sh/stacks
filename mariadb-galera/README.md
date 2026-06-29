# MariaDB Galera Cluster

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mariadb-galera&type=stack)

3-node [MariaDB](https://mariadb.org) 11.8 LTS cluster with
[Galera](https://galeracluster.com) synchronous multi-primary
replication - every node accepts writes, any node can die. Runs the
OFFICIAL mariadb image (the Galera library ships in it); clustering is
pure command-line flags. **Internal-only.**

## Topology

| Service | Role | Public |
|---|---|---|
| `galera-1` | cluster node + bootstrap-once wrapper | no |
| `galera-2`, `galera-3` | cluster nodes (join via SST/IST) | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
mysql -h 127.0.0.1 -u app -p$MARIADB_APP_PASSWORD app
```

## On Miget

Create a Compose Stack pointing at this repo, path `mariadb-galera`.
Required variables: **`MARIADB_ROOT_PASSWORD`** and
**`MARIADB_APP_PASSWORD`** (the `app` user/database, replicated to all
nodes). Apps connect to any node:

```
mysql://app:<password>@galera-1:3306/app
```

List all three hosts in clients that support it for automatic failover.

## Operational honesty (read once, thank yourself later)

- **Bootstrap is handled**: node 1 adds `--wsrep-new-cluster` only when
  its datadir is empty. Restarts rejoin normally via IST.
- **`stop_grace_period: 2m` is load-bearing**: a default 10s SIGKILL
  poisons `grastate.dat` on every node.
- **Cold start after an unclean full-cluster stop**: Galera refuses to
  guess the most-advanced node. Pick it (check `grastate.dat` seqno),
  then on that node run
  `sed -i 's/safe_to_bootstrap: 0/safe_to_bootstrap: 1/' /var/lib/mysql/grastate.dat`
  and restart it first - the others rejoin. This is Galera being safe,
  not broken.
- Three nodes is the minimum that makes sense (2-node clusters lose
  quorum on any failure). Scale by adding `galera-4` to the gcomm list.
