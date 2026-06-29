import type { AppBase } from './index';

export const chatwoot: AppBase = {
  slug: 'chatwoot',
  name: 'Chatwoot',
  upstream: 'Chatwoot (CE)',
  upstreamUrl: 'https://www.chatwoot.com',
  tagline:
    'Open-source customer support - shared inbox, live chat, channels, help center - with no per-agent pricing.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Chatwoot: open-source Intercom alternative',
  seoDescription:
    'Deploy Chatwoot CE - shared inbox, website live chat, email and social channels, help center - in one step for $25/month flat. No per-agent pricing; compare vs Intercom and Zendesk seats.',
  keywords: [
    'self-host chatwoot',
    'chatwoot docker compose',
    'intercom alternative open source',
    'zendesk alternative self-hosted',
    'live chat self-hosted',
    'customer support open source',
  ],
  intro: [
    'Support tooling prices per agent, which punishes exactly the team you want answering customers. Chatwoot is the open-source counter: a shared inbox across live chat, email, and social channels, with assignment rules, canned responses, automations, and a help center - and this template ships the pure-MIT community-edition image (v4-ce, no enterprise code).',
    'The topology is the full production shape: Rails web (live chat rides websockets at /cable), a Sidekiq worker, an idempotent migrate sidecar, a noeviction Valkey for the queues - and a pgvector Postgres container, because Chatwoot v4 hard-requires the extension (its AI features embed conversations).',
    'A 5-agent team pays $145-275/month at Intercom or Zendesk before AI add-ons. This stack is $25/month with unlimited agents, and a noisy month costs nothing extra.',
  ],
  features: [
    'Shared inbox: live chat widget, email, API, and social channels',
    'Assignment, teams, labels, canned responses, automations',
    'Help center / knowledge base included',
    'Pure MIT community image (v4-ce) - no enterprise code',
    'Production shape: web + Sidekiq + migrate + noeviction queue',
    'pgvector Postgres (v4 requirement) handled in-template',
  ],
  topology: [
    { service: 'web', role: 'app + live chat websockets at /cable (:5000)', isPublic: 'yes' },
    { service: 'worker / migrate', role: 'Sidekiq + idempotent schema prepare', isPublic: 'no' },
    { service: 'broker / db', role: 'noeviction Valkey / Postgres + pgvector', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'alphanumeric secret' },
    { name: 'REDIS_AUTH', what: 'queue password' },
    { name: 'FRONTEND_URL', what: 'the app’s https domain after first deploy (the chat widget embeds it)' },
  ],
  ramMiB: 3840,
  diskGB: 15,
  services: 5,
  sizingNote:
    '1 GiB each for web and Sidekiq is the realistic floor; the worker is the scaling dial on busy inboxes. S3-compatible storage makes the pair stateless when you outgrow the volume.',
  faq: [
    {
      q: 'What does this save vs Intercom or Zendesk?',
      a: 'Intercom Essential is $29/seat/month (plus $0.99 per AI resolution); Zendesk Suite Team is $55/agent. Five agents cost $145-275/month before add-ons - versus $25 flat here, agents uncounted. Chatwoot’s own cloud is $19/agent, so even first-party hosting meters what this does not.',
    },
    {
      q: 'Why does the template run its own Postgres?',
      a: 'Chatwoot v4 requires the pgvector extension (migrations fail without it), which managed Postgres offerings do not ship - so the template runs the pgvector image as a private container. Everything else about the stack uses the standard catalogue patterns.',
    },
    {
      q: 'How does the live chat widget work?',
      a: 'Create a website inbox and embed the snippet; visitor chats arrive over websockets at /cable on your domain, which the platform ingress passes through. FRONTEND_URL must be your real https domain - the widget embeds it.',
    },
    {
      q: 'Is the CE image missing anything important?',
      a: 'The v4-ce tag strips the commercial enterprise directory (SLA policies, audit logs, some AI features). The core support workflow - inboxes, channels, automations, help center, reports - is fully there, under plain MIT.',
    },
  ],
};
