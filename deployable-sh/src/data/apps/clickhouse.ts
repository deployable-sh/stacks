import type { AppBase } from './index';

export const clickhouse: AppBase = {
  slug: 'clickhouse',
  name: 'ClickHouse Cluster',
  upstream: 'ClickHouse',
  upstreamUrl: 'https://clickhouse.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    '3-node ClickHouse cluster - one shard, three replicas, embedded Keeper. Real replicated OLAP without ZooKeeper pods.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host ClickHouse: 3-node replicated cluster with Docker Compose',
  seoDescription:
    'Deploy a 3-node ClickHouse cluster (one shard, three replicas, embedded ClickHouse Keeper) in one step. Replicated MergeTree out of the box - compare cost vs ClickHouse Cloud.',
  keywords: [
    'self-host clickhouse',
    'clickhouse cluster docker compose',
    'clickhouse cloud alternative',
    'clickhouse replication setup',
    'olap database self-hosted',
    'clickhouse keeper',
  ],
  intro: [
    'ClickHouse is the open-source column store that made sub-second analytics over billions of rows ordinary. This template runs a real replicated cluster - one shard, three replicas - with ClickHouse Keeper embedded in the server nodes, so there are no separate ZooKeeper or Keeper pods to deploy and feed.',
    'Tables created ON CLUSTER main with the ReplicatedMergeTree engine replicate across all three nodes; any node can take writes and queries. Each node owns a 20 GB volume, and the whole cluster is internal-only - apps in the project connect to any node over HTTP (:8123) or the native protocol (:9000).',
    'One required variable (CLICKHOUSE_PASSWORD) and you have the analytics backend that ClickHouse Cloud meters by the compute-hour - at a flat monthly price.',
  ],
  features: [
    'One shard × three replicas with ReplicatedMergeTree - survive any single node loss',
    'Embedded ClickHouse Keeper: no ZooKeeper, no extra pods',
    'Cluster name main preconfigured for ON CLUSTER DDL',
    '20 GB per-node volumes; column compression stretches that a long way',
    'HTTP (:8123) and native (:9000) interfaces on every node',
    'Single required variable: CLICKHOUSE_PASSWORD',
  ],
  topology: [
    { service: 'ch-1..3', role: 'ClickHouse server + embedded Keeper (HTTP :8123, native :9000)', isPublic: 'no' },
  ],
  requiredVars: [{ name: 'CLICKHOUSE_PASSWORD', what: 'password for the app user on all nodes' }],
  ramMiB: 6144,
  diskGB: 60,
  services: 3,
  sizingNote:
    '2 GiB per node is a working floor for moderate analytics; ClickHouse respects container memory limits. Columnar compression typically fits hundreds of millions of rows in the 3×20 GB provisioned here.',
  faq: [
    {
      q: 'How does this compare to ClickHouse Cloud pricing?',
      a: 'ClickHouse Cloud bills compute per hour plus storage, which is excellent for spiky workloads but adds up for always-on ones. This cluster is a flat $49/month (8 GiB hobby plan) or $169/month Professional - predictable, with your data on your volumes.',
    },
    {
      q: 'Do I need ZooKeeper for ClickHouse replication?',
      a: 'No - coordination runs on ClickHouse Keeper, embedded inside the same three server nodes. You get replicated tables with zero extra processes to operate.',
    },
    {
      q: 'How do I create replicated tables?',
      a: "Use CREATE TABLE ... ON CLUSTER main with ENGINE = ReplicatedMergeTree. The cluster macro config is baked in, so the standard '/clickhouse/tables/{shard}/{table}' path templates just work.",
    },
    {
      q: 'Can ClickHouse replace my Postgres for analytics?',
      a: 'For append-heavy, aggregate-style workloads (events, logs, metrics, funnels) - emphatically yes, often 100× faster. Keep transactional row-level workloads in Postgres; ClickHouse is an OLAP engine, not an OLTP database.',
    },
  ],
};
