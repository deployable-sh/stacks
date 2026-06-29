# Open WebUI

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=open-webui&type=stack)

[Open WebUI](https://openwebui.com) - the self-hosted AI chat workspace:
ChatGPT-style UI over any OpenAI-compatible API, with RAG over uploaded
documents, multi-user accounts, RBAC, and prompt/model presets. Single
container + volume.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000     # the FIRST account created becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `open-webui`. Required
variables: **`WEBUI_SECRET_KEY`** (`openssl rand -hex 32`) and an
**`OPENAI_API_KEY`** for your endpoint. Create the first account promptly
(it becomes admin); subsequent signups need admin approval by default.

The strongest setup pairs it with the catalogue's `litellm` template:
set `OPENAI_API_BASE_URL=http://litellm:5000/v1` and a LiteLLM virtual
key - one gateway, every provider, per-team budgets, and this UI in
front. All state (users, chats, uploaded documents, vector index) lives
on the `/app/backend/data` volume.

No GPU needed: models run at your API providers. (The `:ollama` image
variant bundles local models - that wants RAM and ideally a GPU; this
template deliberately uses the API-only image.)

License note: Open WebUI uses a BSD-3-derived license with a
branding-protection clause - keep the branding visible (fine for your
own deployments; white-labeling requires their enterprise license).
