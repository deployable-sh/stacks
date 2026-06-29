import type { AppBase } from './index';

export const odoo: AppBase = {
  slug: 'odoo',
  name: 'Odoo',
  upstream: 'Odoo Community 18',
  upstreamUrl: 'https://www.odoo.com',
  tagline: 'The open-source business suite - CRM, sales, inventory, accounting, ecommerce - on a managed Postgres.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Odoo Community with Docker Compose',
  seoDescription:
    'Deploy Odoo Community 18 - CRM, sales, inventory, accounting, projects, website, and ecommerce - in one step on a managed Postgres for $25/month. The per-user-free Odoo Online alternative.',
  keywords: [
    'self-host odoo',
    'odoo docker compose',
    'odoo community self-hosted',
    'open source erp',
    'odoo online alternative',
    'odoo postgres setup',
  ],
  intro: [
    'Odoo is the open-source business suite that actually spans the business: CRM, sales, inventory, accounting, manufacturing, projects, HR, a website builder, and ecommerce, all sharing one data model, with a large app store on top. The Community edition (LGPL-3) is genuinely capable on its own.',
    'This template runs Odoo 18 on a managed Postgres in threaded mode, which keeps websockets and live chat on a single HTTP port - so the whole thing serves from :5000 with no second longpolling port to route. A thin entrypoint writes Odoo’s config from env (the master password has no env var upstream), keeping the secret out of the image.',
    'Odoo Online charges per user per month ($38.90 Standard, $76.20 Custom); Community self-hosted is unlimited users on a flat plan - you trade Enterprise-only modules and official support for that.',
  ],
  features: [
    'CRM, sales, inventory, accounting, projects, manufacturing, HR',
    'Website builder and ecommerce included',
    'Large community app store',
    'Managed Postgres; threaded mode = single public port',
    'Master password via generated config (no secret baked in)',
    'LGPL-3 Community edition',
  ],
  topology: [
    { service: 'odoo', role: 'web + all apps (:5000, threaded)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - real container locally, **managed Postgres on Miget**', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ODOO_ADMIN_PASSWORD', what: 'master password (gates DB create/drop/backup)' },
    { name: 'ODOO_LIST_DB', what: 'False if the managed Postgres role can’t CREATEDB (pre-create one DB)' },
  ],
  ramMiB: 3072,
  diskGB: 17,
  services: 2,
  sizingNote: 'Odoo is RAM-hungry: 2 GiB+ is the realistic floor. Kept in threaded mode (workers=0) so it stays on one public port; heavy multiprocessing needs a two-port proxy, out of scope here.',
  faq: [
    {
      q: 'How does this compare to Odoo Online pricing?',
      a: 'Odoo Online is per-user: Standard $38.90/user/month, Custom $76.20 - a 10-person company is $389-762/month. Community self-hosted here is $25/month flat with unlimited users. You give up Enterprise-only apps (some accounting/studio features) and official support.',
    },
    {
      q: 'Why is it pinned to Odoo 18, and why threaded mode?',
      a: 'The odoo image’s latest tag moved to 19 - pinning 18 prevents a surprise major upgrade. Threaded mode (workers=0) keeps websockets/livechat on the single HTTP port, so it fits the one-public-port model; multiprocessing splits websockets onto port 8072 and needs a two-port-aware proxy.',
    },
    {
      q: 'What is the database-manager caveat?',
      a: 'Odoo’s web DB-manager (create/drop databases) needs a Postgres role with CREATEDB. If the managed role lacks it, pre-create one database and set ODOO_LIST_DB=False - the running app needs no special privileges.',
    },
  ],
};
