# Redis Cluster (sharded)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=redis-cluster&type=stack)

[Redis Cluster](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)
- horizontally-scaled Redis where the keyspace is partitioned across
multiple master shards, each with a replica. This template runs **6 nodes**
(3 masters + 3 replicas) and a **one-shot init** that forms the cluster.
Use it when a single node's RAM or throughput is not enough.

> Status: **experimental.** Redis Cluster expects stable node identities,
> and it is finicky on any per-pod platform: nodes announce their service
> **hostname** (`--cluster-announce-hostname` + hostname endpoints) so
> clients and redirects use DNS, but a pod IP change can still require the
> cluster to re-meet. Treat it as a power-user topology and test failover
> behaviour for your workload.

## Local

```bash
cp .env.example .env && docker compose up -d --build
redis-cli -c -a "$REDIS_PASSWORD" -p 6379 cluster info     # cluster_state:ok
```

## On Miget

Create a Compose Stack pointing at this repo, path `redis-cluster`. All
seven services are **internal-only**; the init forms the cluster once and
exits. Required variable: **`REDIS_PASSWORD`** (shared by every node and
the init).

Clients must be **cluster-aware** (most libraries are - ioredis, redis-py,
Lettuce, go-redis with cluster mode) and can connect to any node at
`redis-node-1:6379`. Keys are routed to the owning shard automatically.

For failover of a single dataset (no sharding), use **redis-sentinel**;
for one node, use **redis**. Redis 8 is AGPL-3.0.
