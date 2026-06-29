import type { AppBase } from './index';

export const listmonk: AppBase = {
  slug: 'listmonk',
  name: 'listmonk',
  upstream: 'listmonk',
  upstreamUrl: 'https://listmonk.app',
  tagline:
    'Self-hosted newsletters and mailing lists - millions of subscribers on a flat plan, sent through any relay you like.',
  category: 'Email & Newsletters',
  status: 'stable',
  seoTitle: 'Self-host listmonk: newsletters and mailing lists',
  seoDescription:
    'Deploy listmonk - subscriber management, campaigns, templates and analytics on a managed Postgres - in one step for $13/month. Replace per-subscriber newsletter pricing; send via SES, Resend, or any SMTP.',
  keywords: [
    'self-host listmonk',
    'listmonk docker compose',
    'mailchimp alternative self-hosted',
    'newsletter self-hosted',
    'mailing list software',
    'listmonk ses setup',
  ],
  intro: [
    'Newsletter SaaS prices by subscriber count, which means your bill grows precisely when your project succeeds. listmonk decouples that: a single Go binary on Postgres that manages subscribers, double opt-in, campaigns, templates, and analytics - while delivery goes through whatever relay you configure.',
    'That architecture is the honest one for a PaaS: platforms cannot send port-25 mail credibly (nobody can, from shared IPs), so listmonk hands delivery to SES (~$0.10 per 1,000 emails), Resend, Postmark, or Mailgun - configured in the admin UI - and owns everything else.',
    'This template is fully env-driven on a managed Postgres, with listmonk’s idempotent install/upgrade running on every deploy. A 50,000-subscriber list that costs hundreds monthly on hosted platforms runs here for $13 plus relay postage.',
  ],
  features: [
    'Subscriber management with double opt-in and custom attributes',
    'Campaigns, templating, A/B-style experiments, click/open analytics',
    'Sends via any SMTP relay - SES, Resend, Postmark, Mailgun',
    'Public subscription pages included',
    'Managed Postgres auto-provisioned; schema auto-upgrades on deploy',
    'Go-fast: millions of subscribers on this footprint',
  ],
  topology: [
    { service: 'listmonk', role: 'admin + public pages (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [{ name: 'LISTMONK_ADMIN_PASSWORD', what: 'first-run admin bootstrap (with LISTMONK_ADMIN_USER)' }],
  ramMiB: 1536,
  diskGB: 5,
  services: 2,
  sizingNote: 'listmonk itself idles near 50 MB; the database carries the list. Campaign throughput is governed by your relay’s rate limits, not this plan.',
  faq: [
    {
      q: 'What does sending actually cost?',
      a: 'The relay’s rates: Amazon SES is ~$0.10 per 1,000 emails, Resend Pro is $20/month for 50k, Postmark $15/month for 10k. listmonk adds no per-subscriber or per-send fee on top - a 100k-send month through SES costs about $10 in postage plus this $13 plan.',
    },
    {
      q: 'Why not just use the relay’s own campaign tools?',
      a: 'Ownership and limits: your subscriber list, consent records, and engagement data live in your Postgres, exportable as SQL - and switching relays is a settings change, not a migration. Relay-native tools also tier their campaign features by contact count; listmonk does not count.',
    },
    {
      q: 'Does it handle double opt-in and GDPR basics?',
      a: 'Yes - double opt-in flows, per-list consent, unsubscribe links, and full data export/wipe per subscriber are built in. The public subscription pages run on the same domain.',
    },
  ],
};
