import type { AppBase } from './index';

export const convex: AppBase = {
  slug: 'convex',
  name: 'Convex',
  upstream: 'Convex',
  upstreamUrl: 'https://convex.dev',
  license: 'FSL-1.1',
  licenseTier: 'source-available',
  licenseNote: 'converts to Apache-2.0 after 2y',
  tagline:
    'Self-hosted Convex: the reactive backend (database + functions + scheduler) with its dashboard, on your infrastructure.',
  category: 'Backend Platforms',
  status: 'experimental',
  seoTitle: 'Self-host Convex: reactive backend with Docker Compose',
  seoDescription:
    'Deploy the open-source Convex backend - reactive database, TypeScript server functions, scheduler, and dashboard - in one step. Self-hosted alternative to Convex Cloud per-developer pricing.',
  keywords: [
    'self-host convex',
    'convex docker compose',
    'convex self-hosted backend',
    'convex cloud alternative',
    'reactive database typescript',
    'convex open source',
  ],
  intro: [
    'Convex inverts the usual backend: you write TypeScript queries and mutations, and every client subscribed to a query updates automatically when its data changes - reactive end to end, with no cache invalidation code. The backend is open source, and this template runs it self-hosted with the dashboard.',
    'The topology has a quirk worth knowing: one Convex process serves two origins (the client API and HTTP actions), and each platform app publishes exactly one port - so two slim nginx proxies (api and site) front the private backend, plus the dashboard as a third public app. State lives in SQLite on a 10 GB volume.',
    'After first deploy, set CONVEX_CLOUD_ORIGIN and CONVEX_SITE_ORIGIN to the api and site apps’ https domains and redeploy - then point your Convex CLI and clients at your own deployment.',
  ],
  features: [
    'Reactive queries: subscribed clients update automatically on writes',
    'TypeScript server functions with transactional guarantees',
    'Built-in scheduler and cron functions',
    'Web dashboard (admin-key login) for data, functions, and logs',
    'Open-source backend serving one deployment - yours',
    'SQLite state on a persistent volume',
  ],
  topology: [
    { service: 'backend', role: 'Convex backend (API :3210, HTTP actions :3211)', isPublic: 'no' },
    { service: 'api', role: 'nginx → backend:3210 - client/deploy origin', isPublic: 'yes' },
    { service: 'site', role: 'nginx → backend:3211 - HTTP actions origin', isPublic: 'yes' },
    { service: 'dashboard', role: 'web dashboard (admin-key login)', isPublic: 'yes' },
  ],
  requiredVars: [
    { name: 'CONVEX_CLOUD_ORIGIN / CONVEX_SITE_ORIGIN', what: 'set to the api and site https domains after first deploy' },
  ],
  ramMiB: 2816,
  diskGB: 10,
  services: 4,
  sizingNote:
    '2 GiB for the backend, slivers for the proxies, 512 MiB for the dashboard. The open-source backend serves a single deployment - one stack per project/environment.',
  faq: [
    {
      q: 'Is self-hosted Convex the same as Convex Cloud?',
      a: 'The core engine is: reactive queries, mutations, actions, scheduler, dashboard. Cloud adds multi-deployment management, preview deploys, and operational SLAs, priced per developer ($25/dev/month on Pro). Self-hosting trades those for a flat infrastructure price and full data ownership.',
    },
    {
      q: 'Why does this template have nginx proxies?',
      a: 'Convex serves two origins (client API and HTTP actions) from one process, and each platform app exposes exactly one public port - so api and site are thin nginx apps fronting the private backend. It is wiring, not architecture.',
    },
    {
      q: 'How do I deploy my Convex functions to it?',
      a: 'Generate an admin key (the backend image ships generate_admin_key.sh), then use the Convex CLI with CONVEX_SELF_HOSTED_URL pointing at your api domain and the admin key as credentials. The dashboard logs in with the same key.',
    },
    {
      q: 'Why is this marked experimental?',
      a: 'The multi-origin proxy design is young and upstream self-hosting evolves quickly. It works for development and small production; validate carefully before betting a critical app on it.',
    },
  ],
};
