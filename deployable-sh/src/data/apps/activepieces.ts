import type { AppBase } from './index';

export const activepieces: AppBase = {
  slug: 'activepieces',
  name: 'Activepieces',
  upstream: 'Activepieces',
  upstreamUrl: 'https://www.activepieces.com',
  license: 'MIT',
  licenseTier: 'permissive',
  licenseNote: 'core MIT + EE',
  tagline: 'Open-source automation with AI agents - the MIT Zapier alternative, on a managed Postgres.',
  category: 'Automation & Jobs',
  status: 'stable',
  seoTitle: 'Self-host Activepieces: open-source Zapier alternative',
  seoDescription:
    'Deploy Activepieces - a visual automation builder with 280+ pieces, AI agents, and MCP - in one step on a managed Postgres for $25/month. No per-task or per-flow metering.',
  keywords: [
    'self-host activepieces',
    'activepieces docker compose',
    'zapier alternative open source',
    'make.com alternative self-hosted',
    'ai automation self-hosted',
    'activepieces setup',
  ],
  intro: [
    'Activepieces is the MIT-licensed take on Zapier: a clean visual builder with 280+ pieces (app integrations), branching and loops, AI agents, and MCP support - friendly enough for non-engineers, open enough to extend. Strong recent momentum has made it a go-to self-hosted automation tool.',
    'This template runs the all-in-one container on a managed Postgres with a noeviction Valkey for its BullMQ queues, listening on :5000 directly. It runs in UNSANDBOXED execution mode, so no Docker socket is needed - exactly right for this platform.',
    'Where Zapier charges per task and Make per operation, self-hosted Activepieces meters neither - the only ceiling is the compute it runs on.',
  ],
  features: [
    'Visual flow builder with 280+ pieces, branching, and loops',
    'AI agents and MCP server support',
    'Code pieces (TypeScript) when clicking runs out',
    'Managed Postgres + noeviction Valkey, auto-wired',
    'UNSANDBOXED mode - no Docker socket required',
    'MIT core',
  ],
  topology: [
    { service: 'activepieces', role: 'UI + API + worker (all-in-one, :5000)', isPublic: 'yes' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'AP_ENCRYPTION_KEY / AP_JWT_SECRET / REDIS_AUTH', what: 'core secrets (encryption key is 32 hex)' },
    { name: 'AP_FRONTEND_URL', what: 'the app’s https domain after first deploy (webhooks embed it)' },
  ],
  ramMiB: 3328,
  diskGB: 5,
  services: 3,
  sizingNote: '~1.5-2 GiB is the realistic floor for the all-in-one. Flows and history live in Postgres; the queue rides Valkey.',
  faq: [
    {
      q: 'How does it compare to Zapier or Make?',
      a: 'Zapier Professional is ~$30/month for 750 tasks; Make Core $9 for 10,000 ops - both meter usage. Self-hosted Activepieces has no task or operation meter at all, on a $25/month flat plan, with the flows running on your own infrastructure.',
    },
    {
      q: 'Activepieces, n8n, or Node-RED?',
      a: 'Activepieces for a polished MIT Zapier-style builder with AI pieces and the gentlest UX; n8n (also here, queue mode) for the deepest integration catalog and code-first power; Node-RED for device/MQTT/protocol wiring. Different ecosystems, all flat-priced.',
    },
    {
      q: 'Does it need Docker access to run flows?',
      a: 'No - this template uses UNSANDBOXED execution, so flow steps run in-process without a Docker socket (which a PaaS does not expose). Code pieces still run; the heavier sandbox modes that need container isolation are simply not used here.',
    },
  ],
};
