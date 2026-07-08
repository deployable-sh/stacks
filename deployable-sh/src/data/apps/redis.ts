import type { AppBase } from './index';

export const redis: AppBase = {
  slug: 'redis',
  name: 'Redis',
  upstream: 'Redis',
  upstreamUrl: 'https://redis.io',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  licenseNote: 'Redis 8 relicensed to AGPL; Valkey is the BSD-3 drop-in',
  tagline: 'The in-memory data store - cache, queues, pub/sub, streams - as a single password-protected node.',
  category: 'Caches & Key-Value',
  status: 'stable',
  seoTitle: 'Self-host Redis (standalone) on Miget',
  seoDescription:
    'Run a standalone, password-protected Redis with append-only persistence as an internal service. Cache, queues, pub/sub, and data structures on your own infrastructure for a flat plan.',
  keywords: [
    'self-host redis',
    'redis docker compose',
    'redis standalone',
    'elasticache alternative',
    'redis cache self-hosted',
    'redis miget',
  ],
  intro: [
    'Redis is the in-memory data store that powers caching, job queues, pub/sub, rate-limiting, sessions, leaderboards, and streams across a huge share of modern apps. This template is a single node, password-protected, with append-only persistence on a volume.',
    'It runs internal-only on Miget: other services in the same project connect at redis:6379 over the private network. A thin wrapper reads the password from the environment at start, so the secret is never baked into the image.',
    'Miget also offers managed Valkey (a Redis-compatible drop-in) as an addon - reach for that when you just want a cache wired to an app. Run this when you want to own and tune Redis yourself, or step up to the sentinel (failover) and cluster (sharding) templates.',
  ],
  features: [
    'Cache, queues, pub/sub, streams, and rich data structures',
    'Password-protected, append-only persistence on a volume',
    'Internal-only - reached at redis:6379 on the private network',
    'Single node, ~tiny footprint',
    'Sentinel and Cluster variants available for HA / scale',
    'Redis 8 is AGPL-3.0',
  ],
  topology: [
    { service: 'redis', role: 'in-memory data store (:6379)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'REDIS_PASSWORD', what: 'requirepass secret (openssl rand -hex 24)' },
  ],
  ramMiB: 512,
  diskGB: 5,
  services: 1,
  sizingNote: 'Size RAM to your working set (Redis keeps data in memory); the volume only needs to hold the append-only file. A single node is not HA.',
  faq: [
    {
      q: 'Should I use this or managed Valkey?',
      a: 'For most apps, managed Valkey (a Redis-compatible addon) is less to operate. Use this Redis template when you specifically want Redis, full control of its configuration, or the Sentinel / Cluster topologies the managed addon does not expose.',
    },
    {
      q: 'What does this save vs ElastiCache?',
      a: 'AWS ElastiCache starts around $12+/node/month for the smallest instance and multiplies for HA, plus data transfer. This is one flat plan on your own infrastructure, with no per-node metering.',
    },
    {
      q: 'Is my data safe across restarts?',
      a: 'Append-only persistence is enabled and written to the volume, so data survives restarts. For real high availability (automatic failover), use the redis-sentinel template; a single node still has a single point of failure.',
    },
  ],
};
