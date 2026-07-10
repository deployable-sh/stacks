import type { AppBase } from './index';

export const parseable: AppBase = {
  slug: 'parseable',
  name: 'Parseable',
  upstream: 'Parseable',
  upstreamUrl: 'https://www.parseable.com',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline: 'A single-binary log lake on object storage - lean, S3-native, SQL-queryable, for $5/month.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Parseable: S3-native log lake',
  seoDescription:
    'Deploy Parseable - a lean single-binary log lake that stores compressed Parquet on Miget Buckets and queries with SQL - for $5/month. The lightweight Elasticsearch-logs alternative.',
  keywords: [
    'self-host parseable',
    'parseable docker compose',
    's3 log storage',
    'elasticsearch logs alternative',
    'log lake self-hosted',
    'parquet logs object storage',
  ],
  intro: [
    'Parseable takes the most disciplined position on log storage: ingest over HTTP, write compressed Parquet straight to object storage, query with SQL. No JVM, no cluster, no local index to outgrow - a single Rust binary that treats S3 (Miget Buckets) as the database.',
    'It is the leanest entry in the catalogue’s logging lane: 512 MB, one container, and stateless the moment you set the S3 variables (a thin entrypoint switches it to bucket mode, since Parseable starts via subcommand). For teams who want a focused, cheap log lake rather than a full observability platform, this is it.',
    'Ship logs in from Vector, Fluent Bit, OTLP→HTTP, or app SDKs; dashboard and query in the UI.',
  ],
  features: [
    'HTTP log ingest; SQL query; built-in UI',
    'Compressed Parquet on object storage (Miget Buckets)',
    'Stateless with S3 - the bucket is the database',
    'Single Rust binary, ~512 MB, no JVM',
    'Schema-flexible, high-cardinality friendly',
    'AGPL-3.0',
  ],
  topology: [
    { service: 'parseable', role: 'log ingest + query + UI (:5000)', isPublic: 'yes' },
  ],
  requiredVars: [
    { name: 'P_PASSWORD', what: 'admin login (with P_USERNAME)' },
    { name: 'P_S3_* (a Miget Bucket)', what: 'recommended: switches to S3-native mode, stateless storage' },
  ],
  ramMiB: 512,
  diskGB: 5,
  services: 1,
  sizingNote: 'The lightest logging option here - 512 MB. In S3 mode the volume is only a staging buffer; logs live in the bucket.',
  faq: [
    {
      q: 'Parseable or OpenObserve?',
      a: 'OpenObserve is the broader platform - logs, metrics, and traces with a rich UI. Parseable is the lean, logs-only lake: lighter (512 MB vs 1 GiB) and laser-focused on cheap, SQL-queryable log storage on buckets. Pick OpenObserve for all telemetry, Parseable for the minimal log store.',
    },
    {
      q: 'How does it stay so light?',
      a: 'It does not keep a local search index - it writes columnar Parquet to object storage and queries it directly. Compute is stateless and storage is the bucket, so the container itself stays tiny regardless of how much you retain.',
    },
    {
      q: 'How do logs get in?',
      a: 'A simple HTTP ingest API (POST /api/v1/ingest), plus first-class support from Vector, Fluent Bit, and any OTLP→HTTP pipeline. Structure logs into streams and query each with SQL.',
    },
  ],
};
