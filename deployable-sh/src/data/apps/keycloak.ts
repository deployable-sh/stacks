import type { AppBase } from './index';

export const keycloak: AppBase = {
  slug: 'keycloak',
  name: 'Keycloak',
  upstream: 'Keycloak',
  upstreamUrl: 'https://www.keycloak.org',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'Keycloak IAM - OIDC, SAML, social login, user federation - backed by a managed Postgres, stateless and production-mode.',
  category: 'Auth & API Gateway',
  status: 'stable',
  seoTitle: 'Self-host Keycloak: OIDC/SAML identity server with Docker Compose',
  seoDescription:
    'Deploy Keycloak - open-source identity and access management with OIDC, SAML, social login and user federation - in one step, backed by a managed Postgres. The flat-price Auth0 alternative.',
  keywords: [
    'self-host keycloak',
    'keycloak docker compose',
    'auth0 alternative self-hosted',
    'keycloak production setup',
    'oidc server self-hosted',
    'sso self-hosted',
  ],
  intro: [
    'Keycloak is the heavyweight champion of open-source identity: full OIDC and SAML, social logins, user federation (LDAP/AD), fine-grained authorization, admin console, and two decades of enterprise hardening via Red Hat. It is what you deploy when per-MAU pricing on Auth0 or Clerk stops being funny.',
    'This template runs Keycloak in production mode (start, not start-dev) backed by a managed Postgres that Miget provisions and wires automatically - host, port, credentials all injected. TLS terminates at the platform ingress with forwarded headers trusted, so issuer URLs come out as your https domain, which is exactly what OIDC clients require.',
    'All state lives in Postgres; the Keycloak pod itself is stateless and restarts clean. Two variables (bootstrap admin username/password) and you have an identity provider.',
  ],
  features: [
    'OIDC, OAuth2, and SAML 2.0 - works with every framework’s auth library',
    'Social login (Google, GitHub, …) and identity brokering',
    'User federation: LDAP and Active Directory',
    'Admin console with realms, clients, roles, and flows',
    'Production mode behind TLS ingress; correct https issuer URLs',
    'Managed Postgres auto-provisioned and auto-wired - stateless Keycloak pod',
  ],
  topology: [
    { service: 'keycloak', role: 'identity server, production mode (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'KC_ADMIN_USERNAME / KC_ADMIN_PASSWORD', what: 'bootstrap admin, applied on first start against an empty database' },
  ],
  ramMiB: 3072,
  diskGB: 5,
  services: 2,
  sizingNote:
    'Keycloak is RAM-hungry (JVM + Quarkus): 2 GiB is the realistic floor. The managed Postgres adds 1 GiB. CPU matters at login bursts - password hashing is deliberate work.',
  faq: [
    {
      q: 'How does self-hosted Keycloak compare to Auth0 pricing?',
      a: 'Auth0’s paid plans price per monthly active user and climb steeply past the entry tiers. Keycloak on this template is $25/month (4 GiB hobby plan) or $43/month Professional, flat, for unlimited users, realms, and clients. The trade is operating it yourself - which this template reduces to a deploy.',
    },
    {
      q: 'Is this production-mode Keycloak or a dev toy?',
      a: 'Production mode: kc start with a real Postgres, proxy headers configured for the platform’s TLS ingress, and correct https issuer URLs. start-dev appears nowhere in this template.',
    },
    {
      q: 'Where is Keycloak’s state stored?',
      a: 'Entirely in the managed Postgres (realms, users, clients, sessions config). The Keycloak pod is stateless - redeploys and restarts are uneventful, and the database gets the platform’s managed-service treatment.',
    },
    {
      q: 'Can I use Keycloak for SSO across my apps?',
      a: 'Yes - that is its core job. Create one realm, register each app as an OIDC client, and every standard auth library (NextAuth, Spring Security, Django, Rails) points at your realm’s well-known endpoint.',
    },
  ],
};
