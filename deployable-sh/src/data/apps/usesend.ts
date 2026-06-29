import type { AppBase } from './index';

export const usesend: AppBase = {
  slug: 'usesend',
  name: 'useSend',
  upstream: 'useSend (formerly Unsend)',
  upstreamUrl: 'https://usesend.com',
  tagline:
    'The open-source Resend - transactional + campaign email with a dashboard and API, delivered through your own SES.',
  category: 'Email & Newsletters',
  status: 'stable',
  seoTitle: 'Self-host useSend: the open-source Resend alternative',
  seoDescription:
    'Deploy useSend - transactional email API, campaigns, contacts and analytics over your own AWS SES (~$0.10/1k emails) - in one step on a managed Postgres for $25/month.',
  keywords: [
    'self-host usesend',
    'unsend self-hosted',
    'resend alternative open source',
    'transactional email self-hosted',
    'ses email platform',
    'usesend docker compose',
  ],
  intro: [
    'Resend made transactional email pleasant: clean API, dashboard, domains, analytics. useSend rebuilds that experience as AGPL open source - with delivery handled by YOUR AWS SES, which is the architecturally honest choice (SES owns IP reputation at ~$0.10 per 1,000 emails; you own the platform, templates, contacts, and data).',
    'The stack is catalogue-standard: the Next.js app behind a thin proxy, BullMQ sends queued in a noeviction Valkey, everything durable in the managed Postgres. Migrations run on start.',
    'The honest prerequisites are listed, not discovered: SES production access and a GitHub OAuth app (useSend’s login provider). Once those exist, you have Resend’s workflow at SES postage prices - 100k emails costs ~$10 in delivery, not a tier upgrade.',
  ],
  features: [
    'Transactional API + campaign sends with one platform',
    'Contacts, domains (DKIM via SES), delivery analytics, webhooks',
    'Your SES underneath: ~$0.10/1k emails, SES-grade deliverability',
    'BullMQ queue on noeviction Valkey; managed Postgres state',
    'API keys per app - drop-in for Resend-style SDK usage',
    'AGPL-3.0, actively maintained',
  ],
  topology: [
    { service: 'usesend', role: 'dashboard + API (Next.js :3000)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> usesend:3000', isPublic: 'yes' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NEXTAUTH_SECRET / REDIS_AUTH', what: 'core secrets' },
    { name: 'AWS_*', what: 'SES credentials (production access, IAM scoped to SES+SNS)' },
    { name: 'GITHUB_ID / GITHUB_SECRET', what: 'OAuth login app (callback on your domain)' },
    { name: 'NEXTAUTH_URL', what: 'the app’s https domain after first deploy' },
  ],
  ramMiB: 2304,
  diskGB: 5,
  services: 4,
  sizingNote:
    'Send volume is SES’s problem, not this stack’s - the queue and dashboard idle small. Stateless except Postgres.',
  faq: [
    {
      q: 'How does the cost compare to Resend?',
      a: 'Resend Pro is $20/month for 50k emails, $35 for 100k. useSend is $25/month infrastructure plus SES postage (~$0.10/1k): 100k emails ≈ $35 total, 500k ≈ $75 - and the curve flattens where Resend’s tiers climb. Below ~50k/month, Resend’s simplicity honestly wins; above it, owning the platform does.',
    },
    {
      q: 'Why is AWS SES required rather than any SMTP?',
      a: 'useSend is built around SES APIs and SNS delivery webhooks (bounces, complaints, opens) - that integration is what makes the analytics real. It is the same architecture Resend itself runs on; you are just holding the SES account.',
    },
    {
      q: 'useSend or listmonk - the catalogue has both?',
      a: 'useSend for the Resend-shaped job: transactional API + product emails + light campaigns, developer-first. listmonk for serious newsletter/list management at scale (segmentation, double opt-in machinery). They share the SES-underneath philosophy and coexist happily.',
    },
  ],
};
