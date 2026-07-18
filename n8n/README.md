# n8n (queue mode, with workers)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=n8n&type=stack)

[n8n](https://n8n.io) workflow automation in queue mode, editor/API/webhooks
on a main instance, execution on horizontally scalable workers, deployable
locally with plain Docker Compose or to [Miget](https://miget.com) as a
compose stack.

Full production guide (sizing, costs, operational notes):
[How to Self-Host n8n on Miget](https://miget.com/blog/how-to-self-host-n8n-on-miget)

## Topology

| Service | Role | Public |
|---|---|---|
| `n8n` | editor + API + webhooks + scheduler (`:5000`) | yes (HTTP) |
| `n8n-worker` ×2 | workflow execution (BullMQ consumers) | no |
| `db` | Postgres, real container locally, **managed Postgres on Miget** | no |
| `queue` | Valkey, real container locally, **managed Valkey on Miget** | no |

Workers are stateless (binary data lives in the database, the default
mode), so this is the one template where scaling via `deploy.replicas` is
correct. The main instance keeps a small volume for `/home/node/.n8n`.

## Files

- `compose.yaml`, portable Compose file; works with plain `docker compose up`
- `compose.miget.yaml`, Miget overrides: `db`/`queue` become managed
  services and the connection env on main + workers is auto-wired from
  their credentials via `${{db.*}}` / `${{queue.*}}` references
- `.env.example`, local development values

## Local

```bash
cp .env.example .env
docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo. Detection provisions a
managed Postgres and a managed Valkey, auto-wires all connection settings,
and asks for exactly one variable: **`N8N_ENCRYPTION_KEY`** (generate with
`openssl rand -hex 24`). It must never change once set, n8n cannot
decrypt stored credentials with a new key.

After the first deploy, set the public URL so webhook/OAuth callbacks use
the real domain: add a `WEBHOOK_URL` variable on the `n8n` app with
`https://<n8n-app-domain>/` and redeploy.

## Scaling workers

Raise `deploy.replicas` on `n8n-worker` (or scale the worker app on Miget).
Each worker processes up to 10 concurrent executions by default
(`worker --concurrency=N` to change).

## Notes

- `N8N_SECURE_COOKIE` is `false` locally (plain-http editor) and `true` on
  Miget (TLS at the ingress).
- Upgrades: `n8nio/n8n:latest` tracks upstream; pin a tested tag for
  anything you care about, and upgrade main + workers together (they must
  run the same version).
