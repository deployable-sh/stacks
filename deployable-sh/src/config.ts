export const SITE = {
  name: 'deployable.sh',
  url: 'https://deployable.sh',
  tagline: 'Self-hostable stacks. Zero babysitting.',
  description:
    'A curated catalogue of production-shaped Docker Compose stacks - Kafka, n8n, Supabase, Keycloak, MongoDB and more - deployable in one step to Miget, or runnable locally with plain docker compose up.',
  repoUrl: 'https://github.com/deployable-sh/stacks',
  migetUrl: 'https://miget.com',
  migetAppUrl: 'https://app.miget.com',
  migetPlansUrl: 'https://miget.com/plans',
  migetDocsUrl: 'https://docs.miget.com',
  pricingAsOf: 'June 2026',
};

export interface Plan {
  tier: 'Hobby' | 'Professional';
  vcpu: number;
  ramMiB: number;
  diskGB: number;
  usd: number;
}

/** Miget plan ladder, miget.com/plans, June 2026. */
export const HOBBY_PLANS: Plan[] = [
  { tier: 'Hobby', vcpu: 1, ramMiB: 512, diskGB: 10, usd: 5 },
  { tier: 'Hobby', vcpu: 1, ramMiB: 1024, diskGB: 25, usd: 7 },
  { tier: 'Hobby', vcpu: 1, ramMiB: 2048, diskGB: 50, usd: 13 },
  { tier: 'Hobby', vcpu: 2, ramMiB: 2048, diskGB: 60, usd: 19 },
  { tier: 'Hobby', vcpu: 2, ramMiB: 4096, diskGB: 80, usd: 25 },
  { tier: 'Hobby', vcpu: 4, ramMiB: 8192, diskGB: 160, usd: 49 },
  { tier: 'Hobby', vcpu: 8, ramMiB: 16384, diskGB: 320, usd: 97 },
];

export const PRO_PLANS: Plan[] = [
  { tier: 'Professional', vcpu: 1, ramMiB: 2048, diskGB: 10, usd: 22 },
  { tier: 'Professional', vcpu: 2, ramMiB: 4096, diskGB: 25, usd: 43 },
  { tier: 'Professional', vcpu: 4, ramMiB: 8192, diskGB: 50, usd: 85 },
  { tier: 'Professional', vcpu: 8, ramMiB: 16384, diskGB: 100, usd: 169 },
  { tier: 'Professional', vcpu: 16, ramMiB: 32768, diskGB: 200, usd: 337 },
  { tier: 'Professional', vcpu: 32, ramMiB: 65536, diskGB: 400, usd: 673 },
  { tier: 'Professional', vcpu: 48, ramMiB: 98304, diskGB: 600, usd: 1009 },
];

/**
 * Effective monthly rates for running container workloads elsewhere.
 * Filled from June 2026 pricing research; see each app page's sources note.
 * ramPerGiB = USD per GiB RAM per month, diskPerGB = USD per GB persistent
 * disk per month, base = fixed monthly platform fee.
 */
export interface PaasRate {
  name: string;
  base: number;
  ramPerGiB: number;
  diskPerGB: number;
  /** minimum monthly cost per container (per-service instance platforms) */
  svcFloor: number;
  note: string;
  url: string;
}

/** Effective published rates, June 2026 (see sources). Estimates, not quotes. */
export const PAAS_RATES: PaasRate[] = [
  {
    name: 'Railway',
    base: 0,
    ramPerGiB: 10,
    diskPerGB: 0.15,
    svcFloor: 0,
    note: 'usage-based ($10/GB RAM-mo); vCPU billed separately at $20/vCPU-mo on top',
    url: 'https://railway.com/pricing',
  },
  {
    name: 'Render',
    base: 0,
    ramPerGiB: 12.5,
    diskPerGB: 0.25,
    svcFloor: 7,
    note: 'per-service instances (0.5 GB $7, 2 GB $25) - every container is its own paid service',
    url: 'https://render.com/pricing',
  },
  {
    name: 'Fly.io',
    base: 0,
    ramPerGiB: 5.9,
    diskPerGB: 0.15,
    svcFloor: 2,
    note: 'cheapest sticker price - but burstable shared CPUs (1/16 core; dedicated vCPUs cost ~2-3×), no compose deploys (one app per container, manual wiring), managed DBs billed extra',
    url: 'https://fly.io/docs/about/pricing/',
  },
  {
    name: 'DO App Platform',
    base: 5,
    ramPerGiB: 12,
    diskPerGB: 0,
    svcFloor: 5,
    note: 'no persistent volumes - stateful containers need managed DBs/Spaces (base $5 Spaces included here)',
    url: 'https://www.digitalocean.com/pricing/app-platform',
  },
  {
    name: 'Heroku',
    base: 0,
    ramPerGiB: 50,
    diskPerGB: 0,
    svcFloor: 7,
    note: 'no volumes; nothing between 1 GB ($50) and 2.5 GB ($250) dynos - 2 GB containers cost far more than shown',
    url: 'https://www.heroku.com/pricing/',
  },
];
