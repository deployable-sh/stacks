import type { AppBase } from './index';

export const dawarich: AppBase = {
  slug: 'dawarich',
  name: 'Dawarich',
  upstream: 'Dawarich',
  upstreamUrl: 'https://dawarich.app',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline: 'Self-hosted location history - a Google Maps Timeline replacement that keeps your movements yours.',
  category: 'Productivity & PM',
  status: 'experimental',
  seoTitle: 'Self-host Dawarich: a Google Maps Timeline alternative',
  seoDescription:
    'Deploy Dawarich - import your location history from Google Takeout, OwnTracks, or GPX and explore your trips, visits, and stats on your own map. A privacy-first Google Maps Timeline replacement.',
  keywords: [
    'self-host dawarich',
    'dawarich docker compose',
    'google maps timeline alternative',
    'location history self-hosted',
    'owntracks self-hosted',
    'dawarich postgis',
  ],
  intro: [
    'Dawarich is a privacy-first replacement for Google Maps Timeline: import your location history from Google Takeout, OwnTracks, Overland, or GPX, and explore your trips, the places and cities and countries you have visited, and your travel stats on your own interactive map. None of it goes to Google.',
    'It is a four-service stack: the web app (port 5000), a Sidekiq worker for imports and reverse geocoding, a PostgreSQL database with the PostGIS extension, and Valkey. Because PostGIS is not a standard managed extension, the database runs as a private sidecar on the expected image (the same approach the immich template takes); Valkey is managed.',
    'It is flagged experimental because it is genuinely heavier than a single-container app - four services, a hard PostGIS dependency, and a worker that shares storage with the web app. Everything is wired and validated; just give it room and read the first-login notes.',
  ],
  features: [
    'Import from Google Takeout, OwnTracks, Overland, GPX',
    'Map of trips, visits, and the places you have been',
    'Travel stats: cities, countries, distance over time',
    'PostGIS database (private sidecar) + managed Valkey',
    'Web + Sidekiq worker from one image (role-selected)',
    'AGPL-3.0; your location history, entirely yours',
  ],
  topology: [
    { service: 'web', role: 'app + map UI (:5000)', isPublic: 'yes' },
    { service: 'sidekiq', role: 'imports / geocoding worker (private)', isPublic: 'no' },
    { service: 'db / redis', role: 'PostGIS sidecar / managed Valkey', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'Rails secret (openssl rand -hex 64)' },
    { name: 'DB_PASSWORD', what: 'the PostGIS database password' },
    { name: 'APPLICATION_HOSTS', what: 'the https domain - or Rails blocks every request' },
  ],
  ramMiB: 3584,
  diskGB: 32,
  services: 4,
  sizingNote: 'Give it ~4 GB: web and worker ~1 GB each, PostGIS ~1 GB. Imported tracks live in PostGIS and on the shared storage volume; the web and worker share storage (RWX).',
  faq: [
    {
      q: 'What does this replace?',
      a: 'Google Maps Timeline, which mines your every move. Dawarich keeps your entire location history on infrastructure you own, imported from the same Google Takeout export plus OwnTracks, Overland, and GPX.',
    },
    {
      q: 'Why a PostGIS sidecar instead of managed Postgres?',
      a: 'Dawarich needs the PostGIS spatial extension, which is not a standard managed-database feature. So the template runs Postgres with PostGIS as a private sidecar on its own volume, the same pattern the immich template uses for its specialized database.',
    },
    {
      q: 'Why is it marked experimental?',
      a: 'It is a four-service stack (web, worker, PostGIS, Valkey) around 4 GB, heavier than the catalogue’s single-container apps, and Dawarich moves quickly. Everything is wired and validated, but set APPLICATION_HOSTS correctly and read the first-login notes before relying on it.',
    },
  ],
};
