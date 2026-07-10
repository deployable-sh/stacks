import type { AppBase } from './index';

export const superset: AppBase = {
  slug: 'superset',
  name: 'Superset',
  upstream: 'Apache Superset',
  upstreamUrl: 'https://superset.apache.org',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'The Apache BI platform - dashboards, SQL Lab, alerts and reports - with no per-user pricing.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Apache Superset with Docker Compose',
  seoDescription:
    'Deploy Apache Superset - dashboards, no-code charts, SQL Lab, scheduled reports - in one step on a managed Postgres for $49/month flat. The per-seat-free alternative to Preset and Tableau-class BI.',
  keywords: [
    'self-host superset',
    'superset docker compose',
    'preset alternative',
    'tableau alternative open source',
    'apache superset setup',
    'bi platform self-hosted',
  ],
  intro: [
    'Superset is what BI looks like when a data team builds it for themselves: a no-code chart builder with forty-plus visualization types, dashboards with filters and drill-downs, SQL Lab for the analysts, and scheduled alerts and reports - Apache-2.0, no feature meter, no seat meter.',
    'This template ships the real production shape: gunicorn app, Celery worker and beat for async queries and scheduled reports, an idempotent init sidecar (migrations + admin bootstrap), a noeviction Valkey, and the managed Postgres for metadata. The dict-style config Superset requires is baked the officially documented way - a small superset_config.py reading everything simple from env.',
    'Preset (the hosted Superset) starts at $100/month base plus $6 per user. This stack is $49/month with users uncounted - and your warehouses stay on the project network.',
  ],
  features: [
    '40+ chart types, dashboard filters, drill-down',
    'SQL Lab with query history and saved queries',
    'Alerts and scheduled reports (Celery beat included)',
    'Connects to every catalogue database by service name',
    'Production topology with idempotent init - no manual bootstrap',
    'Apache-2.0; no seats, no feature gates',
  ],
  topology: [
    { service: 'app', role: 'UI + API (gunicorn, :5000)', isPublic: 'yes' },
    { service: 'worker / beat / init', role: 'Celery + scheduled reports + migrations', isPublic: 'no' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres metadata', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SUPERSET_SECRET_KEY', what: 'openssl rand -base64 42 (the server refuses to start without one)' },
    { name: 'REDIS_AUTH / ADMIN_PASSWORD', what: 'queue password; admin login (username admin)' },
  ],
  ramMiB: 5376,
  diskGB: 10,
  services: 6,
  sizingNote:
    '2 GiB for the app, 1 GiB worker - the floor for real dashboard use. Heavy concurrent SQL Lab moves the worker up a plan before the app.',
  faq: [
    {
      q: 'Superset or Metabase - the catalogue has both?',
      a: 'Metabase for self-serve simplicity (marketing asks it questions); Superset for data-team power - SQL Lab, fine-grained chart control, dashboards-as-product, alerts. Both run on flat plans here; many orgs genuinely use both.',
    },
    {
      q: 'How does the cost compare to Preset or Tableau-class BI?',
      a: 'Preset Professional is $20/user/month on top of a $100 Starter base; Tableau-class tools run $70+/user. A 15-person analytics audience costs $300-1,000+/month hosted - versus $49 flat here, with the same Superset.',
    },
    {
      q: 'What can it connect to in my project?',
      a: 'Everything with a SQLAlchemy driver, by service name: clickhouse (ch-1:8123), timescaledb, mariadb-galera, mssql, the managed Postgres your apps use. In-project connections never leave the private network.',
    },
    {
      q: 'Why does the template bake a config file?',
      a: 'Superset’s Celery and cache settings are Python dicts that env vars cannot express - the upstream-documented pattern is exactly this baked superset_config.py with SUPERSET_CONFIG_PATH. Simple values still come from env; you should never need to edit it.',
    },
  ],
};
