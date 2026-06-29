import type { AppBase } from './index';

export const audiobookshelf: AppBase = {
  slug: 'audiobookshelf',
  name: 'AudioBookshelf',
  upstream: 'AudioBookshelf',
  upstreamUrl: 'https://www.audiobookshelf.org',
  tagline: 'Your own audiobook and podcast server - native apps, progress sync, one container. Audible you own.',
  category: 'Media',
  status: 'stable',
  seoTitle: 'Self-host AudioBookshelf: audiobook and podcast server',
  seoDescription:
    'Deploy AudioBookshelf - a self-hosted audiobook and podcast server with native apps, offline playback, and progress sync - as one container. Own your listening library instead of renting it.',
  keywords: [
    'self-host audiobookshelf',
    'audiobookshelf docker compose',
    'audible alternative self-hosted',
    'self-hosted audiobook server',
    'podcast server self-hosted',
    'audiobookshelf miget',
  ],
  intro: [
    'AudioBookshelf is a self-hosted server for audiobooks and podcasts: a clean web player, native iOS and Android apps with offline downloads and progress sync, multi-user libraries, bookmarks, sleep timers, and built-in podcast search and auto-download. A single container with an embedded SQLite database.',
    'PORT moves it straight onto Miget’s public port - no wrapper, no external database, nothing else to run. Point it at your audio on the library volumes and it scans, organizes, and serves them.',
    'It is the antidote to renting your listening: Audible licenses you access that can be revoked, and podcast apps upsell subscriptions. AudioBookshelf serves a library you own, to every device, for the price of one small plan.',
  ],
  features: [
    'Audiobooks and podcasts in one server',
    'Native iOS / Android apps with offline playback and sync',
    'Multi-user libraries, bookmarks, sleep timers',
    'Podcast search, subscriptions, and auto-download',
    'Single container, embedded SQLite - clean PORT=5000 fit',
    'GPL-3.0, ~no external dependencies',
  ],
  topology: [
    { service: 'audiobookshelf', role: 'audio server + web player (:5000)', isPublic: 'yes' },
    { service: 'volumes', role: 'config + metadata + audiobooks + podcasts', isPublic: 'no' },
  ],
  requiredVars: [
    { name: '(none)', what: 'first account created on first visit becomes admin' },
  ],
  ramMiB: 512,
  diskGB: 77,
  services: 1,
  sizingNote: 'Light on RAM (512 MiB is plenty); CPU only matters during the occasional transcode. The audiobooks volume is the variable - resize to your library. Keep replicas at 1 (SQLite).',
  faq: [
    {
      q: 'What does this save vs Audible?',
      a: 'Audible is about $14.95/month for one credit, and you only license listening rights that can change. AudioBookshelf is one ~$13/month plan serving a library you own outright, across every device.',
    },
    {
      q: 'Does it handle podcasts too?',
      a: 'Yes - search for and subscribe to podcasts, auto-download new episodes, and track progress alongside your audiobooks. It is a single server for both, with one app on your phone.',
    },
    {
      q: 'Is it really just one container?',
      a: 'Yes. AudioBookshelf embeds SQLite and bundles ffmpeg, so there is no external database or worker. Set PORT=5000 and point it at your audio volumes - that is the whole deploy.',
    },
  ],
};
