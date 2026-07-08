import type { AppBase } from './index';

export const metabase: AppBase = {
  slug: 'metabase',
  name: 'Metabase',
  upstream: 'Metabase OSS',
  upstreamUrl: 'https://www.metabase.com',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline:
    'BI dashboards non-analysts actually use - point-and-click questions over your databases, on a managed Postgres.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Metabase: open-source BI with Docker Compose',
  seoDescription:
    'Deploy Metabase OSS - dashboards, point-and-click questions, and SQL over your databases - in one step with a managed Postgres app database. Flat price vs Metabase Cloud’s $100/month base.',
  keywords: [
    'self-host metabase',
    'metabase docker compose',
    'metabase cloud alternative',
    'open source bi tool',
    'dashboards self-hosted',
    'metabase postgres setup',
  ],
  intro: [
    'Metabase’s superpower is that the marketing team uses it without filing tickets: point-and-click questions, sensible charts, dashboards, and scheduled email reports - with full SQL one click away for those who want it. It connects to practically every database.',
    'This template runs the OSS image with its app database on a managed Postgres (the embedded H2 default is explicitly non-production upstream - this template never touches it). With the external app DB the container is stateless: questions, dashboards, and users live in Postgres; your analytics data stays in the warehouses Metabase queries.',
    'It pairs naturally with the rest of the catalogue: point it at your clickhouse, timescaledb, mssql, or mongodb stacks by service name and the whole project gets dashboards.',
  ],
  features: [
    'Point-and-click question builder + native SQL editor',
    'Dashboards with filters, drill-through, and scheduled email/Slack reports',
    'Connects to Postgres, MySQL, ClickHouse, SQL Server, Mongo, and more',
    'Stateless container on a managed Postgres app DB - clean ops',
    'Embedding and public sharing of charts',
    'OSS core - the same engine Metabase Cloud runs',
  ],
  topology: [
    { service: 'metabase', role: 'Metabase UI + API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres app DB - managed on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'MB_SITE_URL', what: 'set to the app’s https domain after first deploy (links and embeds)' },
  ],
  ramMiB: 3072,
  diskGB: 5,
  services: 2,
  sizingNote:
    'Metabase is a JVM app: 2 GiB container with a 1 GB heap is the practical floor, and startup takes a minute or two. Scale up with concurrent dashboard users.',
  faq: [
    {
      q: 'How does self-hosted Metabase compare to Metabase Cloud?',
      a: 'Metabase Cloud Starter is $100/month base for 5 users plus $6 per extra user. This stack is $25/month flat with unlimited users on the identical OSS core. Cloud buys you their hosting and upgrades; the Pro feature set (SSO, sandboxing) is a separate $575/month tier in either case.',
    },
    {
      q: 'Where does my data live?',
      a: 'Your analytics data never moves - Metabase queries your databases where they are. Only the app database (questions, dashboards, users) lives in the managed Postgres, which is exactly what gets backed up.',
    },
    {
      q: 'Can it query the other stacks in this catalogue?',
      a: 'Yes - in-project databases are reachable by service name: clickhouse ch-1:8123, timescaledb:5432, mssql:1433, mongo-1:27017. Add them as data sources and dashboard the lot without anything leaving the project network.',
    },
    {
      q: 'Why does the template insist on an external app database?',
      a: 'Metabase’s embedded H2 is documented as non-production - it corrupts under concurrent use and complicates upgrades. The managed Postgres removes the failure mode entirely and makes the Metabase container disposable.',
    },
  ],
};
