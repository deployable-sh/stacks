import type { AppBase } from './index';

export const changedetection: AppBase = {
  slug: 'changedetection',
  name: 'changedetection.io',
  upstream: 'changedetection.io',
  upstreamUrl: 'https://changedetection.io',
  tagline: 'Watch any web page for changes - prices, stock, competitors - and get notified, for $5/month.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host changedetection.io: page change monitoring',
  seoDescription:
    'Deploy changedetection.io - monitor any web page for changes with filters, diffs, and 80+ notification targets - in one step for $5/month. The visualping/Distill alternative without per-check pricing.',
  keywords: [
    'self-host changedetection',
    'changedetection docker compose',
    'visualping alternative',
    'website change monitoring self-hosted',
    'price drop monitoring',
    'page change alerts',
  ],
  intro: [
    'Price drops, restocks, policy-page edits, competitor changes - the web changes and you want to know first. changedetection.io watches pages on your schedule, shows visual diffs with CSS/xpath filtering, and notifies through 80+ targets, including this catalogue’s ntfy template.',
    'Hosted page-watchers meter checks and pages per tier. Self-hosted, watch counts are yours: this single container (which happens to listen on :5000 natively - the catalogue’s easiest deploy) runs hundreds of watches in half a gigabyte. The honest scope note: JS-heavy pages upstream handle with a privileged Chrome sidecar a PaaS cannot run; the built-in fetcher covers most of the web.',
  ],
  features: [
    'Visual diffs with CSS/xpath/text filters per watch',
    'Notifications to 80+ targets (ntfy, Slack, email, webhooks)',
    'Per-watch schedules, request headers, and conditions',
    'Restock and price-drop detection helpers',
    'Single container, one volume, Apache-2.0',
  ],
  topology: [{ service: 'changedetection', role: 'watcher + UI (:5000)', isPublic: 'yes - set a UI password promptly' }],
  requiredVars: [{ name: 'BASE_URL', what: 'the app’s https domain (notification links)' }],
  ramMiB: 512,
  diskGB: 2,
  services: 1,
  sizingNote: 'Hundreds of watches fit here. Set the UI password in Settings on first visit - the interface ships open.',
  faq: [
    {
      q: 'What about JavaScript-heavy pages?',
      a: 'The built-in fetcher handles most sites. Fully JS-rendered pages need upstream’s Chrome sidecar, which requires privileges a PaaS sandbox does not grant - that single capability is honestly out of scope here, and the page says so rather than letting you find out.',
    },
    {
      q: 'How do notifications reach me?',
      a: 'Apprise under the hood: ntfy (the in-project template pairs perfectly), Slack, Discord, Telegram, SMTP, webhooks - per watch or global. BASE_URL makes the links in those notifications point at your domain.',
    },
    {
      q: 'How does this compare to hosted watchers?',
      a: 'Hosted services tier by pages watched and check frequency. Self-hosted, both are your call - the only meters are your RAM and politeness to the sites you watch.',
    },
  ],
};
