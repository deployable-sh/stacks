import type { AppBase } from './index';

export const hasura: AppBase = {
  slug: 'hasura',
  name: 'Hasura',
  upstream: 'Hasura v2 CE',
  upstreamUrl: 'https://hasura.io',
  tagline: 'Instant GraphQL over Postgres - queries, mutations, live subscriptions - stateless and Apache-2.0.',
  category: 'Backend Platforms',
  status: 'stable',
  seoTitle: 'Self-host Hasura v2: instant GraphQL over Postgres',
  seoDescription:
    'Deploy Hasura v2 CE - instant GraphQL APIs with permissions, subscriptions, and event triggers over a managed Postgres - for $13/month. No per-model pricing.',
  keywords: [
    'self-host hasura',
    'hasura docker compose',
    'graphql over postgres',
    'hasura v2 ce',
    'hasura ddn alternative',
    'instant graphql api',
  ],
  intro: [
    'Hasura’s trick still lands a decade in: point it at Postgres, track your tables, and you have a production GraphQL API - queries, mutations, and live subscriptions - with row-level permissions, remote schemas, and event triggers. No resolvers written, no N+1 hand-wringing.',
    'This template ships v2 CE deliberately: it is the Apache-2.0, self-hosted product - one stateless container on the managed Postgres (metadata and default source in one URL). Hasura’s newer DDN/v3 is cloud-first and priced per active model, which makes the v2-self-host math pointed: a 30-table API with traffic costs $150/month there and $13 here.',
    'It completes the backend lane: Postgres-native like the supabase template, but as a layer over databases you already have - including, by service name, every Postgres-family stack in your project.',
  ],
  features: [
    'Instant GraphQL: queries, mutations, live subscriptions',
    'Row-level permissions; JWT auth wires to the catalogue’s IdPs',
    'Event triggers and scheduled triggers to webhooks',
    'Remote schemas and multiple database sources',
    'Stateless single container, /healthz, Apache-2.0',
    'Console gated by the admin secret',
  ],
  topology: [
    { service: 'hasura', role: 'GraphQL engine + console (:5000)', isPublic: 'yes (admin secret)' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [{ name: 'HASURA_ADMIN_SECRET', what: 'gates the console and admin APIs' }],
  ramMiB: 2048,
  diskGB: 5,
  services: 2,
  sizingNote: '1 GiB suits real APIs; heavy subscription fan-out is the dimension that grows it. Everything persistent is in Postgres.',
  faq: [
    {
      q: 'Why v2 instead of Hasura DDN (v3)?',
      a: 'v2 CE is the self-hosted, Apache-2.0 product with years of production mileage; DDN is the cloud-first successor priced at $5 per active model per month - real money for any non-trivial schema. When DDN’s self-host story matures, the calculus gets revisited; today v2 is the honest ship.',
    },
    {
      q: 'How do clients authenticate?',
      a: 'The admin secret is for you; clients use JWTs via HASURA_GRAPHQL_JWT_SECRET - and every IdP in this catalogue (keycloak, authentik, zitadel, logto) issues compatible tokens with role claims for row-level permissions.',
    },
    {
      q: 'Can it expose databases other than its own?',
      a: 'Yes - add sources from the console: other Postgres instances in the project by service name (timescaledb included), each with its own permission rules, unified under one GraphQL endpoint.',
    },
  ],
};
