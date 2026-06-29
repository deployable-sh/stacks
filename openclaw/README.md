# OpenClaw

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=openclaw&type=stack)

[OpenClaw](https://openclaw.ai), an autonomous AI agent you run yourself:
web dashboard, scheduled tasks, plugins, persistent workspace. This
template uses the [coollabsio all-in-one image](https://github.com/coollabsio/openclaw)
(nginx + gateway, env-driven).

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo. Required variables:
**`ANTHROPIC_API_KEY`** (the agent's model access, billed to you!),
**`AUTH_PASSWORD`** (basic auth on the dashboard) and
**`OPENCLAW_GATEWAY_TOKEN`** (`openssl rand -hex 24`). After first deploy,
set `OPENCLAW_ALLOWED_ORIGINS` to the app's https domain and redeploy.

State and workspace persist on the `/data` volume across redeploys.

**Treat this as a privileged deployment**: an autonomous agent with your
API key and a persistent workspace. Keep the password strong; consider
adding the platform's app-level Basic Auth as a second layer.
