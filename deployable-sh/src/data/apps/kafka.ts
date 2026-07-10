import type { AppBase } from './index';

export const kafka: AppBase = {
  slug: 'kafka',
  name: 'Apache Kafka',
  upstream: 'Apache Kafka',
  upstreamUrl: 'https://kafka.apache.org',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    '3-broker Apache Kafka cluster in KRaft mode (no ZooKeeper) with Kafbat UI - durable defaults, official images, env-only config.',
  category: 'Streaming & Messaging',
  status: 'stable',
  seoTitle: 'Self-host Apache Kafka: 3-node KRaft cluster with Docker Compose',
  seoDescription:
    'Deploy a production-shaped 3-broker Apache Kafka cluster (KRaft, no ZooKeeper) with Kafbat UI in one step. Replication factor 3, min.insync.replicas=2 out of the box. Compare cost vs Confluent Cloud and AWS MSK.',
  keywords: [
    'self-host kafka',
    'kafka docker compose',
    'kafka kraft cluster',
    'managed kafka alternative',
    'confluent cloud alternative',
    'kafka cluster setup',
  ],
  intro: [
    'Apache Kafka is the de-facto standard event streaming platform - and one of the most expensive things to buy as a managed service. This template runs a real 3-node cluster in KRaft mode (combined broker+controller, no ZooKeeper) using the official apache/kafka image, configured entirely through environment variables. No custom images, no config files to maintain.',
    'Topic defaults are durable out of the box: replication factor 3 and min.insync.replicas=2, so a broker can die without losing acknowledged writes. Each broker keeps its log dirs on its own persistent volume. Kafbat UI ships as the public entrypoint for browsing topics, consumer groups, and messages - the brokers themselves stay private on the project network.',
    'Producers and consumers in the same Miget project connect with bootstrap servers kafka-1:9092,kafka-2:9092,kafka-3:9092 - no TLS/SASL gymnastics, the project network is the boundary.',
  ],
  features: [
    '3 combined broker+controller nodes in KRaft mode - no ZooKeeper to run or patch',
    'Official apache/kafka image, configured 100% via environment variables',
    'Durable defaults: replication factor 3, min.insync.replicas=2',
    'Kafbat UI for topics, consumer groups, lag and message inspection',
    'Per-broker persistent volumes (10 GB each)',
    'Runs identically with plain docker compose up on a laptop',
  ],
  topology: [
    { service: 'kafka-1..3', role: 'combined broker+controller (Kafka API :9092, KRaft :9093)', isPublic: 'no' },
    { service: 'kafka-ui', role: 'Kafbat UI web console', isPublic: 'yes (HTTP)' },
  ],
  requiredVars: [],
  ramMiB: 7168,
  diskGB: 30,
  services: 4,
  sizingNote:
    '2 GiB per broker covers a 1 GiB JVM heap plus page-cache headroom - Kafka loves page cache, so do not starve it. 10 GB disk per broker is a starting point; resize volumes as retention grows.',
  faq: [
    {
      q: 'How much does it cost to self-host Kafka vs Confluent Cloud or MSK?',
      a: 'This 3-broker cluster fits the 8 GiB Miget hobby plan at $49/month flat (or $85/month on a Professional plan). Managed Kafka typically starts around several hundred dollars a month for a comparable always-on 3-broker setup, before egress. The flat Miget plan also still has room for your producer/consumer apps.',
    },
    {
      q: 'Does this Kafka setup use ZooKeeper?',
      a: 'No. The cluster runs in KRaft mode - each node is a combined broker and controller, which is the supported, ZooKeeper-free architecture in modern Kafka. Fewer moving parts, fewer pods, faster controller failover.',
    },
    {
      q: 'Can a broker fail without data loss?',
      a: 'Yes, for acknowledged writes: topics default to replication factor 3 with min.insync.replicas=2, so the cluster tolerates one broker outage while still accepting produces with acks=all.',
    },
    {
      q: 'How do my applications connect to this Kafka cluster?',
      a: 'Apps deployed in the same Miget project use kafka-1:9092,kafka-2:9092,kafka-3:9092 as bootstrap servers - plain PLAINTEXT on the private project network. The brokers are never exposed to the internet; only the Kafbat UI gets a public domain.',
    },
    {
      q: 'Can I scale this cluster to more brokers?',
      a: 'Yes - add a kafka-4 service block (cluster nodes need stable identity and their own volume, so you scale by adding blocks, not replicas) and include it in the controller quorum voters list.',
    },
  ],
};
