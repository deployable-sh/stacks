import type { AppBase } from './index';

export const grafanaStack: AppBase = {
  slug: 'grafana-stack',
  name: 'Grafana Stack',
  upstream: 'Grafana + Prometheus + Loki',
  upstreamUrl: 'https://grafana.com/oss/',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  licenseNote: 'Grafana + Loki, AGPL since 2021',
  tagline:
    'Dashboards, metrics, and logs for your whole project - Grafana, Prometheus, and Loki pre-wired, for $13/month flat.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Grafana + Prometheus + Loki with Docker Compose',
  seoDescription:
    'Deploy the Grafana observability stack - dashboards, Prometheus metrics, Loki logs, datasources pre-provisioned - in one step for $13/month. The flat-price alternative to Datadog per-host pricing.',
  keywords: [
    'self-host grafana',
    'grafana prometheus loki docker compose',
    'datadog alternative self-hosted',
    'grafana cloud alternative',
    'observability stack self-hosted',
    'loki logs setup',
  ],
  intro: [
    'Observability SaaS has the most creative meters in the industry: per host, per million spans, per GB ingested, per active series. The open-source answer has been stable for years - Grafana for dashboards, Prometheus for metrics, Loki for logs - and it deploys beautifully as one small stack.',
    'This template wires the three together: Grafana public with both datasources pre-provisioned, Prometheus private with a baked config (the officially documented pattern) you extend with your apps’ /metrics endpoints by service name, and Loki private in its stock single-binary filesystem mode - apps push logs straight to its HTTP API.',
    'Deliberately absent: node-exporter and cadvisor, which need host access a PaaS cannot grant - node metrics are the platform’s job. This stack is for your applications’ metrics and logs, which is the part you actually dashboard.',
  ],
  features: [
    'Grafana with Prometheus + Loki datasources provisioned out of the box',
    'Prometheus: 15-day retention default, scrape any in-project app by service name',
    'Loki: zero-config single-binary mode; push logs from any logging library',
    'One $13/month plan instead of per-host / per-GB / per-series meters',
    'Baked-config images - edit two small files to extend, redeploy to apply',
    'Alerting via Grafana (email, Slack, webhooks) included',
  ],
  topology: [
    { service: 'grafana', role: 'dashboards (:5000)', isPublic: 'yes' },
    { service: 'prometheus', role: 'metrics, baked config (:9090)', isPublic: 'no' },
    { service: 'loki', role: 'logs, filesystem mode (:3100)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'GF_ADMIN_PASSWORD', what: 'Grafana admin login' },
    { name: 'GF_ROOT_URL', what: 'set to the app’s https domain after first deploy' },
  ],
  ramMiB: 1536,
  diskGB: 22,
  services: 3,
  sizingNote:
    'Right-sized for project-scale observability: 512 MiB per component. Prometheus RAM scales with active series, Loki disk with log volume - both have a long runway in this footprint.',
  faq: [
    {
      q: 'How does this compare to Datadog or Grafana Cloud?',
      a: 'Datadog Infrastructure Pro is $15-18 per host per month before logs and custom metrics. Grafana Cloud has a genuinely generous free tier, but the Pro meters ($6.50 per 1k metric series, ~$0.55/GB for logs all-in) compound with growth. This stack is $13/month flat - the same Grafana, your retention rules.',
    },
    {
      q: 'How do my apps get metrics into it?',
      a: 'Expose /metrics with any Prometheus client library, add the service name to prometheus.yml in the template, redeploy. In-project targets are scraped over the private network - nothing public required.',
    },
    {
      q: 'How do logs get into Loki?',
      a: 'Apps push directly to http://loki:3100/loki/api/v1/push - every major logging library has a Loki sink, and OTLP works too. (Promtail reached end-of-life in March 2026, and on a PaaS there are no host log files to tail anyway - pushing is the right model.)',
    },
    {
      q: 'Why no node-exporter or cadvisor?',
      a: 'Both need host-level access (host network, /proc, the Docker socket) that platform sandboxes cannot grant - and node health is the platform’s responsibility anyway. Application metrics and logs are what this stack is for.',
    },
  ],
};
