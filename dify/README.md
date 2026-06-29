# Dify

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=dify&type=stack)

[Dify](https://dify.ai) - the LLM application platform: a visual builder
for chatbots, agents, and workflows, with built-in RAG, model management,
and observability. **Experimental**: the heaviest stack in the catalogue
(11 services, version-locked images, fast-moving upstream) - validate on
a dev project first.

## Topology

Mirrors upstream's compose at the 1.14 line: `api` + `worker` +
`worker_beat` (langgenius/dify-api), `web`, `plugin_daemon`, the
code-execution `sandbox` with its `ssrf_proxy` (squid egress guard), an
nginx `entry` routing everything same-origin from one domain, plus its
own Postgres (two databases), a noeviction Valkey, and a bundled Qdrant.
Same-origin routing means NO post-deploy URL variables.

## Local

```bash
cp .env.example .env       # seven secrets, openssl one-liners inline
docker compose up -d --build
open http://localhost:5000 # first visit creates the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `dify`. Required
variables: the seven secrets in `.env.example`. First visit to the
domain runs admin setup; add model providers (or point OpenAI-compatible
providers at the catalogue's `litellm` gateway) and build.

Honest notes:

- **License**: Dify's open-source license allows single-tenant
  self-hosting (your org, one workspace). Operating one shared Dify for
  multiple customer tenants requires upstream permission.
- **Upgrades**: the four langgenius images are version-locked to each
  other - bump them together, reading upstream release notes; the env
  surface moves between minors.
- Prefer fewer moving parts? `flowise` (2 services) and `open-webui`
  (1 service) cover adjacent ground in this catalogue.
