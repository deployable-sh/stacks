import type { AppBase } from './index';

export const freescout: AppBase = {
  slug: 'freescout',
  name: 'FreeScout',
  upstream: 'FreeScout',
  upstreamUrl: 'https://freescout.net',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline: 'The free help desk / shared inbox - email ticketing with no per-agent pricing, on a self-hosted MySQL.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host FreeScout: free help desk and shared inbox',
  seoDescription:
    'Deploy FreeScout - email-based help desk and shared inbox with mailboxes, saved replies, and modules - in one step on a self-hosted MySQL for $13/month. The per-agent-free Zendesk/Help Scout alternative.',
  keywords: [
    'self-host freescout',
    'freescout docker compose',
    'help scout alternative self-hosted',
    'zendesk alternative free',
    'shared inbox self-hosted',
    'help desk open source',
  ],
  intro: [
    'FreeScout is the help desk that looks and feels like Help Scout but costs nothing per agent: a shared inbox over email, with conversations, mailboxes, tags, saved replies, assignments, and a module ecosystem for live chat, telephony, and more. AGPL, and genuinely lightweight.',
    'This template uses the actively-maintained nfrastack image (the once-popular tiredofit image is now deprecated) on a self-hosted MySQL. The image’s nginx is told to listen on 5000 (NGINX_LISTEN_PORT), so it is the public entrypoint directly - no separate proxy. File-based cache means no Redis; attachments, the app key, and installed modules live on the data volume.',
    'Support tooling is per-agent everywhere else - Zendesk $55, Help Scout $25, Freshdesk $19 per agent per month. FreeScout is $13/month flat with unlimited agents; modules are one-time licenses, not subscriptions.',
  ],
  features: [
    'Shared inbox over email: conversations, assignments, tags',
    'Multiple mailboxes, saved replies, workflows, notes',
    'Module ecosystem (live chat, telephony, KB, more)',
    'Self-hosted MySQL; file-based cache (no Redis)',
    'Unlimited agents - no per-seat pricing',
    'AGPL-3.0',
  ],
  topology: [
    { service: 'freescout', role: 'help desk (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'MySQL 8 container (local and on Miget)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ADMIN_EMAIL / ADMIN_PASS', what: 'first admin account' },
  ],
  ramMiB: 2048,
  diskGB: 15,
  services: 2,
  sizingNote: '1 GiB suits a support team. Modules and attachments live on the /data volume - keep replicas at 1 (modules are on local disk).',
  faq: [
    {
      q: 'How does the cost compare to Zendesk or Help Scout?',
      a: 'Zendesk Suite Team is $55/agent/month, Help Scout Standard $25/seat, Freshdesk Growth $19/agent. A 5-agent team is $95-275/month - versus $13/month flat here, agents uncounted. FreeScout’s paid modules are one-time licenses, not recurring seats.',
    },
    {
      q: 'Which image does this use?',
      a: 'The actively-maintained nfrastack/freescout image. The widely-shared tiredofit/freescout image is deprecated as of 2026 (same maintainer moved to the nfrastack namespace) - this template tracks the live one.',
    },
    {
      q: 'Do I need Redis?',
      a: 'No - FreeScout uses file-based cache and sessions on the /data volume, so the template is just app + self-hosted MySQL. That keeps it light and the deploy simple.',
    },
  ],
};
