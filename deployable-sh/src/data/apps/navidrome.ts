import type { AppBase } from './index';

export const navidrome: AppBase = {
  slug: 'navidrome',
  name: 'Navidrome',
  upstream: 'Navidrome',
  upstreamUrl: 'https://www.navidrome.org',
  license: 'GPL-3.0',
  licenseTier: 'copyleft',
  tagline: 'Your own Subsonic music streaming server - one container, your library, no monthly rental.',
  category: 'Media',
  status: 'stable',
  seoTitle: 'Self-host Navidrome: stream your own music library',
  seoDescription:
    'Deploy Navidrome - a fast, modern, Subsonic/OpenSubsonic-compatible music server - in one container for $13/month. Stream from Symfonium, play:Sub, or the web player. Own your library instead of renting it.',
  keywords: [
    'self-host navidrome',
    'navidrome docker compose',
    'spotify alternative self-hosted',
    'subsonic server',
    'plex music alternative',
    'self-hosted music streaming',
  ],
  intro: [
    'Navidrome turns a folder of music into a streaming service that is entirely yours: a fast, modern web player plus full Subsonic and OpenSubsonic compatibility, so any of the dozens of Subsonic apps (Symfonium, play:Sub, DSub, Feishin, Amperfy) stream straight from your instance.',
    'It is a single Go container with an embedded SQLite database - it idles in about 130 MB and scans your library on a schedule, reading ID3/FLAC tags, cover art, and ReplayGain. No external database, no queue, nothing else to run.',
    'Because it reads real audio files and their tags, the library lives on a filesystem volume rather than object storage - point Navidrome at the volume, upload your collection, and resize it to fit.',
  ],
  features: [
    'Subsonic / OpenSubsonic API - works with every major client',
    'Fast modern web player with transcoding and playlists',
    'Embedded SQLite - no external database to manage',
    'Multi-user, smart playlists, scrobbling to Last.fm / ListenBrainz',
    'Scheduled library scans (tags, art, ReplayGain)',
    'GPLv3, ~130 MB idle, single container',
  ],
  topology: [
    { service: 'navidrome', role: 'music server + web player (:5000)', isPublic: 'yes' },
    { service: 'music volume', role: 'your library (filesystem, single-writer)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: '(none)', what: 'first account created in the web UI becomes admin' },
  ],
  ramMiB: 512,
  diskGB: 52,
  services: 1,
  sizingNote: 'CPU only matters during transcoding; 512 MiB is comfortable. The 50 GB music volume is the variable - resize it to your collection. Keep replicas at 1 (single-writer library).',
  faq: [
    {
      q: 'How does this compare to Spotify or Apple Music?',
      a: 'Spotify is $12.99/month and Apple Music $10.99 - perpetual rentals where the catalogue (and your access) can change underneath you. Navidrome is a $13/month plan streaming a library you own outright, with no ads and no algorithm.',
    },
    {
      q: 'What about Plex Pass?',
      a: 'Plex Pass is $6.99/month, and its lifetime option jumps to $749.99 on July 1, 2026. Navidrome is a focused music server with open Subsonic clients and no upsell - you keep the files and the player.',
    },
    {
      q: 'Why does my music need a volume instead of a Bucket?',
      a: 'Navidrome reads audio tags and art directly off the filesystem to build its index, so the library lives on an RWO volume. Only the SQLite database and cache need to persist beyond that, and they ride a small second volume.',
    },
  ],
};
