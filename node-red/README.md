# Node-RED

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=node-red&type=stack)

[Node-RED](https://nodered.org) - the OpenJS Foundation's flow-based
automation tool: wire APIs, webhooks, MQTT, schedules, and devices
together in a visual editor, with thousands of community nodes.

## Why this template wraps the image

A public Node-RED editor without auth is remote code execution by
design. The stock image ships open; this template refuses to - it
seeds `/data/settings.js` with bcrypt `adminAuth` on first boot and
exits loudly if you forget the hash.

## Local

```bash
cp .env.example .env       # generate the bcrypt hash per the comment
docker compose up -d --build
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `node-red`. Required
variable: **`NODERED_PASSWORD_HASH`** (bcrypt - one docker run command,
in `.env.example`). Flows, credentials, and installed nodes persist on
the `/data` volume; install extra nodes from the palette as usual.

Node-RED or n8n? Node-RED for device/MQTT/webhook wiring and the
engineering crowd; n8n (also here, in queue mode) for SaaS-integration
automation with credentials management. Different ecosystems, both
flat-priced.
