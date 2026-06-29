import type { AppBase } from './index';

export const mattermost: AppBase = {
  slug: 'mattermost',
  name: 'Mattermost',
  upstream: 'Mattermost (Team Edition)',
  upstreamUrl: 'https://mattermost.com',
  tagline: 'Open-source team chat - channels, threads, calls, integrations - on one managed Postgres, no per-seat bill.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Mattermost: open-source Slack alternative',
  seoDescription:
    'Deploy Mattermost Team Edition - channels, threads, DMs, calls, and plugins - in one step on a managed Postgres for $25/month. Unlimited users; the per-seat-free Slack alternative.',
  keywords: [
    'self-host mattermost',
    'mattermost docker compose',
    'slack alternative self-hosted',
    'microsoft teams alternative',
    'team chat open source',
    'mattermost postgres',
  ],
  intro: [
    'Team chat is the purest per-seat tax: Slack Pro is $8.75/user/month, Teams Essentials $4, and the bill grows with every hire. Mattermost is the open-source escape - channels, threads, DMs, voice/video calls, slash commands, integrations, and a plugin marketplace, with your messages on your infrastructure.',
    'This template runs Team Edition on a single plain managed Postgres (no replica set, no Redis) and listens on :5000 directly - no proxy. Config, uploads, plugins, and the search index persist on volumes.',
    'It is the catalogue’s default team-chat pick precisely because it is operationally boring: one app, one managed database. (Rocket.Chat is here too, for teams who want its apps marketplace and accept running a MongoDB replica set.)',
  ],
  features: [
    'Channels, threads, DMs, and group messaging',
    'Voice/video calls, screen share (calls plugin)',
    'Slash commands, webhooks, bots, and a plugin marketplace',
    'Desktop + mobile apps; SSO via the catalogue’s IdP templates',
    'Single plain managed Postgres - no replica set, no Redis',
    'Team Edition image is MIT-licensed',
  ],
  topology: [
    { service: 'mattermost', role: 'server + API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - real container locally, **managed Postgres on Miget**', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'MM_SITE_URL', what: 'the app’s https domain after first deploy' },
  ],
  ramMiB: 3072,
  diskGB: 30,
  services: 2,
  sizingNote: '2 GiB carries up to ~1,000 users per upstream guidance. Uploads and the search index are the volume growth; the managed Postgres holds messages.',
  faq: [
    {
      q: 'How does it compare to Slack or Teams on cost?',
      a: 'Slack Pro is $8.75/user/month, Teams Essentials $4 - a 25-person team is $100-220/month forever. Mattermost here is $25/month flat with unlimited users, and the conversation history lives in a Postgres you control.',
    },
    {
      q: 'Mattermost or Rocket.Chat?',
      a: 'Both are in this catalogue. Mattermost is the simpler deploy - one plain managed Postgres, no replica set. Rocket.Chat needs a MongoDB replica set (the mongodb template) but brings an apps marketplace and omnichannel. Default to Mattermost unless you specifically want Rocket.Chat’s extras.',
    },
    {
      q: 'Can I add SSO?',
      a: 'Yes - Mattermost supports OIDC/SAML (GitLab-style and enterprise providers); point it at the catalogue’s keycloak, authentik, zitadel, or logto templates. Team Edition covers the common cases; some enterprise auth features live in paid tiers.',
    },
  ],
};
