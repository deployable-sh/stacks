# LiteLLM

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=litellm&type=stack)

[LiteLLM](https://docs.litellm.ai) proxy - one OpenAI-compatible endpoint
in front of every LLM provider (Anthropic, OpenAI, Gemini, Bedrock,
Mistral, local, …) with virtual keys, per-key budgets, spend tracking,
fallbacks and retries. One app container + a managed Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `litellm` | proxy + admin UI at `/ui` (`:5000`) | yes (key-authenticated) |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

No config file: `STORE_MODEL_IN_DB` keeps models and (encrypted) provider
credentials in Postgres - manage them in the admin UI without redeploys.

## Local

```bash
cp .env.example .env        # master key + salt key
docker compose up -d
open http://localhost:5000/ui
```

## On Miget

Create a Compose Stack pointing at this repo, path `litellm`. The managed
Postgres is provisioned and `DATABASE_URL` auto-wired; required variables:
**`LITELLM_MASTER_KEY`** (admin key, must start with `sk-`) and
**`LITELLM_SALT_KEY`** (`openssl rand -hex 32`; encrypts stored provider
keys - set it before adding the first model, it cannot be rotated after).

Open `/ui`, log in with the master key, add providers and models, then
mint scoped virtual keys per app/team. In-project apps call
`http://litellm:5000/v1` with a virtual key; the public domain serves
external clients.

Every request is authenticated (master or virtual key) - safe to expose.
The container is stateless; state lives in Postgres.
