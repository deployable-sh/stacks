import type { AppBase } from './index';

export const nats: AppBase = {
  slug: 'nats',
  name: 'NATS Cluster',
  upstream: 'NATS',
  upstreamUrl: 'https://nats.io',
  tagline: '3-node cloud-native messaging - pub/sub, request/reply, and JetStream streams - at ~30 MB per node.',
  category: 'Streaming & Messaging',
  status: 'stable',
  seoTitle: 'Self-host a NATS cluster with Docker Compose',
  seoDescription:
    'Deploy a 3-node NATS cluster with JetStream persistence - flag-driven clustering on the stock image - in one step for $13/month. The lightest messaging system there is.',
  keywords: [
    'self-host nats',
    'nats cluster docker compose',
    'nats jetstream setup',
    'lightweight message broker',
    'nats vs kafka',
    'cloud native messaging',
  ],
  intro: [
    'NATS is messaging stripped to its fast, essential core: subject-based pub/sub, request/reply, and - via JetStream - persistent streams, work queues, and key-value/object stores. It is astonishingly light (tens of megabytes per node) and astonishingly quick, which is why it underpins so much cloud-native infrastructure.',
    'This template runs a 3-node cluster on the stock image, configured entirely with command flags (the same no-custom-build approach as the mongodb replica set). All three nodes share one all-peers routes list - NATS ignores its own self-route - so the mesh forms by gossip with no seed asymmetry, and JetStream replicates across all three.',
    'Internal-only by design: it speaks raw TCP on 4222, and apps in the project connect there directly.',
  ],
  features: [
    'Pub/sub, request/reply, and queue groups',
    'JetStream: persistent streams, work queues, KV and object stores',
    '3-node cluster via flags - stock image, no custom build',
    'Replication factor 3 across per-node volumes',
    'Monitoring endpoint + health checks on :8222',
    'Apache-2.0; ~30 MB per node',
  ],
  topology: [
    { service: 'nats-0..2', role: 'cluster nodes (client :4222, cluster :6222, monitor :8222)', isPublic: 'no' },
  ],
  requiredVars: [],
  ramMiB: 768,
  diskGB: 15,
  services: 3,
  sizingNote: 'Nodes idle in tens of megabytes; 256 MiB each is generous. JetStream volume size is the dial - raise it as streams retain more.',
  faq: [
    {
      q: 'NATS, Kafka, or RabbitMQ?',
      a: 'NATS for low-latency cloud-native messaging and lightweight persistent streams with the smallest footprint; Kafka/Redpanda for high-throughput, long-retention event logs; RabbitMQ for classic AMQP work queues with mature routing. All are in this catalogue - NATS is the one you reach for when simplicity and latency matter most.',
    },
    {
      q: 'Is JetStream production-ready in this setup?',
      a: 'Yes - three nodes give JetStream a quorum for replication-factor-3 streams, surviving any single node loss. Each node persists to its own volume; declare streams with R3 and writes are durable across the cluster.',
    },
    {
      q: 'How do apps connect?',
      a: 'From the same project: nats://nats-0:4222 (any node accepts connections; list all three for failover). The client port is raw TCP and never exposed publicly. Add --user/--pass flags if you need auth.',
    },
  ],
};
