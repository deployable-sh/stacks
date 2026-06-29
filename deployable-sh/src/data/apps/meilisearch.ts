import type { AppBase } from './index';

export const meilisearch: AppBase = {
  slug: 'meilisearch',
  name: 'Meilisearch',
  upstream: 'Meilisearch',
  upstreamUrl: 'https://www.meilisearch.com',
  tagline:
    'Instant, typo-tolerant search in a single container - the Algolia experience at a flat self-hosted price.',
  category: 'Search & Vectors',
  status: 'stable',
  seoTitle: 'Self-host Meilisearch: instant search with Docker Compose',
  seoDescription:
    'Deploy Meilisearch - typo-tolerant instant search with faceting, filtering, and hybrid AI search - in one step. Master-key protected, persistent volume. Compare cost vs Algolia and Meilisearch Cloud.',
  keywords: [
    'self-host meilisearch',
    'meilisearch docker compose',
    'algolia alternative',
    'meilisearch cloud alternative',
    'instant search self-hosted',
    'typo tolerant search',
  ],
  intro: [
    'Meilisearch is the open-source answer to "search that feels like Algolia": results as you type in under 50 ms, typo tolerance that just works, faceting, filtering, synonyms, and lately hybrid semantic search. It is a single Rust binary, which makes it a perfect self-hosting citizen.',
    'This template runs Meilisearch in production mode behind a master key - keyless requests are rejected - with a 5 GB volume for indexes. It is public on its app domain by design: derive scoped search keys (GET /keys) for browsers, keep the master key server-side, and you have a complete search backend.',
    'Where Algolia meters by the thousand searches and records, this is a flat $7/month for most projects. Search is the funnel feature users notice; the bill should not be.',
  ],
  features: [
    'Sub-50 ms instant search with built-in typo tolerance',
    'Faceting, filtering, sorting, synonyms, stop words, multi-language',
    'Hybrid semantic + keyword search (bring an embedder)',
    'Master-key protected in production mode; scoped API keys per client',
    'InstantSearch-compatible frontend libraries',
    'Single container + 5 GB volume; data survives redeploys',
  ],
  topology: [
    { service: 'meilisearch', role: 'search engine + API (:5000 public domain)', isPublic: 'yes (master-key protected)' },
  ],
  requiredVars: [{ name: 'MEILI_MASTER_KEY', what: 'master key (openssl rand -base64 24); derive scoped keys for apps' }],
  ramMiB: 1024,
  diskGB: 5,
  services: 1,
  sizingNote:
    '1 GiB RAM indexes and serves hundreds of thousands of documents comfortably. Indexing is the memory-hungry phase - bump RAM temporarily for very large initial imports.',
  faq: [
    {
      q: 'Is Meilisearch a real Algolia alternative?',
      a: 'For most product search, docs search, and app search use cases - yes. Same instant-results UX, InstantSearch-compatible libraries, typo tolerance and faceting. What you give up is Algolia’s global edge network and some enterprise analytics; what you gain is a flat price and your data on your infrastructure.',
    },
    {
      q: 'How much does self-hosted Meilisearch cost vs Algolia or Meilisearch Cloud?',
      a: 'This template runs on the $7/month 1 GiB Miget hobby plan, flat, with no per-search or per-record metering. Algolia and Meilisearch Cloud both price by usage tiers that typically exceed that within the first serious project.',
    },
    {
      q: 'Is it safe that Meilisearch is publicly reachable?',
      a: 'Yes, in production mode every request must carry a valid key - the master key rejects nothing-in-hand requests outright. Ship only scoped, expirable search keys to browsers; keep the master key in your backend env.',
    },
    {
      q: 'Does Meilisearch support semantic / AI search?',
      a: 'Yes - hybrid search combines keyword relevance with vector similarity. Configure an embedder (OpenAI, Hugging Face, or REST) on an index and queries can blend both, which materially improves recall on natural-language queries.',
    },
  ],
};
