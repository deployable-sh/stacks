import type { AppBase } from './index';

export const temporal: AppBase = {
  slug: 'temporal',
  name: 'Temporal',
  upstream: 'Temporal',
  upstreamUrl: 'https://temporal.io',
  tagline: 'Durable execution - workflows as code that survive crashes, restarts, and deploys, with full history.',
  category: 'Automation & Jobs',
  status: 'experimental',
  seoTitle: 'Self-host Temporal with Docker Compose',
  seoDescription:
    'Deploy Temporal - durable workflow execution with retries, timers, and complete history - plus the web UI on a managed Postgres for $13/month. Self-hosted alternative to Temporal Cloud.',
  keywords: [
    'self-host temporal',
    'temporal docker compose',
    'temporal cloud alternative',
    'durable execution self-hosted',
    'temporal auto-setup',
    'workflow engine',
  ],
  intro: [
    'Temporal is a different category from the other orchestrators here: durable execution. You write workflows as ordinary code - in Go, Java, Python, TypeScript, .NET - and Temporal guarantees they run to completion despite process crashes, machine restarts, and deploys, replaying from a complete event history with automatic retries and durable timers.',
    'This template pairs the server with the web UI on a managed Postgres. It is marked experimental because it uses temporalio/auto-setup (the single-process image upstream now deprecates in favor of the multi-service server) - the simplest possible self-host, with the honest caveat attached rather than hidden.',
    'The server speaks raw gRPC on :7233 for your workers (internal, no ingress); the UI is the public entry. Temporal Cloud starts at $100/month plus per-action billing; this is the engine, flat.',
  ],
  features: [
    'Durable workflows in Go, Java, Python, TypeScript, .NET',
    'Automatic retries, durable timers, and full replay history',
    'Web UI for workflows, namespaces, and event inspection',
    'Workers dial the server over private gRPC - clean PaaS shape',
    'Managed Postgres (state + visibility) auto-wired',
    'MIT-licensed server and UI',
  ],
  topology: [
    { service: 'temporal', role: 'server (frontend gRPC :7233)', isPublic: 'no' },
    { service: 'ui', role: 'web UI (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres, two databases - managed on Miget', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SKIP_DB_CREATE', what: 'true on Miget after pre-creating the two databases (see template README)' },
  ],
  ramMiB: 2304,
  diskGB: 5,
  services: 3,
  sizingNote: 'The single-process server runs comfortably in 1 GiB for small-to-medium workloads; the UI is tiny. Workflow history lives in the managed Postgres.',
  faq: [
    {
      q: 'How is Temporal different from Kestra or Prefect?',
      a: 'Those orchestrate tasks/flows you define declaratively or in scripts; Temporal makes arbitrary application code durable - the workflow IS your program, guaranteed to survive failures and resume exactly where it left off. It is the tool for long-running, must-not-lose-state business processes (payments, provisioning, sagas).',
    },
    {
      q: 'Why experimental, and what is the database step?',
      a: 'It uses the auto-setup image, which upstream deprecated for production in favor of the multi-service server - it works well at small-to-medium scale, and the badge says so. On Miget’s single-role managed Postgres you pre-create two databases (temporal, temporal_visibility) once and set SKIP_DB_CREATE=true; the README has the two SQL lines.',
    },
    {
      q: 'How do my workers connect?',
      a: 'Workers (your code, deployed as separate apps) dial the server over gRPC at temporal:7233 on the private network - no public ingress for the server. The UI is the only public surface. Register namespaces via the UI or the temporal CLI.',
    },
  ],
};
