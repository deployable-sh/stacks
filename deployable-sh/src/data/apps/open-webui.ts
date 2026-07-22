import type { AppBase } from './index';

export const openWebui: AppBase = {
  slug: 'open-webui',
  name: 'Open WebUI',
  upstream: 'Open WebUI',
  upstreamUrl: 'https://openwebui.com',
  license: 'BSD-3-Clause (+ branding)',
  licenseTier: 'source-available',
  licenseNote: 'branding-preservation clause added',
  tagline:
    'The self-hosted AI chat workspace - any model behind one UI, RAG over your documents, no per-seat pricing.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host Open WebUI: team AI chat with Docker Compose',
  seoDescription:
    'Deploy Open WebUI - a ChatGPT-style workspace over any OpenAI-compatible API, with RAG, multi-user RBAC, and prompt presets - in one step for $13/month. Pays raw token prices, not per-seat fees.',
  keywords: [
    'self-host open webui',
    'open webui docker compose',
    'chatgpt team alternative',
    'self-hosted ai chat',
    'open webui litellm',
    'team llm workspace',
  ],
  guideUrl: 'https://miget.com/blog/how-to-self-host-open-webui',
  related: ['ollama', 'litellm', 'qdrant'],
  intro: [
    'Team AI chat subscriptions charge per seat for what is mostly a UI: ChatGPT Business and Claude Team both land around $25 per user per month before anyone sends a token. Open WebUI is the self-hosted answer - a polished, fast chat workspace over any OpenAI-compatible API, with the team features (accounts, RBAC, shared prompts, document RAG) included.',
    'One container, one volume, one secret. Users sign up (first account is admin, the rest need approval), upload documents for retrieval, and chat against whatever models you connect. No GPU involved - models run at your API providers.',
    'The strongest deployment pairs it with this catalogue’s litellm gateway: every provider behind one base URL, per-team budgets on virtual keys, and this UI in front. A 10-person team pays raw token prices plus $13/month - versus ~$250/month in seats before usage.',
  ],
  features: [
    'ChatGPT-style UI over any OpenAI-compatible endpoint',
    'Multi-user with RBAC; first account becomes admin',
    'RAG: upload documents, chat over them (built-in vector store)',
    'Prompt presets, model switching, conversation sharing',
    'Single container + volume - SQLite and Chroma embedded',
    'Pairs with litellm for budgets and provider routing',
  ],
  topology: [
    { service: 'open-webui', role: 'chat workspace (:5000)', isPublic: 'yes (accounts)' },
  ],
  requiredVars: [
    { name: 'WEBUI_SECRET_KEY', what: 'session signing (openssl rand -hex 32) - persistent, or logins reset on redeploy' },
    { name: 'OPENAI_API_KEY', what: 'key for your endpoint (a LiteLLM virtual key works perfectly)' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    '2 GiB covers the app plus its embedded embedding models for RAG. State (users, chats, documents, vectors) lives on the volume; external Postgres/Qdrant are supported when a single node stops being enough.',
  faq: [
    {
      q: 'How does this compare to ChatGPT Business or Claude Team?',
      a: 'Both charge ~$25/seat/month ($20 annual) - $250/month for ten people, before usage. Open WebUI + LiteLLM pays raw API token prices with no seat fee: for typical internal usage that is a fraction of the subscription cost, and you choose models per conversation.',
    },
    {
      q: 'Does it need Ollama or a GPU?',
      a: 'No - this template deliberately uses the API-only image. Connect any OpenAI-compatible endpoint (OpenAI, Anthropic via LiteLLM, Gemini, your own vLLM elsewhere). The :ollama variant exists for local models, but that is a different RAM/GPU conversation.',
    },
    {
      q: 'How does the RAG feature work?',
      a: 'Upload documents in the UI; Open WebUI chunks and embeds them into its built-in vector store and injects relevant passages into chats. For heavier knowledge bases, it supports external vector stores - the catalogue’s qdrant template plugs in via VECTOR_DB settings.',
    },
    {
      q: 'What is the licensing situation?',
      a: 'Open WebUI uses a BSD-3-derived license with a branding-protection clause: keep the Open WebUI branding visible (fine for internal deployments; white-labeling it as your own product requires their enterprise license).',
    },
  ],
};
