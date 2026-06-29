import type { AppBase } from './index';

export const prefect: AppBase = {
  slug: 'prefect',
  name: 'Prefect',
  upstream: 'Prefect 3',
  upstreamUrl: 'https://www.prefect.io',
  tagline:
    'Python-native workflow orchestration - decorated functions become scheduled, observable flows; workers connect outbound.',
  category: 'Automation & Jobs',
  status: 'stable',
  seoTitle: 'Self-host Prefect 3 server with Docker Compose',
  seoDescription:
    'Deploy a Prefect 3 server - UI, API, and schedules on a managed Postgres, with outbound-polling workers - for $13/month flat. The Pythonic alternative to Prefect Cloud per-seat plans.',
  keywords: [
    'self-host prefect',
    'prefect docker compose',
    'prefect cloud alternative',
    'python workflow orchestration',
    'prefect 3 server setup',
    'prefect worker deployment',
  ],
  intro: [
    'Prefect’s pitch is that orchestration should feel like Python: decorate a function, deploy it, and the server handles schedules, retries, state, and a clean UI of every run. No DAG files, no DSL - flows are code in your repo.',
    'The architecture is PaaS-shaped by design: this template runs the server (UI + API + scheduler, basic-auth protected) on a managed Postgres, while WORKERS - the processes that execute your flow code - run as separate apps polling outbound, exactly like this catalogue’s CI runners. No ingress to workers, scale them per workload.',
    'Prefect Cloud’s team plans start around $100/month; the open-source server is the full orchestration engine at $13.',
  ],
  features: [
    'Flows as decorated Python functions - no DSL, no DAG files',
    'Schedules, retries, caching, and full run observability',
    'Outbound-polling workers: deploy anywhere with egress',
    'Built-in basic auth (server and clients share one string)',
    'Managed Postgres backend, auto-wired',
    'Apache-2.0; the same engine behind Prefect Cloud',
  ],
  topology: [
    { service: 'prefect', role: 'server: UI + API + scheduler (:5000, basic auth)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'PREFECT_AUTH_STRING', what: 'user:password basic auth (clients use the same value)' },
    { name: 'PREFECT_SERVER_UI_API_URL', what: 'https://<domain>/api after first deploy - the UI breaks behind a proxy without it' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 2,
  sizingNote:
    'The server is light; workers carry your code and its dependencies as separate apps sized to the workload. Valkey messaging is an optional scale-out lever upstream.',
  faq: [
    {
      q: 'Kestra or Prefect - the catalogue has both?',
      a: 'By language of thought: Kestra is declarative YAML authored in the UI (zero code-deployment story); Prefect is Python in your repo with the ergonomics Python people expect. Data teams split on this honestly - both are flat-priced here, so taste can decide.',
    },
    {
      q: 'Where does my flow code actually run?',
      a: 'In workers you deploy as separate apps: an image built from prefecthq/prefect:3-latest plus your code, started with prefect worker start against http://prefect:5000/api and the shared auth string. Workers poll outbound - no ports, no ingress, scale horizontally.',
    },
    {
      q: 'How does this compare to Prefect Cloud?',
      a: 'Cloud’s free Hobby tier is genuinely useful (2 users, 5 deployments); paid starts around $100/month. The self-hosted server has no user or deployment caps - Cloud adds their ops, RBAC, and push-work pools on top of the same engine.',
    },
  ],
};
