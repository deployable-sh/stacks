import type { AppBase } from './index';

export const jellyfin: AppBase = {
  slug: 'jellyfin',
  name: 'Jellyfin',
  upstream: 'Jellyfin',
  upstreamUrl: 'https://jellyfin.org',
  license: 'GPL-2.0',
  licenseTier: 'copyleft',
  tagline: 'The free media server - stream your movies, TV, and music to any device. Plex without the paywall.',
  category: 'Media',
  status: 'stable',
  seoTitle: 'Self-host Jellyfin: the free media server',
  seoDescription:
    'Deploy Jellyfin - stream your own movies, TV, music, and photos to every device with no subscription and no tracking. A single self-contained container; a Plex / Emby alternative you fully own.',
  keywords: [
    'self-host jellyfin',
    'jellyfin docker compose',
    'plex alternative self-hosted',
    'emby alternative',
    'self-hosted media server',
    'jellyfin miget',
  ],
  intro: [
    'Jellyfin is the free, self-hosted media server: stream your movies, TV shows, music, and photos to a web player and native apps on practically every device, with no subscription, no account upsell, and no telemetry. It is the community alternative to Plex and Emby.',
    'It is a single self-contained container with an embedded SQLite database, so there is nothing else to run. Jellyfin only sets its HTTP port through network.xml, so this template uses a thin wrapper that seeds port 5000 on first boot (and never touches it again, so changes you make in the UI stick).',
    'The honest caveat is transcoding: a PaaS does not pass through a GPU, so transcoding is CPU-only. Direct-play - when the client can play the source file as-is - uses almost no CPU and is the happy path; heavy on-the-fly transcoding costs roughly a core per stream, so size the plan or prefer compatible clients.',
  ],
  features: [
    'Stream movies, TV, music, and photos to every device',
    'Web player plus native apps (Android, iOS, TV, Kodi, Roku)',
    'Live TV / DVR, subtitles, and user profiles',
    'Single container, embedded SQLite - nothing else to run',
    'No subscription, no paywalled features, no tracking',
    'GPL-2.0; port-5000 wrapper (network.xml seed)',
  ],
  topology: [
    { service: 'jellyfin', role: 'media server + web player (:5000)', isPublic: 'yes' },
    { service: 'volumes', role: 'config + cache + media library (filesystem)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: '(none)', what: 'first account created on first visit becomes admin' },
    { name: 'PUBLISHED_SERVER_URL', what: 'optional: the https domain for client auto-discovery' },
  ],
  ramMiB: 2048,
  diskGB: 115,
  services: 1,
  sizingNote: 'Direct-play idles near zero; budget ~1 CPU core per 1080p software transcode. The 100 GB media volume is the variable - resize it to your library. Keep replicas at 1 (SQLite + library).',
  faq: [
    {
      q: 'What does this save vs Plex or streaming services?',
      a: 'Plex keeps moving features behind Plex Pass ($6.99/month, lifetime jumping to $749.99 on Jul 1 2026), and Netflix-style services rent you a rotating catalogue. Jellyfin is one plan streaming a library that is entirely yours, with every feature included.',
    },
    {
      q: 'Can it transcode without a GPU?',
      a: 'Yes, in software, but a 1080p transcode uses roughly a full CPU core. Direct-play (a client that supports the source format) avoids transcoding entirely and is the recommended path on a PaaS, where GPU passthrough is not available.',
    },
    {
      q: 'Why does it need a wrapper for port 5000?',
      a: 'Jellyfin reads its listen port from network.xml, not an env var or flag. The thin wrapper seeds network.xml with port 5000 on first boot only, so it lands on Miget’s public port without clobbering any port change you make later in the UI.',
    },
  ],
};
