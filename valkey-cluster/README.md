# Valkey Cluster (sharded)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=valkey-cluster&type=stack)

Horizontally-scaled [Valkey](https://valkey.io) where the keyspace is
partitioned across multiple master shards, each with a replica - the same
design as Redis Cluster, BSD-licensed and Redis-protocol compatible. This
template runs **6 nodes** (3 masters + 3 replicas) and a **one-shot init**
that forms the cluster. Use it when a single node is not enough.

> Status: **experimental.** Cluster mode expects stable node identities and
> is finicky on per-pod platforms: nodes announce their service
> **hostname** so clients and redirects use DNS, but a pod IP change can
> still require the cluster to re-meet. Treat it as a power-user topology.

## Local

```bash
cp .env.example .env && docker compose up -d --build
valkey-cli -c -a "$VALKEY_PASSWORD" -p 6379 cluster info     # cluster_state:ok
```

## On Miget

Create a Compose Stack pointing at this repo, path `valkey-cluster`. All
seven services are **internal-only**; the init forms the cluster once and
exits. Required variable: **`VALKEY_PASSWORD`**.

Clients must be **cluster-aware** and can connect to any node at
`valkey-node-1:6379`; keys route to the owning shard automatically.
Existing Redis Cluster client libraries work unchanged.

For failover without sharding, use **valkey-sentinel**; for one node, use
**valkey**. BSD-3-Clause.
