import type { AppBase } from './index';

export const uptimeKuma: AppBase = {
  slug: 'uptime-kuma',
  name: 'Uptime Kuma',
  upstream: 'Uptime Kuma',
  upstreamUrl: 'https://github.com/louislam/uptime-kuma',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'The beloved self-hosted uptime monitor - unlimited checks, 100+ notification providers, status pages - for $5/month.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Uptime Kuma: uptime monitoring with Docker Compose',
  seoDescription:
    'Deploy Uptime Kuma v2 - self-hosted uptime monitoring with unlimited monitors, status pages, and 100+ alert integrations - in one step for $5/month flat. The UptimeRobot alternative.',
  keywords: [
    'self-host uptime kuma',
    'uptime kuma docker compose',
    'uptimerobot alternative',
    'uptime monitoring self-hosted',
    'status page self-hosted',
    'uptime kuma v2',
  ],
  intro: [
    'Uptime Kuma is one of the most loved projects in self-hosting, and for a reason: it does one job - is my stuff up? - with a beautiful UI, sub-minute checks, and alerting to practically everything (Slack, Telegram, Discord, email, webhooks, PagerDuty, 100+ providers). Public status pages included.',
    'This template runs v2 (the slim image: no embedded Chromium or MariaDB) with SQLite on a small volume - one 512 MiB container that comfortably watches everything you run. Monitors, history, and settings persist across redeploys; the first-boot wizard creates your admin account.',
    'Hosted monitoring meters by monitor count - 10 here, 50 there, each tier a new invoice line. Kuma monitors as much as you like for the price of the container it runs in.',
  ],
  features: [
    'HTTP(S), TCP, ping, DNS, keyword, JSON-query and certificate checks',
    'Alerts to 100+ providers: Slack, Telegram, Discord, webhooks, SMTP, …',
    'Public status pages with custom domains and incident banners',
    'Sub-minute intervals, response-time charts, cert-expiry warnings',
    'Slim v2 image + SQLite: ~512 MiB does the whole job',
    'Swap to the full image for Chromium "real browser" monitors',
  ],
  topology: [
    { service: 'uptime-kuma', role: 'monitor + UI + status pages (:5000, websockets)', isPublic: 'yes' },
  ],
  requiredVars: [],
  ramMiB: 512,
  diskGB: 2,
  services: 1,
  sizingNote:
    'The slim image with SQLite is genuinely light - 512 MiB covers hundreds of monitors. Chromium-based browser checks need the full louislam/uptime-kuma:2 image and at least 1 GiB.',
  faq: [
    {
      q: 'How does this compare to UptimeRobot or Better Stack pricing?',
      a: 'UptimeRobot Solo is $8/month for 10 monitors; Better Stack adds $25/month per 50 monitors. Uptime Kuma on the $5/month plan has no monitor count at all - and the status pages, multi-location-style checks, and SMS-grade alerting (via your providers) come with it.',
    },
    {
      q: 'Can Uptime Kuma monitor my other apps in the same project?',
      a: 'Yes, two ways: over their public domains (the real user-facing check), or privately by service name (http://my-api:5000/health) for internal services that have no public ingress - something hosted monitors physically cannot do.',
    },
    {
      q: 'What is different in Uptime Kuma v2?',
      a: 'v2 is the current stable line (2.x since early 2026): a first-boot setup wizard, optional MariaDB backend, better performance at high monitor counts. This template uses the slim image with SQLite, which is the right default for almost everyone.',
    },
    {
      q: 'Does it work behind the platform ingress?',
      a: 'Yes - the UI runs over websockets, which the ingress passes through, and the app gets its own domain (Kuma does not support subpath hosting, so a dedicated domain is exactly the right shape). Turn on "Trust Proxy" in Settings for correct client IPs.',
    },
  ],
};
