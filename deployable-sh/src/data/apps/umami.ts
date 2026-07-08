import type { AppBase } from './index';

export const umami: AppBase = {
  slug: 'umami',
  name: 'Umami',
  upstream: 'Umami',
  upstreamUrl: 'https://umami.is',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'Privacy-first web analytics - no cookies, no consent banner - on a managed Postgres, unlimited sites and events.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Umami: privacy-first Google Analytics alternative',
  seoDescription:
    'Deploy Umami v3 - cookie-free, GDPR-friendly web analytics with a 2 KB script - in one step with a managed Postgres. Unlimited websites and events at a flat price; compare vs Plausible and Fathom.',
  keywords: [
    'self-host umami',
    'umami docker compose',
    'google analytics alternative self-hosted',
    'privacy analytics',
    'plausible alternative',
    'umami v3 postgresql',
  ],
  intro: [
    'Google Analytics became a compliance question; the answer for most sites is privacy-first analytics: no cookies, no cross-site tracking, no consent banner needed, and a dashboard that shows what you actually check - visitors, referrers, pages, countries, events. Umami is the open-source standard of that category.',
    'This template runs Umami v3 (PostgreSQL-only since v3) as one stateless container on a managed Postgres that Miget provisions and auto-wires. One secret (APP_SECRET), a default admin/umami login to change on first visit, and a ~2 KB script tag for your sites.',
    'Hosted privacy analytics price per pageview tier and per site. Self-hosted Umami has neither meter: track every site you own, keep the data on your infrastructure, and let the database be the only thing that grows.',
  ],
  features: [
    'Cookie-free, GDPR/PECR-friendly - no consent banner required',
    '~2 KB tracking script; realtime dashboard, UTM and event tracking',
    'Unlimited websites, team members, and events',
    'Stateless container on a managed Postgres - migrations run on start',
    'Public share URLs for dashboards',
    'API for custom reporting',
  ],
  topology: [
    { service: 'umami', role: 'dashboard + collection API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'APP_SECRET', what: 'signs auth tokens (openssl rand -hex 32)' },
  ],
  ramMiB: 1536,
  diskGB: 5,
  services: 2,
  sizingNote:
    '512 MiB for the app is plenty; the managed Postgres carries the data. Millions of pageviews a month fit comfortably in this footprint.',
  faq: [
    {
      q: 'How does self-hosted Umami compare to Plausible or Fathom pricing?',
      a: 'Plausible starts at $9/month for one site and 10k pageviews; Fathom at $15/month for 100k; Umami Cloud at $20/month for 1M events. This stack is $13/month flat with no site, pageview, or event caps - and the visitor data never leaves your infrastructure.',
    },
    {
      q: 'Do I still need a cookie consent banner?',
      a: 'Not for Umami itself - it sets no cookies and stores no personal identifiers, which is the design goal of privacy-first analytics. (Your other scripts may still need consent; Umami stops being the reason.)',
    },
    {
      q: 'How do I add a website?',
      a: 'Log in, add the site in the dashboard, and paste the generated script tag - https://your-domain/script.js with your website id - into your pages. Data appears in realtime; UTM parameters and custom events work out of the box.',
    },
    {
      q: 'Can it handle real traffic volumes?',
      a: 'Yes - the collection endpoint is a lightweight Next.js API writing to Postgres, and a 1 GiB managed instance absorbs millions of monthly pageviews. Past that, scale the database plan before the app.',
    },
    {
      q: 'Why is Umami v3 Postgres-only?',
      a: 'Upstream dropped MySQL in v3.0 to focus the schema and migrations on one engine. Convenient here: the managed Postgres is exactly what it wants, auto-provisioned and auto-wired.',
    },
  ],
};
