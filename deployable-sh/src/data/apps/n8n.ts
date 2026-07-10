import type { AppBase } from './index';

export const n8n: AppBase = {
  slug: 'n8n',
  name: 'n8n',
  upstream: 'n8n',
  upstreamUrl: 'https://n8n.io',
  license: 'Sustainable Use License',
  licenseTier: 'source-available',
  licenseNote: 'fair-code; restricts hosting-as-a-service',
  tagline:
    'n8n in queue mode - editor plus horizontally scalable workers, with managed Postgres and Valkey auto-wired.',
  category: 'Automation & Jobs',
  status: 'stable',
  seoTitle: 'Self-host n8n in queue mode: scalable workers with Docker Compose',
  seoDescription:
    'Deploy n8n workflow automation in production queue mode - editor, webhooks, and scalable BullMQ workers backed by managed Postgres and Valkey - in one step. Unlimited executions, flat price.',
  keywords: [
    'self-host n8n',
    'n8n queue mode setup',
    'n8n docker compose production',
    'n8n cloud alternative',
    'n8n workers scaling',
    'zapier alternative self-hosted',
  ],
  intro: [
    'n8n is the workflow automation tool that took Zapier’s job for technical teams: 400+ integrations, a visual editor, and real code nodes when clicking runs out. Its production architecture is queue mode - the editor/webhook instance enqueues executions into Redis, and dedicated workers burn through them - and that is exactly what this template deploys.',
    'On Miget, db and queue become managed Postgres and Valkey, with connection env auto-wired onto both the main instance and the workers. One required variable (N8N_ENCRYPTION_KEY) and you have the architecture n8n’s own docs recommend for production.',
    'Workers are stateless - binary data lives in the database - so this is the one template in the catalogue where scaling replicas is the right move: bump worker replicas as workflow volume grows. n8n Cloud meters by executions; here, executions are free and the meter is your plan’s RAM.',
  ],
  features: [
    'Queue mode: the production architecture, not a single-container toy',
    'Horizontally scalable workers (stateless BullMQ consumers)',
    '400+ integrations plus JS/Python code nodes and AI agent nodes',
    'Managed Postgres + Valkey auto-provisioned and auto-wired',
    'Unlimited executions - no per-run pricing',
    'Webhooks served on the public editor instance',
  ],
  topology: [
    { service: 'n8n', role: 'editor + API + webhooks + scheduler (:5000)', isPublic: 'yes' },
    { service: 'n8n-worker', role: 'workflow execution (scale replicas)', isPublic: 'no' },
    { service: 'db / queue', role: 'Postgres / Valkey - managed services on Miget', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'N8N_ENCRYPTION_KEY', what: 'encrypts stored credentials (openssl rand -hex 24); losing it orphans saved credentials' },
  ],
  ramMiB: 3328,
  diskGB: 6,
  services: 4,
  sizingNote:
    '1 GiB editor + 1 GiB per worker + managed services. Workers are the scaling dial: heavy workflow volume means more worker replicas, which the 4 GiB plan accommodates one of and the 8 GiB plan several.',
  faq: [
    {
      q: 'How much does self-hosted n8n cost vs n8n Cloud?',
      a: 'n8n Cloud Starter is ~$24/month for 2,500 executions and Pro ~$60/month for 10,000. This stack runs ~$25/month (4 GiB hobby) with unlimited executions - the crossover happens at trivially low workflow volume, and self-hosted includes queue mode, which Cloud reserves for higher tiers.',
    },
    {
      q: 'What is queue mode and why does it matter?',
      a: 'In default mode one process does everything - a heavy workflow blocks the editor and webhooks. Queue mode separates concerns: the main instance enqueues executions into Valkey and stateless workers execute them. It is n8n’s recommended production setup and what this template ships.',
    },
    {
      q: 'How do I scale n8n workers?',
      a: 'Increase the n8n-worker replica count - workers are stateless (binary data lives in Postgres), so this is the one catalogue template where replicas-based scaling is correct. Each worker wants ~1 GiB.',
    },
    {
      q: 'Are community nodes and AI features available self-hosted?',
      a: 'Yes - community nodes install from the editor, and the AI/LangChain agent nodes work with your own API keys. Self-hosted n8n has no feature meter on executions or workflows.',
    },
    {
      q: 'What happens if I lose N8N_ENCRYPTION_KEY?',
      a: 'Stored credentials become undecryptable - workflows survive but every connection must be re-authenticated. Treat the key like a database backup: store it in a password manager the day you deploy.',
    },
  ],
};
