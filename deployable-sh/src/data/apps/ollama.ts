import type { AppBase } from './index';

export const ollama: AppBase = {
  slug: 'ollama',
  name: 'Ollama',
  upstream: 'Ollama',
  upstreamUrl: 'https://ollama.com',
  tagline: 'Run open LLMs behind a simple API - llama, mistral, qwen. The local-model server (GPU recommended).',
  category: 'LLM Infrastructure',
  status: 'experimental',
  seoTitle: 'Self-host Ollama: run open LLMs behind an API',
  seoDescription:
    'Deploy Ollama - pull and serve open LLMs (Llama, Mistral, Qwen, Gemma, Phi) behind an OpenAI-compatible API on your own infrastructure. Pairs with open-webui and litellm. GPU recommended for real inference.',
  keywords: [
    'self-host ollama',
    'ollama docker compose',
    'run llm locally self-hosted',
    'local llm server',
    'ollama openai compatible api',
    'ollama miget',
  ],
  intro: [
    'Ollama is the simplest way to run open large language models behind an HTTP API: pull a model (Llama, Mistral, Qwen, Gemma, Phi, and many more) and serve it with OpenAI-compatible endpoints, on infrastructure you own. OLLAMA_HOST puts the API on port 5000; there are no external dependencies.',
    'Read the caveat first, because it is the whole story: real inference wants a GPU. A PaaS typically does not pass one through, so on CPU you are limited to small models (~1-3B parameters) and responses are slow. Ollama still runs, and small models are genuinely useful for embeddings, classification, and lightweight chat - just size expectations to CPU. This template is marked experimental for exactly that reason.',
    'It is best used as a building block: keep it private and front it with this catalogue’s litellm for keys, rate limits, and an OpenAI-compatible gateway, or add open-webui for a chat UI. Models are large, so the model volume is the thing to size.',
  ],
  features: [
    'Pull and serve open LLMs behind one HTTP API',
    'OpenAI-compatible endpoints; no external dependencies',
    'Pairs with litellm (gateway) and open-webui (chat UI)',
    'OLLAMA_HOST=0.0.0.0:5000 - clean port fit, no wrapper',
    'Private by default - no auth, so do not expose it raw',
    'MIT-licensed; GPU strongly recommended',
  ],
  topology: [
    { service: 'ollama', role: 'model server / API (private, :5000)', isPublic: 'no (front with litellm)' },
    { service: 'models volume', role: 'downloaded model weights (large)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: '(none)', what: 'OLLAMA_HOST is preset to 0.0.0.0:5000 by the template' },
  ],
  ramMiB: 4096,
  diskGB: 50,
  services: 1,
  sizingNote: 'RAM tracks the model: a 3B needs a few GiB, 7-8B more. The model volume is large (~2 GB for 3B, ~5 GB for 7-8B, ~40 GB for 70B) - size it or models re-download on restart. Without a GPU, stick to small models.',
  faq: [
    {
      q: 'Is it usable without a GPU?',
      a: 'For small models, yes - 1-3B models run on CPU and are useful for embeddings, classification, and light chat, just slowly. For 7B+ at interactive speed you really want a GPU, which a PaaS generally cannot provide. That is why this template is experimental.',
    },
    {
      q: 'Should I expose it publicly?',
      a: 'No. Ollama has no authentication, so this template keeps it private. Reach it from your other apps over the internal network, or front it with litellm (in this catalogue) to add API keys, rate limits, and an OpenAI-compatible gateway.',
    },
    {
      q: 'How big is the model storage?',
      a: 'Models are large and live on a volume: roughly 2 GB for a 3B model, 5 GB for 7-8B, and 40 GB for 70B. Size the volume to what you pull, or models re-download after a restart.',
    },
  ],
};
