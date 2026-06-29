# OpenObserve

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=openobserve&type=stack)

[OpenObserve](https://openobserve.ai) - logs, metrics, and traces in a
single Rust binary: the open-source Datadog/Splunk/Elasticsearch
alternative. It stores columnar Parquet on object storage, which is why
it claims roughly an order-of-magnitude lower storage cost than
Elasticsearch - and why it pairs so well with Miget Buckets.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # log in with ZO_ROOT_USER_*
```

## On Miget

Create a Compose Stack pointing at this repo, path `openobserve`.
Required variables: **`ZO_ROOT_USER_EMAIL`** / **`ZO_ROOT_USER_PASSWORD`**.

Two storage modes:

- **Default (disk)**: logs on the 10 GB volume - simplest, fine to start.
- **Object storage (recommended)**: set **`ZO_LOCAL_MODE_STORAGE=s3`**
  and the **`ZO_S3_*`** variables to a Miget Bucket. Storage becomes
  effectively unlimited and the container goes stateless.

Ingest: OTLP on the HTTP port (`/api/{org}/v1/logs|metrics|traces`) and
gRPC on 5081 (expose as a public custom TCP port for external
collectors, or keep it private for in-project apps). Point any
OpenTelemetry SDK, Vector, Fluent Bit, or the catalogue's apps at it.

The economics this replaces: Datadog Logs bills ingest (~$0.10/GB) AND
indexing (~$1.70 per million events) - you pay twice; Splunk lists in
the thousands per GB/day/year. OpenObserve on a flat plan plus bucket
storage is the whole bill.

Note: this uses the AGPL OSS image from ECR Public
(`public.ecr.aws/zinclabs/openobserve`), not the enterprise image the
docs default to.
