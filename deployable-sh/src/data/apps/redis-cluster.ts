import type { AppBase } from './index';

export const redisCluster: AppBase = {
  slug: 'redis-cluster',
  name: 'Redis Cluster',
  upstream: 'Redis',
  upstreamUrl: 'https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  licenseNote: 'Redis 8',
  tagline: 'Sharded, horizontally-scaled Redis - 3 master shards + 3 replicas, keyspace partitioned automatically.',
  category: 'Caches & Key-Value',
  status: 'experimental',
  seoTitle: 'Self-host Redis Cluster (sharded) on Miget',
  seoDescription:
    'Deploy Redis Cluster - 6 nodes (3 masters + 3 replicas) with the keyspace sharded across masters and a one-shot init that forms the cluster. For when one node`s RAM or throughput is not enough.',
  keywords: [
    'self-host redis cluster',
    'redis cluster docker compose',
    'redis sharding',
    'redis horizontal scaling',
    'redis cluster self-hosted',
    'redis cluster miget',
  ],
  intro: [
    'Redis Cluster shards your keyspace across multiple master nodes, so capacity and throughput scale horizontally instead of being capped by a single node. This template runs six nodes - three master shards, each with one replica - and a one-shot init that forms the cluster (verified locally: cluster_state ok, all 16384 slots covered).',
    'Each node announces its service hostname (cluster-announce-hostname + hostname endpoints) so clients and cross-slot redirects use DNS rather than raw pod IPs. The init waits for every node, then forms the cluster once and is idempotent on re-run.',
    'Use this when a single node is not enough. If you only need failover of one dataset (no sharding), redis-sentinel is simpler; for a single node, use redis.',
  ],
  features: [
    'Automatic sharding across 3 master shards',
    '6 nodes (3 masters + 3 replicas) + one-shot forming init',
    'Hostname-announced nodes for DNS-based routing',
    'Scales capacity and throughput beyond one node',
    'All internal-only, password-protected',
    'Redis 8 is AGPL-3.0',
  ],
  topology: [
    { service: 'redis-node-1..6', role: '3 masters + 3 replicas (:6379)', isPublic: 'no (internal)' },
    { service: 'redis-init', role: 'forms the cluster once, then exits', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'REDIS_PASSWORD', what: 'shared by every node and the init' },
  ],
  ramMiB: 3200,
  diskGB: 30,
  services: 7,
  sizingNote: 'Six in-memory nodes - size RAM to total dataset divided across 3 shards (plus replicas). Experimental: Cluster expects stable node identity, and a pod IP change can require a re-meet.',
  faq: [
    {
      q: 'Why is it experimental?',
      a: 'Redis Cluster assumes stable node identities and is finicky on any per-pod platform. This template announces service hostnames so routing uses DNS, and it forms cleanly (smoke-tested), but a pod IP change can still need the cluster to re-meet. Treat it as a power-user topology.',
    },
    {
      q: 'Do my clients need changes?',
      a: 'Clients must be cluster-aware (ioredis, redis-py, Lettuce, go-redis all have a cluster mode). They connect to any node at redis-node-1:6379 and follow MOVED/ASK redirects to the owning shard automatically.',
    },
    {
      q: 'Cluster or Sentinel?',
      a: 'Cluster is for scale (sharding the keyspace across masters). Sentinel is for HA of a single dataset (failover, no sharding). If your data fits on one node, Sentinel is the simpler choice.',
    },
  ],
};
