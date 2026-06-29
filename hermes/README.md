# Hermes Agent

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=hermes&type=stack)

[Hermes Agent](https://hermes-agent.nousresearch.com) (Nous Research), a
self-improving AI agent with a learning loop (skills from experience),
cron, hooks, and a web dashboard. Official image, single container +
`/opt/data` volume (sessions, memories, skills, config all persist).

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo. Required variables:
**`HERMES_PASSWORD`** (dashboard basic auth), **`HERMES_SESSION_SECRET`**
(`openssl rand -hex 32`) and **`ANTHROPIC_API_KEY`** (the agent's model
access, billed to you). The dashboard is on the app's domain; the gateway
API (`hermes:8642`) stays project-internal (enable it with
`API_SERVER_ENABLED=true` + `API_SERVER_KEY` vars if you want programmatic
access from other apps).

**Treat this as a privileged deployment**, an autonomous agent with your
API key and persistent memory. Keep the password strong.
