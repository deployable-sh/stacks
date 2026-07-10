import type { AppBase } from './index';

export const appsmith: AppBase = {
  slug: 'appsmith',
  name: 'Appsmith',
  upstream: 'Appsmith CE',
  upstreamUrl: 'https://www.appsmith.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'The open-source internal-tool builder - drag-and-drop UI over your databases and APIs, unlimited users, no per-seat bill.',
  category: 'Internal Tools',
  status: 'stable',
  seoTitle: 'Self-host Appsmith: open-source Retool alternative with Docker Compose',
  seoDescription:
    'Deploy Appsmith CE - the open-source low-code builder for internal tools and admin panels - in one step. Unlimited builders and users at a flat price; compare against Retool per-seat pricing.',
  keywords: [
    'self-host appsmith',
    'appsmith docker compose',
    'retool alternative open source',
    'internal tools self-hosted',
    'admin panel builder',
    'appsmith setup',
  ],
  intro: [
    'Every team eventually needs the same internal apps - a support dashboard, a refund tool, an ops panel over the production database. Appsmith is the open-source way to build them in hours: drag widgets onto a canvas, connect Postgres/MySQL/Mongo/REST/GraphQL datasources, and write JavaScript anywhere logic is needed.',
    'This template runs the Appsmith CE all-in-one image - embedded MongoDB, Redis, and Postgres in one container - behind a thin nginx proxy with websocket passthrough (the image serves on :80 and the platform publishes :5000, so the proxy bridges the two). State persists on the /appsmith-stacks volume.',
    'The economics are the point: internal-tool SaaS prices per seat, and internal tools by definition have many viewers. Self-hosted Appsmith CE has unlimited builders and users; the only thing that scales is how good your tools get.',
  ],
  features: [
    'Drag-and-drop widgets: tables, forms, charts, buttons, modals',
    'Datasources: Postgres, MySQL, MongoDB, REST, GraphQL, S3, and more',
    'JavaScript everywhere - transformations, queries, event handlers',
    'Git-based version control for apps (connect a repo per workspace)',
    'Unlimited users and apps in CE - no seat pricing',
    'All-in-one image behind a websocket-aware nginx proxy',
  ],
  topology: [
    { service: 'appsmith', role: 'Appsmith CE all-in-one (UI + API + embedded MongoDB/Redis/Postgres, :80)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> appsmith:80, websocket passthrough', isPublic: 'yes' },
  ],
  requiredVars: [
    {
      name: 'APPSMITH_ENCRYPTION_PASSWORD / APPSMITH_ENCRYPTION_SALT',
      what: 'recommended from day one - they encrypt datasource credentials; backups are unreadable without the originals',
    },
  ],
  ramMiB: 4096,
  diskGB: 5,
  services: 2,
  sizingNote:
    'The all-in-one image bundles three databases, making this the heaviest single app in the catalogue - 4 GiB is the working floor. Outgrow it by pointing APPSMITH_DB_URL at the catalogue’s mongodb replica-set template.',
  faq: [
    {
      q: 'How does self-hosted Appsmith compare to Retool pricing?',
      a: 'Retool Team runs ~$150/month for a small team (5 builders + 20 end users, billed annually) and grows with every seat. This stack is $49/month flat with unlimited users - the crossover happens at roughly two users, and internal tools always grow viewers.',
    },
    {
      q: 'Why is there an nginx proxy in the stack?',
      a: 'The Appsmith image serves on port 80 with no env to change it, and the platform publishes port 5000. The proxy bridges that and passes websockets through (Appsmith realtime runs over Socket.IO). It adds 128 MiB and zero operational surface.',
    },
    {
      q: 'Is the embedded MongoDB fine for production?',
      a: 'For typical internal-tool workloads, yes - it is Appsmith’s default deployment shape, and everything persists on the volume. At larger scale, point APPSMITH_DB_URL at an external MongoDB replica set (5.0+, readWrite + clusterMonitor roles) - this catalogue’s mongodb template is exactly that.',
    },
    {
      q: 'Can my whole team use it without extra cost?',
      a: 'Yes - Appsmith CE has no seat limits. After the first admin signs up, registration is invite-only by default; invite builders and viewers freely. Paid Appsmith plans add SSO, granular roles, and audit logs, not seats.',
    },
    {
      q: 'What datasources can I connect from inside the project?',
      a: 'Anything reachable on the project network by service name - the catalogue’s Postgres-backed stacks, mongodb, clickhouse, or any API your apps expose - plus external databases and REST/GraphQL endpoints over the internet.',
    },
  ],
};
