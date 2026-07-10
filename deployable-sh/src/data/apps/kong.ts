import type { AppBase } from './index';

export const kong: AppBase = {
  slug: 'kong',
  name: 'Kong Gateway',
  upstream: 'Kong Gateway (OSS)',
  upstreamUrl: 'https://konghq.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'DB-backed Kong API gateway with Kong Manager behind basic auth - managed Postgres, zero config at deploy time.',
  category: 'Auth & API Gateway',
  status: 'stable',
  seoTitle: 'Self-host Kong API Gateway with Docker Compose',
  seoDescription:
    'Deploy Kong Gateway (OSS) backed by a managed Postgres in one step - proxy public, Admin API private, Kong Manager UI behind basic auth. The flat-price alternative to Kong Konnect.',
  keywords: [
    'self-host kong',
    'kong docker compose',
    'kong api gateway setup',
    'kong konnect alternative',
    'api gateway self-hosted',
    'kong manager',
  ],
  intro: [
    'Kong is the most battle-tested open-source API gateway: routing, auth plugins (key, JWT, OAuth2), rate limiting, transformations, and observability hooks, all configured through a clean Admin API. This template runs DB-backed Kong OSS in front of your project’s apps.',
    'The security shape is the point: the proxy is the only public surface. The Admin API stays project-internal, and the one authenticated way in from outside is the admin service - nginx serving Kong Manager and proxying the Admin API under /api, both behind basic auth. UI and API on one origin means the Manager works with no CORS or domain configuration.',
    'On Miget, the Postgres container is never deployed - db becomes a managed Postgres and Kong’s connection settings are auto-wired from its credentials. Zero configuration at deploy time.',
  ],
  features: [
    'Routing, load balancing, and health checks for upstream services',
    'Plugin ecosystem: key-auth, JWT, OAuth2, rate limiting, CORS, transforms',
    'Kong Manager web UI + Admin API behind basic auth on one origin',
    'Admin API never publicly exposed',
    'Managed Postgres auto-provisioned and auto-wired',
    'Declarative or API-driven configuration',
  ],
  topology: [
    { service: 'kong', role: 'gateway - proxy :5000, Admin API :8001 (internal)', isPublic: 'proxy only' },
    { service: 'admin', role: 'nginx - Kong Manager + Admin API at /api', isPublic: 'behind basic auth' },
    { service: 'db', role: 'Postgres - managed service on Miget', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ADMIN_USERNAME / ADMIN_PASSWORD', what: 'basic auth on Kong Manager + proxied Admin API' },
  ],
  ramMiB: 2304,
  diskGB: 5,
  services: 3,
  sizingNote:
    '1 GiB for Kong handles thousands of requests/second on typical plugin chains; the admin proxy is a 256 MiB sliver. The managed Postgres stores configuration only - it stays small.',
  faq: [
    {
      q: 'Kong OSS vs Kong Konnect - what am I giving up?',
      a: 'Konnect adds the hosted control plane, dev portal, and analytics, priced per service/gateway. Kong OSS here keeps the entire data plane and Admin API plus Kong Manager UI - for most teams routing internal and public APIs, that is the whole job, at a flat $25/month plan.',
    },
    {
      q: 'How do I configure routes and services?',
      a: 'Through Kong Manager (your admin domain, basic auth) or the Admin API at /api on the same origin - or curl it from any app inside the project at kong:8001. Services point at in-project upstreams by service name, e.g. http://my-api:5000.',
    },
    {
      q: 'Is the Admin API safe from the internet?',
      a: 'Yes - it has no public route. Outside access goes only through the nginx admin service behind basic auth; strip that service entirely and the Admin API becomes project-internal only.',
    },
    {
      q: 'Why DB-backed instead of declarative (DB-less) Kong?',
      a: 'DB-backed enables runtime configuration through the Manager UI and Admin API without redeploys, which is the comfortable operating mode on a platform. The managed Postgres makes the usual cost of DB-backed Kong - running the database - disappear.',
    },
  ],
};
