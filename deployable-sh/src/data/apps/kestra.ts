import type { AppBase } from './index';

export const kestra: AppBase = {
  slug: 'kestra',
  name: 'Kestra',
  upstream: 'Kestra',
  upstreamUrl: 'https://kestra.io',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  licenseNote: '+ optional EE',
  tagline:
    'Declarative workflow orchestration - flows are YAML authored in the UI, so there is no DAG-deployment problem at all.',
  category: 'Automation & Jobs',
  status: 'stable',
  seoTitle: 'Self-host Kestra: the pragmatic Airflow alternative',
  seoDescription:
    'Deploy Kestra - declarative workflow orchestration with UI-authored YAML flows, hundreds of plugins, and schedules - in one step on a managed Postgres for $25/month. No DAG files, no Redis.',
  keywords: [
    'self-host kestra',
    'kestra docker compose',
    'airflow alternative',
    'workflow orchestration self-hosted',
    'kestra setup',
    'data pipeline orchestrator',
  ],
  intro: [
    'Every Airflow deployment eventually asks the same question: how do DAG files get onto the workers? On a PaaS, that question has no good answer - which is why this catalogue ships Kestra instead. Flows are declarative YAML, authored and versioned in the UI, stored in Postgres: there is nothing to deploy when you add a workflow.',
    'One JVM container does it all (UI, API, scheduler, executor, worker in standalone mode), with both the queue and the repository on the managed Postgres - no Redis, no Celery, no fleet of components. Hundreds of plugins cover HTTP, SQL, dbt, files, and notifications; schedules, webhooks, and flow-dependency triggers come built in.',
    'The platform constraint is handled in the template, not discovered later: script tasks default to Kestra’s Docker runner, which needs a socket - this template pins the PROCESS runner as the plugin default so Python/Shell tasks run in-container.',
  ],
  features: [
    'Declarative YAML flows, authored and versioned in the UI',
    'Hundreds of plugins: HTTP, SQL, dbt, S3, notifications, …',
    'Schedules, webhooks, and flow-dependency triggers',
    'Single standalone container - queue and repo on managed Postgres',
    'Basic auth built in; PROCESS runner pre-configured for scripts',
    'Apache-2.0 core; scale-out topology available when needed',
  ],
  topology: [
    { service: 'kestra', role: 'UI + API + scheduler + worker (:5000)', isPublic: 'yes (basic auth)' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'KESTRA_ADMIN_EMAIL / KESTRA_ADMIN_PASSWORD', what: 'basic auth (email username; 8+ chars, uppercase + number)' },
  ],
  ramMiB: 4096,
  diskGB: 15,
  services: 2,
  sizingNote:
    'A JVM app: upstream quotes a 4 GiB floor, and 3 GiB allocated runs comfortably for team workloads. Internal storage rides the volume; point it at S3 when flows start moving real data.',
  faq: [
    {
      q: 'Why Kestra instead of Airflow?',
      a: 'On a PaaS, Airflow’s DAG-file deployment story has no good answer - the stock image ships empty with no ingest mechanism, so a template would deploy an orchestrator you cannot feed. Kestra flows live in the database and are authored in the UI; the problem simply does not exist. (If you are deeply Airflow-invested, Astronomer’s managed offering is the honest recommendation.)',
    },
    {
      q: 'What does managed orchestration cost by comparison?',
      a: 'Astronomer (managed Airflow) starts around $0.35/hour per deployment - roughly $255/month always-on, before workers. Kestra Cloud is usage-priced. This stack is $49/month flat with the full open-source feature set.',
    },
    {
      q: 'Can my flows run Python scripts?',
      a: 'Yes - the template pre-configures the PROCESS task runner (the Docker runner needs a socket the platform does not expose), so scripts execute inside the Kestra container. Bake extra toolchains into a derived image, or call services in your project over HTTP for heavier work.',
    },
    {
      q: 'How does Kestra compare to n8n in this catalogue?',
      a: 'n8n is integration automation (connect SaaS apps, react to events) with a visual editor; Kestra is data/engineering orchestration (pipelines, dependencies, retries, backfills) with declarative YAML. Plenty of teams run both - they meet different needs.',
    },
  ],
};
