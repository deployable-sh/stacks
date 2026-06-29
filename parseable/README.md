# Parseable

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=parseable&type=stack)

[Parseable](https://www.parseable.com) - a single-binary log lake built
for object storage: ingest logs over HTTP, store them as compressed
Parquet on S3, query with SQL. Rust, lean (runs in 512 MB), and
S3-native by design - a natural fit for Miget Buckets.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # log in with P_USERNAME / P_PASSWORD
```

## On Miget

Create a Compose Stack pointing at this repo, path `parseable`. One
required variable: **`P_PASSWORD`**. By default it stores on the volume;
set the **`P_S3_*`** variables to a Miget Bucket and it switches to
S3-native mode (a thin entrypoint picks the store, since Parseable's
startup is subcommand-driven) - storage becomes unlimited and the
container stateless.

Ship logs in via the HTTP ingest API (`POST /api/v1/ingest`), Vector,
Fluent Bit, or any OTLP→HTTP path; query and dashboard in the UI.

Parseable or OpenObserve? OpenObserve is the broader platform (logs +
metrics + traces, richer UI); Parseable is the leaner, logs-focused log
lake. Both are single-binary and S3-native - OpenObserve if you want one
tool for all telemetry, Parseable if you want the lightest possible log
store on buckets.
