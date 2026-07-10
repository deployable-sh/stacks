import type { AppBase } from './index';

export const tooljet: AppBase = {
  slug: 'tooljet',
  name: 'ToolJet',
  upstream: 'ToolJet CE',
  upstreamUrl: 'https://www.tooljet.ai',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  licenseNote: 'AGPL core + ELv2 enterprise dirs',
  tagline:
    'Low-code internal tools with 50+ connectors - one container on a managed Postgres, no app caps, no seat pricing.',
  category: 'Internal Tools',
  status: 'stable',
  seoTitle: 'Self-host ToolJet: low-code app builder with Docker Compose',
  seoDescription:
    'Deploy ToolJet CE - the open-source low-code platform with visual builder, 50+ datasource connectors, and a built-in database - in one step with a managed Postgres. Flat price vs per-seat SaaS.',
  keywords: [
    'self-host tooljet',
    'tooljet docker compose',
    'retool alternative',
    'tooljet setup production',
    'low code self-hosted',
    'internal tool builder open source',
  ],
  intro: [
    'ToolJet is the modern entry in the internal-tools race: a visual app builder with 50+ datasource connectors, JavaScript and Python in queries, workflow automation, and a built-in spreadsheet-style database (PostgREST-backed) for when you have no datasource at all yet.',
    'This is the cleanest deployment in the Internal Tools category: the ToolJet server respects PORT, so it listens on :5000 directly - no proxy - and all state lives in Postgres, which Miget provisions as a managed service and auto-wires. The app container itself is stateless.',
    'Three generated secrets and you are building. ToolJet Cloud caps the free and Pro tiers by apps and end users; CE self-hosted has neither cap, which is exactly the property you want in a tool whose whole job is to multiply across your org.',
  ],
  features: [
    'Visual builder with 45+ UI components and responsive layouts',
    '50+ connectors: Postgres, MySQL, Mongo, REST, GraphQL, S3, Stripe, …',
    'JS and Python inside queries and transformations',
    'ToolJet Database: built-in PostgREST-backed tables, no setup',
    'Stateless app container on a managed Postgres - clean ops story',
    'No app caps or seat pricing in CE',
  ],
  topology: [
    { service: 'tooljet', role: 'server + builder UI (:5000); bundles PostgREST', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'session cookies (openssl rand -hex 64)' },
    { name: 'LOCKBOX_MASTER_KEY', what: 'datasource credential encryption (openssl rand -hex 32) - losing it orphans saved datasources' },
    { name: 'PGRST_JWT_SECRET', what: 'ToolJet Database JWT (openssl rand -hex 32)' },
    { name: 'TOOLJET_HOST', what: 'set to the app’s https domain after first deploy' },
  ],
  ramMiB: 3584,
  diskGB: 6,
  services: 2,
  sizingNote:
    '2 GiB for the server (official minimum is 2 GB / 1 vCPU) plus the managed Postgres. Note: the ToolJet image is x86_64-only.',
  faq: [
    {
      q: 'How does self-hosted ToolJet compare to ToolJet Cloud and Retool?',
      a: 'ToolJet Cloud Pro is $79/month flat but caps you at 5 apps and 100 end users; Retool Team lands ~$150/month for a small team and grows per seat. This stack is $25/month flat with no app or user caps - CE gates enterprise features (SSO, audit logs), not scale.',
    },
    {
      q: 'What is the ToolJet Database and do I need to set anything up?',
      a: 'A built-in, spreadsheet-style data store backed by PostgREST (bundled in the image). It uses its own database (tooljet_db) on the same Postgres server, created automatically on first boot - you just provide PGRST_JWT_SECRET.',
    },
    {
      q: 'Where does ToolJet store its state?',
      a: 'Entirely in Postgres - apps, queries, users, encrypted datasource credentials. The container is stateless and needs no volume, so redeploys are clean and the managed database carries the persistence story.',
    },
    {
      q: 'What happens if I lose LOCKBOX_MASTER_KEY?',
      a: 'Saved datasource credentials become undecryptable and must be re-entered. Apps and queries survive. Store the key in a password manager the day you generate it, same discipline as n8n’s encryption key.',
    },
  ],
};
