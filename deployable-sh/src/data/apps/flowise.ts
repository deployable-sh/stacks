import type { AppBase } from './index';

export const flowise: AppBase = {
  slug: 'flowise',
  name: 'Flowise',
  upstream: 'Flowise',
  upstreamUrl: 'https://flowiseai.com',
  license: 'Apache-2.0',
  licenseTier: 'source-available',
  licenseNote: 'core Apache-2.0; enterprise features commercial/gated',
  tagline:
    'Visual builder for LLM apps and agents - 100+ integrations, embeddable chat widgets, no prediction caps.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host Flowise: visual LLM app builder with Docker Compose',
  seoDescription:
    'Deploy Flowise - drag-and-drop chatflows and agents over 100+ LLM integrations, with APIs and embeddable widgets - in one step on a managed Postgres. No prediction caps, flat price.',
  keywords: [
    'self-host flowise',
    'flowise docker compose',
    'flowise cloud alternative',
    'llm app builder open source',
    'visual agent builder',
    'flowise postgres',
  ],
  related: ['ollama', 'qdrant', 'langfuse'],
  intro: [
    'Flowise is the visual layer of the LLM stack: drag models, vector stores, tools, and memory onto a canvas, wire them into chatflows or multi-agent flows, and ship the result as an API or an embeddable chat widget. For teams where not everyone writes LangChain by hand, it is the fastest route from idea to working assistant.',
    'This template runs Flowise v3 on a managed Postgres (flows, users, credentials) with a volume for uploaded files. v3 auth means accounts are created in the UI on first visit; four secrets in env keep sessions and stored provider credentials stable across redeploys.',
    'It slots into the catalogue’s LLM lane end to end: models via the litellm gateway, vectors in qdrant or chromadb, traces to langfuse - every connection by service name, nothing leaving the project network.',
  ],
  features: [
    'Drag-and-drop chatflows and agentflows over 100+ integrations',
    'Ship flows as REST APIs or embeddable chat widgets',
    'Managed Postgres for flows/users/credentials - clean ops',
    'Credential encryption with a fixed, recreation-safe key',
    'Optional queue mode (Redis) when throughput demands it',
    'Apache-2.0 core - the community image is the product',
  ],
  topology: [
    { service: 'flowise', role: 'builder UI + runtime APIs (:5000)', isPublic: 'yes (accounts)' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'JWT_AUTH_TOKEN_SECRET / JWT_REFRESH_TOKEN_SECRET / EXPRESS_SESSION_SECRET', what: 'session signing (openssl rand -hex 32 each)' },
    { name: 'FLOWISE_SECRETKEY_OVERWRITE', what: 'fixed credential-encryption key (openssl rand -hex 24)' },
    { name: 'APP_URL', what: 'set to the app’s https domain after first deploy' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 2,
  sizingNote:
    '1 GiB runs the builder and typical flow traffic; the LLM heavy lifting happens at your providers. Scale up (or enable queue mode) when widget traffic grows.',
  faq: [
    {
      q: 'How does this compare to Flowise Cloud and Dify Cloud?',
      a: 'Flowise Cloud Starter is $35/month capped at 10,000 predictions; Dify Cloud Professional is $59/month for 5,000 message credits. Self-hosted Flowise is $13/month with no prediction meter - the flows run against your own provider keys.',
    },
    {
      q: 'Where did the FLOWISE_USERNAME/PASSWORD login go?',
      a: 'Flowise v3 replaced the shared-credential envs with real accounts: visit the app once after deploy and create the admin user in the setup screen. The env secrets in this template sign those sessions; they are not a login.',
    },
    {
      q: 'Flowise or n8n for automation?',
      a: 'n8n (also in this catalogue, in queue mode) is general workflow automation with LLM nodes; Flowise is purpose-built for conversational AI - chat memory, RAG patterns, agent tools, and an embeddable widget. Many teams run both for different jobs.',
    },
    {
      q: 'How do I embed a bot on my site?',
      a: 'Each flow exposes an API endpoint and an embed snippet (script tag or React component) pointing at your domain. Keep the flow’s API key server-side for private flows; public chat widgets use the public endpoint with rate limits.',
    },
  ],
};
