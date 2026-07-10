import type { AppBase } from './index';

export const pocketbase: AppBase = {
  slug: 'pocketbase',
  name: 'PocketBase',
  upstream: 'PocketBase',
  upstreamUrl: 'https://pocketbase.io',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'An entire backend in one container: SQLite, auth, realtime, file storage, and an admin UI. The simplest stack in the catalogue.',
  category: 'Backend Platforms',
  status: 'stable',
  seoTitle: 'Self-host PocketBase: backend-in-one-file with Docker Compose',
  seoDescription:
    'Deploy PocketBase - SQLite database, authentication, realtime subscriptions, file storage and admin dashboard in a single container - in one step for $5/month flat.',
  keywords: [
    'self-host pocketbase',
    'pocketbase docker compose',
    'pocketbase hosting',
    'firebase alternative lightweight',
    'pocketbase production deploy',
    'sqlite backend',
  ],
  intro: [
    'PocketBase is the antidote to backend over-engineering: one Go binary embedding SQLite, user auth (email + OAuth2), realtime subscriptions, file storage, and a genuinely good admin dashboard. For side projects, MVPs, and a surprising number of production apps, it is all the backend there is to need.',
    'This is the simplest template in the catalogue - one service, one 2 GB volume. The admin UI lives at /_/ on your app domain; create the first superuser on first visit. SQLite and uploads persist on the volume across redeploys.',
    'SQLite is single-writer, so this scales up (more RAM, the volume grows with you), not out - keep replicas at 1. That constraint is also why it is so famously fast and simple to operate.',
  ],
  features: [
    'Auth with email/password and OAuth2 providers, out of the box',
    'Realtime subscriptions over SSE - live data without extra infrastructure',
    'File uploads with thumbnails, stored on the volume',
    'Admin dashboard for collections, rules, users, and logs',
    'Extensible with JS hooks or as a Go framework',
    'JS and Dart SDKs for web, mobile, and desktop apps',
  ],
  topology: [
    { service: 'pocketbase', role: 'entire backend (API + admin UI at /_/)', isPublic: 'yes' },
  ],
  requiredVars: [],
  ramMiB: 512,
  diskGB: 2,
  services: 1,
  sizingNote:
    '512 MiB is plenty - PocketBase routinely serves thousands of concurrent users on less. Grow the volume as uploads accumulate; keep replicas at 1 (SQLite is single-writer).',
  faq: [
    {
      q: 'Is PocketBase production-ready?',
      a: 'For small-to-medium apps, yes - it is a single Go binary on SQLite with WAL mode, and real products run on it. Its honest ceiling is write concurrency: one writer at a time. Read-heavy apps with moderate writes are its sweet spot.',
    },
    {
      q: 'What does PocketBase hosting cost?',
      a: 'This template fits the $5/month 512 MiB Miget hobby plan - the cheapest full backend in the catalogue. Compare that with Firebase, where auth + database + storage costs scale per-use and per-MAU as you grow.',
    },
    {
      q: 'Why is there no required configuration?',
      a: 'PocketBase bootstraps itself: deploy, open https://your-domain/_/, create the first superuser, done. Do it promptly after deploying - until a superuser exists, anyone with the URL could claim it.',
    },
    {
      q: 'Can PocketBase scale horizontally?',
      a: 'No - SQLite is single-writer, so keep replicas at 1 and scale vertically (more RAM/CPU). If you outgrow it, the Supabase template in this catalogue is the structurally similar next step on Postgres.',
    },
  ],
};
