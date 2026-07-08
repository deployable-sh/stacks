import type { AppBase } from './index';

export const karakeep: AppBase = {
  slug: 'karakeep',
  name: 'Karakeep',
  upstream: 'Karakeep (formerly Hoarder)',
  upstreamUrl: 'https://karakeep.app',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline: 'Bookmark everything - links, notes, images - archived, searchable, and AI-tagged on your own box.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Karakeep: AI bookmarks and read-it-later',
  seoDescription:
    'Deploy Karakeep (formerly Hoarder) - save links, notes, and images; it archives the page, full-text indexes it, and auto-tags with AI. A self-hosted Pocket / Raindrop alternative with search built in.',
  keywords: [
    'self-host karakeep',
    'karakeep hoarder docker',
    'pocket alternative self-hosted',
    'raindrop alternative',
    'ai bookmarks self-hosted',
    'read it later self-hosted',
  ],
  intro: [
    'Karakeep (the app formerly known as Hoarder) is a "bookmark everything" hub: save links, notes, and images, and it automatically crawls and archives the page so your links never rot, takes a screenshot, full-text indexes everything for instant search, and can auto-tag with AI. Native mobile apps and a browser extension are included.',
    'It is a three-service stack: the app and its built-in workers (port 5000, on embedded SQLite), a Meilisearch instance for search, and a headless Chrome for crawling and screenshots. On Miget the search and browser run as private sidecars; the app is the only public service.',
    'The AI tagging is the modern twist, and it stays on your terms: point it at this catalogue’s ollama or litellm to keep inference on your own infrastructure, or plug in an OpenAI key. Leave it off and everything else still works.',
  ],
  features: [
    'Save links, notes, and images; full-page archiving',
    'Full-text search across everything (Meilisearch)',
    'Optional AI auto-tagging (Ollama / LiteLLM / OpenAI)',
    'Native mobile apps and a browser extension',
    'Embedded SQLite - no external database needed',
    'AGPL-3.0; search + Chrome as private sidecars',
  ],
  topology: [
    { service: 'karakeep', role: 'app + workers (:5000)', isPublic: 'yes' },
    { service: 'meilisearch', role: 'full-text search (private)', isPublic: 'no' },
    { service: 'chrome', role: 'headless crawler / screenshots (private)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NEXTAUTH_SECRET', what: 'session secret (openssl rand -base64 36)' },
    { name: 'MEILI_MASTER_KEY', what: 'shared by the app and Meilisearch' },
    { name: 'NEXTAUTH_URL', what: 'the https domain, set after first deploy' },
  ],
  ramMiB: 2048,
  diskGB: 15,
  services: 3,
  sizingNote: 'The app and Meilisearch are light; the headless Chrome is the memory user during crawls (~512 MiB). Bookmarks and assets live in SQLite on the data volume; the search index on its own.',
  faq: [
    {
      q: 'What does this replace?',
      a: 'Pocket (shut down in 2025) and Raindrop.io Pro ($3/month) for read-it-later and bookmarking. Karakeep adds full-page archiving, real search, and optional AI tagging, with everything on infrastructure you own.',
    },
    {
      q: 'Do I need an OpenAI key?',
      a: 'No. AI auto-tagging is optional - without it, the app works fully for saving, archiving, and search. When you want it, point OLLAMA_BASE_URL at this catalogue’s ollama or litellm to keep inference local, or set an OpenAI key.',
    },
    {
      q: 'Why three services?',
      a: 'The app and its workers run together on SQLite; Meilisearch powers instant full-text search; and a headless Chrome renders pages for archiving and screenshots. Miget has no managed substitute for those two, so they run as private sidecars.',
    },
  ],
};
