# TimescaleDB

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=timescaledb&type=stack)

[TimescaleDB](https://github.com/timescale/timescaledb) - Postgres with
the timescaledb extension: hypertables, columnar compression, and
continuous aggregates for time-series workloads. Single node + 20 GB
volume, **internal-only** (databases never get a public domain).

> Need plain Postgres? Use Miget's managed Postgres instead - this
> template exists because the managed service does not ship the
> `timescaledb` extension.

## Local

```bash
cp .env.example .env && docker compose up -d
psql postgres://app:$POSTGRES_PASSWORD@localhost:5432/app
```

## On Miget

Create a Compose Stack pointing at this repo, path `timescaledb`. One
required variable: **`POSTGRES_PASSWORD`**. Apps in the same project
connect with:

```
postgres://app:<password>@timescaledb:5432/app
```

The extension is preloaded - go straight to hypertables:

```sql
CREATE TABLE metrics (ts timestamptz NOT NULL, device text, value double precision);
SELECT create_hypertable('metrics', by_range('ts'));
```

Data lives on the volume; resize it as retention grows (compression
typically buys 90%+ on metrics-shaped data). Keep `replicas` at 1.
