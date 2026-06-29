# MongoDB Replica Set

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mongodb&type=stack)

3-node MongoDB 8 replica set (`rs0`), deployable locally with plain Docker
Compose or to [Miget](https://miget.com) as a compose stack.

## Topology

| Service | Role | Public |
|---|---|---|
| `mongo-1..3` | replica-set members (`:27017`) | no |
| `rs-init` | one-time `rs.initiate()` (idempotent, then idles) | no |

Members run the stock `mongo` image, no custom build; the `--replSet` flags
ride each service's `command:`. Each member keeps its data on a persistent
volume at `/data/db`. `rs-init` waits for the members, initiates the replica
set exactly once (a re-run sees `rs.status()` succeed and skips), and then
sleeps, the platform has no one-shot job services.

## Files

- `compose.yaml`, portable Compose file; works with plain `docker compose up`
- `compose.miget.yaml`, Miget overrides (RAM, privacy, disk sizes), auto-layered by Miget

## Local

```bash
docker compose up -d
docker compose exec mongo-1 mongosh --eval 'rs.status().members.map(m => m.stateStr)'
# → [ 'PRIMARY', 'SECONDARY', 'SECONDARY' ]
```

## On Miget

Create a Compose Stack pointing at this repo. Apps in the same project
connect with:

```
mongodb://mongo-1:27017,mongo-2:27017,mongo-3:27017/?replicaSet=rs0
```

Writes go to the elected primary automatically; use
`readPreference=secondaryPreferred` to spread reads.

## Security

**This template enables no authentication**, the project network is the
boundary (every service is `private: true`; nothing gets a public domain,
and Miget's namespace isolation keeps other projects out). This mirrors a
plain `docker run mongo` and the usual local-dev setup. Do not mark any
member public. If you need in-cluster auth, MongoDB requires a keyfile
shared by all members plus a root user, that variant needs a small custom
image (bake the keyfile, like the RabbitMQ template bakes its Erlang
cookie) and `MONGO_INITDB_ROOT_USERNAME/PASSWORD` env on all members.

## Scaling

Add another `mongo-N` service block + volume, then from any member run
`rs.add("mongo-4:27017")`, do not raise `replicas`; members need stable
identity and their own disk. Keep an odd number of voting members.
