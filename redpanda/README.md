# Redpanda Cluster

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=redpanda&type=stack)

3-broker [Redpanda](https://redpanda.com) cluster (Kafka-compatible, no
ZooKeeper/JVM) with Redpanda Console, deployable locally with plain Docker
Compose or to [Miget](https://miget.com) as a compose stack.

## Topology

| Service | Role | Public |
|---|---|---|
| `rp-1`, `rp-2`, `rp-3` | brokers (Kafka API `:9092`, schema registry `:8081`, HTTP proxy `:8082`) | no |
| `redpanda-console` | web UI on `:5000` | yes (HTTP) |

Brokers seed from each other by service name and keep their data on a
persistent volume at `/var/lib/redpanda/data`.

## Files

- `compose.yaml`, portable Compose file; works with plain `docker compose up`.
  Brokers run the stock Redpanda image; per-node start flags live in each
  service's `command:` (Miget forwards it as container args)
- `compose.miget.yaml`, Miget overrides (RAM, privacy, disk sizes), auto-layered by Miget

## Local

```bash
docker compose up -d
open http://localhost:5000     # Redpanda Console
```

## On Miget

Create a Compose Stack pointing at this repo. Apps in the same project use:

```
bootstrap.servers = rp-1:9092,rp-2:9092,rp-3:9092
```

Schema registry: `http://rp-1:8081`, HTTP proxy: `http://rp-1:8082`.

Create topics with replication for durability:

```bash
rpk topic create my-topic -p 12 -r 3 -X brokers=rp-1:9092
```

## Scaling

Add another `rp-N` service block + volume (copy a broker's `command:` and
change the advertised names), do not raise `replicas`; brokers need stable
identity and their own disk. `--memory` must stay below the service's
`x-miget.ram` (1G inside 2048 MB by default, leaving headroom for off-heap
usage).
