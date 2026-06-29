import type { AppBase } from './index';

export const roundcube: AppBase = {
  slug: 'roundcube',
  name: 'Roundcube',
  upstream: 'Roundcube',
  upstreamUrl: 'https://roundcube.net',
  tagline:
    'The standard open-source webmail - your UI over any IMAP provider, with sessions and contacts in your Postgres.',
  category: 'Email & Newsletters',
  status: 'stable',
  seoTitle: 'Self-host Roundcube webmail with Docker Compose',
  seoDescription:
    'Deploy Roundcube - the standard open-source webmail client over any IMAP/SMTP provider - in one step on a managed Postgres for $13/month. Own the interface; bring any mailbox.',
  keywords: [
    'self-host roundcube',
    'roundcube docker compose',
    'webmail self-hosted',
    'imap web client',
    'roundcube postgres setup',
    'webmail any provider',
  ],
  intro: [
    'A webmail client is the honest way to self-host email on a PaaS: the mail server stays wherever deliverability lives (Fastmail, Gmail, your VPS Dovecot), and you own the interface - the part that holds your sessions, contacts, and habits. Roundcube has been the standard for two decades: folders, search, filters, address book, responsive Elastic skin.',
    'This template runs it stateless on a managed Postgres (settings, contacts, caches), behind a thin proxy. Two variables point it at your provider; users log in with their own mailbox credentials.',
    'The deliberately absent piece is stated, not hidden: no SMTP server ships here, because nothing on shared cloud IPs can credibly deliver port-25 mail. Client here, relay where it belongs - the same honest split as the listmonk template.',
  ],
  features: [
    'Full webmail: folders, search, filters, contacts, HTML compose',
    'Works over any IMAP/SMTP provider (ssl:// and tls:// supported)',
    'Stateless on managed Postgres - settings and contacts in your DB',
    'Elastic responsive skin; plugins via env',
    'GPL, actively maintained official image',
    'Pairs with mailpit (dev) and listmonk (sending) for the full mail lane',
  ],
  topology: [
    { service: 'roundcube', role: 'webmail (:80, fixed)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> roundcube:80', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'IMAP_HOST', what: 'e.g. ssl://imap.fastmail.com' },
    { name: 'SMTP_SERVER', what: 'e.g. tls://smtp.fastmail.com (the provider’s submission server)' },
  ],
  ramMiB: 1664,
  diskGB: 5,
  services: 3,
  sizingNote: 'PHP with a 128M limit per worker - 512 MiB carries a team. The managed Postgres holds everything worth keeping.',
  faq: [
    {
      q: 'Does this replace Fastmail or Google Workspace?',
      a: 'It replaces their web INTERFACE, not their servers: you keep paying ~$5-7/user for the mailbox and deliverability, while the UI, session data, and contacts live on your infrastructure. Full mail-server self-hosting needs port 25 and IP reputation no shared platform can offer - this split is the honest one.',
    },
    {
      q: 'Can different users connect different providers?',
      a: 'The template sets one default IMAP host - right for a team on one provider. Multi-host setups go in a mounted config; for a true multi-account aggregator UX, Cypht is the upstream alternative worth a look.',
    },
    {
      q: 'Does Gmail work?',
      a: 'Yes, with an app password (or OAuth via plugin configuration): imap.gmail.com over ssl:// and smtp.gmail.com over tls://. Workspace accounts behave the same.',
    },
  ],
};
