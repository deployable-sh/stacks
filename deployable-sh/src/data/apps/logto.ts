import type { AppBase } from './index';

export const logto: AppBase = {
  slug: 'logto',
  name: 'Logto',
  upstream: 'Logto',
  upstreamUrl: 'https://logto.io',
  license: 'MPL-2.0',
  licenseTier: 'permissive',
  tagline:
    'The open-source Auth0 experience - hosted sign-in pages, social logins, organizations, MFA - on one managed Postgres.',
  category: 'Auth & API Gateway',
  status: 'stable',
  seoTitle: 'Self-host Logto: the open-source Auth0 alternative',
  seoDescription:
    'Deploy Logto - drop-in sign-in pages, OIDC, social logins, organizations and MFA with framework SDKs - in one step on a managed Postgres for $25/month. No MAU pricing.',
  keywords: [
    'self-host logto',
    'logto docker compose',
    'auth0 alternative open source',
    'hosted login pages self-hosted',
    'logto setup',
    'developer auth oidc',
  ],
  intro: [
    'What developers actually liked about Auth0 was the first hour: drop-in sign-in pages, a quickstart per framework, social logins in minutes. Logto rebuilds that experience as MPL-2.0 open source - pre-built auth flows, organizations, MFA, and SDKs for every stack - without the per-MAU cliff that follows.',
    'One container serves two origins (the user-facing auth endpoint and your admin console), so the template gives each its own domain via thin proxies - the same pattern as Saleor. Database seeding is idempotent and runs on every boot; the managed Postgres is wired automatically.',
    'This completes a four-IdP identity lane with honest positioning: Logto for the Auth0-style developer experience, Zitadel for B2B multi-tenancy, authentik for flow design, Keycloak for protocol depth.',
  ],
  features: [
    'Pre-built, themeable sign-in pages - auth UX without building it',
    'OIDC/OAuth, social providers, passwordless, MFA',
    'Organizations and RBAC for B2B apps',
    'Quickstart SDKs: React, Next, Vue, iOS, Android, and more',
    'Idempotent seeding; stateless on managed Postgres',
    'MPL-2.0 - no MAU meters anywhere',
  ],
  topology: [
    { service: 'logto', role: 'auth endpoint (:3001) + admin console (:3002)', isPublic: 'no' },
    { service: 'web-auth / web-admin', role: 'nginx :5000 proxies - two public domains', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ENDPOINT / ADMIN_ENDPOINT', what: 'the two apps’ https domains after first deploy' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 4,
  sizingNote:
    '1 GiB for the Node app suits real traffic; everything persistent is in the managed Postgres. Claim the admin console promptly - the first signup becomes admin.',
  faq: [
    {
      q: 'How does Logto compare to Auth0 pricing?',
      a: 'Auth0’s free tier now covers 25k MAU, but paid starts at $35-70/month for the first thousand-MAU steps and climbs steeply. Logto here is $25/month with no user counting - and the developer experience (hosted pages, SDK quickstarts) is the part it cloned best.',
    },
    {
      q: 'Why does it need two domains?',
      a: 'Logto deliberately separates the user-facing auth origin from the admin console origin - good security hygiene. Each platform app exposes one public port, so two thin proxies give each origin its own domain; ENDPOINT and ADMIN_ENDPOINT tell Logto which is which.',
    },
    {
      q: 'Which IdP in this catalogue should I pick?',
      a: 'Logto if you want Auth0-style drop-in auth for a product fast. Zitadel for passkeys-first B2B multi-tenancy. authentik for visually-designed flows across many internal apps. Keycloak for maximum protocol surface. They are $13-25/month each - trying two is an afternoon.',
    },
  ],
};
