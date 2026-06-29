# Apache Kafka Cluster

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=kafka&type=stack)

3-node Apache Kafka cluster in KRaft mode (no ZooKeeper) with
[Kafbat UI](https://github.com/kafbat/kafka-ui), deployable locally with
plain Docker Compose or to [Miget](https://miget.com) as a compose stack.

## Topology

| Service | Role | Public |
|---|---|---|
| `kafka-1..3` | combined broker+controller (Kafka API `:9092`, KRaft `:9093`) | no |
| `kafka-ui` | web UI on `:5000` | yes (HTTP) |

Runs the official `apache/kafka` image configured entirely via environment
variables, no custom image. Each node keeps its log dirs on a persistent
volume at `/var/lib/kafka/data`. Topic defaults are durable out of the box:
replication factor 3, `min.insync.replicas=2`.

## Files

- `compose.yaml`, portable Compose file; works with plain `docker compose up`
- `compose.miget.yaml`, Miget overrides (RAM, privacy, disk sizes), auto-layered by Miget

## Local

```bash
docker compose up -d
open http://localhost:5000     # Kafbat UI
```

## On Miget

Create a Compose Stack pointing at this repo. Apps in the same project use:

```
bootstrap.servers = kafka-1:9092,kafka-2:9092,kafka-3:9092
```

## Scaling

Add another `kafka-N` service block + volume, give it the next
`KAFKA_NODE_ID`, and (for a controller-bearing node) extend
`KAFKA_CONTROLLER_QUORUM_VOTERS` everywhere, do not raise `replicas`;
brokers need stable identity and their own disk. `KAFKA_HEAP_OPTS` must stay
below the service's `x-miget.ram` (1 GB heap inside 2048 MB by default, 
Kafka relies on the remaining memory for page cache).
