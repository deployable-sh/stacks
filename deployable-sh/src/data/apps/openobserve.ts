import type { AppBase } from './index';

export const openobserve: AppBase = {
  slug: 'openobserve',
  name: 'OpenObserve',
  upstream: 'OpenObserve',
  upstreamUrl: 'https://openobserve.ai',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline: 'Logs, metrics, and traces in one binary - the Datadog/Splunk alternative that stores on your buckets.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host OpenObserve: logs, metrics, traces on S3',
  seoDescription:
    'Deploy OpenObserve - a single-binary observability platform (logs + metrics + traces) storing columnar Parquet on Miget Buckets - for $13/month. The open-source Datadog/Splunk/Logz.io alternative.',
  keywords: [
    'self-host openobserve',
    'openobserve docker compose',
    'datadog alternative self-hosted',
    'splunk alternative open source',
    'logz.io alternative',
    'elasticsearch logs alternative',
  ],
  intro: [
    'Log management is where observability bills go to spiral: Datadog charges for ingest AND indexing, Splunk lists in the thousands per GB/day, Logz.io meters by the gigabyte. OpenObserve is the open-source reset - one Rust binary doing logs, metrics, and traces, storing columnar Parquet on object storage at a claimed ~10x lower cost than Elasticsearch.',
    'It is the cleanest S3-native fit in the catalogue: point `ZO_LOCAL_MODE_STORAGE=s3` at a Miget Bucket and your telemetry lives there, the container stateless, storage effectively unlimited. OTLP-native ingest means any OpenTelemetry SDK, Vector, or Fluent Bit feeds it directly.',
    'This sits alongside the grafana-stack template: Grafana+Loki for the label-based metrics-and-logs story, OpenObserve for search-grade log analytics with object storage and built-in traces - the part Loki’s model does not cover.',
  ],
  features: [
    'Logs, metrics, and traces in a single binary - no JVM, no cluster',
    'Columnar Parquet on object storage (Miget Buckets) - ~10x cheaper than ES',
    'OTLP-native ingest (HTTP + gRPC); SQL and a query UI',
    'Dashboards, alerts, and pipelines built in',
    'Stateless with S3 storage; local-disk mode to start',
    'AGPL-3.0',
  ],
  topology: [
    { service: 'openobserve', role: 'UI + API + OTLP ingest (:5000 HTTP, :5081 gRPC)', isPublic: 'yes' },
  ],
  requiredVars: [
    { name: 'ZO_ROOT_USER_EMAIL / ZO_ROOT_USER_PASSWORD', what: 'the root account, created on first start' },
    { name: 'ZO_LOCAL_MODE_STORAGE=s3 + ZO_S3_*', what: 'recommended: a Miget Bucket, for unlimited stateless storage' },
  ],
  ramMiB: 1024,
  diskGB: 10,
  services: 1,
  sizingNote: 'A Rust binary with no JVM - 1 GiB runs real ingestion. With S3 storage the volume is just a cache; logs live in the bucket.',
  faq: [
    {
      q: 'How does this compare to Datadog or Splunk on cost?',
      a: 'Datadog Logs bills ingest (~$0.10/GB) and indexing (~$1.70 per million events) separately - you pay twice; Splunk lists in the thousands per GB/day/year. OpenObserve is a flat $13/month plan plus cheap bucket storage, and the columnar-on-S3 design is built to make retention affordable rather than punitive.',
    },
    {
      q: 'How do I get logs and traces into it?',
      a: 'OTLP everywhere: point any OpenTelemetry SDK, Vector, or Fluent Bit at the HTTP endpoint (/api/{org}/v1/logs|metrics|traces) or gRPC on 5081. In-project apps send over the private network; external collectors use a public custom port.',
    },
    {
      q: 'OpenObserve or the grafana-stack template?',
      a: 'grafana-stack (Grafana + Prometheus + Loki) for the classic metrics-and-labels-based-logs setup. OpenObserve for full-text log search at scale, built-in traces, and object-storage economics - and it is one container instead of three. Many teams run both.',
    },
    {
      q: 'Why the note about the image?',
      a: 'OpenObserve’s docs default to their commercial enterprise image; this template uses the AGPL open-source image from ECR Public, which is the genuinely free, self-hostable build.',
    },
  ],
};
