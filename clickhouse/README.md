# ClickHouse Cluster

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=clickhouse&type=stack)

3-node [ClickHouse](https://clickhouse.com) cluster, one shard, three
replicas, with **embedded ClickHouse Keeper** (no separate ZooKeeper pods).
Internal-only; 20 GB per node.

## Local

```bash
cp .env.example .env && docker compose up -d --build
curl "localhost:8123/?query=SELECT+host_name,host_address+FROM+system.clusters+WHERE+cluster='main'" \
  -u app:local-dev-only-change-me
```

## On Miget

Create a Compose Stack pointing at this repo. One required variable:
**`CLICKHOUSE_PASSWORD`**. Apps in the project connect to any node:
`http://ch-1:8123` (HTTP) or `ch-1:9000` (native).

Replicated tables (the cluster is named `main`):

```sql
CREATE TABLE events ON CLUSTER main (
  ts DateTime, body String
) ENGINE = ReplicatedMergeTree ORDER BY ts;
```

`{shard}`/`{replica}` macros are pre-set per node. Scale by adding `ch-N`
service blocks (extend `raft_configuration`, `zookeeper`, and
`remote_servers` in `cluster.xml`), not via `replicas`. For multi-shard
layouts, split `remote_servers` into several `<shard>` blocks.
