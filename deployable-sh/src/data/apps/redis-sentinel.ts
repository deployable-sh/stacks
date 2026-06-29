import type { AppBase } from './index';

export const redisSentinel: AppBase = {
  slug: 'redis-sentinel',
  name: 'Redis Sentinel',
  upstream: 'Redis',
  upstreamUrl: 'https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/',
  tagline: 'Highly-available Redis with automatic failover - one master, two replicas, three sentinels.',
  category: 'Caches & Key-Value',
  status: 'stable',
  seoTitle: 'Self-host Redis Sentinel (HA failover) on Miget',
  seoDescription:
    'Deploy a Redis Sentinel HA topology - one master, two replicas, three sentinels - with automatic failover. Sentinel-aware clients are routed to the current master. Internal-only, one flat plan.',
  keywords: [
    'self-host redis sentinel',
    'redis high availability',
    'redis automatic failover',
    'redis sentinel docker compose',
    'redis ha self-hosted',
    'redis sentinel miget',
  ],
  intro: [
    'Redis Sentinel adds high availability to Redis: if the master goes down, the sentinels detect it, elect a new master from the replicas, and reconfigure the topology automatically. This template runs one master, two replicas, and three sentinels (quorum 2) - the standard HA layout.',
    'One image plays all three roles, selected by an environment variable; the entrypoint builds each node`s command and the sentinel config from env. Sentinels are configured to resolve hostnames (service DNS) rather than raw IPs, which is what makes failover report a usable address on a multi-pod network. Verified locally: the master sees both replicas and all three sentinels agree.',
    'Clients connect through Sentinel, not the master directly - a Sentinel-aware client (ioredis, redis-py, Lettuce, go-redis) asks a sentinel for the current master and is rerouted automatically on failover.',
  ],
  features: [
    'Automatic failover: replica promoted when the master dies',
    'One master, two replicas, three sentinels (quorum 2)',
    'Hostname-based discovery - works on a multi-pod network',
    'Transparent to Sentinel-aware clients',
    'All internal-only, password-protected',
    'Redis 8 is AGPL-3.0',
  ],
  topology: [
    { service: 'redis-master', role: 'primary (:6379)', isPublic: 'no (internal)' },
    { service: 'redis-replica-1/2', role: 'replicas (failover targets)', isPublic: 'no' },
    { service: 'redis-sentinel-1/2/3', role: 'monitors + electors (:26379)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'REDIS_PASSWORD', what: 'shared by master, replicas, and sentinel auth' },
  ],
  ramMiB: 1920,
  diskGB: 15,
  services: 6,
  sizingNote: 'Master and replicas hold the full dataset in memory (size accordingly); sentinels are tiny (128 MiB). Six services, all internal.',
  faq: [
    {
      q: 'When should I use Sentinel vs Cluster?',
      a: 'Sentinel gives you high availability (automatic failover) for a single dataset that fits on one node. Use redis-cluster instead when the data or throughput exceeds one node and you need sharding across multiple masters.',
    },
    {
      q: 'How do clients connect?',
      a: 'Through Sentinel, not the master directly. Point a Sentinel-aware client at redis-sentinel-1:26379, redis-sentinel-2:26379, redis-sentinel-3:26379 with master name "mymaster"; the client discovers the current master and follows failovers.',
    },
    {
      q: 'Does failover actually work on a PaaS?',
      a: 'Yes - the sentinels resolve service hostnames instead of pod IPs, so after a promotion they report a DNS name clients can reach. This template was smoke-tested locally: master with two connected replicas and three mutually-aware sentinels.',
    },
  ],
};
