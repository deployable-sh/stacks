# Valkey Sentinel (HA)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=valkey-sentinel&type=stack)

High availability for [Valkey](https://valkey.io) with automatic failover,
using Valkey's built-in Sentinel (the same design as Redis Sentinel). One
**master**, two **replicas**, and three **sentinels** that watch the
master and promote a replica if it fails. Clients ask a sentinel for the
current master, so failover is transparent. BSD-licensed and fully
Redis-protocol compatible.

One image plays all three roles (selected by `VALKEY_ROLE`); the
entrypoint builds the command and sentinel config from environment
variables, and sentinels use **hostname resolution** (service DNS) so the
topology works on a multi-pod network.

## Local

```bash
cp .env.example .env && docker compose up -d --build
valkey-cli -p 26379 -a "$VALKEY_PASSWORD" sentinel get-master-addr-by-name mymaster
```

## On Miget

Create a Compose Stack pointing at this repo, path `valkey-sentinel`. All
six services are **internal-only**. Required variable:
**`VALKEY_PASSWORD`** (shared by the master, replicas, and sentinel auth).

Apps connect through **Sentinel**, not directly to the master: point a
Sentinel-aware client at `valkey-sentinel-1:26379`, `valkey-sentinel-2:26379`,
`valkey-sentinel-3:26379` with master name **`mymaster`**. Existing Redis
Sentinel client libraries work unchanged.

For sharding across many nodes instead of failover, use **valkey-cluster**.
For a single node, use **valkey**. BSD-3-Clause.
