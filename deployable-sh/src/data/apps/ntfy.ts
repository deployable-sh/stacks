import type { AppBase } from './index';

export const ntfy: AppBase = {
  slug: 'ntfy',
  name: 'ntfy',
  upstream: 'ntfy',
  upstreamUrl: 'https://ntfy.sh',
  license: 'Apache-2.0 / GPL-2.0',
  licenseTier: 'copyleft',
  licenseNote: 'dual-licensed',
  tagline: 'Push notifications as an HTTP primitive - curl a topic, every subscribed phone buzzes. $5/month, private.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host ntfy: push notifications via HTTP',
  seoDescription:
    'Deploy ntfy - push notifications to phones and browsers via simple HTTP PUT, with private topics and declarative users - in one step for $5/month.',
  keywords: [
    'self-host ntfy',
    'ntfy docker compose',
    'push notifications self-hosted',
    'pushover alternative',
    'ntfy auth setup',
    'server notifications phone',
  ],
  intro: [
    'The best notification API is the one every tool already speaks: HTTP. ntfy turns a PUT request into a push notification - curl -d "backup done" https://your-domain/alerts - delivered to the iOS/Android apps and browsers subscribed to that topic, with priorities, attachments, and action buttons.',
    'This template ships the secure posture by default: deny-all access with declarative bcrypt users in env (no CLI ceremony), so topics on your public domain are private from the first second. Everything in your project becomes a notifier - deploy scripts, uptime-kuma, changedetection, cron jobs.',
  ],
  features: [
    'Notify via plain HTTP PUT/POST - every language, zero SDKs',
    'iOS/Android apps + web; priorities, attachments, action buttons',
    'Private by default: deny-all + declarative bcrypt users in env',
    'Message cache and attachment storage on small volumes',
    'One tiny Go binary, Apache-2.0',
  ],
  topology: [{ service: 'ntfy', role: 'notification server + web UI (:5000)', isPublic: 'yes (auth: deny-all default)' }],
  requiredVars: [
    { name: 'NTFY_AUTH_USERS', what: 'declarative users (name:bcryptHash:role)' },
    { name: 'NTFY_BASE_URL', what: 'the app’s https domain' },
  ],
  ramMiB: 256,
  diskGB: 2,
  services: 1,
  sizingNote: 'A Go binary that idles in tens of megabytes - 256 MiB is generous. The cache volume bounds message/attachment history.',
  faq: [
    {
      q: 'Why self-host instead of using ntfy.sh?',
      a: 'The public server is great for casual use, but topics are guess-protected, reserved names cost a subscription, and your alert content transits someone else’s box. Self-hosted: deny-all auth, your domain, unlimited topics, $5/month.',
    },
    {
      q: 'How do my apps and templates send to it?',
      a: 'One HTTP request with basic auth or a token: curl -u user:pass -d "message" https://domain/topic. uptime-kuma and changedetection in this catalogue both have ntfy notification targets built in - point them at the in-project hostname.',
    },
    {
      q: 'How do phones receive instantly?',
      a: 'The Android app keeps a connection to your server (or uses its battery-friendly websocket mode); iOS uses a relay for wake-ups with content fetched from your server. Both are in the official app stores.',
    },
  ],
};
