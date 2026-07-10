import type { AppBase } from './index';

export const bugsink: AppBase = {
  slug: 'bugsink',
  name: 'Bugsink',
  upstream: 'Bugsink',
  upstreamUrl: 'https://www.bugsink.com',
  license: 'Source-available',
  licenseTier: 'source-available',
  licenseNote: 'Bugsink self-host license',
  tagline:
    'Error tracking compatible with Sentry SDKs in a single container - the lightest way to own your error data.',
  category: 'Error Tracking',
  status: 'stable',
  seoTitle: 'Self-host Bugsink: single-container Sentry-compatible error tracking',
  seoDescription:
    'Deploy Bugsink - Sentry-SDK-compatible error tracking in one container plus a managed Postgres - in one step. Error tracking for $20/month flat, no event quotas.',
  keywords: [
    'self-host bugsink',
    'bugsink docker compose',
    'sentry alternative single container',
    'lightweight error tracking',
    'sentry sdk compatible',
    'bugsink setup',
  ],
  intro: [
    'Bugsink takes the minimalist position on error tracking: one container that ingests Sentry SDK events, groups them into issues, and alerts you - no Celery, no Redis, no microservices. Where GlitchTip is the lean Sentry, Bugsink is the leanest thing that still does the job properly.',
    'This template pairs that single container with a managed Postgres (auto-provisioned, DATABASE_URL auto-wired). It runs its own migrations on start. Two secrets and you are catching exceptions.',
    'Built by a Sentry-ecosystem veteran with strong opinions about software that fits in your head: synchronous ingestion, sensible defaults, and a UI focused on the only question that matters - what broke, where, how often.',
  ],
  features: [
    'Compatible with all Sentry SDKs - just swap the DSN',
    'Single application container; migrations run on start',
    'Issue grouping, release tracking, and email alerts',
    'Managed Postgres auto-provisioned and auto-wired',
    'No event quotas - disk is the only meter',
    'The smallest error-tracking footprint in the catalogue: 2 GiB total',
  ],
  topology: [
    { service: 'bugsink', role: 'UI + API + ingestion (:5000); migrates on start', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY', what: 'Django secret' },
    { name: 'ADMIN_PASSWORD', what: 'initial admin login (with ADMIN_EMAIL)' },
    { name: 'BASE_URL', what: 'set to the app’s https domain after first deploy' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 2,
  sizingNote:
    '1 GiB for the app, 1 GiB for the managed Postgres. Bugsink ingests synchronously, so sizing is simple - it either keeps up (it does, for most teams) or you scale the one container up.',
  faq: [
    {
      q: 'Bugsink or GlitchTip - which should I pick?',
      a: 'Bugsink if you want the absolute minimum to operate (one container, $13-20/month plans) and primarily need error tracking. GlitchTip if you also want performance monitoring, uptime checks, and a multi-worker ingestion pipeline. Both speak Sentry SDK.',
    },
    {
      q: 'Does Bugsink work with my language’s Sentry SDK?',
      a: 'Yes - Python, JavaScript/Node, Ruby, PHP, Go, Java, .NET, mobile: anything that emits the Sentry event protocol. Configure the SDK with your Bugsink DSN and errors arrive.',
    },
    {
      q: 'How much does self-hosted error tracking cost with Bugsink?',
      a: 'The stack totals 2 GiB: $13/month hobby fits it exactly, $25/month gives comfortable headroom. Compare to event-metered SaaS where one crash-looping client can exhaust a monthly quota in minutes.',
    },
    {
      q: 'Can Bugsink handle production traffic?',
      a: 'Bugsink is engineered for exactly this scale-down: synchronous ingestion with deliberate performance work upstream, comfortably handling millions of events per day on modest hardware according to its docs. For most teams, the single container is genuinely enough.',
    },
  ],
};
