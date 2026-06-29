import type { AppBase } from './index';

export const dify: AppBase = {
  slug: 'dify',
  name: 'Dify',
  upstream: 'Dify',
  upstreamUrl: 'https://dify.ai',
  tagline:
    'The LLM app platform - visual builder, RAG, agents, observability - the catalogue’s heaviest stack, shipped honestly.',
  category: 'LLM Infrastructure',
  status: 'experimental',
  seoTitle: 'Self-host Dify: the LLM app platform with Docker Compose',
  seoDescription:
    'Deploy Dify - visual LLM app builder with RAG, agents, and workflows - as a faithful 11-service stack for $49/month flat. No message-credit metering; honest complexity notes included.',
  keywords: [
    'self-host dify',
    'dify docker compose',
    'dify cloud alternative',
    'llm app platform self-hosted',
    'dify setup production',
    'dify license multi-tenant',
  ],
  intro: [
    'Dify is the most complete LLM app platform in open source: a visual builder for chatbots, agents, and multi-step workflows, with built-in RAG over your documents, model management across providers, annotations, and usage observability. 120k+ GitHub stars say the demand is real.',
    'It is also, honestly, the heaviest template in this catalogue: eleven services mirroring upstream’s compose at the 1.14 line - api/worker/beat, web, the plugin daemon, a code-execution sandbox with its squid egress guard, same-origin nginx routing (which eliminates post-deploy URL variables), plus its own Postgres, noeviction Valkey, and bundled Qdrant. The experimental badge means exactly that: validate on a dev project, bump the version-locked images together.',
    'Two honest notes carried from the license and pricing pages: self-hosting is single-tenant by license (one shared Dify for multiple customer tenants needs upstream permission), and Dify Cloud meters message credits ($59/month for 5,000) - which self-hosting does not.',
  ],
  features: [
    'Visual builder: chatbots, agents, and multi-step workflows',
    'Built-in RAG: ingest, chunk, embed, retrieve - Qdrant bundled',
    'Model management across providers (litellm plugs in as OpenAI-compatible)',
    'Plugin ecosystem via the bundled daemon',
    'Sandboxed code execution with SSRF-guarded egress',
    'Same-origin routing: no post-deploy URL variables',
  ],
  topology: [
    { service: 'entry', role: 'nginx router (:5000) - api + web same-origin', isPublic: 'yes' },
    { service: 'api / worker / worker_beat / web / plugin_daemon', role: 'the Dify platform (version-locked images)', isPublic: 'no' },
    { service: 'sandbox / ssrf_proxy', role: 'code execution + egress guard', isPublic: 'no' },
    { service: 'db / redis / vectordb', role: 'Postgres (2 DBs) / noeviction Valkey / Qdrant', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY + six service secrets', what: 'openssl one-liners in .env.example - nothing else to configure' },
  ],
  ramMiB: 6784,
  diskGB: 27,
  services: 11,
  sizingNote:
    'Upstream’s floor is 4 GiB; this allocation gives the real shape room. The four langgenius images are version-locked - upgrade them together with release notes open.',
  faq: [
    {
      q: 'Dify, Flowise, or Open WebUI?',
      a: 'Open WebUI (1 container) for team chat over models. Flowise (2 services) for visual LLM flows and embeddable bots. Dify (11 services) when you want the full platform - workflows, RAG pipelines, plugins, multi-app workspaces - and accept the operational weight. The catalogue ships all three so the choice is honest.',
    },
    {
      q: 'What does the license actually restrict?',
      a: 'Dify’s open-source license is Apache-2.0 plus two conditions: keep the branding, and do not operate one Dify as a multi-tenant service for separate customers without permission. Your org self-hosting its own workspace - the thing this template does - is explicitly fine.',
    },
    {
      q: 'How does the cost compare to Dify Cloud?',
      a: 'Dify Cloud Professional is $59/month per workspace with 5,000 message credits and caps on apps and documents. This stack is $49/month flat with no credit metering - the LLM calls themselves bill at your providers either way (cap them via the litellm template).',
    },
    {
      q: 'Why so many services?',
      a: 'Because Dify genuinely is a platform: async ingestion needs workers, plugins need their daemon, untrusted code needs a sandbox with guarded egress, and RAG needs a vector store. The template wires all of it so one deploy works - but the page count is the honest price of the feature count.',
    },
  ],
};
