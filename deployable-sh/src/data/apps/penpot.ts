import type { AppBase } from './index';

export const penpot: AppBase = {
  slug: 'penpot',
  name: 'Penpot',
  upstream: 'Penpot',
  upstreamUrl: 'https://penpot.app',
  license: 'MPL-2.0',
  licenseTier: 'permissive',
  tagline: 'The open-source design & prototyping platform - the Figma alternative, with no per-seat ceiling.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Penpot: open-source Figma alternative',
  seoDescription:
    'Deploy Penpot - SVG-native design and prototyping with real dev handoff - in one step on a managed Postgres for $49/month. Unlimited designers; assets in Miget Buckets.',
  keywords: [
    'self-host penpot',
    'penpot docker compose',
    'figma alternative open source',
    'design tool self-hosted',
    'penpot setup',
    'open source prototyping',
  ],
  intro: [
    'Penpot is the design tool that does not hold your files hostage: web-based, SVG-native (so the output is real, open standard markup), with prototyping, design systems, and developer handoff - MPL-2.0, no seat ceiling. It became the open-source rallying point when Figma pricing and the Adobe saga rattled design teams.',
    'This template runs the full stack: the nginx frontend (fixed :8080, so a thin :5000 proxy fronts it), the JVM backend, and the Chromium exporter, on a managed Postgres with a noeviction Valkey. Crucially, point asset storage at a Miget Bucket (S3) and the shared RWX volume disappears - the backend goes stateless.',
    'Figma Professional is $16 per full seat per month; a ten-designer team is $160+ and climbing. Penpot self-hosted is $49/month flat, unlimited designers, files on your infrastructure.',
  ],
  features: [
    'SVG-native design, components, and design systems',
    'Interactive prototyping and developer handoff (inspect/code)',
    'Unlimited designers - no per-seat pricing',
    'Asset storage in Miget Buckets (S3) - stateless backend',
    'Managed Postgres + noeviction Valkey; Chromium exporter',
    'MPL-2.0',
  ],
  topology: [
    { service: 'frontend / web', role: 'SPA (nginx :8080) behind a :5000 proxy', isPublic: 'yes' },
    { service: 'backend / exporter', role: 'JVM API + Chromium export', isPublic: 'no' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'PENPOT_SECRET_KEY / REDIS_AUTH', what: 'core secrets' },
    { name: 'PENPOT_PUBLIC_URI', what: 'the app’s https domain after first deploy' },
    { name: 'PENPOT_OBJECTS_STORAGE_BACKEND=s3 + S3_*', what: 'recommended: a Miget Bucket, to drop the RWX volume' },
  ],
  ramMiB: 4224,
  diskGB: 15,
  services: 6,
  sizingNote: 'Backend JVM ~1.5 GiB, exporter Chromium ~1 GiB are the floors. With S3 asset storage the stack is volume-free apart from the managed Postgres.',
  faq: [
    {
      q: 'How does the cost compare to Figma?',
      a: 'Figma Professional is $16/full-seat/month ($20 monthly), plus Dev seats - a 10-designer team runs $160+/month and grows with headcount. Penpot here is $49/month flat with unlimited designers, and the files are open SVG on your infrastructure.',
    },
    {
      q: 'Why the proxy and the S3 recommendation?',
      a: 'Penpot’s frontend listens on a hardcoded :8080, so a 128 MiB nginx publishes it on the platform’s :5000. And with the filesystem asset backend, frontend and backend share an RWX volume - setting PENPOT_OBJECTS_STORAGE_BACKEND=s3 against a Miget Bucket removes that entirely and makes the backend disposable.',
    },
    {
      q: 'Is it really a Figma replacement?',
      a: 'For UI design, prototyping, design systems, and dev handoff - yes, and the SVG-native model means cleaner export. What you give up is Figma’s plugin ecosystem breadth and some polish; what you gain is open files, unlimited seats, and no vendor leverage over your design org.',
    },
  ],
};
