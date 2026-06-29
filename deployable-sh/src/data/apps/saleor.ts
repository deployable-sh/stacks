import type { AppBase } from './index';

export const saleor: AppBase = {
  slug: 'saleor',
  name: 'Saleor',
  upstream: 'Saleor',
  upstreamUrl: 'https://saleor.io',
  tagline:
    'Headless, GraphQL-first commerce (BSD-3) - the full API + dashboard stack without Saleor Cloud’s $1,599/month entry.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host Saleor: headless GraphQL e-commerce with Docker Compose',
  seoDescription:
    'Deploy Saleor - headless GraphQL e-commerce with official images: API, Celery worker, and dashboard on a managed Postgres - in one step. BSD-licensed, no GMV math, vs Saleor Cloud from $1,599/month.',
  keywords: [
    'self-host saleor',
    'saleor docker compose',
    'headless ecommerce open source',
    'saleor cloud alternative',
    'graphql ecommerce',
    'shopify alternative headless',
  ],
  intro: [
    'Saleor is what e-commerce looks like when the API comes first: a single GraphQL endpoint covering products, channels, checkout, payments, and orders, built for teams shipping custom storefronts. BSD-3 licensed, with official images - the rare headless commerce platform that is genuinely deployable rather than scaffold-only.',
    'This template mirrors the official saleor-platform topology: API core and Celery worker on a managed Postgres, a noeviction Valkey broker, the dashboard SPA, and a migrate sidecar that applies migrations and bootstraps your superuser. The API and dashboard each get their own domain via thin nginx proxies.',
    'The pricing contrast is the starkest on this site: Saleor Cloud starts at $1,599/month (Select tier, then 0.8% of GMV overage). The identical BSD core on this stack runs $25-49/month with no GMV arithmetic at all.',
  ],
  features: [
    'GraphQL-first API: products, channels, checkout, payments, orders',
    'Multi-channel and multi-currency by design',
    'Official images - API, worker, dashboard, version-paired',
    'Dashboard for the team; bring any storefront (Next.js starter ready)',
    'Managed Postgres + noeviction Valkey broker wired automatically',
    'BSD-3: no GMV cut, no usage clauses, period',
  ],
  topology: [
    { service: 'api / worker / migrate', role: 'Saleor core, Celery, migrations (private)', isPublic: 'no' },
    { service: 'dashboard', role: 'admin SPA (private, API_URL runtime-set)', isPublic: 'no' },
    { service: 'web-api / web-dashboard', role: 'nginx :5000 proxies - two public domains', isPublic: 'yes' },
    { service: 'broker / db', role: 'Valkey (noeviction) / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY / REDIS_AUTH', what: 'core secrets' },
    { name: 'ADMIN_EMAIL / ADMIN_PASSWORD', what: 'superuser bootstrap (dashboard login)' },
    { name: 'PUBLIC_URL / API_URL / DASHBOARD_URL / ALLOWED_HOSTS / ALLOWED_CLIENT_HOSTS', what: 'set to the two apps’ https domains after first deploy' },
  ],
  ramMiB: 4864,
  diskGB: 10,
  services: 8,
  sizingNote:
    'Eight services but lean ones: 1 GiB each for API and worker carries real stores. Keep the api and dashboard image tags on the same minor version when upgrading.',
  faq: [
    {
      q: 'Why is Saleor Cloud $1,599/month when this is $25?',
      a: 'Saleor Cloud is positioned for funded mid-market teams: its Select tier bundles $200K/month GMV, SLAs, and their ops. The BSD-3 core is the same software - self-hosting trades their ops team for your deploy button, and removes GMV percentages from your unit economics entirely.',
    },
    {
      q: 'Saleor or PrestaShop - which one for my shop?',
      a: 'PrestaShop if you want a complete store this week: theme, checkout, EU taxes, done. Saleor if you are building a custom storefront and want a clean GraphQL API behind it. Both are in this catalogue; they solve different problems.',
    },
    {
      q: 'Where is the storefront?',
      a: 'Saleor is deliberately headless - bring your own frontend. Their open-source Next.js storefront starter connects to your API URL out of the box and is the fastest way to see your products rendered.',
    },
    {
      q: 'What happens on upgrades?',
      a: 'Migrations run automatically via the migrate sidecar on every deploy. The one rule: bump the api and dashboard tags together - the dashboard minor version must match the core.',
    },
  ],
};
