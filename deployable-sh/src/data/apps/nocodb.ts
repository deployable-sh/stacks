import type { AppBase } from './index';

export const nocodb: AppBase = {
  slug: 'nocodb',
  name: 'NocoDB',
  upstream: 'NocoDB',
  upstreamUrl: 'https://nocodb.com',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline:
    'The open-source Airtable alternative - smart spreadsheet over a real Postgres, no seat or record metering.',
  category: 'Internal Tools',
  status: 'stable',
  seoTitle: 'Self-host NocoDB: open-source Airtable alternative',
  seoDescription:
    'Deploy NocoDB - smart-spreadsheet UI, forms, kanban and APIs over a managed Postgres - in one step for $25/month flat. Compare against Airtable’s $20/seat and 50k-record caps.',
  keywords: [
    'self-host nocodb',
    'nocodb docker compose',
    'airtable alternative self-hosted',
    'nocodb postgres setup',
    'open source airtable',
    'smart spreadsheet database',
  ],
  intro: [
    'Airtable’s genius was making databases feel like spreadsheets; its pricing makes growth feel like a penalty - per seat, per month, with hard record caps per base. NocoDB delivers the same grid/kanban/gallery/form experience as open source over a real database.',
    'This template runs NocoDB on a managed Postgres with a small volume for file attachments. One secret (the JWT signing key) and it boots; the first account becomes admin.',
    'Two superpowers over the SaaS original: no meters of any kind, and the data lives in actual Postgres - NocoDB can even mount your existing in-project databases as external sources, putting a spreadsheet UI over data you already have.',
  ],
  features: [
    'Grid, gallery, kanban, calendar, and form views',
    'REST APIs, webhooks, and automations per table',
    'Connect external Postgres/MySQL databases as additional sources',
    'Collaborators without seat pricing; records without caps',
    'Managed Postgres auto-provisioned and auto-wired (NC_DB)',
    'Attachments on a persistent volume',
  ],
  topology: [
    { service: 'nocodb', role: 'UI + API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NC_AUTH_JWT_SECRET', what: 'token signing secret (openssl rand -hex 32) - set it so logins survive recreation' },
    { name: 'NC_SITE_URL', what: 'set to the app’s https domain after first deploy (invite/share links)' },
  ],
  ramMiB: 3072,
  diskGB: 10,
  services: 2,
  sizingNote:
    'Official minimum is 2 GiB for the app; the managed Postgres rides alongside. Heavy bases with many collaborators want the 8 GiB plan.',
  faq: [
    {
      q: 'How does NocoDB pricing compare to Airtable?',
      a: 'Airtable Team is $20/seat/month - $200/month for a 10-person team - with 50k records per base. This stack is $25/month flat, unlimited seats and records. The crossover is at two users.',
    },
    {
      q: 'Can NocoDB sit on top of a database I already have?',
      a: 'Yes - beyond its own Postgres, NocoDB connects external Postgres/MySQL databases as data sources. Point it at other stacks in your project by service name and non-developers get a safe spreadsheet UI over production data.',
    },
    {
      q: 'Is my data locked into NocoDB?',
      a: 'No - it is rows in Postgres. Export via API or query the database directly; if you ever leave, the data is already in the most portable format there is.',
    },
    {
      q: 'What is the license situation?',
      a: 'NocoDB Community uses a fair-code Sustainable Use License: free to self-host for internal use at any scale; restrictions target reselling NocoDB itself as a service. Same family of license as n8n, same practical answer.',
    },
  ],
};
