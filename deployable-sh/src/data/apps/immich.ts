import type { AppBase } from './index';

export const immich: AppBase = {
  slug: 'immich',
  name: 'Immich',
  upstream: 'Immich',
  upstreamUrl: 'https://immich.app',
  tagline: 'Self-hosted photos and video - a Google Photos alternative with real mobile apps, face and semantic search.',
  category: 'Media',
  status: 'experimental',
  seoTitle: 'Self-host Immich: the Google Photos alternative',
  seoDescription:
    'Deploy Immich - self-hosted photo and video management with iOS/Android apps, automatic backup, face recognition, and semantic search. Four self-contained services; your whole photo history on your own infrastructure.',
  keywords: [
    'self-host immich',
    'immich docker compose',
    'google photos alternative self-hosted',
    'icloud photos alternative',
    'self-hosted photo backup',
    'immich miget',
  ],
  intro: [
    'Immich is the self-hosted photo and video manager that finally feels like Google Photos: first-class iOS and Android apps, automatic phone backup, face recognition, smart and semantic search, albums, shared libraries, and a timeline - all on infrastructure you own.',
    'It is a four-service stack: the server (port 5000), a machine-learning worker for face detection and CLIP search, a Postgres built with the VectorChord vector extension (Immich’s own image - this is why it does not use Miget’s managed Postgres), and Valkey for the job queue. Photos live on a filesystem volume, not object storage, because the library layout and thumbnails need a real filesystem.',
    'It is flagged experimental for two honest reasons: it is heavy (~6-8 GB, the ML worker alone wants ~3 GB while loading models), and Immich ships fast-moving releases where major versions sometimes need a database migration. Pin upgrades and read the release notes. For a permanent home for your photos, that care is worth it.',
  ],
  features: [
    'Native iOS and Android apps with automatic backup',
    'Face recognition and CLIP-powered semantic search',
    'Albums, shared libraries, timeline, map view',
    'VectorChord Postgres + ML worker (self-contained, not managed pg)',
    'Library on a filesystem volume - your photos, your disk',
    'AGPL-3.0; four private/public services',
  ],
  topology: [
    { service: 'immich-server', role: 'API + web app (:5000)', isPublic: 'yes' },
    { service: 'immich-machine-learning', role: 'face + semantic search models', isPublic: 'no (private)' },
    { service: 'database / redis', role: 'VectorChord Postgres / Valkey', isPublic: 'no (private)' },
  ],
  requiredVars: [
    { name: 'DB_PASSWORD', what: 'shared by the server and the database (random string)' },
  ],
  ramMiB: 6400,
  diskGB: 120,
  services: 4,
  sizingNote: 'Give the stack at least 8 GB of RAM - the ML worker wants ~3 GB loading models, the server ~2 GB. The 100 GB library volume is the variable; resize it to your collection. Keep replicas at 1 (single-writer library).',
  faq: [
    {
      q: 'What does this save vs Google One or iCloud+?',
      a: 'Google One is $9.99/month for 2 TB and iCloud+ is $9.99 for 2 TB - both rent space and mine your library. Immich is one plan plus a volume sized to your photos, with your whole history entirely yours and exportable.',
    },
    {
      q: 'Why a special database instead of managed Postgres?',
      a: 'Immich requires Postgres with a vector extension (VectorChord) for face and semantic search, which is not a standard managed extension. So this template runs Immich’s own database image as a private sidecar with its own volume, rather than the managed Postgres other apps use.',
    },
    {
      q: 'Why is it experimental?',
      a: 'It is a heavy four-service stack and Immich releases move quickly - major versions can need a database migration. Everything is wired and validated, but you should pin versions and read release notes before upgrading, which is why it is not marked stable.',
    },
  ],
};
