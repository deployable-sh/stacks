import type { AppBase } from './index';

export const authentik: AppBase = {
  slug: 'authentik',
  name: 'authentik',
  upstream: 'authentik',
  upstreamUrl: 'https://goauthentik.io',
  tagline:
    'The modern identity provider - OIDC, SAML, LDAP, and visual login flows - now Redis-free on a managed Postgres.',
  category: 'Auth & API Gateway',
  status: 'stable',
  seoTitle: 'Self-host authentik: modern identity provider with Docker Compose',
  seoDescription:
    'Deploy authentik - OIDC/SAML/LDAP identity with visually-designed flows, MFA and SCIM - in one step on a managed Postgres (no Redis since 2025.10). Unlimited MAU at a flat price vs Auth0.',
  keywords: [
    'self-host authentik',
    'authentik docker compose',
    'auth0 alternative self-hosted',
    'keycloak alternative',
    'authentik setup',
    'sso self-hosted modern',
  ],
  intro: [
    'authentik is what teams pick when Keycloak feels like a JVM-shaped commitment: the same core job (OIDC, SAML, LDAP, SCIM, MFA, SSO across your apps) with a visual flow designer - login journeys, conditional access, and enrollment built by composing stages in a UI instead of writing SPIs.',
    'The 2025.10 release made it dramatically easier to operate: Redis is gone entirely, with tasks, cache, and sessions all on Postgres. That makes this template a clean pair - server and worker from one image - on the managed Postgres, auto-wired with sslmode=require.',
    'Bootstrap is headless (admin password and email in env, applied on first start) and the per-MAU math is the usual story: Auth0 wants $70/month at one thousand users; authentik does not count.',
  ],
  features: [
    'OIDC, OAuth2, SAML, LDAP, SCIM, and proxy/forward auth',
    'Visual flow designer: MFA, conditional access, enrollment, recovery',
    'No Redis since 2025.10 - Postgres carries everything',
    'Headless admin bootstrap via env',
    'MIT core; enterprise features license-gated, off by default',
    'Server + worker on managed Postgres, auto-wired',
  ],
  topology: [
    { service: 'server', role: 'authentik UI + APIs + flows (:5000)', isPublic: 'yes' },
    { service: 'worker', role: 'background tasks', isPublic: 'no' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'AUTHENTIK_SECRET_KEY', what: 'openssl rand -base64 60' },
    { name: 'AUTHENTIK_BOOTSTRAP_PASSWORD / AUTHENTIK_BOOTSTRAP_EMAIL', what: 'akadmin login, applied on first start' },
  ],
  ramMiB: 2816,
  diskGB: 6,
  services: 3,
  sizingNote:
    '1 GiB server + 768 MiB worker matches upstream’s 2 GB stack guidance. Media and custom templates ride small shared volumes.',
  faq: [
    {
      q: 'authentik or Keycloak - this catalogue has both?',
      a: 'Deliberately. Keycloak is the two-decade enterprise standard (deep SAML/federation edge cases, Red Hat lineage); authentik is the modern operator’s choice - visual flows, lighter footprint, faster iteration. Same flat-price economics either way; pick by taste and protocol needs.',
    },
    {
      q: 'How does it compare to Auth0 pricing?',
      a: 'Auth0’s free tier is generous now (25k MAU), but the paid cliff is steep: Essentials is $70/month at 1,000 MAU and Professional $240+. authentik on this $25/month stack has no MAU concept at all - users are rows in your Postgres.',
    },
    {
      q: 'Really no Redis?',
      a: 'Really - upstream removed it across 2025.8-2025.10 (tasks, then cache and sessions, all to Postgres). The trade is more Postgres connections, which the managed instance absorbs. Older tutorials showing Redis services are simply outdated.',
    },
    {
      q: 'Can it protect apps that have no auth of their own?',
      a: 'Yes - proxy/forward-auth outposts can sit in front of plain apps. On this platform the embedded outpost in the server covers the common cases; register the app, route through authentik, done.',
    },
  ],
};
