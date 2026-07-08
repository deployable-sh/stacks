import type { AppBase } from './index';

export const unleash: AppBase = {
  slug: 'unleash',
  name: 'Unleash',
  upstream: 'Unleash',
  upstreamUrl: 'https://www.getunleash.io',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  licenseNote: 'official image Apache-2.0 (source AGPL)',
  tagline: 'Feature flags you host yourself - managed Postgres, no per-seat or per-flag metering.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host Unleash: open-source feature flags',
  seoDescription:
    'Deploy Unleash - feature flags, gradual rollouts, A/B targeting, and SDKs for every language - on a managed Postgres. A LaunchDarkly alternative with no MAU billing and flags evaluated on your own infrastructure.',
  keywords: [
    'self-host unleash',
    'unleash docker compose',
    'launchdarkly alternative self-hosted',
    'feature flags open source',
    'flagsmith alternative',
    'feature toggle server',
  ],
  intro: [
    'Unleash is a mature, open-source feature-flag platform: gradual rollouts, per-environment strategies, user targeting and segments, A/B experiments, and an admin UI that non-engineers can actually use. SDKs cover every major language and framework.',
    'This template is the server plus a managed Postgres - that is the whole footprint. Flag state and configuration live in Postgres, so the API node stays stateless and the database is the single source of truth you back up.',
    'It is the pricing story that makes flags worth self-hosting: hosted flag services meter you on monthly active users or per-connection, which scales with your traffic rather than your team. Here it is a flat plan, and every flag evaluation happens on infrastructure you own.',
  ],
  features: [
    'Gradual rollouts, targeting, segments, and A/B experiments',
    'Per-environment strategies and an approachable admin UI',
    'Client and server SDKs for every major language',
    'API tokens for CI and edge evaluation',
    'All state in managed Postgres - stateless API node',
    'Apache-2.0 image; flags evaluated on your own infrastructure',
  ],
  topology: [
    { service: 'unleash', role: 'flag API + admin UI (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'managed Postgres (flag state)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'INIT_ADMIN_API_TOKENS', what: 'bootstrap admin/API token, or use the admin login' },
    { name: 'DATABASE_URL', what: 'auto-wired to the managed Postgres' },
  ],
  ramMiB: 1536,
  diskGB: 5,
  services: 2,
  sizingNote: 'The Node server is comfortable in 512 MiB; the Hobby plan covers it. Postgres is tiny - flag config, not bulk data.',
  faq: [
    {
      q: 'What does this save vs LaunchDarkly or Flagsmith?',
      a: 'LaunchDarkly bills usage-based (roughly $10 per connection plus per-MAU charges), Flagsmith’s Start-Up plan is $40/month flat, and Statsig Pro starts around $150. Unleash self-hosted is one flat plan with no MAU or connection metering, no matter how much traffic evaluates your flags.',
    },
    {
      q: 'Is the self-hosted version crippled compared to the cloud one?',
      a: 'The open-source server covers flags, strategies, environments, segments, and the SDKs. Some enterprise governance features are paid, but the core flagging that most teams need is fully open and shipped here.',
    },
    {
      q: 'Where are flags evaluated?',
      a: 'SDKs fetch flag configuration from your Unleash server and evaluate locally in your app, so user data never leaves your infrastructure - a meaningful difference from sending every evaluation context to a third party.',
    },
  ],
};
