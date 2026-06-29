import type { AppBase } from './index';

export const docmost: AppBase = {
  slug: 'docmost',
  name: 'Docmost',
  upstream: 'Docmost',
  upstreamUrl: 'https://docmost.com',
  tagline: 'A real Confluence / Notion alternative - collaborative wiki on managed Postgres + Valkey + Buckets, no per-seat bill.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Docmost: open-source Confluence and Notion alternative',
  seoDescription:
    'Deploy Docmost - real-time collaborative wiki and docs with spaces, permissions, diagrams, and search - on managed Postgres, Valkey, and Miget Buckets. One flat plan instead of $20/seat.',
  keywords: [
    'self-host docmost',
    'docmost docker compose',
    'confluence alternative self-hosted',
    'notion alternative open source',
    'team wiki self-hosted',
    'collaborative documentation',
  ],
  intro: [
    'Docmost is open-source team documentation done properly: real-time block editing, nested spaces, granular permissions, inline comments, and diagrams (Draw.io, Excalidraw, Mermaid). It is the rare self-hosted wiki polished enough to replace Confluence or Notion without anyone grumbling.',
    'The template runs Docmost on a managed Postgres (with pgvector for search) and a managed Valkey, with attachments on a Miget Bucket. Point storage at the Bucket and the app container is effectively stateless - content is in Postgres, files in object storage.',
    'The reason to self-host is the per-seat math: collaborative doc tools charge per person every month, which punishes you for growing the team. Docmost is one flat plan for everyone, with the content sitting in a database you can query and back up.',
  ],
  features: [
    'Real-time collaborative editor with nested spaces',
    'Granular permissions, comments, and page history',
    'Diagrams: Draw.io, Excalidraw, Mermaid',
    'Full-text search backed by Postgres + pgvector',
    'Attachments on a Miget Bucket - app stays stateless',
    'AGPL-3.0; official image, no per-seat metering',
  ],
  topology: [
    { service: 'docmost', role: 'wiki + editor (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'managed Postgres + pgvector', isPublic: 'no' },
    { service: 'redis', role: 'managed Valkey (sessions/queues)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'APP_SECRET', what: 'signs sessions and tokens (openssl rand -hex 32)' },
    { name: 'STORAGE_DRIVER=s3 + AWS_S3_*', what: 'a Miget Bucket for attachments' },
    { name: 'APP_URL', what: 'the https domain, set after first deploy' },
  ],
  ramMiB: 2304,
  diskGB: 10,
  services: 3,
  sizingNote: '1 GiB serves a team comfortably. Disk is just the Postgres footprint; attachments live in the Bucket, so the app does not grow a volume.',
  faq: [
    {
      q: 'What does this save vs Confluence or Notion?',
      a: 'Confluence Standard is about $5.16/user/month and Notion Business is $20/seat - $200/month for a 10-person team. Docmost is one flat plan (roughly $13-25/month) for the whole team, with content in a Postgres you own.',
    },
    {
      q: 'Why put attachments on a Bucket instead of a volume?',
      a: 'With STORAGE_DRIVER=s3 pointed at a Miget Bucket, every uploaded file lives in object storage and the app holds no local state. That keeps redeploys and rollbacks clean and lets storage grow independently of the app.',
    },
    {
      q: 'Is the editor actually real-time?',
      a: 'Yes - Docmost uses a collaborative editor backed by Valkey, so multiple people edit the same page live, with comments and page history. It is closer to Notion’s feel than to a static wiki.',
    },
  ],
};
