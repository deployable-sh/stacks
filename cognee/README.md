# Cognee

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=cognee&type=stack)

[Cognee](https://www.cognee.ai) - the memory engine for AI agents:
ingest documents, chats, and data; cognify them into a knowledge graph +
vector index; query the result as long-term memory. Apache-2.0, very
active, and refreshingly self-contained: SQLite + LanceDB + Kuzu run
in-process - one container, one volume, no sidecars.

API-first: explore at `/docs` (Swagger). Register a user via
`POST /api/v1/auth/register`, log in for a bearer token, then `add` ->
`cognify` -> `search`. (The upstream UI is a separate work-in-progress
frontend with no published image.)

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000/docs
```

## On Miget

Create a Compose Stack pointing at this repo, path `cognee`. Required
variables: **`LLM_API_KEY`** (fact extraction + embeddings are LLM
calls - billed to you) and **`FASTAPI_USERS_JWT_SECRET`** (overrides an
insecure default).

Route through the catalogue's `litellm` gateway for budgets and provider
choice: `LLM_PROVIDER=custom`, `LLM_ENDPOINT=http://litellm:5000/v1`.
Scaling paths exist for every layer (Postgres, Qdrant, Neo4j via env)
when the embedded engines stop being enough - the defaults carry a long
way. Give cognify jobs room: 2 GiB minimum, more for heavy corpora.
