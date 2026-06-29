import type { AppBase } from './index';

export const bagisto: AppBase = {
  slug: 'bagisto',
  name: 'Bagisto',
  upstream: 'Bagisto',
  upstreamUrl: 'https://bagisto.com',
  tagline: 'Laravel ecommerce you extend in PHP - catalog, checkout, multi-channel - on a self-hosted MySQL.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host Bagisto: open-source Laravel ecommerce',
  seoDescription:
    'Deploy Bagisto - the MIT Laravel ecommerce platform with catalog, checkout, multi-channel and multi-currency - in one step on a self-hosted MySQL for $25/month. No platform fees.',
  keywords: [
    'self-host bagisto',
    'bagisto docker compose',
    'laravel ecommerce self-hosted',
    'shopify alternative open source',
    'bagisto mysql setup',
    'php ecommerce platform',
  ],
  intro: [
    'Bagisto is the ecommerce platform for teams that live in Laravel: a full store - catalog, cart, checkout, multi-channel, multi-currency, admin, and a theme/extension system - built on the framework your PHP developers already know. MIT-licensed, so customizing it deeply is just writing Laravel.',
    'This template runs the official all-in-one image in external-DB mode (pointing DB_HOST at the separate MySQL container auto-disables the bundled one) behind a thin nginx proxy. APP_KEY is set explicitly so sessions and encrypted data survive redeploys.',
    'Like the other stores here, the pitch is zero platform fees: Shopify Basic is $39/month plus per-transaction cuts; Bagisto self-hosted takes nothing per sale. It is MySQL-only (no Postgres), which the bundled MySQL container covers.',
  ],
  features: [
    'Full storefront: catalog, cart, checkout, multi-channel, multi-currency',
    'Laravel-native - extend in PHP, not a DSL',
    'Theme system, admin, and an extension marketplace',
    'Self-hosted MySQL container (external-DB mode disables the image’s bundled one)',
    'Headless GraphQL API available',
    'MIT licensed - no platform or GMV fees',
  ],
  topology: [
    { service: 'bagisto', role: 'storefront + admin at /admin (:80)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> bagisto:80', isPublic: 'yes' },
    { service: 'db', role: 'MySQL 8 container (local and on Miget)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'APP_KEY', what: 'base64 key set explicitly (or sessions break on redeploy)' },
    { name: 'APP_URL', what: 'the app’s https domain' },
  ],
  ramMiB: 3072,
  diskGB: 15,
  services: 3,
  sizingNote: '2 GiB suits a typical store; the storage volume holds media and cache. MySQL-only - pair with MySQL, not Postgres.',
  faq: [
    {
      q: 'Bagisto, PrestaShop, or Saleor?',
      a: 'Bagisto if your team builds in Laravel/PHP and wants to extend the store in code. PrestaShop for a turnkey European storefront with a module marketplace. Saleor for headless GraphQL with a custom frontend. All three self-host here with no platform fees.',
    },
    {
      q: 'Why set APP_KEY explicitly?',
      a: 'Laravel uses APP_KEY to encrypt sessions and sensitive data. The image auto-generates one per boot if unset - which would invalidate everything on each redeploy. Set a fixed base64 key (the env example has the one-liner) and state survives.',
    },
    {
      q: 'Does it use the image’s bundled MySQL?',
      a: 'No - the all-in-one image bundles a MySQL, but this template disables it (external-DB mode, DB_HOST off-localhost) and runs a separate MySQL 8 container instead, so the database persists cleanly on its own volume. The app’s storage volume holds media and cache.',
    },
  ],
};
