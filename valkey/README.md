# Valkey (standalone)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=valkey&type=stack)

[Valkey](https://valkey.io) - the BSD-licensed, Redis-compatible in-memory
data store, forked and stewarded by the Linux Foundation after Redis
changed its license. Drop-in for Redis clients: caching, queues, pub/sub,
streams, and data structures. Single node, password-protected, with
append-only persistence on a volume.

> Miget offers **managed Valkey** as an addon - reach for that when you
> just need a cache wired to an app. This template is for running and
> tuning Valkey yourself, or for the cluster / sentinel topologies.

## Local

```bash
cp .env.example .env && docker compose up -d --build
valkey-cli -a "$VALKEY_PASSWORD" ping        # -> PONG
```

## On Miget

Create a Compose Stack pointing at this repo, path `valkey`. It is
**internal-only** (no public port) - apps in the same project connect at
`valkey:6379` with `VALKEY_PASSWORD`. Required variable:
**`VALKEY_PASSWORD`**. Data persists on the volume; keep `replicas` at 1.

For high availability use **valkey-sentinel** (automatic failover) or
**valkey-cluster** (sharding). Valkey is fully Redis-protocol compatible,
so existing Redis clients and libraries work unchanged. BSD-3-Clause.
