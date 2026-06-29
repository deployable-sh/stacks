# Letta

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=letta&type=stack)

[Letta](https://www.letta.com) (the MemGPT lineage) - an agent server
with memory as the core primitive: agents live server-side with
self-editing persistent memory, and clients (SDKs, the hosted ADE at
app.letta.com) connect to them over the REST API.

**Experimental, stated plainly**: the image is pinned to `0.16.8`
because upstream notes the Docker image "is no longer an actively
maintained or supported product surface" (their push is Letta Cloud).
It works today; treat upgrades deliberately.

## Topology

| Service | Role | Public |
|---|---|---|
| `letta` | agent server REST API (`:8283`, no port env) | no |
| `web` | nginx `:5000` -> `letta:8283` (SSE-friendly) | yes (password) |
| `db` | Postgres + **pgvector** (required - not the managed PG) | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
curl localhost:5000/v1/health
```

## On Miget

Create a Compose Stack pointing at this repo, path `letta`. Required
variables: **`LETTA_SERVER_PASSWORD`** and at least one provider key
(**`OPENAI_API_KEY`** / **`ANTHROPIC_API_KEY`** - billed to you).

Connect the hosted ADE (app.letta.com > self-hosted server) to
`https://<domain>` with the password - remote servers must be HTTPS,
which the platform ingress provides. Set the embedding model explicitly
when creating agents on Docker deployments (upstream requirement).

Letta or Cognee? Letta IS the agent (server-side agents with built-in
memory); Cognee is memory infrastructure your existing agents call.
Different layers - some stacks use both.
