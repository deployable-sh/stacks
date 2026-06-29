import type { AppBase } from './index';

export const campfire: AppBase = {
  slug: 'campfire',
  name: 'Campfire',
  upstream: 'Campfire (37signals)',
  upstreamUrl: 'https://once.com/campfire',
  tagline: '37signals’ free group chat - rooms, DMs, files, search. Slack without the per-seat meter.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Campfire: 37signals’ free open-source team chat',
  seoDescription:
    'Deploy Campfire - the free, MIT-licensed group chat from the makers of Basecamp - as a single self-contained container with SQLite. A Slack alternative with full history on your own infrastructure.',
  keywords: [
    'self-host campfire',
    'campfire 37signals docker',
    'slack alternative self-hosted',
    'once campfire',
    'open source team chat',
    'campfire basecamp self-host',
  ],
  intro: [
    'Campfire is 37signals’ free group chat: rooms, direct messages, file sharing, full-text search, @mentions, sounds, and Web Push. It was the first ONCE app - originally a one-time paid product - and is now MIT-licensed and free.',
    'It is a single self-contained Rails container: web, background jobs, caching, and file serving all in one, fronted by Thruster and backed by SQLite. This template sets HTTP_PORT to 5000 and DISABLE_SSL=true (Miget terminates TLS), so there is no wrapper - messages and uploads live on one volume.',
    'Where Slack meters seats and quietly hides old messages behind paid history, Campfire keeps the entire conversation and all files on infrastructure you own, for the price of one small plan rather than a per-person monthly bill.',
  ],
  features: [
    'Rooms, DMs, file sharing, search, @mentions, sounds',
    'Web Push notifications (browser and mobile)',
    'Self-contained: web + jobs + cache + files in one container',
    'SQLite + uploads on a single volume',
    'Thruster front-end; HTTP_PORT=5000, no proxy wrapper',
    'MIT-licensed - the once-paid ONCE app, now free',
  ],
  topology: [
    { service: 'campfire', role: 'chat (web + jobs + files, :5000)', isPublic: 'yes' },
    { service: 'storage volume', role: 'SQLite + uploaded files', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'Rails secret (openssl rand -hex 64)' },
  ],
  ramMiB: 512,
  diskGB: 10,
  services: 1,
  sizingNote: 'The self-contained Rails app idles in 512 MiB; the Hobby plan covers a team. Size the volume to your message history and shared files. VAPID push keys auto-generate. Keep replicas at 1 (single SQLite file).',
  faq: [
    {
      q: 'Is Campfire still a paid product?',
      a: 'No. Campfire launched as a one-time paid ONCE purchase, but 37signals has since open-sourced it under the MIT license. It is now free to self-host - no purchase and no license server.',
    },
    {
      q: 'What does this save vs Slack or Teams?',
      a: 'Slack Pro is $8.75/user/month and meters message history; Microsoft Teams rides a Microsoft 365 subscription. Campfire is free software on one small Miget plan for the whole team, with full history and files kept on your own infrastructure.',
    },
    {
      q: 'Does it need a database or Redis container?',
      a: 'No. Campfire bundles web, background jobs, caching, and file serving into one container on SQLite - a genuinely single-service deploy. Everything persists on the storage volume.',
    },
  ],
};
