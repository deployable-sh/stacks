import type { AppBase } from './index';

export const langfuse: AppBase = {
  slug: 'langfuse',
  name: 'Langfuse',
  upstream: 'Langfuse',
  upstreamUrl: 'https://langfuse.com',
  license: 'MIT',
  licenseTier: 'permissive',
  licenseNote: 'core MIT + EE',
  tagline:
    'Open-source LLM observability - tracing, evals, prompt management - the full v3 stack with no per-unit metering.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host Langfuse v3: LLM observability with Docker Compose',
  seoDescription:
    'Deploy the full Langfuse v3 stack - web, worker, Postgres, ClickHouse, Valkey, MinIO - in one step. Trace every span of your agents without per-unit pricing; compare vs Langfuse Cloud and LangSmith.',
  keywords: [
    'self-host langfuse',
    'langfuse docker compose',
    'langfuse v3 self-hosted',
    'llm observability self-hosted',
    'langsmith alternative',
    'llm tracing open source',
  ],
  intro: [
    'The moment agents ship, tracing volume explodes: every LLM call, tool invocation, and retry becomes a span you want to see when something goes weird. Langfuse is the open-source standard for that - traces, evaluations, prompt management, cost and latency dashboards - with SDKs and OpenTelemetry support across every framework.',
    'This template mirrors the official v3 self-host topology: web and worker on a managed Postgres, single-node ClickHouse for the analytics volume (CLICKHOUSE_CLUSTER_ENABLED=false, no Keeper), a Valkey wrapper pinned to maxmemory-policy=noeviction (Langfuse queues jobs there - eviction would lose events), and a MinIO blob store with the bucket pre-created.',
    'Hosted LLM observability meters by the unit - and a busy agent emits thousands per hour. Self-hosted Langfuse meters nothing; ClickHouse compression eats traces for breakfast, and the catalogue’s sizing gives it room to.',
  ],
  features: [
    'Tracing for LLM apps and agents: spans, generations, costs, latencies',
    'Evals: LLM-as-judge, human annotation queues, datasets and experiments',
    'Prompt management with versioning and deployment labels',
    'SDKs (Python/JS), OpenTelemetry, and integrations for every framework',
    'Official v3 topology: web + worker + Postgres + ClickHouse + Valkey + S3',
    'No tracing-unit metering - volume costs disk, not dollars',
  ],
  topology: [
    { service: 'web', role: 'Langfuse UI + API (:5000)', isPublic: 'yes' },
    { service: 'worker', role: 'async ingestion/processing', isPublic: 'no' },
    { service: 'db', role: 'Postgres - managed service on Miget', isPublic: 'no' },
    { service: 'clickhouse', role: 'single-node ClickHouse (traces, analytics)', isPublic: 'no' },
    { service: 'cache', role: 'Valkey, noeviction (queue)', isPublic: 'no' },
    { service: 'blob', role: 'MinIO S3 store (events/media), bucket pre-created', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NEXTAUTH_SECRET / SALT', what: 'auth + API-key hashing (openssl rand -base64 32 each)' },
    { name: 'ENCRYPTION_KEY', what: 'exactly 64 hex chars (openssl rand -hex 32)' },
    { name: 'CLICKHOUSE_PASSWORD / REDIS_AUTH / MINIO_ROOT_PASSWORD', what: 'internal service credentials' },
    { name: 'NEXTAUTH_URL', what: 'set to the web app’s https domain after first deploy' },
  ],
  ramMiB: 7168,
  diskGB: 35,
  services: 6,
  sizingNote:
    'ClickHouse is the scaling dial - 2 GiB suits steady team usage; raise it (and its 20 GB volume) as trace volume grows. Web and worker scale independently at 1 GiB each.',
  faq: [
    {
      q: 'How does self-hosting compare to Langfuse Cloud pricing?',
      a: 'Langfuse Cloud Core is $29/month for 100k tracing units with graduated overage from $8 per 100k - and agentic apps burn units fast, since every span counts. This stack is $49/month flat at any volume; the crossover for a team running agents in production arrives within weeks.',
    },
    {
      q: 'Is self-hosted Langfuse the full product?',
      a: 'The core platform - tracing, evals, datasets, prompt management, dashboards - is MIT-licensed and fully included. A few enterprise features (SSO enforcement, audit logs) sit behind a commercial license, same as the cloud tiers gate them.',
    },
    {
      q: 'Why does the stack need six services?',
      a: 'It mirrors the official v3 architecture: Postgres for transactional state, ClickHouse for the analytical trace volume, a queue (Valkey) between API and worker so ingestion never blocks, and S3 (MinIO) for raw event and media payloads. The template wires all of it - you deploy one stack.',
    },
    {
      q: 'How do my apps send traces to it?',
      a: 'Point the Langfuse SDK (or OpenTelemetry exporter) at your web app domain with keys from project settings. Apps inside the same Miget project can use http://web:5000 and skip the public hop entirely.',
    },
    {
      q: 'Does single-node ClickHouse limit me?',
      a: 'Not until serious scale - single-node handles hundreds of millions of spans with compression. The template sets CLICKHOUSE_CLUSTER_ENABLED=false accordingly; if you ever outgrow it, the catalogue’s 3-node clickhouse template is the upgrade path.',
    },
  ],
};
