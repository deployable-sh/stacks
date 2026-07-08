import type { AppBase } from './index';

export const budibase: AppBase = {
  slug: 'budibase',
  name: 'Budibase',
  upstream: 'Budibase',
  upstreamUrl: 'https://budibase.com',
  license: 'GPL-3.0',
  licenseTier: 'copyleft',
  tagline:
    'Low-code apps, forms, and approval workflows - the all-in-one image with zero required configuration.',
  category: 'Internal Tools',
  status: 'stable',
  seoTitle: 'Self-host Budibase: low-code platform with Docker Compose',
  seoDescription:
    'Deploy Budibase - open-source low-code platform for internal tools, forms and workflows - in one step. All-in-one image, zero required env vars, unlimited creators and users self-hosted.',
  keywords: [
    'self-host budibase',
    'budibase docker compose',
    'budibase setup',
    'internal tools low code',
    'form builder self-hosted',
    'retool alternative budibase',
  ],
  intro: [
    'Budibase leans into the forms-and-workflows end of internal tooling: CRUD apps over a built-in database, public forms, approval chains, and automations - the kind of thing ops and back-office teams ask for weekly. Less code-centric than Appsmith or ToolJet, faster to something shippable.',
    'This template runs the all-in-one image (embedded CouchDB, Redis, MinIO, app server and worker) behind a thin websocket-aware nginx proxy. It is the lowest-friction deploy in the category: no required variables at all - secrets auto-generate on first boot and persist in a .env on the /data volume.',
    'Self-hosted, the open-source core has unlimited creators and users; Budibase’s paid tiers gate SSO and branding, not seats. Compare that with the cloud math, where a 5-creator team lands at ~$349/month.',
  ],
  features: [
    'Built-in database plus connectors: Postgres, MySQL, Mongo, REST, S3, …',
    'Public forms and portals, not just internal screens',
    'Automations: triggers, approval workflows, webhooks, schedules',
    'Embedded CouchDB/Redis/MinIO - one container, one volume',
    'Zero required configuration: secrets self-generate and persist',
    'Unlimited creators and users in the open-source core',
  ],
  topology: [
    { service: 'budibase', role: 'Budibase all-in-one (:80)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> budibase:80, websocket passthrough', isPublic: 'yes' },
  ],
  requiredVars: [],
  ramMiB: 4096,
  diskGB: 10,
  services: 2,
  sizingNote:
    'The all-in-one bundle (CouchDB + Redis + MinIO + app + worker) wants real RAM; 4 GiB is the working floor and upstream suggests 6 GB for heavier use - bump the plan if builders feel sluggish.',
  faq: [
    {
      q: 'Budibase, Appsmith, or ToolJet - which one?',
      a: 'Budibase for forms, CRUD, and approval workflows with the least setup; Appsmith for code-heavy admin panels over many datasources; ToolJet for the middle ground with the cleanest deployment (stateless app + managed Postgres). All three are in this catalogue - deploying two and comparing costs less than a Retool seat.',
    },
    {
      q: 'Really no required configuration?',
      a: 'Really - JWT secret, MinIO keys, and CouchDB credentials auto-generate on first boot and persist in a .env file on the /data volume, so they survive redeploys. Create the first admin account promptly; until then the instance is claimable by whoever visits.',
    },
    {
      q: 'How does self-hosting compare to Budibase Cloud pricing?',
      a: 'Budibase Cloud Premium works out to ~$349/month for 5 creators + 20 end users ($49 base + $50 per extra creator + $5 per end user). This stack is $49/month flat with unlimited seats - the paid tiers gate SSO and branding, not capacity.',
    },
    {
      q: 'What is in the /data volume?',
      a: 'Everything: CouchDB documents (apps, tables, users), uploaded files in the embedded MinIO, and the generated secrets. Back up that one volume and you can rebuild the instance anywhere.',
    },
  ],
};
