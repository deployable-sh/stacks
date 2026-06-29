# Arize Phoenix

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=phoenix&type=stack)

[Phoenix](https://phoenix.arize.com) - LLM tracing, evaluations,
datasets, and a prompt playground in ONE container, OpenTelemetry-native.
Where the catalogue's `langfuse` stack is the six-service platform,
Phoenix is the lightweight start: SQLite on a volume, up in seconds.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000   # admin@localhost / admin - forced reset
```

## On Miget

Create a Compose Stack pointing at this repo, path `phoenix`. One
required variable: **`PHOENIX_SECRET`** (32+ chars). Log in as
`admin@localhost` / `admin` and change the password immediately (the UI
forces it).

Send traces from apps in the project via OpenTelemetry: OTLP/HTTP to
`http://phoenix:5000/v1/traces` or OTLP/gRPC to `phoenix:4317` - every
LLM framework has an OTel exporter, and Phoenix's own SDKs auto-
instrument LangChain/LlamaIndex/OpenAI clients.

Scaling path: SQLite on the volume is right for a team; heavy retention
moves to Postgres via `PHOENIX_POSTGRES_*` env. License: Elastic 2.0 -
self-hosting for your own use is fine; offering Phoenix itself as a
managed service is what it restricts.
