import type { AppBase } from './index';

export const prestashop: AppBase = {
  slug: 'prestashop',
  name: 'PrestaShop',
  upstream: 'PrestaShop 9',
  upstreamUrl: 'https://www.prestashop-project.org',
  license: 'OSL-3.0',
  licenseTier: 'copyleft',
  tagline:
    'The European storefront standard - full shop with checkout and back office, auto-installed on a self-hosted MySQL, 0% of your GMV.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host PrestaShop 9: open-source store with Docker Compose',
  seoDescription:
    'Deploy PrestaShop 9 - complete open-source e-commerce with catalogue, checkout, and back office - in one step with a self-hosted MySQL. No platform fees, no GMV cut; compare vs Shopify and BigCommerce.',
  keywords: [
    'self-host prestashop',
    'prestashop docker compose',
    'shopify alternative open source',
    'prestashop 9 install',
    'open source ecommerce self-hosted',
    'online shop self-hosted',
  ],
  intro: [
    'PrestaShop runs an enormous share of European e-commerce for a simple reason: it is a complete shop - catalogue, cart, checkout, taxes, multi-language, multi-currency, a serious back office - that charges nothing per month and takes nothing per sale. Your gateway rates are the only per-transaction cost.',
    'This template runs the official PrestaShop 9 image with true auto-install: the installer runs on first boot against the MySQL container and removes itself. An nginx proxy fronts Apache (the image listens on :80), and the whole shop persists on a volume so module installs behave like classic hosting.',
    'One sharp edge, flagged honestly: PS_DOMAIN is baked into the database at install time - set the final domain before first deploy. The README walks through it; get that one right and the rest is shopping.',
  ],
  features: [
    'Complete storefront: catalogue, cart, checkout, shipping, taxes',
    'Multi-language, multi-currency, EU-VAT-ready out of the box',
    'Large module and theme marketplace',
    'Official image with self-removing auto-installer',
    'Self-hosted MySQL auto-deployed and auto-wired',
    '0% platform fee, no GMV cut - gateway rates only',
  ],
  topology: [
    { service: 'prestashop', role: 'shop + back office at /admin (:80)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> prestashop:80', isPublic: 'yes' },
    { service: 'db', role: 'MySQL 8 container (local and on Miget)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'PS_DOMAIN', what: 'the FINAL domain, set before first deploy - it is baked into the database at install' },
    { name: 'PS_ENABLE_SSL', what: 'set 1 (TLS terminates at the platform ingress)' },
    { name: 'ADMIN_MAIL / ADMIN_PASSWD', what: 'back-office login at /admin' },
  ],
  ramMiB: 2048,
  diskGB: 15,
  services: 3,
  sizingNote:
    '1 GiB suits a typical shop; busy catalogs and heavy modules want the next plan up. The shop lives on its volume - upgrades go through PrestaShop’s upgrade module, not image tags.',
  faq: [
    {
      q: 'How does this compare to Shopify economically?',
      a: 'Shopify Basic is $29/month plus 2.9% + 30¢ per card transaction - and 2% extra if you use a non-Shopify gateway. PrestaShop here is $25/month flat with 0% platform fees; at €5,000 of monthly sales the percentage alone exceeds the entire infrastructure bill.',
    },
    {
      q: 'What is the PS_DOMAIN warning about?',
      a: 'PrestaShop writes the shop domain into the database during installation. Set PS_DOMAIN to the real domain (custom or the app’s platform host) before the first deploy; changing it later happens in the back office, not in env. It is the one setup step that cannot be hand-waved.',
    },
    {
      q: 'How do upgrades work?',
      a: 'Like classic PrestaShop hosting: the shop lives on its volume, so bumping the image tag does not upgrade an installed shop - use the official 1-click upgrade module from the back office, with a backup first.',
    },
    {
      q: 'Is PrestaShop still a good choice vs headless platforms?',
      a: 'For a store that needs to exist this month with a theme, checkout, and EU tax handling - yes, emphatically. Headless (Saleor, Medusa) wins when you are building a custom frontend with developer time to spend. Different jobs; this one ships fastest.',
    },
  ],
};
