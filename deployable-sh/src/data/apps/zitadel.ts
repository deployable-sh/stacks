import type { AppBase } from './index';

export const zitadel: AppBase = {
  slug: 'zitadel',
  name: 'Zitadel',
  upstream: 'Zitadel',
  upstreamUrl: 'https://zitadel.com',
  tagline:
    'Passkeys-first, multi-tenant identity in one stateless Go binary - the lightest full IdP in the catalogue.',
  category: 'Auth & API Gateway',
  status: 'stable',
  seoTitle: 'Self-host Zitadel: passkeys-first identity with Docker Compose',
  seoDescription:
    'Deploy Zitadel - OIDC, SAML, passkeys, and B2B multi-tenant organizations in a single Go binary on a managed Postgres - in one step for $13/month. The modern Okta alternative.',
  keywords: [
    'self-host zitadel',
    'zitadel docker compose',
    'okta alternative self-hosted',
    'passkeys identity provider',
    'multi tenant auth b2b',
    'zitadel setup',
  ],
  intro: [
    'Zitadel is the newest generation of identity server: passkeys as a first-class login method, multi-tenant organizations baked into the data model (each B2B customer gets an org with its own users, policies, and branding), and custom logic via JS actions - all in a single stateless Go binary that idles around half a gigabyte.',
    'The deployment is the cleanest in the identity lane: one container plus the managed Postgres, fully env-configured, with the masterkey as the only generated secret. The one sharp edge is flagged loudly: the external domain is baked into instance data at first setup - set the final domain before the first deploy.',
    'For B2B SaaS builders the comparison is Okta and WorkOS: $6/user/month with a $1,500 annual minimum on one side, $125/month per SSO connection on the other. Zitadel ships SSO connections and orgs as ordinary features of a $13/month stack.',
  ],
  features: [
    'Passkeys-first login, plus OIDC, OAuth2, and SAML',
    'Multi-tenant organizations - built for B2B SaaS',
    'JS actions for custom claims, hooks, and logic',
    'Single stateless binary: all state in managed Postgres',
    'Self-service org onboarding and branding per tenant',
    'AGPL-3.0 (since v3) - unmodified self-hosting unaffected',
  ],
  topology: [
    { service: 'zitadel', role: 'identity server (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ZITADEL_MASTERKEY', what: 'exactly 32 characters' },
    { name: 'ZITADEL_EXTERNALDOMAIN (+PORT=443, SECURE=true)', what: 'the FINAL domain, set before first deploy - it is baked into instance data' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 2,
  sizingNote:
    'Upstream quotes ~512 MB for the binary; 1 GiB gives password-hashing bursts room. Everything persistent lives in the managed Postgres - the container is disposable.',
  faq: [
    {
      q: 'Zitadel, authentik, or Keycloak?',
      a: 'Zitadel for passkeys-first UX, B2B multi-tenancy, and the smallest footprint; authentik for visual flow design and ops comfort; Keycloak for maximum protocol depth and enterprise lineage. All three are in this catalogue at $13-25/month - deploying two to compare costs less than a week of any identity SaaS.',
    },
    {
      q: 'What is the external-domain warning about?',
      a: 'Zitadel writes the domain into its instance data during initial setup - issuer URLs, org domains, and keys derive from it. Set ZITADEL_EXTERNALDOMAIN to your real domain (with EXTERNALPORT=443 and EXTERNALSECURE=true) before the first deploy; changing it afterward is a documented but painful procedure.',
    },
    {
      q: 'Does AGPL affect my apps that use it for login?',
      a: 'No - your applications only talk to Zitadel over OIDC/SAML, which creates no licensing relationship. AGPL obligations would only arise if you modified Zitadel itself and offered that modified version as a service.',
    },
    {
      q: 'How does it compare to Okta or WorkOS for B2B?',
      a: 'Okta Workforce starts at $6/user/month with a $1,500/year minimum; WorkOS charges $125/month per SSO connection. Zitadel makes each customer an organization with their own SSO config - unlimited orgs and connections, on the flat plan.',
    },
  ],
};
