# RabbitMQ Cluster

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=rabbitmq&type=stack)

3-node RabbitMQ 4.x cluster (quorum-queue ready), deployable locally with
plain Docker Compose or to [Miget](https://miget.com) as a compose stack.

## Topology

| Service | Role | Public |
|---|---|---|
| `rmq-1` | cluster node + management UI on `:5000` | yes (HTTP) |
| `rmq-2`, `rmq-3` | cluster nodes | no |

Nodes form the cluster automatically on first boot (classic-config peer
discovery, `rabbit@rmq-1/2/3`). Each node has its own persistent volume
mounted at `/var/lib/rabbitmq/mnesia`.

## Files

- `compose.yaml`, portable Compose file; works with plain `docker compose up`
- `compose.miget.yaml`, Miget overrides (RAM, privacy, disk sizes), auto-layered by Miget
- `Dockerfile` + `rabbitmq.conf` + `erlang.cookie`, node image with baked cluster config

## Local

```bash
docker compose up -d --build
open http://localhost:5000          # management UI: admin / changeme-rmq
```

## On Miget

Create a Compose Stack pointing at this repo. Apps in the same project connect with:

```
amqp://admin:changeme-rmq@rmq-1:5672
```

(any node name works; clients should list all three for failover). Use quorum
queues (`x-queue-type: quorum`) for replicated messaging.

## Before real use

- Change `default_user` / `default_pass` in `rabbitmq.conf`
- Regenerate the Erlang cookie: `openssl rand -hex 24 > erlang.cookie`

## Scaling

Add another `rmq-N` service block + volume (and a
`cluster_formation.classic_config.nodes.N` line in `rabbitmq.conf`), do not
raise `replicas`; RabbitMQ nodes need stable identity and their own disk.
