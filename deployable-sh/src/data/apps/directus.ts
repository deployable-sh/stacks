import type { AppBase } from './index';

export const directus: AppBase = {
  slug: 'directus',
  name: 'Directus',
  upstream: 'Directus 11',
  upstreamUrl: 'https://directus.io',
  tagline:
    'Instant headless CMS and REST/GraphQL API over Postgres, with a data studio your editors will actually like.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host Directus 11: headless CMS with Docker Compose',
  seoDescription:
    'Deploy Directus 11 - instant REST/GraphQL APIs and a polished data studio over a managed Postgres - in one step for $13/month. Free to self-host; Directus Cloud hosting starts at $99/month.',
  keywords: [
    'self-host directus',
    'directus docker compose',
    'headless cms self-hosted',
    'directus cloud alternative',
    'strapi alternative',
    'directus postgres',
  ],
  intro: [
    'Directus takes a refreshingly honest approach to headless CMS: it introspects a plain Postgres database and instantly serves REST and GraphQL APIs plus a polished admin studio over it. Your schema stays normal SQL - no proprietary content model lock-in, and anything else (BI tools, scripts, this catalogue’s Metabase) can query the same tables.',
    'This template runs Directus 11 on a managed Postgres with an uploads volume. Three variables bootstrap it: a SECRET, and the first admin’s email and password. Set PUBLIC_URL after first deploy and the studio, auth flows, and asset URLs all line up.',
    'The license story is unusual: self-hosting Directus is free at any scale (BSL source-available); what costs money is their cloud hosting, from $99/month. This stack does that part for $13.',
  ],
  features: [
    'Instant REST + GraphQL APIs over your Postgres schema',
    'Data studio: content editing, roles/permissions, flows (automation)',
    'No proprietary content model - it is just your database',
    'File library on a persistent uploads volume',
    'Managed Postgres auto-provisioned and auto-wired',
    'Opt-in realtime websockets upstream',
  ],
  topology: [
    { service: 'directus', role: 'studio + REST/GraphQL API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET', what: 'session/crypto secret (openssl rand -hex 32) - explicit, or sessions break on restart' },
    { name: 'ADMIN_EMAIL / ADMIN_PASSWORD', what: 'bootstrap admin, applied on first init only' },
    { name: 'PUBLIC_URL', what: 'set to the app’s https domain after first deploy' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 2,
  sizingNote:
    '1 GiB suits typical headless-CMS traffic; content APIs are read-heavy and cache well. The uploads volume is the growth dial for media-heavy projects.',
  faq: [
    {
      q: 'Directus or Strapi?',
      a: 'Directus if you want the database to stay a normal Postgres schema you own (it introspects; nothing is locked into the CMS), Strapi if you prefer code-first content-type definitions in a Node project. Operationally Directus is the lighter, single-container deploy - which is why it is the one in this catalogue first.',
    },
    {
      q: 'What does the BSL license mean for me?',
      a: 'Self-hosting for your own projects and clients is free at any scale. The Business Source License mainly restricts offering Directus itself as a competing hosted service. For the standard agency/product use case, nothing changes versus open source.',
    },
    {
      q: 'How does $13/month compare to Directus Cloud?',
      a: 'Directus Cloud’s cheapest hosting add-on is $99/month for 3 seats and 25 collections. Self-hosted has no seat or collection limits - the software is identical, you are only replacing their hosting line item.',
    },
    {
      q: 'Can other tools query the same database?',
      a: 'Yes - that is the design. The schema is plain Postgres, so Metabase dashboards, ETL jobs, or any in-project app can read the same tables Directus manages, by service name, without going through the API.',
    },
  ],
};
