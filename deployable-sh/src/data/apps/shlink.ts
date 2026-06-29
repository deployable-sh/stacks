import type { AppBase } from './index';

export const shlink: AppBase = {
  slug: 'shlink',
  name: 'Shlink',
  upstream: 'Shlink',
  upstreamUrl: 'https://shlink.io',
  tagline: 'Self-hosted URL shortener - short links on your domain, full REST API, analytics that are yours.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Shlink: open-source URL shortener',
  seoDescription:
    'Deploy Shlink - short links on your own domain with a REST API, QR codes, GeoIP visit analytics, and tags - on a managed Postgres. A Bitly alternative with unlimited links and no per-click metering.',
  keywords: [
    'self-host shlink',
    'shlink docker compose',
    'bitly alternative self-hosted',
    'url shortener open source',
    'branded short links',
    'short.io alternative',
  ],
  intro: [
    'Shlink is a self-hosted URL shortener with the features the paid services gate: short links on your own domain, a full REST API, QR codes, rich visit analytics (with optional GeoIP), tags, and device-based redirect rules. The server handles the redirects and exposes the API on port 5000.',
    'A managed Postgres holds every link and visit, so the app is stateless. Shlink ships no UI of its own - you drive it with the REST API, the CLI, or the Shlink Web Client (the official hosted client at app.shlink.io talks to your server from your browser, or self-host the client image).',
    'The value is in the metering: hosted shorteners cap links and clicks aggressively and charge to lift the caps. Shlink is one flat plan with unlimited links, your own branded domain, and the analytics sitting in a database you own.',
  ],
  features: [
    'Short links on your own custom domain',
    'Full REST API plus a CLI for automation',
    'QR codes, tags, and device/geo redirect rules',
    'Visit analytics with optional MaxMind GeoIP',
    'All link and visit data in managed Postgres - stateless app',
    'MIT licensed, unlimited links, no per-click billing',
  ],
  topology: [
    { service: 'shlink', role: 'redirects + REST API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'managed Postgres (links + visits)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'DEFAULT_DOMAIN', what: 'the short domain (the app’s https domain)' },
    { name: 'INITIAL_API_KEY', what: 'your first API key, created on startup' },
  ],
  ramMiB: 1536,
  diskGB: 5,
  services: 2,
  sizingNote: 'The RoadRunner-based server is happy in 512 MiB. Postgres holds links and visit rows, so size disk to your click volume and retention.',
  faq: [
    {
      q: 'What does this save vs Bitly or Short.io?',
      a: 'Bitly’s Core plan is $10/month for just 100 branded links a month, and Short.io and Dub meter the same way. Shlink is one ~$13/month plan with unlimited links, your own domain, and the analytics on your own infrastructure.',
    },
    {
      q: 'There is no admin UI in the container - how do I manage it?',
      a: 'Shlink is API-first. Use the REST API, the shlink-cli, or the Shlink Web Client - point the official hosted client at app.shlink.io (it runs in your browser against your server) or self-host the shlinkio/shlink-web-client image.',
    },
    {
      q: 'Do I get geographic visit stats?',
      a: 'Yes, if you set a free MaxMind GeoLite2 license key. Shlink then resolves visits to country and city and exposes the breakdown through the API and web client.',
    },
  ],
};
