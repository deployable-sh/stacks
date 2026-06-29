import type { AppBase } from './index';

export const letta: AppBase = {
  slug: 'letta',
  name: 'Letta',
  upstream: 'Letta (MemGPT)',
  upstreamUrl: 'https://www.letta.com',
  tagline:
    'The MemGPT agent server - agents live server-side with self-editing persistent memory.',
  category: 'LLM Infrastructure',
  status: 'experimental',
  seoTitle: 'Self-host Letta (MemGPT): the agent server with memory',
  seoDescription:
    'Deploy Letta - the MemGPT-lineage agent server where agents persist with self-editing memory - in one step with a pgvector Postgres for $25/month. Honest caveats included.',
  keywords: [
    'self-host letta',
    'memgpt self-hosted',
    'letta docker compose',
    'agent server memory',
    'letta cloud alternative',
    'persistent ai agents',
  ],
  intro: [
    'MemGPT introduced the idea that stuck: agents managing their own memory - editing what they know, paging context in and out. Letta is that research grown into an agent server: agents are server-side entities with persistent, self-editing memory, and your apps converse with them over a REST API.',
    'This template runs the pinned server image on a pgvector Postgres (required), behind an SSE-friendly proxy with password auth. The hosted ADE (Letta’s agent development environment) connects to your server over HTTPS for visual agent building.',
    'The experimental badge is earned honestly: upstream states the Docker image is no longer their primary supported surface (their push is Letta Cloud at $20/month+). It works today, the image is pinned, and the page says exactly this - because finding out from a changelog is worse.',
  ],
  features: [
    'Server-side agents with self-editing persistent memory',
    'REST API: create agents, converse, inspect memory',
    'Hosted ADE connects to your server for visual building',
    'pgvector Postgres handled in-template',
    'Password-protected, SSE-streaming proxy',
    'Apache-2.0, pinned image (0.16.8)',
  ],
  topology: [
    { service: 'letta', role: 'agent server API (:8283, no port env)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> letta (SSE-friendly)', isPublic: 'yes (password)' },
    { service: 'db', role: 'Postgres + pgvector (required)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'LETTA_SERVER_PASSWORD', what: 'API bearer password' },
    { name: 'OPENAI_API_KEY / ANTHROPIC_API_KEY', what: 'at least one provider (billed to you)' },
  ],
  ramMiB: 2560,
  diskGB: 10,
  services: 3,
  sizingNote:
    'The server orchestrates; models run at your providers. Pin discipline matters here - read upstream notes before bumping the image.',
  faq: [
    {
      q: 'Letta or Cognee for memory?',
      a: 'Different layers: Letta IS the agent - server-side entities whose memory management is the product. Cognee is memory infrastructure your existing agents query. If you are building on the MemGPT model, Letta; if you are adding memory to agents you already have, Cognee.',
    },
    {
      q: 'Why experimental?',
      a: 'Upstream openly deprioritizes the self-host Docker surface in favor of Letta Cloud - the image still ships versioned releases, but support energy lives elsewhere. We pin 0.16.8, document it, and let you decide with eyes open.',
    },
    {
      q: 'How do I build agents visually?',
      a: 'Connect the hosted ADE (app.letta.com) to your server: HTTPS domain + your server password. Remote servers must be HTTPS, which the platform ingress provides. One upstream quirk: set the embedding model explicitly when creating agents on Docker deployments.',
    },
  ],
};
