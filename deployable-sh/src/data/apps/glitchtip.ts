import type { AppBase } from './index';

export const glitchtip: AppBase = {
  slug: 'glitchtip',
  name: 'GlitchTip',
  upstream: 'GlitchTip',
  upstreamUrl: 'https://glitchtip.com',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'Sentry-API-compatible error tracking at a fraction of self-hosted Sentry’s footprint - managed Postgres + Valkey, one secret.',
  category: 'Error Tracking',
  status: 'stable',
  seoTitle: 'Self-host GlitchTip: Sentry-compatible error tracking',
  seoDescription:
    'Deploy GlitchTip - open-source error tracking that speaks the Sentry SDK protocol - in one step with managed Postgres and Valkey. Unlimited events at a flat monthly price.',
  keywords: [
    'self-host glitchtip',
    'glitchtip docker compose',
    'sentry alternative self-hosted',
    'sentry self-hosted lightweight',
    'error tracking self-hosted',
    'glitchtip setup',
  ],
  intro: [
    'Self-hosted Sentry is famously a 20+ container leviathan (Kafka, ClickHouse, Zookeeper, an army of consumers). GlitchTip implements the Sentry API - your existing Sentry SDKs just point at a new DSN - in four lean services: web, a Celery worker, Postgres, and a Redis-compatible cache. Same SDKs, same DSN flow, a tenth of the iron.',
    'On Miget, db and queue become managed Postgres and Valkey with connection env auto-wired onto all GlitchTip services. SECRET_KEY is the only required variable. Error events, performance traces, and uptime checks land in a UI that any Sentry user will navigate without a manual.',
    'The economics are stark: error tracking SaaS meters by event volume, and one bad deploy can blow a month’s quota in an hour. Self-hosted GlitchTip ingests whatever your stack can hold - a noisy week costs disk space, not an invoice.',
  ],
  features: [
    'Sentry SDK compatible - point any Sentry client at the GlitchTip DSN',
    'Error tracking, performance monitoring, and uptime checks',
    'Email + webhook alerting (Slack, Discord, …)',
    'Managed Postgres + Valkey auto-provisioned and auto-wired',
    'Unlimited events - your quota is your disk',
    'One required variable: SECRET_KEY',
  ],
  topology: [
    { service: 'web', role: 'UI + API + event ingestion (:5000)', isPublic: 'yes' },
    { service: 'worker', role: 'Celery worker + beat', isPublic: 'no' },
    { service: 'migrate', role: 'idempotent Django migrations, then idles', isPublic: 'no' },
    { service: 'db / queue', role: 'Postgres / Valkey - managed services on Miget', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY', what: 'Django secret (openssl rand -hex 32)' },
    { name: 'GLITCHTIP_DOMAIN', what: 'set to the web app’s https domain after first deploy' },
  ],
  ramMiB: 3840,
  diskGB: 5,
  services: 5,
  sizingNote:
    'Sized for steady ingestion: 1 GiB each for web and worker. High-volume bursts queue in Valkey and drain through the worker - scale the worker first if backlogs grow.',
  faq: [
    {
      q: 'Do my existing Sentry SDKs work with GlitchTip?',
      a: 'Yes - GlitchTip implements the Sentry ingestion API. Swap the DSN in sentry-sdk / @sentry/node / sentry-ruby etc. and events flow. No code changes beyond the DSN.',
    },
    {
      q: 'GlitchTip vs self-hosted Sentry - why not real Sentry?',
      a: 'Modern self-hosted Sentry needs Kafka, ClickHouse, Redis, Postgres, and dozens of containers - roughly an order of magnitude more RAM than GlitchTip’s four services. If you need Sentry’s deep tracing products, pay for sentry.io; if you need solid error tracking with the same SDKs, GlitchTip is the rational self-host.',
    },
    {
      q: 'What does GlitchTip cost to run vs Sentry SaaS?',
      a: 'Sentry’s Team plan is ~$26/month for 50k errors, with overage pricing past quota. GlitchTip here runs $25/month flat (4 GiB hobby plan) with no event metering - a single noisy deploy stops being a billing event.',
    },
    {
      q: 'What is the migrate service doing in the stack?',
      a: 'It runs Django migrations idempotently on every deploy and then idles. Compose platforms have no one-shot job primitive, so a tiny always-there service is the portable way to keep the schema current.',
    },
  ],
};
