# Activepieces

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=activepieces&type=stack)

[Activepieces](https://www.activepieces.com) - open-source automation:
a visual flow builder with 280+ pieces (apps), branching and loops, AI
agents, and MCP support - the Zapier/n8n alternative. MIT core, single
all-in-one container on a managed Postgres + a noeviction Valkey.

## Topology

| Service | Role | Public |
|---|---|---|
| `activepieces` | UI + API + worker (all-in-one, `:5000`) | yes |
| `broker` | Valkey, noeviction (BullMQ queue) | no |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # create the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `activepieces`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`AP_ENCRYPTION_KEY`** (32 hex chars), **`AP_JWT_SECRET`**,
**`AP_REDIS_PASSWORD`**. After first deploy set **`AP_FRONTEND_URL`** to the
app's https domain (webhook callbacks embed it).

Runs in `UNSANDBOXED` execution mode - no Docker socket needed, which is
exactly right for this platform. Flows, connections, and run history
live in Postgres.

Activepieces, n8n, or Node-RED? Activepieces for a clean MIT Zapier-style
builder with AI pieces; n8n (queue mode, also here) for the deepest
integration catalog and code nodes; Node-RED for device/MQTT wiring.
Pick by ecosystem - all flat-priced.
