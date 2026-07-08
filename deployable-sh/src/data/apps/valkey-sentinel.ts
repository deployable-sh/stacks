import type { AppBase } from './index';

export const valkeySentinel: AppBase = {
  slug: 'valkey-sentinel',
  name: 'Valkey Sentinel',
  upstream: 'Valkey',
  upstreamUrl: 'https://valkey.io',
  license: 'BSD-3-Clause',
  licenseTier: 'permissive',
  tagline: 'Highly-available Valkey with automatic failover - one master, two replicas, three sentinels. BSD.',
  category: 'Caches & Key-Value',
  status: 'stable',
  seoTitle: 'Self-host Valkey Sentinel (HA failover) on Miget',
  seoDescription:
    'Deploy a Valkey Sentinel HA topology - one master, two replicas, three sentinels - with automatic failover. BSD-licensed, Redis-protocol compatible. Sentinel clients route to the current master.',
  keywords: [
    'self-host valkey sentinel',
    'valkey high availability',
    'valkey automatic failover',
    'valkey sentinel docker compose',
    'redis sentinel alternative bsd',
    'valkey ha self-hosted',
  ],
  intro: [
    'Valkey Sentinel brings high availability to Valkey using the same battle-tested design as Redis Sentinel: sentinels watch the master and promote a replica automatically if it fails. This template runs one master, two replicas, and three sentinels (quorum 2). BSD-licensed and Redis-protocol compatible.',
    'One image plays all three roles, selected by an environment variable; the entrypoint generates each command and the sentinel config from env, with hostname resolution so failover reports a DNS-resolvable address on a multi-pod network.',
    'Clients connect through Sentinel - existing Redis Sentinel client libraries work unchanged, asking a sentinel for the current master and following failovers transparently.',
  ],
  features: [
    'Automatic failover with replica promotion',
    'One master, two replicas, three sentinels (quorum 2)',
    'Hostname-based discovery for multi-pod networks',
    'Existing Redis Sentinel clients work unchanged',
    'All internal-only, password-protected',
    'BSD-3-Clause licensed',
  ],
  topology: [
    { service: 'valkey-master', role: 'primary (:6379)', isPublic: 'no (internal)' },
    { service: 'valkey-replica-1/2', role: 'replicas (failover targets)', isPublic: 'no' },
    { service: 'valkey-sentinel-1/2/3', role: 'monitors + electors (:26379)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'VALKEY_PASSWORD', what: 'shared by master, replicas, and sentinel auth' },
  ],
  ramMiB: 1920,
  diskGB: 15,
  services: 6,
  sizingNote: 'Master and replicas hold the dataset in memory; sentinels are tiny. Six services, all internal. For sharding instead of failover, see valkey-cluster.',
  faq: [
    {
      q: 'Sentinel or Cluster?',
      a: 'Sentinel gives failover HA for a dataset that fits on one node. valkey-cluster shards across multiple masters when one node is not enough. Many teams only need Sentinel.',
    },
    {
      q: 'Is it compatible with Redis Sentinel clients?',
      a: 'Yes. Valkey implements the same Sentinel protocol, so libraries written for Redis Sentinel connect to the valkey-sentinel-* nodes with master name "mymaster" unchanged.',
    },
    {
      q: 'What does this save vs managed HA caches?',
      a: 'Managed HA Redis/Valkey (ElastiCache Multi-AZ, Redis Cloud, Aiven) bills per node per month plus transfer. This is one flat plan on your own infrastructure for the whole topology.',
    },
  ],
};
