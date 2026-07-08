import type { AppBase } from './index';

export const outline: AppBase = {
  slug: 'outline',
  name: 'Outline',
  upstream: 'Outline',
  upstreamUrl: 'https://www.getoutline.com',
  license: 'BSL-1.1',
  licenseTier: 'source-available',
  licenseNote: 'converts to Apache-2.0 over time',
  tagline: 'The team wiki that feels like a product - stateless on managed Postgres + Miget Buckets, no per-seat math.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Outline: the Notion-class team wiki',
  seoDescription:
    'Deploy Outline - fast editor, collections, search, permissions - fully stateless on a managed Postgres and Miget Buckets for $25/month. No seat pricing; SMTP login works, OIDC optional.',
  keywords: [
    'self-host outline',
    'outline wiki docker compose',
    'notion alternative self-hosted',
    'confluence alternative',
    'team wiki open source',
    'outline oidc authentik',
  ],
  intro: [
    'Outline is what teams switch to when Notion’s per-seat bill or Confluence’s UX wears thin: a wiki with a genuinely fast editor, nested collections, full-text search, granular permissions, and an API - polished enough that nobody asks why the company wiki looks self-hosted.',
    'This template is the catalogue’s cleanest large-app deploy: ZERO volumes. Documents live in the managed Postgres, uploads in a Miget Bucket (S3 with path-style), and queues in a noeviction Valkey - the app container is disposable.',
    'And the auth folklore is outdated: since v1.0, no external provider is required - first-run setup bootstraps your workspace, SMTP magic-links sign the team in, and OIDC via the catalogue’s authentik/keycloak/zitadel is the upgrade path, not the entry fee.',
  ],
  features: [
    'Fast markdown-native editor with realtime collaboration',
    'Collections, nested docs, full-text search, granular permissions',
    'Stateless: Postgres + Miget Bucket + Valkey, no volumes',
    'SMTP magic-link login; OIDC for SSO when you want it',
    'Public API and share links',
    'BSL-1.1 (converts to Apache-2.0 over time) - noted honestly',
  ],
  topology: [
    { service: 'outline', role: 'wiki (stateless, :5000)', isPublic: 'yes' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY / UTILS_SECRET / REDIS_AUTH', what: 'core secrets' },
    { name: 'S3_* (a private Miget Bucket)', what: 'uploads and avatars - what makes the app stateless' },
    { name: 'SMTP_* / URL', what: 'magic-link login; the https domain after first deploy' },
  ],
  ramMiB: 2304,
  diskGB: 5,
  services: 3,
  sizingNote: '1 GiB serves real teams; Outline sizes workers to memory automatically. Everything that grows lives in Postgres and the bucket.',
  faq: [
    {
      q: 'What does this save vs Notion or Confluence?',
      a: 'Notion Business is $20/seat/month - $200 for a 10-person team; Confluence Standard ~$67. Outline here is $25/month total with no seat concept, and the wiki content sits in a Postgres you can query and back up like any other data.',
    },
    {
      q: 'Do I need an SSO provider to use it?',
      a: 'No - that requirement died with v1.0. First-run setup creates your workspace and admin; SMTP magic-links handle daily sign-in (invite-based). When you want SSO, the OIDC env vars point at the identity templates already in this catalogue.',
    },
    {
      q: 'What does the BSL license mean for a company wiki?',
      a: 'Internal use is unrestricted - BSL only forbids offering Outline itself as a commercial document service. Each release converts to Apache-2.0 after its change date. Flagged because you should know, not because it bites.',
    },
  ],
};
