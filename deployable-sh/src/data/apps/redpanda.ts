import type { AppBase } from './index';

export const redpanda: AppBase = {
  slug: 'redpanda',
  name: 'Redpanda',
  upstream: 'Redpanda',
  upstreamUrl: 'https://redpanda.com',
  license: 'BSL-1.1',
  licenseTier: 'source-available',
  licenseNote: 'v24.3.1 Community Edition',
  tagline:
    '3-broker Redpanda cluster - Kafka-compatible streaming without the JVM or ZooKeeper, plus Redpanda Console.',
  category: 'Streaming & Messaging',
  status: 'stable',
  seoTitle: 'Self-host Redpanda: Kafka-compatible 3-broker cluster, no JVM',
  seoDescription:
    'Deploy a 3-broker Redpanda cluster with Redpanda Console in one step. Kafka API compatible, single C++ binary, schema registry and HTTP proxy built in. Cheaper and lighter than managed Kafka.',
  keywords: [
    'self-host redpanda',
    'redpanda docker compose',
    'kafka alternative',
    'redpanda cluster setup',
    'kafka compatible streaming',
    'redpanda vs kafka',
  ],
  intro: [
    'Redpanda speaks the Kafka API - your existing Kafka clients, libraries, and tooling work unchanged - but ships as a single C++ binary with no JVM and no ZooKeeper. The practical upshot: lower memory floors, predictable tail latency, and a much simpler ops story.',
    'This template runs three brokers (each with the Kafka API on :9092, schema registry on :8081, and HTTP proxy on :8082 built in - no extra components to deploy) plus Redpanda Console as the public web UI. Brokers seed from each other by service name and keep their data on per-node persistent volumes.',
    'Apps in the same project connect with bootstrap servers rp-1:9092,rp-2:9092,rp-3:9092. Schema registry and REST proxy come for free on every broker - things that cost extra almost everywhere else.',
  ],
  features: [
    'Kafka-API compatible - existing clients and ecosystem tools work unchanged',
    'No JVM, no ZooKeeper: one binary per broker, lower RAM, stable latency',
    'Schema registry and HTTP proxy built into every broker',
    'Redpanda Console for topics, consumer groups, and live message viewing',
    'Per-broker persistent volumes (10 GB each)',
    'Stock Redpanda image; per-node flags ride each service’s command',
  ],
  topology: [
    { service: 'rp-1..3', role: 'brokers (Kafka API :9092, schema registry :8081, HTTP proxy :8082)', isPublic: 'no' },
    { service: 'redpanda-console', role: 'web console', isPublic: 'yes (HTTP)' },
  ],
  requiredVars: [],
  ramMiB: 6656,
  diskGB: 30,
  services: 4,
  sizingNote:
    '2 GiB per broker is a comfortable floor for development and moderate production loads; Redpanda autotunes to its container limits. The Console is light at 512 MiB.',
  faq: [
    {
      q: 'Is Redpanda really compatible with Kafka clients?',
      a: 'Yes - Redpanda implements the Kafka wire protocol. kafkajs, librdkafka, Spring Kafka, kcat, and the standard Kafka CLI tools all work against rp-1:9092 without code changes.',
    },
    {
      q: 'Why choose Redpanda over Kafka for self-hosting?',
      a: 'Simplicity and footprint. No JVM tuning, no ZooKeeper, schema registry and REST proxy built in. This 3-broker Redpanda stack totals 6.5 GiB RAM where the equivalent Kafka stack needs 7 GiB - and there are four fewer things that can go wrong.',
    },
    {
      q: 'How much does self-hosting Redpanda cost?',
      a: 'The full 3-broker cluster plus Console fits an 8 GiB Miget plan: $49/month hobby or $85/month Professional, flat. Redpanda Cloud and managed Kafka services are usage-priced and typically land far higher for an always-on 3-node cluster.',
    },
    {
      q: 'How do I use the schema registry?',
      a: 'Every broker serves it on port 8081 - point your serializers at http://rp-1:8081 from apps in the same project. No separate schema-registry deployment needed.',
    },
  ],
};
