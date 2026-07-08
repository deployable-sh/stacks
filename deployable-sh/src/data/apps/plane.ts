import type { AppBase } from './index';

export const plane: AppBase = {
  slug: 'plane',
  name: 'Plane',
  upstream: 'Plane',
  upstreamUrl: 'https://plane.so',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  licenseNote: 'community edition',
  tagline: 'Open-source project management - issues, cycles, modules, roadmap. A Jira / Linear / ClickUp alternative, flat-priced.',
  category: 'Productivity & PM',
  status: 'experimental',
  seoTitle: 'Self-host Plane: open-source Jira and Linear alternative',
  seoDescription:
    'Deploy Plane - issues, cycles (sprints), modules, roadmap, and Gantt views - with the community all-in-one image on managed Postgres and Valkey. A flat-priced alternative to Jira, Linear, and ClickUp seat fees.',
  keywords: [
    'self-host plane',
    'plane.so docker compose',
    'jira alternative self-hosted',
    'linear alternative open source',
    'clickup alternative',
    'project management self-hosted',
  ],
  intro: [
    'Plane is open-source project management with the modern feel teams expect: issues, cycles (sprints), modules, a roadmap, Gantt and kanban boards, pages, and analytics. It is the self-hosted answer to Jira, Linear, and ClickUp.',
    'This template runs the community all-in-one image, which bundles the API, web app, background workers, and real-time collaboration behind a Caddy proxy in one container, bound to port 5000. It needs a few supporting services: managed Postgres and managed Valkey, plus a RabbitMQ sidecar for Celery tasks and an in-stack MinIO for file storage (private, like the catalogue’s Langfuse).',
    'It is flagged experimental because it is a heavier, multi-service stack (~4 GB total) with more moving parts than a single-binary app - treat it as a power-user deploy. The payoff is escaping per-seat pricing: Plane is one flat plan for an unlimited team.',
  ],
  features: [
    'Issues, cycles, modules, roadmap, Gantt and kanban views',
    'Pages, analytics, and a public API',
    'Community AIO image bound to port 5000 (SITE_ADDRESS)',
    'Managed Postgres + Valkey; RabbitMQ + MinIO as private sidecars',
    'Flat pricing for an unlimited team - no per-seat metering',
    'AGPL-3.0 (community edition)',
  ],
  topology: [
    { service: 'plane', role: 'AIO: api + web + workers + proxy (:5000)', isPublic: 'yes' },
    { service: 'db / redis', role: 'managed Postgres / managed Valkey', isPublic: 'no' },
    { service: 'rabbitmq / minio', role: 'Celery broker / file storage', isPublic: 'no (private)' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY', what: 'Django secret (openssl rand -hex 32)' },
    { name: 'WEB_URL / CORS_ALLOWED_ORIGINS', what: 'the https domain' },
    { name: 'MINIO_ROOT_PASSWORD / RABBITMQ_PASSWORD', what: 'sidecar credentials' },
  ],
  ramMiB: 6656,
  diskGB: 32,
  services: 5,
  sizingNote: 'Give the stack at least 4 GB of usable RAM: the AIO wants ~3 GB, with RabbitMQ and MinIO ~0.5 GB each. Issues live in Postgres; uploaded files on the MinIO volume.',
  faq: [
    {
      q: 'What does this save vs Jira, Linear, or ClickUp?',
      a: 'Jira Standard is about $7.53/user/month, Linear runs $8-16/user, and ClickUp Business is $12/user - all per seat. A 10-person team is roughly $75-160/month on those; Plane self-hosted is one flat plan for the whole team, with your data on your own infrastructure.',
    },
    {
      q: 'Why is this marked experimental?',
      a: 'It is a five-service stack (AIO, Postgres, Valkey, RabbitMQ, MinIO) around 4 GB, versus the catalogue’s single-binary apps. Everything is wired and validated, but there are more parts to watch and upgrades occasionally need care - hence the power-user flag.',
    },
    {
      q: 'Does it need a proxy wrapper for port 5000?',
      a: 'No. The community AIO image binds its Caddy proxy with SITE_ADDRESS, which this template sets to :5000 - Miget’s public port - so no extra wrapper is required.',
    },
  ],
};
