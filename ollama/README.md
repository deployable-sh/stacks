# Ollama

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=ollama&type=stack)

[Ollama](https://ollama.com) - run open large language models locally
behind a simple HTTP API. Pull a model (Llama, Mistral, Qwen, Gemma, Phi,
and many more) and serve it from your own infrastructure, with
OpenAI-compatible endpoints. `OLLAMA_HOST=0.0.0.0:5000` puts the API on
Miget's port.

> Status: **experimental**, and read this first. Real LLM inference wants
> a **GPU**. If the Miget plan has no GPU, you are limited to small models
> (~1-3B parameters) and responses will be slow. Ollama still runs, and
> small models are genuinely useful for embeddings, classification, and
> lightweight chat - just size your expectations to CPU.

## Local

```bash
docker compose up -d
docker compose exec ollama ollama pull llama3.2     # pull a model
curl http://localhost:5000/api/tags                 # list installed models
```

## On Miget

Create a Compose Stack pointing at this repo, path `ollama` - no
variables. The model store at `/root/.ollama` lives on a large volume;
**models are big** (~2 GB for a 3B model, ~5 GB for 7-8B, ~40 GB for
70B), so size it to what you pull or they re-download on restart.

The API has **no authentication**, so this template keeps the service
**private** (not publicly reachable). Reach it from your other apps over
the internal network, or put an auth/proxy layer in front - this
catalogue's **litellm** is the natural choice, giving you keys, rate
limits, and an OpenAI-compatible gateway over Ollama. **open-webui** adds
a chat UI. MIT-licensed.
