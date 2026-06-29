import type { AppBase } from './index';

export const twenty: AppBase = {
  slug: 'twenty',
  name: 'Twenty CRM',
  upstream: 'Twenty',
  upstreamUrl: 'https://twenty.com',
  tagline:
    'The open-source CRM with a modern data model - pipelines, workflows, email sync - and no per-seat pricing.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Twenty: open-source CRM with Docker Compose',
  seoDescription:
    'Deploy Twenty CRM - modern data model, pipelines, workflows, and email sync on a managed Postgres - in one step for $25/month flat. The self-hosted alternative to per-seat CRM pricing.',
  keywords: [
    'self-host twenty crm',
    'twenty crm docker compose',
    'salesforce alternative open source',
    'attio alternative self-hosted',
    'open source crm 2026',
    'twenty crm setup',
  ],
  intro: [
    'CRM pricing is the per-seat genre at its purest: Attio runs $29-36 per user, Pipedrive $14-24, HubSpot looks cheap until contact tiers bite - and every new hire is a new line item. Twenty is the open-source reset: a CRM with a genuinely modern data model (custom objects and fields like a database, not a form builder), pipelines, notes, tasks, email sync, and workflows.',
    'Since v2.1 upstream calls self-hosting production-ready, and the shape fits this catalogue perfectly: server and worker from one image on a managed Postgres (stock Postgres 16 - the old custom-image era is over), with a noeviction Valkey for the BullMQ queue that drives email sync, imports, and workflows.',
    'One classic gotcha is handled loudly: SERVER_URL must exactly match the public URL - the README says so twice, because it is the number-one self-hosting support thread upstream.',
  ],
  features: [
    'Custom objects and fields - model your business, not a template',
    'Pipelines, kanban and table views, notes, tasks',
    'Email sync and workflows (BullMQ worker included)',
    'REST + GraphQL APIs; webhooks',
    'Stock Postgres 16 = managed Postgres, auto-wired',
    'Unlimited seats - AGPL core, CRM not feature-gated',
  ],
  topology: [
    { service: 'server', role: 'app + API (:5000), migrations on start', isPublic: 'yes' },
    { service: 'worker', role: 'BullMQ: email sync, imports, workflows', isPublic: 'no' },
    { service: 'broker', role: 'Valkey, noeviction (queue)', isPublic: 'no' },
    { service: 'db', role: 'Postgres 16 - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ENCRYPTION_KEY', what: 'openssl rand -base64 32' },
    { name: 'REDIS_AUTH', what: 'broker password' },
    { name: 'SERVER_URL', what: 'must EXACTLY match the app’s https domain - set after first deploy' },
  ],
  ramMiB: 3328,
  diskGB: 10,
  services: 4,
  sizingNote:
    '1 GiB each for server and worker is the safe floor (NestJS processes; imports spike the worker). Attachments ride a shared volume - or S3 for a stateless pair.',
  faq: [
    {
      q: 'How does the cost compare to Attio or Pipedrive?',
      a: 'A 10-person team pays $290-360/month on Attio or $140-240 on Pipedrive, forever, growing with headcount. Twenty here is $25/month flat with unlimited seats - the crossover is at the second user.',
    },
    {
      q: 'Is self-hosted Twenty actually production-ready?',
      a: 'Upstream marked it so with v2.1 (April 2026) and ships an official compose this template mirrors: same-image server/worker split, stock Postgres, noeviction Redis. The earlier custom-Postgres-image era is over.',
    },
    {
      q: 'What is the SERVER_URL warning about?',
      a: 'Twenty derives auth callbacks and CORS from SERVER_URL, so any mismatch with the real public URL produces opaque 403s - it is the most common self-hosting issue upstream. Set it to the exact https domain and the problem class disappears.',
    },
    {
      q: 'Does the AGPL license matter for my sales data?',
      a: 'No - AGPL governs the software, not your data. A few enterprise-marked files (SSO and similar) are commercially licensed upstream, but the CRM you deploy here is the full product for everyday use.',
    },
  ],
};
