import type { AppBase } from './index';

export const minio: AppBase = {
  slug: 'minio',
  name: 'MinIO',
  upstream: 'MinIO',
  upstreamUrl: 'https://min.io',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  licenseNote: 'aggressive on branding/trademark',
  tagline:
    'S3-compatible object storage you fully control - single node, 20 GB volume, web console included.',
  category: 'Object Storage',
  status: 'stable',
  seoTitle: 'Self-host MinIO: S3-compatible object storage with Docker Compose',
  seoDescription:
    'Deploy MinIO - S3-compatible object storage with event hooks, lifecycle rules, and a web console - in one step. Flat-price S3 for apps that want storage close to compute.',
  keywords: [
    'self-host minio',
    'minio docker compose',
    's3 compatible storage self-hosted',
    's3 alternative',
    'minio setup',
    'object storage self-hosted',
  ],
  intro: [
    'MinIO is the reference implementation of "S3, but yours": the full S3 API - presigned URLs, multipart uploads, versioning, lifecycle (ILM) rules, bucket notifications - in a single Go binary. Every S3 SDK and tool works against it unchanged.',
    'This template runs a single node with a 20 GB volume and the web console as the public entrypoint. Root credentials come from two required variables; create scoped access keys in the console for each app. In-project apps hit http://minio:9000 with path-style addressing - object storage with zero egress fees and LAN latency to your compute.',
    'Worth knowing: Miget has native managed Buckets, which are the lower-ops choice for plain storage. Deploy MinIO when you specifically want MinIO - S3 event hooks driving workflows, ILM rules, or self-managed everything.',
  ],
  features: [
    'Full S3 API: presigned URLs, multipart, versioning, ILM lifecycle rules',
    'Bucket event notifications (webhooks, queues) for event-driven pipelines',
    'Web console for buckets, browsing, and access-key management',
    'Scoped access keys and S3-compatible bucket policies',
    'Works with every S3 SDK, mc, rclone, and backup tooling',
    'Single node + 20 GB volume; distributed mode is a future variant',
  ],
  topology: [
    { service: 'minio', role: 'S3 API :9000 (project-internal) + console (:5000 public)', isPublic: 'console' },
  ],
  requiredVars: [
    { name: 'MINIO_ROOT_USER / MINIO_ROOT_PASSWORD', what: 'console login + root S3 credentials; mint scoped keys per app' },
  ],
  ramMiB: 1024,
  diskGB: 20,
  services: 1,
  sizingNote:
    'Maintenance notice (June 2026): MinIO archived its open source in April 2026; this template pins the last published image (Sep 2025; console reduced to an object browser, one unpatched CVE since). It remains for MinIO-specific needs - new deployments should use the garage template, the actively maintained successor.',
  faq: [
    {
      q: 'When should I use MinIO instead of AWS S3 or R2?',
      a: 'When your compute lives next to it: zero egress fees, sub-millisecond latency, and no external dependency for dev/staging/internal apps. S3/R2 still win for global distribution and eleven-nines durability - single-node MinIO is one volume, so back up what matters.',
    },
    {
      q: 'Do existing S3 SDKs and tools work?',
      a: 'Yes - set the endpoint to http://minio:9000, use path-style addressing, and boto3, the AWS CLI, rclone, and every S3 client behave normally. Presigned URLs work for browser uploads too.',
    },
    {
      q: 'Should I use this or Miget’s native Buckets?',
      a: 'Native Buckets for plain managed storage - less to operate. This template is for MinIO-specific powers: S3 event notifications driving workers, ILM rules, versioning policies, or compliance reasons to self-manage the storage layer.',
    },
    {
      q: 'Can MinIO scale beyond one node?',
      a: 'Upstream MinIO does (distributed mode, 4+ nodes, erasure coding) and a cluster variant is on this catalogue’s roadmap. This template is deliberately single-node - the right shape for app storage measured in gigabytes, not petabytes.',
    },
  ],
};
