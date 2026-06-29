import type { AppBase } from './index';

export const cognee: AppBase = {
  slug: 'cognee',
  name: 'Cognee',
  upstream: 'Cognee',
  upstreamUrl: 'https://www.cognee.ai',
  tagline:
    'The memory engine for AI agents - knowledge graph + vector memory in one self-contained container.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host Cognee: remote memory for AI agents',
  seoDescription:
    'Deploy Cognee - the open-source memory engine: ingest documents, build knowledge graphs + vector indexes, query as agent memory - in one container for $13/month. Apache-2.0, zero sidecars.',
  keywords: [
    'self-host cognee',
    'cognee docker compose',
    'ai agent memory self-hosted',
    'mem0 alternative',
    'knowledge graph memory llm',
    'remote memory agents',
  ],
  intro: [
    'Agents without memory re-learn your world every session. Cognee is the maintained open-source answer (Apache-2.0, 17k+ stars, releases this month): ingest documents and conversations, "cognify" them into a knowledge graph plus vector index, and query the result as long-term memory over a clean API.',
    'The engineering taste shows in the defaults: SQLite, LanceDB, and Kuzu all run in-process - one container, one volume, no sidecar fleet. Every layer has a scale-out path via env (Postgres, the catalogue’s qdrant, Neo4j) when you genuinely need it.',
    'It is API-first (Swagger at /docs; the upstream UI is a separate work-in-progress) and slots into the catalogue’s agent lane: route extraction through the litellm gateway, and give agent-box or OpenClaw agents a memory that survives them.',
  ],
  features: [
    'Knowledge graph + vector memory from documents and chats',
    'Self-contained defaults: SQLite + LanceDB + Kuzu in-process',
    'Real auth (JWT users + API keys) - register, token, go',
    'OpenAI-compatible gateway support (litellm plugs in)',
    'Scale-out env paths: Postgres, Qdrant, Neo4j per layer',
    'Apache-2.0, very actively maintained',
  ],
  topology: [
    { service: 'cognee', role: 'memory API + Swagger at /docs (:5000)', isPublic: 'yes (JWT auth)' },
  ],
  requiredVars: [
    { name: 'LLM_API_KEY', what: 'fact extraction + embeddings (billed to you; litellm virtual keys work)' },
    { name: 'FASTAPI_USERS_JWT_SECRET', what: 'overrides an insecure default' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    'Cognify jobs are the memory consumers (graph building in-process) - 2 GiB is the floor, heavy corpora want more. Upstream caps its own compose at 8 GiB.',
  faq: [
    {
      q: 'Cognee or Mem0 for agent memory?',
      a: 'Mem0 is the bigger name, but its published self-host images are stale (the current server has no amd64 image - we verified before choosing). Cognee ships current images, runs self-contained, and adds the knowledge-graph layer plain vector memory lacks. When Mem0 publishes proper images, it earns a template too.',
    },
    {
      q: 'How do agents use it?',
      a: 'Over the REST API: add content, trigger cognify, then search with graph-aware retrieval - returning facts and relationships, not just similar chunks. Register a user, mint a token, and any agent in the project calls http://cognee:5000.',
    },
    {
      q: 'What do the LLM calls cost?',
      a: 'Cognify extracts entities and relations via your LLM and embeds via your embedding model - that is the real cost, scaling with ingested volume. Route through the litellm template to cap it with a budgeted virtual key, and consider the tei template for the embedding leg.',
    },
  ],
};
