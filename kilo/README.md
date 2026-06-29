# Kilo (headless server)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=kilo&type=stack)

[Kilo](https://kilo.ai), open-source AI coding agent, running in
**server mode** (`kilo serve`) on Miget: a persistent remote agent whose
HTTP+SSE API your Kilo clients attach to (IDE extension, `kilo attach`,
or the Cloud Agents web UI via Remote Connections). `/workspace` (10 GB)
survives redeploys.

## Local

```bash
cp .env.example .env && docker compose up -d --build
```

## On Miget

Create a Compose Stack pointing at this repo. Required variables:
**`KILO_SERVER_PASSWORD`** (HTTP basic auth on the API) and
**`ANTHROPIC_API_KEY`** (or configure another provider via Kilo config in
the workspace). Connect a client to `https://<app-domain>` with the
password.

Prefer a terminal instead of the API? The catalogue's `agent-box` template
ships the Kilo CLI (plus Claude Code and opencode) in a browser terminal.
