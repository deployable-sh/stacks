import type { AppBase } from './index';

export const supabase: AppBase = {
  slug: 'supabase',
  name: 'Supabase',
  upstream: 'Supabase',
  upstreamUrl: 'https://supabase.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  licenseNote: 'components Apache-2.0 / MIT / PostgreSQL',
  tagline:
    'The full self-hosted Supabase stack - Postgres, Auth, REST, Realtime, Storage, Studio - behind one Kong gateway.',
  category: 'Backend Platforms',
  status: 'experimental',
  seoTitle: 'Self-host Supabase: the full stack with Docker Compose',
  seoDescription:
    'Deploy self-hosted Supabase - Postgres with extensions, GoTrue auth, PostgREST, Realtime, Storage, and Studio behind Kong - in one step. No project pausing, no MAU caps, flat monthly price.',
  keywords: [
    'self-host supabase',
    'supabase docker compose',
    'supabase self-hosted setup',
    'firebase alternative self-hosted',
    'supabase without limits',
    'supabase kong gateway',
  ],
  guideUrl: 'https://miget.com/blog/how-to-self-host-supabase',
  related: ['n8n', 'metabase', 'minio'],
  intro: [
    'Supabase is the open-source Firebase: Postgres at the core, with auth, auto-generated REST APIs, realtime subscriptions, file storage, and a polished Studio dashboard around it. The whole point of it being open source is that you can run it yourself - this template is the official self-hosting compose, adapted to deploy in one step.',
    'Only the Kong gateway is public: it fronts the APIs and serves Studio behind basic auth. Postgres runs Supabase’s own image (custom extensions and roles - deliberately not a managed database). Optional components ride compose profiles: supavisor (connection pooling), edge functions, and imgproxy enable only if you turn their profiles on.',
    'This is the largest template in the catalogue and marked experimental - validate on a dev project first. The payoff: no project pausing, no MAU pricing, no egress anxiety, and a backend that lives on your infrastructure.',
  ],
  features: [
    'Full stack: Postgres (supabase image), GoTrue, PostgREST, Realtime, Storage, postgres-meta, Studio',
    'Single public entrypoint: Kong gateway with Studio behind basic auth',
    'Optional profiles: supavisor pooler, edge functions, imgproxy',
    'The same supabase-js client your frontend already uses',
    'No MAU caps, no project pausing, no per-GB egress pricing',
    '20 GB Postgres volume; all state on your disks',
  ],
  topology: [
    { service: 'kong', role: 'API gateway + Studio entrypoint (:5000)', isPublic: 'yes (dashboard behind basic auth)' },
    { service: 'db', role: 'Postgres (supabase image, extensions + roles)', isPublic: 'no' },
    { service: 'auth / rest / realtime / storage / meta / studio', role: 'Supabase services', isPublic: 'no' },
    { service: 'supavisor / functions / imgproxy', role: 'optional, via compose profiles', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY', what: 'core secrets (see template README for generation)' },
    { name: 'DASHBOARD_USERNAME / DASHBOARD_PASSWORD', what: 'Studio basic auth at the Kong gateway' },
  ],
  ramMiB: 8192,
  diskGB: 20,
  services: 8,
  sizingNote:
    'Core stack (no optional profiles) totals ~6.5 GiB. Enabling supavisor + functions + imgproxy adds ~2.5 GiB - size for 16 GiB if you want everything on.',
  faq: [
    {
      q: 'Why self-host Supabase instead of using supabase.com?',
      a: 'Control and cost shape: Supabase Cloud Pro is $25/month plus metered compute, egress, storage, and MAUs. Self-hosted has none of those meters - a flat plan, no project pausing, and data that never leaves your infrastructure. The trade: you operate it (updates, backups) yourself.',
    },
    {
      q: 'Does supabase-js work against a self-hosted instance?',
      a: 'Yes - point createClient at your Kong gateway URL with the ANON_KEY you generated. Auth, PostgREST queries, realtime channels, and storage all flow through the same gateway, exactly like the hosted product.',
    },
    {
      q: 'What is different from the official Supabase self-hosting guide?',
      a: 'Nothing structural - this is the official compose, adapted to the platform: Kong as the single public service, everything else private, profile-gated optional components, and platform overrides for RAM and volumes so it deploys in one step.',
    },
    {
      q: 'Why is this template marked experimental?',
      a: 'It is the biggest stack in the catalogue (8-11 services) and Supabase evolves its self-hosting compose actively. It works, but validate on a dev project before trusting it with production, and expect template updates tracking upstream.',
    },
    {
      q: 'Can I use a managed Postgres with Supabase?',
      a: 'No - Supabase requires its own Postgres image with custom extensions and roles, so this template deliberately runs the database as a container with a 20 GB volume rather than a managed service.',
    },
  ],
};
