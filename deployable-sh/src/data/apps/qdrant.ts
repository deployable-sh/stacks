import type { AppBase } from './index';

export const qdrant: AppBase = {
  slug: 'qdrant',
  name: 'Qdrant',
  upstream: 'Qdrant',
  upstreamUrl: 'https://qdrant.tech',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'Qdrant vector database - single container + volume, internal-only, with the dashboard a flag away.',
  category: 'Search & Vectors',
  status: 'stable',
  seoTitle: 'Self-host Qdrant vector database with Docker Compose',
  seoDescription:
    'Deploy Qdrant - the Rust vector database behind countless RAG stacks - in one step. REST + gRPC, payload filtering, persistent volume. A flat-price alternative to Qdrant Cloud.',
  keywords: [
    'self-host qdrant',
    'qdrant docker compose',
    'qdrant cloud alternative',
    'vector database self-hosted',
    'rag vector store',
    'qdrant setup',
  ],
  intro: [
    'Qdrant is a vector database written in Rust: HNSW indexes, rich payload filtering, hybrid search, and a clean REST + gRPC API that every RAG framework (LangChain, LlamaIndex, Haystack) supports natively. If you are embedding documents and asking an LLM about them, this is the store in the middle.',
    'This template runs a single Qdrant node with a 10 GB persistent volume, internal-only by default - no API key is configured, so the project network is the security boundary. Your apps reach it at qdrant:6333 (REST) or :6334 (gRPC); nothing is exposed to the internet.',
    'Vector workloads are RAM-shaped and predictable, which makes flat-price self-hosting unusually attractive: 1 GiB holds on the order of a million 768-dim vectors with quantization to spare.',
  ],
  features: [
    'HNSW vector search with payload filtering and hybrid queries',
    'REST (:6333) + gRPC (:6334), first-class clients for Python/TS/Go/Rust',
    'Built-in web dashboard (enable a public domain + API key to use it remotely)',
    'Snapshots and on-disk payload/vector storage on a 10 GB volume',
    'Internal-only by default - project network as the boundary',
    'Supported by every major RAG framework out of the box',
  ],
  topology: [
    { service: 'qdrant', role: 'vector database (REST :6333, gRPC :6334, dashboard)', isPublic: 'no (by design)' },
  ],
  requiredVars: [],
  ramMiB: 1024,
  diskGB: 10,
  services: 1,
  sizingNote:
    '1 GiB RAM comfortably serves ~1M 768-dim vectors with default settings; scalar quantization roughly quadruples that. Scale RAM with collection size - vectors live in memory for speed.',
  faq: [
    {
      q: 'How much does self-hosting Qdrant cost vs Qdrant Cloud?',
      a: 'This single-node template fits the 1 GiB Miget hobby plan at $7/month flat. Qdrant Cloud’s smallest always-on paid clusters land meaningfully higher for the same RAM, and egress/network policies differ - for side projects and internal RAG, flat $7 is hard to argue with.',
    },
    {
      q: 'Is Qdrant good for RAG applications?',
      a: 'It is one of the most popular choices: native integrations in LangChain, LlamaIndex, and Haystack, payload filtering for metadata-constrained retrieval, and hybrid (dense + sparse) search for better recall.',
    },
    {
      q: 'Why is the template internal-only?',
      a: 'It ships without an API key, so it must not face the internet. Apps in the same Miget project reach qdrant:6333 privately. To expose the dashboard, set QDRANT__SERVICE__API_KEY and remove private: true - the README walks through it.',
    },
    {
      q: 'How many vectors fit in this instance?',
      a: 'Roughly 1M vectors at 768 dimensions in 1 GiB with defaults; with scalar quantization, several million. Bump the RAM in compose.miget.yaml and pick the next plan up as collections grow.',
    },
  ],
};
