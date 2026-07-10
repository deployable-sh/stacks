import type { AppBase } from './index';

export const infisical: AppBase = {
  slug: 'infisical',
  name: 'Infisical',
  upstream: 'Infisical',
  upstreamUrl: 'https://infisical.com',
  license: 'MIT',
  licenseTier: 'permissive',
  licenseNote: 'core MIT, EE licensed',
  tagline: 'The open-source secrets manager - projects, versioning, machine identities - without per-identity pricing.',
  category: 'Security',
  status: 'stable',
  seoTitle: 'Self-host Infisical: open-source secrets management',
  seoDescription:
    'Deploy Infisical - secrets with environments, versioning, dynamic secrets, and machine identities on a managed Postgres - for $25/month flat. Infisical Cloud charges $18 per identity; Vault costs four figures.',
  keywords: [
    'self-host infisical',
    'infisical docker compose',
    'vault alternative open source',
    'secrets manager self-hosted',
    'infisical setup',
    'machine identity secrets',
  ],
  intro: [
    'Secrets sprawl is how incidents start: API keys in CI variables, .envs in Slack, tokens nobody rotated. Infisical is the open-source consolidation point - projects with environments, versioned secrets with point-in-time recovery, references, dynamic secrets, and machine identities for non-human consumers.',
    'The pricing landscape makes self-hosting pointed: Infisical Cloud Pro is $18 per identity per month and machines count as identities - a dozen services and runners is real money. HashiCorp’s hosted Vault runs four figures for production. This stack is $25 flat: stateless container, managed Postgres, noeviction Valkey, auto-migrations.',
    'And the consumers are already in your project: inject secrets into the CI runner templates, agents, and apps via the CLI, SDKs, or machine-identity auth - with audit and rotation instead of copy-paste.',
  ],
  features: [
    'Projects, environments, secret versioning + point-in-time recovery',
    'Secret references, dynamic secrets, rotation',
    'Machine identities for services, CI, and agents',
    'Integrations: K8s operator, CI, Terraform, SDKs, CLI',
    'Stateless on managed Postgres; migrations on start',
    'MIT core (enterprise dirs licensed separately upstream)',
  ],
  topology: [
    { service: 'infisical', role: 'app + API (:5000)', isPublic: 'yes' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ENCRYPTION_KEY / AUTH_SECRET / REDIS_AUTH', what: 'core secrets (openssl one-liners)' },
    { name: 'SITE_URL', what: 'the app’s https domain after first deploy' },
  ],
  ramMiB: 2816,
  diskGB: 5,
  services: 3,
  sizingNote: 'The Node app wants ~1-1.5 GiB; everything durable is in the managed Postgres. SMTP is optional (invite/MFA emails).',
  faq: [
    {
      q: 'How does the cost compare to Infisical Cloud or Vault?',
      a: 'Cloud Pro is $18/identity/month with machines counted - 10 services + 5 humans is $270/month. HCP Vault’s production tier starts around $1,150/month plus per-client fees. This stack is $25 flat with identities uncounted.',
    },
    {
      q: 'How do my deployments consume secrets?',
      a: 'Machine identities + the CLI/SDKs: a service authenticates and pulls its environment at boot or build. The CI runner templates in this catalogue pair naturally - runners fetch fresh secrets per job instead of storing them in forge settings.',
    },
    {
      q: 'Infisical or just platform env vars?',
      a: 'Env vars are fine until you need rotation, versioning, audit, sharing across stacks, or secrets for machines outside the platform. Infisical adds that layer - and writes back to env-var systems via integrations where that remains the delivery mechanism.',
    },
  ],
};
