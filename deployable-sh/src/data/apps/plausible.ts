import type { AppBase } from './index';

export const plausible: AppBase = {
  slug: 'plausible',
  name: 'Plausible',
  upstream: 'Plausible Community Edition',
  upstreamUrl: 'https://plausible.io',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline: 'Privacy-friendly web analytics - cookie-free, no consent banner, your visitor data on your own box.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Plausible: privacy-friendly web analytics',
  seoDescription:
    'Deploy Plausible Community Edition - a lightweight, cookie-free Google Analytics alternative with a clean dashboard - on managed Postgres plus a ClickHouse sidecar. Your visitor data, no consent banner.',
  keywords: [
    'self-host plausible',
    'plausible community edition docker',
    'google analytics alternative self-hosted',
    'privacy analytics',
    'cookie-free analytics',
    'plausible clickhouse',
  ],
  intro: [
    'Plausible is privacy-friendly web analytics: a clean, single-page dashboard that tells you what you need to know without cookies, without collecting personal data, and without a consent banner. The tracking script is roughly 75x smaller than Google Analytics. This is the self-hosted Community Edition.',
    'It is a real analytics stack: the app and a managed Postgres for accounts and settings, plus a ClickHouse sidecar that stores the event data. Miget has no managed ClickHouse, so it runs as a private sidecar - a thin wrapper bakes the four tuning configs from Plausible’s official setup (ClickHouse otherwise assumes a 16 GB box) and another bakes the database migration step Plausible does not run on its own.',
    'You already have lighter analytics in this catalogue with umami; Plausible adds funnels, goals, custom events, and a more polished dashboard for when a project needs them - all with the visitor data sitting on infrastructure you own.',
  ],
  features: [
    'Cookie-free, no consent banner needed, GDPR-friendly',
    'Tiny tracking script (~75x smaller than GA)',
    'Goals, funnels, custom events, and UTM tracking',
    'Managed Postgres + a private ClickHouse sidecar',
    'First registration becomes owner; later signups invite-only',
    'AGPL-3.0; your visitor data on your own infrastructure',
  ],
  topology: [
    { service: 'plausible', role: 'analytics app (:5000)', isPublic: 'yes' },
    { service: 'clickhouse', role: 'event store (private sidecar)', isPublic: 'no' },
    { service: 'db', role: 'managed Postgres (accounts/settings)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: '>= 64 bytes (openssl rand -base64 48), stable across deploys' },
    { name: 'BASE_URL', what: 'the https domain, matched exactly (WebSocket/login)' },
  ],
  ramMiB: 4096,
  diskGB: 25,
  services: 3,
  sizingNote: 'Budget ~3 GB usable: the app ~1 GB, ClickHouse ~2 GB (the baked low-resources config keeps it honest). Events live in ClickHouse on its own volume; app data in managed Postgres.',
  faq: [
    {
      q: 'How is this different from the umami template?',
      a: 'Both are privacy-friendly analytics. Umami is lighter (a single app on Postgres); Plausible adds funnels, goals, and a more polished dashboard at the cost of a ClickHouse sidecar. Pick umami for minimal, Plausible for more depth.',
    },
    {
      q: 'Why does it need ClickHouse?',
      a: 'Plausible stores pageview events in ClickHouse, a columnar database built for fast analytics queries. Miget has no managed ClickHouse, so this template runs it as a private sidecar with a durable volume and the official low-resource tuning baked in.',
    },
    {
      q: 'What does it cost compared to Plausible Cloud?',
      a: 'Plausible Cloud starts at $9/month metered by pageviews. Self-hosted is one flat plan regardless of traffic, with the visitor data on your own infrastructure - the trade is that you run the ClickHouse sidecar yourself.',
    },
  ],
};
