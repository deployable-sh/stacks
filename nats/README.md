# NATS Cluster

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=nats&type=stack)

[NATS](https://nats.io) - the lightweight, blazing-fast messaging
system: subjects, pub/sub, request/reply, and JetStream for persistent
streams and key-value/object stores. 3-node cluster on the stock image,
clustering via command flags only - no custom build. Internal-only,
~30 MB per node.

## Topology

| Service | Role | Public |
|---|---|---|
| `nats-0..2` | cluster nodes (client :4222, cluster :6222, monitor :8222) | no |

All three nodes carry the identical all-peers routes list (NATS ignores
its own self-route), so the full mesh forms by gossip with no seed
asymmetry. JetStream runs with replication factor 3 across the nodes.

## Local

```bash
docker compose up -d
# with the nats CLI:
nats --server localhost:4222 pub demo "hello"
```

## On Miget

Create a Compose Stack pointing at this repo, path `nats` - no
variables. Apps in the same project connect at `nats://nats-0:4222`
(any node accepts connections; list all three in clients for failover).
JetStream streams persist on the per-node volumes; the `/healthz`
endpoint on :8222 backs the container health checks.

NATS, Kafka, or RabbitMQ? NATS for low-latency cloud-native messaging
and lightweight streams with the smallest possible footprint; Kafka/
Redpanda for high-throughput event logs; RabbitMQ for classic AMQP
work queues. All four are in this catalogue. Add `--user`/`--pass`
flags for auth if you ever expose it beyond the project network.
