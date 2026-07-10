import type { AppBase } from './index';

export const wordpress: AppBase = {
  slug: 'wordpress',
  name: 'WordPress',
  upstream: 'WordPress',
  upstreamUrl: 'https://wordpress.org',
  license: 'GPL-2.0',
  licenseTier: 'copyleft',
  tagline:
    'The CMS that runs half the web - official image, self-hosted MySQL, full plugin freedom, no visit caps.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host WordPress with Docker Compose and MySQL',
  seoDescription:
    'Deploy WordPress (official image) in one step with a self-hosted MySQL - full plugin and theme freedom, persistent uploads, no visit caps. Cheaper than WordPress.com Business and WP Engine.',
  keywords: [
    'wordpress docker compose',
    'self-host wordpress',
    'wordpress.com alternative',
    'wp engine alternative',
    'wordpress mysql docker',
    'cheap wordpress hosting',
  ],
  intro: [
    'WordPress needs no introduction - it needs decent hosting. The hosted offerings gate the interesting parts: WordPress.com only allows plugins from its $25/month Business tier, WP Engine meters visits. Self-hosted WordPress is just WordPress: every plugin, every theme, your files.',
    'This template runs the official image behind a thin nginx proxy (the Apache variant listens on :80, the platform publishes :5000) with the X-Forwarded-Proto handling already wired, so https behind the platform’s TLS ingress works without the classic redirect loop. The MySQL container is deployed and connected automatically.',
    'The entire install - core, plugins, themes, uploads - lives on a persistent volume, so updates from the admin UI behave exactly as on any classic host. Run the 5-minute installer and you have the web’s default CMS on infrastructure you control.',
  ],
  features: [
    'Official WordPress image - the standard, not a fork',
    'Full plugin and theme freedom from day one',
    'Self-hosted MySQL auto-deployed and auto-wired',
    'X-Forwarded-Proto handled: https works without redirect loops',
    'Whole install on a persistent volume - admin-UI updates persist',
    'No visit caps or tier gates',
  ],
  topology: [
    { service: 'wordpress', role: 'WordPress + Apache (:80)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> wordpress:80', isPublic: 'yes' },
    { service: 'db', role: 'MySQL 8 container (local and on Miget)', isPublic: 'no' },
  ],
  requiredVars: [],
  ramMiB: 2048,
  diskGB: 15,
  services: 3,
  sizingNote:
    '1 GiB for WordPress suits typical sites with a normal plugin load; heavy page builders and WooCommerce want the next plan up. The 10 GB volume holds the install and uploads.',
  faq: [
    {
      q: 'How does this compare to WordPress.com or WP Engine?',
      a: 'WordPress.com only allows plugin installs from the Business tier ($25/month annual, $40 monthly); WP Engine starts at $30/month with a 25k visit cap. This stack is $25/month with no caps and root-level freedom - with the MySQL database bundled into the stack, nothing extra to wire up.',
    },
    {
      q: 'Do plugin and core updates work from the admin UI?',
      a: 'Yes - the whole install lives on the persistent volume, so one-click updates, plugin installs, and media uploads behave exactly like classic hosting and survive redeploys.',
    },
    {
      q: 'Can I run WooCommerce on it?',
      a: 'Yes - it is a plugin like any other. Give the stack the next plan up (WooCommerce is heavier on PHP workers and MySQL) and configure a persistent object cache if traffic grows.',
    },
    {
      q: 'Why is there an nginx proxy in front?',
      a: 'The official Apache image listens on port 80 with no env to change it, and the platform publishes port 5000. The 128 MiB proxy bridges that and forwards the proto headers WordPress needs behind TLS.',
    },
  ],
};
