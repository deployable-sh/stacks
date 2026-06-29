# Redis Sentinel (HA)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=redis-sentinel&type=stack)

[Redis Sentinel](https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/)
- high availability for Redis with automatic failover. This template runs
one **master**, two **replicas**, and three **sentinels** that watch the
master and promote a replica if it goes down. Clients ask a sentinel for
the current master, so a failover is transparent to applications.

One image plays all three roles (selected by `REDIS_ROLE`); the entrypoint
builds the command and sentinel config from environment variables, and
sentinels use **hostname resolution** (service DNS) so the topology works
on a multi-pod network.

## Local

```bash
cp .env.example .env && docker compose up -d --build
redis-cli -p 26379 -a "$REDIS_PASSWORD" sentinel get-master-addr-by-name mymaster
```

## On Miget

Create a Compose Stack pointing at this repo, path `redis-sentinel`. All
six services are **internal-only**. Required variable:
**`REDIS_PASSWORD`** (shared by the master, replicas, and sentinel auth).

Apps connect through **Sentinel**, not directly to the master: point a
Sentinel-aware client at `redis-sentinel-1:26379`, `redis-sentinel-2:26379`,
`redis-sentinel-3:26379` with master name **`mymaster`**, and the client
is routed to whichever node is currently master. Most Redis libraries
(ioredis, redis-py, Lettuce, go-redis) have built-in Sentinel support.

For sharding across many nodes instead of failover, use **redis-cluster**.
For a single node, use **redis**. AWS ElastiCache charges per node for a
comparable HA setup; this is one flat plan. Redis 8 is AGPL-3.0.
