import type { AppBase } from './index';

export const valkeyCluster: AppBase = {
  slug: 'valkey-cluster',
  name: 'Valkey Cluster',
  upstream: 'Valkey',
  upstreamUrl: 'https://valkey.io',
  license: 'BSD-3-Clause',
  licenseTier: 'permissive',
  tagline: 'Sharded, horizontally-scaled Valkey - 3 master shards + 3 replicas, keyspace partitioned. BSD.',
  category: 'Caches & Key-Value',
  status: 'experimental',
  seoTitle: 'Self-host Valkey Cluster (sharded) on Miget',
  seoDescription:
    'Deploy Valkey Cluster - 6 nodes (3 masters + 3 replicas) with the keyspace sharded and a one-shot init that forms the cluster. BSD-licensed, Redis-protocol compatible, for scaling beyond one node.',
  keywords: [
    'self-host valkey cluster',
    'valkey cluster docker compose',
    'valkey sharding',
    'redis cluster alternative bsd',
    'valkey horizontal scaling',
    'valkey cluster miget',
  ],
  intro: [
    'Valkey Cluster shards the keyspace across multiple master nodes for horizontal scale - the same design as Redis Cluster, BSD-licensed and Redis-protocol compatible. This template runs six nodes (three masters + three replicas) and a one-shot init that forms the cluster.',
    'Nodes announce their service hostname so clients and redirects use DNS instead of raw pod IPs; the forming init is idempotent. Use it when a single node`s RAM or throughput is not enough.',
    'For failover of a single dataset without sharding, valkey-sentinel is simpler; for one node, use valkey. Existing Redis Cluster client libraries work unchanged.',
  ],
  features: [
    'Automatic sharding across 3 master shards',
    '6 nodes (3 masters + 3 replicas) + forming init',
    'Hostname-announced nodes for DNS-based routing',
    'Redis Cluster clients work unchanged',
    'All internal-only, password-protected',
    'BSD-3-Clause licensed',
  ],
  topology: [
    { service: 'valkey-node-1..6', role: '3 masters + 3 replicas (:6379)', isPublic: 'no (internal)' },
    { service: 'valkey-init', role: 'forms the cluster once, then exits', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'VALKEY_PASSWORD', what: 'shared by every node and the init' },
  ],
  ramMiB: 3200,
  diskGB: 30,
  services: 7,
  sizingNote: 'Six in-memory nodes - size RAM to the total dataset across 3 shards plus replicas. Experimental: like all cluster modes it expects stable node identity on a per-pod platform.',
  faq: [
    {
      q: 'How does it relate to Redis Cluster?',
      a: 'Valkey Cluster is the same sharding design and wire protocol, under the permissive BSD license. Redis Cluster client libraries connect to the valkey-node-* services unchanged.',
    },
    {
      q: 'Why experimental?',
      a: 'Cluster mode expects stable node identities and is sensitive to address changes on per-pod platforms. Nodes announce service hostnames so routing uses DNS, but a pod IP change can require a re-meet - a power-user topology.',
    },
    {
      q: 'Cluster or Sentinel?',
      a: 'Cluster shards for scale; Sentinel (valkey-sentinel) gives failover HA for a single dataset. Choose Cluster only when one node cannot hold the data or serve the throughput.',
    },
  ],
};
