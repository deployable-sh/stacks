# Flowise

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=flowise&type=stack)

[Flowise](https://flowiseai.com) - the visual builder for LLM apps:
drag-and-drop chatflows and agentflows over 100+ integrations (models,
vector stores, tools), with APIs and embeddable chat widgets. One app
container + a managed Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `flowise` | builder UI + runtime APIs (`:5000`) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000     # create the admin account on first visit
```

## On Miget

Create a Compose Stack pointing at this repo, path `flowise`. The managed
Postgres is provisioned and auto-wired; required variables: the three
session secrets plus **`FLOWISE_SECRETKEY_OVERWRITE`** (encrypts stored
provider credentials - fixed so recreations never orphan them). After
first deploy set **`APP_URL`** to the app's https domain. Accounts are
created in the UI on first visit (v3 dropped the username/password envs).

Pairs with the rest of the LLM lane: point model nodes at the `litellm`
gateway, vector-store nodes at `qdrant`/`chromadb`, and send traces to
`langfuse` - all by service name, all in one project. Blob storage
(uploaded files) lives on the volume; flows and users in Postgres.

License: Apache-2.0 core (enterprise features are commercial and gated
by a license key - the community image is the open-source product).
