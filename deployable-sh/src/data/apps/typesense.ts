import type { AppBase } from './index';

export const typesense: AppBase = {
  slug: 'typesense',
  name: 'Typesense',
  upstream: 'Typesense',
  upstreamUrl: 'https://typesense.org',
  tagline: 'The speed-obsessed instant-search engine - in-memory C++, typo tolerance, vectors - for $7/month.',
  category: 'Search & Vectors',
  status: 'stable',
  seoTitle: 'Self-host Typesense: blazing instant search',
  seoDescription:
    'Deploy Typesense - the in-memory, typo-tolerant search engine with facets, filtering, and vector search - in one step for $7/month. Typesense Cloud charges $21.60/month for the same 0.5 GB binary.',
  keywords: [
    'self-host typesense',
    'typesense docker compose',
    'typesense cloud alternative',
    'algolia alternative fast',
    'instant search engine',
    'typesense vs meilisearch',
  ],
  intro: [
    'Typesense is what you get when search is engineered like a database kernel: a C++ binary holding indexes in RAM, returning typo-tolerant, faceted, filtered results in single-digit milliseconds - plus vector and hybrid search for the semantic layer. Env-only configuration down to the port.',
    'It is the deliberate counterpart to the catalogue’s meilisearch: Meilisearch for the gentlest developer experience, Typesense for raw speed and richer filtering at scale. Key-protected like its sibling, so the API can face browsers with scoped search-only keys.',
    'The cloud math is unusually direct here: Typesense Cloud’s smallest node - 0.5 GB, no HA, the identical open-source binary - costs $21.60/month. This template’s 1 GiB plan is $7.',
  ],
  features: [
    'Sub-10ms typo-tolerant search with facets and filtering',
    'Vector + hybrid search; InstantSearch-compatible adapter',
    'Env-only config including the port - simplest deploy class',
    'Scoped search-only API keys for browsers',
    'RAM-resident indexes: predictable, honest sizing',
    'GPL-3.0; Raft clustering upstream when one node ends',
  ],
  topology: [{ service: 'typesense', role: 'search engine (:5000)', isPublic: 'yes (key-protected)' }],
  requiredVars: [{ name: 'TYPESENSE_API_KEY', what: 'admin key; derive scoped search keys for clients' }],
  ramMiB: 1024,
  diskGB: 5,
  services: 1,
  sizingNote: 'Indexes live in RAM: budget 2-3x the size of indexed fields. The on-disk copy on the volume makes restarts instant.',
  faq: [
    {
      q: 'Typesense or Meilisearch - this catalogue has both?',
      a: 'Deliberately: Meilisearch wins on out-of-box DX and built-in AI hybrid search; Typesense wins on raw latency, filtering depth, and memory predictability at larger scale. Both are key-protected single containers - benchmarking with your data costs an afternoon and $14.',
    },
    {
      q: 'Is the hosted version different software?',
      a: 'No - Typesense Cloud runs this same GPL binary; you pay for their ops. Their smallest 0.5 GB non-HA node is $21.60/month, which makes the $7 self-hosted plan one of the clearest deltas on this site.',
    },
    {
      q: 'Can browsers query it directly?',
      a: 'Yes - generate scoped, search-only API keys (optionally with embedded filters per user) and ship those to the frontend. The admin key stays server-side; the InstantSearch adapter makes the UI part familiar.',
    },
  ],
};
