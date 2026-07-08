import type { AppBase } from './index';

export const chromadb: AppBase = {
  slug: 'chromadb',
  name: 'ChromaDB',
  upstream: 'Chroma',
  upstreamUrl: 'https://www.trychroma.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'Chroma vector database - the developer-friendly embedding store, single container + volume, internal-only.',
  category: 'Search & Vectors',
  status: 'stable',
  seoTitle: 'Self-host ChromaDB (Chroma) with Docker Compose',
  seoDescription:
    'Deploy Chroma - the embedding database with the famously simple API - as a persistent server in one step. Python and JS clients, persistent volume, flat monthly price instead of usage-metered cloud.',
  keywords: [
    'self-host chromadb',
    'chroma docker compose',
    'chroma cloud alternative',
    'embedding database',
    'chromadb server mode',
    'vector store for llm',
  ],
  intro: [
    'Chroma is the vector store most people meet first: pip install chromadb, four lines of code, and your documents are searchable by meaning. Its server mode is the same API over HTTP - which is what this template deploys, so every notebook example you have ever run keeps working against a real persistent backend.',
    'One container, one 10 GB volume, internal-only: Chroma ships without built-in auth, so the project network is the boundary (the same pattern as the MongoDB and Qdrant templates). Apps connect with chromadb.HttpClient(host="chroma", port=8000) and the JS client equivalently.',
    'For prototypes graduating to something persistent - or teams that want their embeddings off third-party infrastructure - this is the lightest possible step up.',
  ],
  features: [
    'The Chroma API your prototypes already use, in persistent server mode',
    'First-class Python and JavaScript clients',
    'Collections with metadata filtering and multiple distance functions',
    'Data persists on a 10 GB volume across redeploys',
    'Internal-only by default - no auth surface exposed',
    'Single container: the simplest vector store to operate',
  ],
  topology: [
    { service: 'chroma', role: 'Chroma server (HTTP :8000)', isPublic: 'no (by design)' },
  ],
  requiredVars: [],
  ramMiB: 1024,
  diskGB: 10,
  services: 1,
  sizingNote:
    '1 GiB RAM is generous for hundreds of thousands of embeddings. Chroma keeps HNSW indexes in memory - scale RAM with collection count and size.',
  faq: [
    {
      q: 'How do I migrate from local Chroma to this server?',
      a: 'Change chromadb.PersistentClient(path=...) to chromadb.HttpClient(host="chroma", port=8000) in apps deployed to the same Miget project. The collection API is identical; re-ingest or copy your data once.',
    },
    {
      q: 'Chroma Cloud vs self-hosting - when does each make sense?',
      a: 'Chroma Cloud is serverless and usage-priced, great for spiky or tiny workloads. Self-hosting here is a flat $7/month (1 GiB hobby plan) with no per-query metering - predictable for always-on apps, and your embeddings stay on your infrastructure.',
    },
    {
      q: 'Why is there no authentication on this template?',
      a: 'Chroma has no production-grade built-in auth, so the template keeps it private: no public domain, reachable only from apps in the same project. That is the correct posture - do not expose Chroma directly to the internet.',
    },
    {
      q: 'Is Chroma production-ready or just for prototypes?',
      a: 'Single-node Chroma serves real production loads at small-to-medium scale (hundreds of thousands to low millions of vectors). If you need clustering, quantization, or heavy filtering at scale, the Qdrant template in this catalogue is the natural next step.',
    },
  ],
};
