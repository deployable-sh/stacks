# MinIO

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=minio&type=stack)

[MinIO](https://min.io), S3-compatible object storage, single node +
20 GB volume, with the web console as the public entrypoint.

> Considering object storage on Miget? The platform's native **Buckets**
> are the managed option, this template is for when you specifically want
> to run MinIO (S3 event hooks, ILM rules, self-managed everything).

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo. Required variables:
**`MINIO_ROOT_USER`** / **`MINIO_ROOT_PASSWORD`** (console login + root S3
credentials, create scoped access keys in the console for apps). Apps in
the project use endpoint `http://minio:9000` (path-style).

Single-node; keep `replicas` at 1. Distributed MinIO (4+ nodes, erasure
coding) is a future variant.

## Maintenance status (June 2026)

MinIO archived its open-source repository in April 2026; the Docker Hub
image is frozen at `RELEASE.2025-09-07T16-13-09Z` (pinned here - an
October 2025 CVE fix never shipped as an image) and recent releases had
already reduced the console to an object browser. This template remains
for MinIO-specific needs, but for new deployments use the
[`garage`](../garage/) template - the actively maintained successor.
