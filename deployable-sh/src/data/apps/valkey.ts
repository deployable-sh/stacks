import type { AppBase } from './index';

export const valkey: AppBase = {
  slug: 'valkey',
  name: 'Valkey',
  upstream: 'Valkey',
  upstreamUrl: 'https://valkey.io',
  license: 'BSD-3-Clause',
  licenseTier: 'permissive',
  tagline: 'The BSD-licensed, Redis-compatible in-memory store - cache, queues, streams - as a single node.',
  category: 'Caches & Key-Value',
  status: 'stable',
  seoTitle: 'Self-host Valkey (standalone) on Miget',
  seoDescription:
    'Run a standalone, password-protected Valkey - the BSD-licensed Redis fork - as an internal service. Drop-in for Redis clients: caching, queues, pub/sub, and data structures on your own infrastructure.',
  keywords: [
    'self-host valkey',
    'valkey docker compose',
    'valkey standalone',
    'redis fork bsd',
    'valkey cache self-hosted',
    'valkey miget',
  ],
  intro: [
    'Valkey is the BSD-licensed, Redis-compatible in-memory data store, forked and stewarded by the Linux Foundation after Redis changed its license. It is a drop-in for Redis clients and protocols: caching, queues, pub/sub, streams, and data structures all work unchanged.',
    'This template is a single node, password-protected, with append-only persistence on a volume, running internal-only on Miget (apps connect at valkey:6379). A thin wrapper reads the password from the environment at start.',
    'Miget offers managed Valkey as an addon for hands-off use. Run this template when you want to operate Valkey yourself, pin a version, or move up to the sentinel (failover) and cluster (sharding) topologies.',
  ],
  features: [
    'Fully Redis-protocol compatible - clients work unchanged',
    'Cache, queues, pub/sub, streams, data structures',
    'Password-protected, append-only persistence on a volume',
    'Internal-only - reached at valkey:6379',
    'Sentinel and Cluster variants available for HA / scale',
    'BSD-3-Clause licensed',
  ],
  topology: [
    { service: 'valkey', role: 'in-memory data store (:6379)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'VALKEY_PASSWORD', what: 'requirepass secret (openssl rand -hex 24)' },
  ],
  ramMiB: 512,
  diskGB: 5,
  services: 1,
  sizingNote: 'Size RAM to your working set; the volume holds the append-only file. A single node is not HA - see valkey-sentinel for failover.',
  faq: [
    {
      q: 'How is Valkey different from Redis?',
      a: 'Valkey is the community fork created after Redis moved to a more restrictive license. It stays under the permissive BSD-3-Clause license and remains protocol-compatible, so existing Redis clients, libraries, and tooling work without changes.',
    },
    {
      q: 'Why run this if Miget has managed Valkey?',
      a: 'The managed addon is simpler for wiring a cache to an app. This template is for running Valkey yourself with full control, or for the Sentinel and Cluster topologies, which the managed addon does not provide.',
    },
    {
      q: 'Can I point Redis clients at it?',
      a: 'Yes. Valkey speaks the Redis protocol, so any Redis client or library connects to valkey:6379 the same way it would to Redis.',
    },
  ],
};
