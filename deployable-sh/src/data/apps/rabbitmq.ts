import type { AppBase } from './index';

export const rabbitmq: AppBase = {
  slug: 'rabbitmq',
  name: 'RabbitMQ',
  upstream: 'RabbitMQ',
  upstreamUrl: 'https://www.rabbitmq.com',
  license: 'MPL-2.0',
  licenseTier: 'permissive',
  tagline:
    '3-node RabbitMQ 4.x cluster, quorum-queue ready, with the management UI - clusters itself on first boot.',
  category: 'Streaming & Messaging',
  status: 'stable',
  seoTitle: 'Self-host RabbitMQ: 3-node HA cluster with Docker Compose',
  seoDescription:
    'Deploy a 3-node RabbitMQ 4.x cluster (quorum-queue ready) in one step. Auto-clustering on first boot, management UI included. Compare cost vs CloudAMQP and Amazon MQ.',
  keywords: [
    'self-host rabbitmq',
    'rabbitmq cluster docker compose',
    'rabbitmq quorum queues',
    'cloudamqp alternative',
    'rabbitmq ha setup',
    'message queue self-hosted',
  ],
  intro: [
    'RabbitMQ remains the workhorse message broker: AMQP 0-9-1, mature client libraries in every language, and (since 4.x) quorum queues as the default path to real high availability. This template runs a 3-node cluster that forms itself on first boot via classic-config peer discovery - no manual join commands.',
    'Each node keeps its state on its own persistent volume. The first node serves the management UI publicly; the other two stay private. Declare your queues as quorum queues and any single node can fail without losing messages or availability.',
    'Apps in the same project connect over AMQP at amqp://rmq-1:5672 (any node works). At 1 GiB per node, the whole HA cluster is light enough to fit a $25/month plan with room to spare.',
  ],
  features: [
    'RabbitMQ 4.x with quorum queues - replicated, Raft-backed HA queues',
    'Automatic cluster formation on first boot (rabbit@rmq-1/2/3)',
    'Management UI on the public entrypoint, nodes private',
    'Per-node persistent volumes for mnesia state',
    'Standard AMQP 0-9-1 - every language has a mature client',
    'Identical local run with plain docker compose up',
  ],
  topology: [
    { service: 'rmq-1', role: 'cluster node + management UI', isPublic: 'yes (HTTP)' },
    { service: 'rmq-2, rmq-3', role: 'cluster nodes', isPublic: 'no' },
  ],
  requiredVars: [],
  ramMiB: 3072,
  diskGB: 6,
  services: 3,
  sizingNote:
    '1 GiB per node handles substantial message throughput. Disk is small (2 GB per node) because RabbitMQ is not a long-retention store - scale volumes up if you use lazy/long queues.',
  faq: [
    {
      q: 'How much does self-hosting RabbitMQ cost compared to CloudAMQP?',
      a: 'This 3-node HA cluster fits the 4 GiB Miget hobby plan at $25/month flat. A comparable dedicated 3-node HA cluster on CloudAMQP costs an order of magnitude more; shared plans are cheaper but throttled and multi-tenant.',
    },
    {
      q: 'Are quorum queues enabled?',
      a: 'The cluster is quorum-queue ready - declare queues with x-queue-type: quorum (or set a queue-type policy) and they replicate across all three nodes with Raft. Classic queues still work for non-critical traffic.',
    },
    {
      q: 'What happens if a RabbitMQ node dies?',
      a: 'For quorum queues, the remaining two nodes keep a majority and the queue stays available - producers and consumers reconnect to a living node and continue. The failed node rejoins the cluster automatically when it comes back.',
    },
    {
      q: 'How do applications connect?',
      a: 'From apps in the same Miget project: amqp://user:pass@rmq-1:5672 (any node accepts connections). For resilience, configure your client with all three hosts. AMQP is never exposed publicly - only the management UI gets a domain.',
    },
  ],
};
