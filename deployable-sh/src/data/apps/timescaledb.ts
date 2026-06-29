import type { AppBase } from './index';

export const timescaledb: AppBase = {
  slug: 'timescaledb',
  name: 'TimescaleDB',
  upstream: 'TimescaleDB',
  upstreamUrl: 'https://github.com/timescale/timescaledb',
  tagline:
    'Postgres for time series - hypertables, columnar compression, continuous aggregates - in a single internal-only node.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host TimescaleDB: time-series Postgres with Docker Compose',
  seoDescription:
    'Deploy TimescaleDB - Postgres with hypertables, 90%+ columnar compression, and continuous aggregates - in one step. The flat-price alternative to Timescale/Tiger Cloud and InfluxDB Cloud.',
  keywords: [
    'self-host timescaledb',
    'timescaledb docker compose',
    'timescale cloud alternative',
    'time series database postgres',
    'timescaledb setup',
    'influxdb alternative postgres',
  ],
  intro: [
    'Time-series data has a way of arriving: metrics, sensor readings, prices, events. TimescaleDB is the answer for teams who want it in Postgres - real SQL, joins against business tables, every Postgres driver and ORM - with the time-series machinery (partitioning, compression, downsampling) handled by the extension.',
    'Hypertables auto-partition by time behind a normal table interface. Columnar compression routinely cuts metrics-shaped data by 90%+. Continuous aggregates keep rollups (per-minute, per-hour) incrementally up to date so dashboards stop re-scanning raw data.',
    'This template runs a single node with the extension preloaded, internal-only - databases never get a public domain - with a 20 GB volume. It exists precisely because managed Postgres offerings (Miget’s included) do not ship the timescaledb extension. One password and your apps connect at timescaledb:5432.',
  ],
  features: [
    'Hypertables: automatic time partitioning behind a plain-table interface',
    'Columnar compression - 90%+ typical on metrics-shaped data',
    'Continuous aggregates: incrementally maintained rollups',
    'Data retention policies: drop old chunks, not rows',
    'It is Postgres: every driver, ORM, and BI tool just works',
    'Internal-only single node + 20 GB volume',
  ],
  topology: [
    { service: 'timescaledb', role: 'Postgres + timescaledb extension (:5432)', isPublic: 'no (by design)' },
  ],
  requiredVars: [{ name: 'POSTGRES_PASSWORD', what: 'password for the app user (openssl rand -base64 24)' }],
  ramMiB: 2048,
  diskGB: 20,
  services: 1,
  sizingNote:
    '2 GiB handles serious ingest for a single-team workload; compression keeps the 20 GB volume going far longer than raw Postgres would. Scale RAM with active chunk working set.',
  faq: [
    {
      q: 'Why not just use the managed Postgres for time series?',
      a: 'You can, until the data grows: vanilla Postgres lacks automatic time partitioning, columnar compression, and incremental rollups, so tables bloat and dashboards slow down. The timescaledb extension is not available in managed Postgres offerings, which is exactly why this template exists.',
    },
    {
      q: 'How does this compare to Timescale (Tiger) Cloud pricing?',
      a: 'Managed Timescale prices compute per hour plus storage, which is excellent for elastic workloads and adds up for always-on ones. This node is $13/month flat (2 GiB hobby plan) - and your metrics never leave your project network.',
    },
    {
      q: 'Is TimescaleDB a real InfluxDB alternative?',
      a: 'For most workloads, yes - with the advantage that it is plain SQL in Postgres: joins against your business data, standard drivers, no new query language. InfluxDB still has an edge in ultra-high-cardinality edge collection; for app and infra metrics, hypertables win on ergonomics.',
    },
    {
      q: 'How do applications connect?',
      a: 'From the same Miget project: postgres://app:<password>@timescaledb:5432/app - any Postgres client works. The node is private with no ingress route; if you need external access, tunnel through your apps rather than exposing the database.',
    },
    {
      q: 'How much data fits in 20 GB?',
      a: 'With compression, typically hundreds of millions of metric rows. Add a retention policy (drop_chunks) for raw data you only need recently, keep continuous aggregates forever - the volume can be resized when you genuinely outgrow it.',
    },
  ],
};
