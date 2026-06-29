import type { AppBase } from './index';

export const ghost: AppBase = {
  slug: 'ghost',
  name: 'Ghost',
  upstream: 'Ghost 6',
  upstreamUrl: 'https://ghost.org',
  tagline:
    'Professional publishing - blog, newsletter, paid memberships - keeping 100% of your subscription revenue.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host Ghost 6: blog and newsletter with Docker Compose',
  seoDescription:
    'Deploy Ghost 6 - blog, newsletter, and paid memberships - in one step with a self-hosted MySQL. No member caps, no revenue cut; compare vs Ghost(Pro) and Substack’s 10%.',
  keywords: [
    'self-host ghost',
    'ghost docker compose',
    'ghost pro alternative',
    'substack alternative self-hosted',
    'newsletter self-hosted',
    'ghost mysql setup',
  ],
  intro: [
    'Ghost is what serious independent publishing runs on: a fast editor, built-in newsletters, paid memberships with Stripe, and themes that look professional out of the box. The open-source core is the same software Ghost(Pro) hosts - which means the only question is who runs it.',
    'This template answers that with one app container plus a self-hosted MySQL 8 container (Ghost requires MySQL 8 in production; SQLite is dev-only upstream). Themes and images persist on a content volume; posts and members live in the database.',
    'The economics favor self-hosting more as you grow: Ghost(Pro) tiers by members and staff, Substack takes 10% of paid subscriptions forever. Self-hosted Ghost has no member cap and keeps every cent of revenue - the $13/month plan is the whole infrastructure bill.',
  ],
  features: [
    'The Ghost editor: clean writing, cards, embeds, SEO settings built in',
    'Native newsletters and paid memberships (Stripe, 0% platform fee)',
    'Self-hosted MySQL 8 container, auto-wired (Ghost requires MySQL 8)',
    'Custom themes - no Publisher-tier gate when self-hosting',
    'Content API + integrations; ActivityPub optional upstream',
    'Themes/images on a persistent volume, content in the database',
  ],
  topology: [
    { service: 'ghost', role: 'site + admin at /ghost (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'MySQL 8 container (local and on Miget)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'GHOST_URL', what: 'set to the app’s https domain after first deploy - every link embeds it' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 2,
  sizingNote:
    '1 GiB for Ghost is the realistic floor (Node + image processing); the MySQL container rides alongside. Email sending needs SMTP config; bulk newsletters additionally use Mailgun, set in the admin UI.',
  faq: [
    {
      q: 'How does self-hosted Ghost compare to Ghost(Pro) and Substack?',
      a: 'Ghost(Pro) Starter is $18/month for 1,000 members and one staff user; Substack is free but takes 10% of paid-subscription revenue forever. Self-hosted Ghost on this $13/month stack has no member or staff caps and a 0% platform fee - past your first handful of paid subscribers, it wins on pure math.',
    },
    {
      q: 'Is it the same Ghost as the hosted product?',
      a: 'Yes - Ghost(Pro) runs the same open-source core. Self-hosting even removes a tier gate: custom themes work without the $29/month Publisher plan.',
    },
    {
      q: 'What about sending the newsletters?',
      a: 'Transactional email (signups, logins) needs SMTP - any provider works via the mail__* env vars. Bulk newsletter delivery uses Mailgun, configured in the admin UI; that is an upstream Ghost design decision, identical for any self-hosted Ghost.',
    },
    {
      q: 'Why does the template require MySQL?',
      a: 'Ghost supports only MySQL 8 in production (SQLite is dev-only upstream). This template ships a MySQL 8 container wired to Ghost out of the box, so that requirement is covered with no extra setup.',
    },
  ],
};
