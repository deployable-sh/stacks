import type { AppBase } from './index';

export const searxng: AppBase = {
  slug: 'searxng',
  name: 'SearXNG',
  upstream: 'SearXNG',
  upstreamUrl: 'https://docs.searxng.org',
  tagline: 'A private metasearch engine - 200+ engines, no tracking. Your search homepage and your RAG backend.',
  category: 'Search & Vectors',
  status: 'stable',
  seoTitle: 'Self-host SearXNG: a private metasearch engine',
  seoDescription:
    'Deploy SearXNG - a privacy-respecting metasearch engine that aggregates 200+ engines with no tracking or ads. Run it as your private search homepage or as a web-search backend for AI and RAG tools.',
  keywords: [
    'self-host searxng',
    'searxng docker compose',
    'private search engine self-hosted',
    'google search alternative',
    'searxng rag backend',
    'metasearch engine self-hosted',
  ],
  intro: [
    'SearXNG is a privacy-respecting metasearch engine: it queries 200+ search engines and blends the results, with no tracking, no profiling, and no ads. Use it as your own search homepage that never builds a profile on you, on your own domain.',
    'It is also the standard web-search backend for AI: point this catalogue’s open-webui, litellm, dify, or flowise at it to give models live web results, keeping the queries on your own infrastructure instead of a third-party search API.',
    'The image self-serves HTTP on port 5000 via SEARXNG_PORT - no separate proxy needed. Set a secret so sessions survive restarts; for a public, rate-limited instance, add a managed Valkey. Otherwise it is a single light container.',
  ],
  features: [
    'Aggregates 200+ engines; no tracking, no ads, no profiling',
    'Great private search homepage on your own domain',
    'A clean web-search backend for RAG and AI agents',
    'Self-serves HTTP on port 5000 - no proxy needed',
    'Optional managed Valkey for rate-limiting public instances',
    'AGPL-3.0, light footprint',
  ],
  topology: [
    { service: 'searxng', role: 'metasearch engine (:5000)', isPublic: 'yes (or private for RAG)' },
    { service: 'config volume', role: 'settings.yml + cache', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SEARXNG_SECRET', what: 'set explicitly so sessions survive restarts' },
    { name: 'SEARXNG_BASE_URL', what: 'the https domain, with a trailing slash' },
  ],
  ramMiB: 512,
  diskGB: 3,
  services: 1,
  sizingNote: '512 MiB is comfortable for a personal or RAG instance. Add a managed Valkey and SEARXNG_LIMITER=true only if you expose it publicly and want rate-limiting.',
  faq: [
    {
      q: 'Can AI tools use it for web search?',
      a: 'Yes - that is one of its best uses. open-webui, litellm, dify, and flowise all support SearXNG as a web-search tool, so your models get live results while the search queries stay on your own infrastructure.',
    },
    {
      q: 'Do I need Redis or a separate proxy?',
      a: 'No. The image self-serves HTTP on port 5000 (via SEARXNG_PORT) with no extra proxy. A managed Valkey is optional - only needed for the rate-limiter on a public instance.',
    },
    {
      q: 'Why set SEARXNG_SECRET explicitly?',
      a: 'If you do not set it, SearXNG generates a new secret on each restart, which resets sessions. Setting it (a long random string) keeps the instance stable across redeploys on Miget.',
    },
  ],
};
