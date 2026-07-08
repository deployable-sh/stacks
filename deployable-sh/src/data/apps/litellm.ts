import type { AppBase } from './index';

export const litellm: AppBase = {
  slug: 'litellm',
  name: 'LiteLLM',
  upstream: 'LiteLLM',
  upstreamUrl: 'https://docs.litellm.ai',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'One OpenAI-compatible gateway for every LLM provider - virtual keys, budgets, spend tracking - with no percentage fee.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host LiteLLM proxy: LLM gateway with Docker Compose',
  seoDescription:
    'Deploy the LiteLLM proxy - one OpenAI-compatible endpoint for Anthropic, OpenAI, Gemini, Bedrock and 100+ providers, with virtual keys, budgets and spend tracking - in one step on a managed Postgres.',
  keywords: [
    'self-host litellm',
    'litellm proxy docker compose',
    'llm gateway self-hosted',
    'openrouter alternative',
    'litellm virtual keys',
    'llm api gateway',
  ],
  intro: [
    'Every team using LLMs converges on the same needs: one endpoint instead of five SDKs, per-team API keys instead of the shared provider key in a Slack DM, budgets before the invoice surprise, and a log of who spent what on which model. LiteLLM is the open-source gateway that does exactly this - an OpenAI-compatible proxy in front of 100+ providers.',
    'This template runs the database-backed mode on a managed Postgres: virtual keys, teams, budgets, and spend logs all persist, and models are managed in the admin UI (/ui) with no config file - STORE_MODEL_IN_DB keeps provider credentials encrypted in the database.',
    'The hosted alternatives take a cut or meter your logs; OpenRouter adds 5.5% on credits, Portkey meters logged requests. A self-hosted gateway charges neither - your provider keys, your spend caps, LAN latency from the agents in your project.',
  ],
  features: [
    'OpenAI-compatible /v1 endpoint for 100+ providers (Anthropic, OpenAI, Gemini, Bedrock, Mistral, …)',
    'Virtual keys with per-key/team budgets, rate limits, and model allowlists',
    'Spend tracking per key, team, and model in Postgres',
    'Fallbacks, retries, and load balancing across deployments',
    'Admin UI at /ui - add models and mint keys without redeploys',
    'No config.yaml: models and encrypted provider keys live in the DB',
  ],
  topology: [
    { service: 'litellm', role: 'proxy + admin UI (:5000, key-authenticated)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'LITELLM_MASTER_KEY', what: 'admin key - must start with sk-' },
    { name: 'LITELLM_SALT_KEY', what: 'encrypts stored provider keys (openssl rand -hex 32); set before adding the first model, cannot rotate after' },
  ],
  ramMiB: 3072,
  diskGB: 5,
  services: 2,
  sizingNote:
    '2 GiB suits a single proxy instance for team workloads (official prod guidance is 4 GiB per worker - size up under heavy concurrency). The container is stateless; Postgres holds everything.',
  faq: [
    {
      q: 'How does this compare to OpenRouter?',
      a: 'OpenRouter is excellent for instant multi-model access but adds a 5.5% fee on credits and routes your traffic through their infrastructure. Self-hosted LiteLLM uses your own provider keys at raw provider prices, keeps prompts inside your network, and adds the team controls (budgets, virtual keys) OpenRouter does not.',
    },
    {
      q: 'Do my existing OpenAI-SDK apps work with it?',
      a: 'Yes - that is the design. Point base_url at your gateway (http://litellm:5000/v1 in-project, or the public domain) with a virtual key, and the same SDK call can hit Claude, GPT, or Gemini depending on the model name and your routing config.',
    },
    {
      q: 'Where do provider API keys live?',
      a: 'Encrypted in Postgres using LITELLM_SALT_KEY, managed through the admin UI. Generate the salt key before adding the first model and never rotate it - it cannot be changed once credentials are stored.',
    },
    {
      q: 'Is it safe to expose the proxy publicly?',
      a: 'Every request requires a key (master or virtual), so the public domain is usable by external clients. For purely internal use, in-project apps can call http://litellm:5000 and you can keep usage gated by virtual keys per team or agent.',
    },
    {
      q: 'Does it pair with the other LLM templates here?',
      a: 'Naturally: point agent-box, OpenClaw, or Hermes at the gateway for spend caps per agent, and send LiteLLM callbacks to the langfuse template for tracing - the whole LLM platform, self-hosted in one project.',
    },
  ],
};
