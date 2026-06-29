# Redis (standalone)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=redis&type=stack)

[Redis](https://redis.io) - the in-memory data store used for caching,
queues, pub/sub, streams, rate-limiting, and rich data structures. This
is a single node, password-protected, with append-only persistence on a
volume. A thin wrapper reads the password from the environment at start.

> Miget also offers **managed Valkey** (a Redis-compatible drop-in) as an
> addon - reach for that when you just need a cache wired to an app. This
> template is for when you want to run and tune Redis yourself.

## Local

```bash
cp .env.example .env && docker compose up -d --build
redis-cli -a "$REDIS_PASSWORD" ping        # -> PONG
```

## On Miget

Create a Compose Stack pointing at this repo, path `redis`. It is
**internal-only** (no public port) - apps in the same project connect at
`redis:6379`. Required variable: **`REDIS_PASSWORD`**. Data persists on
the volume (append-only file); keep `replicas` at 1.

For high availability use the **redis-sentinel** template (automatic
failover) or **redis-cluster** (sharding); for a Redis-compatible store
on a BSD license, see the **valkey** templates. AWS ElastiCache for Redis
runs ~$12+/node/month for the smallest instance and multiplies for HA;
this is one flat plan on your own infrastructure. Redis 8 is AGPL-3.0.
