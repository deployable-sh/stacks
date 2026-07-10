import type { AppBase } from './index';

export const miniflux: AppBase = {
  slug: 'miniflux',
  name: 'Miniflux',
  upstream: 'Miniflux',
  upstreamUrl: 'https://miniflux.app',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline: 'A minimalist, blazing-fast RSS reader - one Go binary on managed Postgres, your feeds on your own box.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Miniflux: the fast, minimalist RSS reader',
  seoDescription:
    'Deploy Miniflux - a single Go binary RSS/Atom reader with a REST API and Google Reader / Fever compatibility - on a managed Postgres for $7/month. Feedly Pro money, none of the lock-in.',
  keywords: [
    'self-host miniflux',
    'miniflux docker compose',
    'feedly alternative self-hosted',
    'rss reader open source',
    'inoreader alternative',
    'google reader api self-hosted',
  ],
  intro: [
    'Miniflux is the RSS reader for people who just want to read: a clean, keyboard-driven, distraction-free UI with no recommendations, no tracking, and no upsell. It is a single statically-linked Go binary, so it boots instantly and idles in about 50 MB.',
    'Everything lives in Postgres - feeds, entries, read state, API keys - which makes this template one of the catalogue’s cleanest deploys: the app container is disposable, and the managed Postgres is the only thing holding state.',
    'It speaks the Google Reader and Fever APIs, so the mobile clients you already like (Reeder, NetNewsWire, FeedMe) connect straight to your instance. Full-text fetching, feed rules, and integrations (Wallabag, Pocket, webhooks) come built in.',
  ],
  features: [
    'Single Go binary - starts instantly, idles around 50 MB',
    'Google Reader and Fever API compatibility for mobile clients',
    'Full-text article fetching, keyboard shortcuts, dark theme',
    'Feed filters, rules, and integrations (Wallabag, webhooks, more)',
    'All state in managed Postgres - the app is stateless',
    'Apache-2.0, no telemetry, no feed-count limits',
  ],
  topology: [
    { service: 'miniflux', role: 'reader + API (stateless, :5000)', isPublic: 'yes' },
    { service: 'db', role: 'managed Postgres (feeds + read state)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ADMIN_USERNAME / ADMIN_PASSWORD', what: 'first admin, created on first boot' },
    { name: 'BASE_URL', what: 'the app’s https domain, set after first deploy' },
  ],
  ramMiB: 1152,
  diskGB: 5,
  services: 2,
  sizingNote: 'The binary barely registers; the Hobby plan is plenty. Postgres holds everything, so size disk to how many feeds and how much history you keep.',
  faq: [
    {
      q: 'What does this save vs Feedly or Inoreader?',
      a: 'Feedly Pro is $7/month and Inoreader Pro is roughly $7-9, both capping sources and feeds at higher tiers. Miniflux self-hosted is $7/month flat with no source limit, no ads, and your reading history in a Postgres you control.',
    },
    {
      q: 'Can I keep using my phone’s RSS app?',
      a: 'Yes. Miniflux exposes both the Google Reader and Fever APIs, so clients like Reeder, NetNewsWire, and FeedMe sync against your instance the same way they would against a hosted service.',
    },
    {
      q: 'Is it really just one container plus a database?',
      a: 'Yes. There is no Redis, no worker, no queue - one Go binary and Postgres. Migrations run on start, so deploys and rollbacks are trivial.',
    },
  ],
};
