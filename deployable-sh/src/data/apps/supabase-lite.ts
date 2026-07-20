import type { AppBase } from './index';

export const supabaseLite: AppBase = {
  slug: 'supabase-lite',
  name: 'Supabase Lite',
  upstream: 'Supabase',
  upstreamUrl: 'https://supabase.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'The Supabase core - Postgres, Auth, and the REST API behind Kong - without the seven services most apps never touch. Fits a 2 GiB plan.',
  category: 'Backend Platforms',
  status: 'stable',
  seoTitle: 'Self-host Supabase cheap: the core stack on a 2 GiB plan',
  seoDescription:
    'Self-host the Supabase core - Postgres, GoTrue auth, and PostgREST behind Kong - for $13/month flat. No Realtime, Storage, or edge functions; the dashboard rides an optional profile.',
  keywords: [
    'self-host supabase cheap',
    'supabase minimal self-hosted',
    'supabase core docker compose',
    'supabase without realtime storage',
    'supabase budget hosting',
    'firebase alternative cheap',
  ],
  intro: [
    'Most Supabase apps use three things: the database, auth, and the auto-generated REST API. The full self-hosted distribution ships eleven services to cover every feature - this template ships the four that carry those three workloads: supabase-postgres, GoTrue, PostgREST, and the Kong gateway in front.',
    'The payoff is footprint. The full stack wants 8-16 GiB; this core idles around 600 MiB and is sized to fit a 2 GiB plan. Studio and postgres-meta ride a compose profile - enable the dashboard when you are working on the schema, turn it off when you are not.',
    'It is the same pinned upstream images and init SQL as the full template, minus the optional surface - so supabase-js works unchanged for database, auth, and REST calls, and if you grow into Realtime or Storage later, the full template takes over with the same database volume.',
  ],
  features: [
    'Postgres + GoTrue auth + PostgREST behind one Kong gateway',
    'Fits a 2 GiB plan - core idles around 600 MiB',
    'Studio dashboard on an optional compose profile',
    'Same pinned images and init SQL as the full supabase template',
    'supabase-js compatible for db, auth, and REST',
    'Upgrade path: move the volume to the full template when you need more',
  ],
  topology: [
    { service: 'kong', role: 'gateway: APIs + Studio basic auth (:5000)', isPublic: 'yes' },
    { service: 'auth / rest', role: 'GoTrue + PostgREST', isPublic: 'via kong' },
    { service: 'db', role: 'supabase-postgres with its own volume', isPublic: 'no' },
    { service: 'studio + meta', role: 'dashboard (profile: studio)', isPublic: 'via kong' },
  ],
  requiredVars: [
    { name: 'POSTGRES_PASSWORD', what: 'database superuser password' },
    { name: 'JWT_SECRET', what: '32+ chars; ANON_KEY and SERVICE_ROLE_KEY are signed with it - set once, never rotate casually' },
    { name: 'ANON_KEY / SERVICE_ROLE_KEY', what: 'JWTs signed with JWT_SECRET (use the supabase key generator)' },
    { name: 'DASHBOARD_USERNAME / DASHBOARD_PASSWORD', what: 'Kong basic auth in front of Studio' },
    { name: 'PG_META_CRYPTO_KEY', what: 'postgres-meta encryption key (studio profile)' },
  ],
  ramMiB: 2048,
  diskGB: 8,
  services: 4,
  sizingNote:
    'Core (kong 512 + auth 256 + rest 256 + db 768 MiB) fits the 2 GiB plan with headroom - measured idle is ~600 MiB. Enabling the studio profile adds ~768 MiB: size up to 4 GiB while it is on, or toggle it only when needed.',
  faq: [
    {
      q: 'What do I give up versus the full Supabase stack?',
      a: 'Realtime (websocket change streams), Storage (file uploads), edge functions, the connection pooler, and image transforms. Database, auth, row-level security, and the REST/GraphQL API - the core most apps are built on - are all here.',
    },
    {
      q: 'Does supabase-js still work?',
      a: 'Yes, for everything this stack serves: createClient against your Kong URL, then auth flows and from()/rpc() queries work unchanged. Calls to realtime channels or storage buckets will fail - those services are not running.',
    },
    {
      q: 'Can I upgrade to the full stack later?',
      a: 'Yes - both templates use the same supabase-postgres image and init SQL, so the database volume carries over. Deploy the full supabase template pointing at your data and the extra services join around it.',
    },
    {
      q: 'Why is this stable when the full template is experimental?',
      a: 'Four services with fixed wiring are a much smaller surface than eleven with optional profiles. The core path (db, auth, rest, kong) is boot-tested end to end and changes rarely upstream.',
    },
    {
      q: 'Is $13/month really cheaper than Supabase Cloud free tier?',
      a: 'The cloud free tier is $0 - but it pauses projects after a week of inactivity and caps at two projects. This is for the step after: always-on, no meters, your infrastructure, still an order of magnitude less than running the full stack.',
    },
  ],
};
