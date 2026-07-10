import type { AppBase } from './index';

export const phoenix: AppBase = {
  slug: 'phoenix',
  name: 'Phoenix',
  upstream: 'Arize Phoenix',
  upstreamUrl: 'https://phoenix.arize.com',
  license: 'Elastic-2.0',
  licenseTier: 'source-available',
  licenseNote: 'Arize Phoenix, ELv2',
  tagline:
    'LLM tracing, evals, and a prompt playground in one container - the lightweight start to LLM observability.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host Arize Phoenix: LLM tracing and evals in one container',
  seoDescription:
    'Deploy Arize Phoenix - OpenTelemetry-native LLM tracing, evaluations, datasets, and a prompt playground in a single container - for $13/month. The lightweight Langfuse alternative.',
  keywords: [
    'self-host phoenix arize',
    'phoenix llm tracing docker',
    'llm observability lightweight',
    'langfuse alternative',
    'otel llm traces',
    'llm evals self-hosted',
  ],
  intro: [
    'Not every team needs a six-service observability platform on day one. Phoenix puts LLM tracing, evaluations, datasets, and a prompt playground in a single container with SQLite on a volume - up in seconds, OpenTelemetry-native, with auto-instrumentation for LangChain, LlamaIndex, and raw OpenAI clients.',
    'In this catalogue it is the deliberate counterpart to langfuse: start here when you want traces this afternoon; graduate to the full stack when volume and team workflows demand it. Both speak OTel, so your instrumentation survives the move.',
    'Auth is on, telemetry is off, and the secret is one variable. Arize’s hosted product (AX) starts at $50/month past the free tier - this is $13 with your data on your volume.',
  ],
  features: [
    'OTel-native tracing: spans, latencies, token counts, costs',
    'Evals: LLM-as-judge and custom evaluators over real traces',
    'Datasets and experiments; prompt playground built in',
    'Auto-instrumentation for the major frameworks',
    'One container, SQLite on a volume; Postgres path when needed',
    'Auth enabled, telemetry disabled in this template',
  ],
  topology: [
    { service: 'phoenix', role: 'UI + OTLP collectors (:5000 HTTP, :4317 gRPC internal)', isPublic: 'yes (auth)' },
  ],
  requiredVars: [{ name: 'PHOENIX_SECRET', what: '32+ chars; first login admin@localhost/admin forces a reset' }],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    'Comfortable for team-scale trace volume on SQLite; heavy retention moves to PHOENIX_POSTGRES_* settings. License is Elastic 2.0 - fine to self-host, restricted from being resold as a service.',
  faq: [
    {
      q: 'Phoenix or Langfuse - this catalogue has both?',
      a: 'Deliberately: Phoenix is the one-container start (tracing + evals today, minimal ops), Langfuse the full platform (workers, ClickHouse-scale ingestion, prompt management workflows). Both ingest OpenTelemetry, so starting with Phoenix costs you nothing if you graduate.',
    },
    {
      q: 'How do traces get in?',
      a: 'OTLP/HTTP to http://phoenix:5000/v1/traces or gRPC to phoenix:4317 from apps in the project - or use Phoenix’s SDKs, which auto-instrument LangChain, LlamaIndex, and OpenAI-compatible clients (including calls through the litellm template) in a couple of lines.',
    },
    {
      q: 'What does the ELv2 license mean for me?',
      a: 'Self-hosting Phoenix for your own products and teams is unrestricted. The Elastic License only forbids offering Phoenix itself as a managed service to third parties - the standard source-available trade, flagged here so nothing surprises you.',
    },
  ],
};
