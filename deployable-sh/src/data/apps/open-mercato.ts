import type { AppBase } from './index';

export const openMercato: AppBase = {
  slug: 'open-mercato',
  name: 'Open Mercato',
  upstream: 'Open Mercato',
  upstreamUrl: 'https://github.com/open-mercato/open-mercato',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'The AI-engineering foundation framework - multi-tenant CRM/ERP/commerce modules that start your business app at 80% done.',
  category: 'Internal Tools',
  status: 'experimental',
  seoTitle: 'Self-host Open Mercato: AI-ready CRM/ERP foundation framework',
  seoDescription:
    'Deploy Open Mercato - the MIT foundation framework with multi-tenant CRM/ERP/commerce modules, RBAC, and an AI-agent-ready repo structure - in one step with Postgres+pgvector, Valkey, and Meilisearch.',
  keywords: [
    'open mercato deploy',
    'open mercato docker',
    'ai engineering framework',
    'crm framework self-hosted',
    'erp framework open source',
    'multi-tenant business app framework',
  ],
  intro: [
    'Open Mercato is built on an observation about AI-assisted teams: code assistants generate code fine, but someone still has to decide where it goes. The framework ships those decisions - module layout, multi-tenancy, RBAC, event flow, CRM/ERP/commerce domain models - as conventions and specs checked into the repo, so agents (and juniors) extend it without reinventing architecture.',
    'Practically, you get business-app building blocks at "80% done": CRM entities, sales pipeline, order management, dynamic forms, organization trees, feature-flag RBAC - on a modern stack (Next.js, TypeScript, MikroORM) with Postgres+pgvector, a Valkey cache, and Meilisearch behind it.',
    'This template mirrors the official full-app topology. Upstream publishes no images yet, so the app builds from the official repo on deploy - which is also why this one wears the experimental badge: pre-1.0, moving fast, and very much worth watching.',
  ],
  features: [
    'CRM/ERP/commerce domain modules: customers, pipeline, orders, CPQ',
    'Multi-tenant with organization trees and feature-based RBAC',
    'Dynamic entities and forms managed live from the admin',
    'AI-agent-ready repo: specs and skills ship with the code',
    'Postgres + pgvector, Valkey cache, Meilisearch wired in',
    'MIT licensed - no per-seat pricing trap by design',
  ],
  topology: [
    { service: 'app', role: 'Next.js app + admin at /backend (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres + pgvector (extension required - not the managed Postgres)', isPublic: 'no' },
    { service: 'cache', role: 'Valkey, bounded LRU cache', isPublic: 'no' },
    { service: 'search', role: 'Meilisearch v1.11', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'JWT_SECRET / MEILISEARCH_MASTER_KEY / TENANT_DATA_ENCRYPTION_KEY', what: 'core secrets (openssl one-liners in the template)' },
    { name: 'OM_INIT_SUPERADMIN_EMAIL / OM_INIT_SUPERADMIN_PASSWORD', what: 'superadmin created on first init' },
    { name: 'APP_URL', what: 'set to the app’s https domain after first deploy' },
  ],
  ramMiB: 5632,
  diskGB: 20,
  services: 4,
  sizingNote:
    'The Next.js app wants real heap (2.5 GB allocated); first deploy builds the monorepo from source, so expect a long initial build. Pin a commit in compose.yaml for reproducible deploys.',
  faq: [
    {
      q: 'Is Open Mercato a shop, a CRM, or a framework?',
      a: 'A foundation framework with domain modules: you assemble CRM, ERP, B2B-portal, or commerce-backend apps from ready pieces and extend them - ideally with AI agents, which the repo structure is explicitly designed for. If you want a turnkey storefront, PrestaShop in this catalogue is that; Open Mercato is what agencies build bespoke systems on.',
    },
    {
      q: 'Why does it build from source?',
      a: 'Upstream publishes no container images yet (pre-1.0). The template uses a git build context against the official repo with their own Dockerfile, so deploys track upstream. Pin a tag or commit in compose.yaml once you go to production.',
    },
    {
      q: 'Why not the managed Postgres?',
      a: 'Open Mercato uses pgvector for its hybrid indexing and AI features, and managed Postgres offerings do not ship the extension - so the template runs the pgvector image as a private container with its own volume.',
    },
    {
      q: 'Who is behind it?',
      a: 'Catch The Tornado - the team of Piotr and Tomasz Karwatka, previously of Divante and Vue Storefront. MIT-licensed, launched 2025, moving quickly; treat version pins seriously and read upstream release notes before redeploying.',
    },
  ],
};
