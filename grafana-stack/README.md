# Grafana Stack

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=grafana-stack&type=stack)

[Grafana](https://grafana.com/oss/) + [Prometheus](https://prometheus.io)
+ [Loki](https://grafana.com/oss/loki/) - dashboards, metrics, and logs
for everything in your project, at a flat price instead of per-host or
per-GB-ingested SaaS pricing.

## Topology

| Service | Role | Public |
|---|---|---|
| `grafana` | dashboards (`:5000`), Prometheus + Loki pre-provisioned | yes |
| `prometheus` | metrics, baked config + 15d retention (`:9090`) | no |
| `loki` | logs, single-binary filesystem mode (`:3100`) | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # admin / GF_ADMIN_PASSWORD
```

## On Miget

Create a Compose Stack pointing at this repo, path `grafana-stack`. One
required variable: **`GF_ADMIN_PASSWORD`**. Set **`GF_ROOT_URL`** to the
app's https domain after first deploy.

Wiring your apps in:

- **Metrics**: expose `/metrics` in your apps (any Prometheus client
  library) and add them to `prometheus/prometheus.yml` by service name -
  redeploy the stack to apply.
- **Logs**: push to `http://loki:3100/loki/api/v1/push` from apps in the
  same project (every logging library has a Loki sink; OTLP works too).

What is deliberately NOT here: node-exporter and cadvisor need host-level
access a PaaS cannot grant - node metrics are the platform's job; this
stack is for *your applications'* metrics and logs. Promtail is EOL
(March 2026) - push directly or use Alloy if you need a collector.

Retention: Prometheus defaults to 15 days; Loki's default config has no
retention (the volume is the limit). Both are tunable - see each
service's docs.
