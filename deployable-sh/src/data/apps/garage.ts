import type { AppBase } from './index';

export const garage: AppBase = {
  slug: 'garage',
  name: 'Garage',
  upstream: 'Garage (Deuxfleurs)',
  upstreamUrl: 'https://garagehq.deuxfleurs.fr',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline:
    'The maintained S3-compatible object store - where the self-hosting world went after MinIO archived.',
  category: 'Object Storage',
  status: 'stable',
  seoTitle: 'Self-host Garage: the S3-compatible MinIO successor',
  seoDescription:
    'Deploy Garage - the actively-maintained S3-compatible object store (single Rust binary, AGPL) with a management web UI - in one step for $25/month. The post-MinIO answer for self-managed S3.',
  keywords: [
    'self-host garage s3',
    'garage object storage docker',
    'minio alternative 2026',
    'minio replacement',
    's3 compatible self-hosted',
    'garage webui',
  ],
  intro: [
    'The self-hosted S3 story changed in 2026: MinIO archived its open-source repository in April, its Docker image froze in September 2025 (with an October CVE fix that never shipped), and its console had already been reduced to an object browser. Garage is where the community went - a single static Rust binary from Deuxfleurs, AGPL, releasing steadily, designed for self-hosting from day one.',
    'This template ships Garage v2.3 with the community-standard garage-webui in front (cluster status, buckets, keys, object browsing - more than MinIO’s gutted console offered). Configuration is a baked TOML with secrets in env, and the one-time init - layout plus first bucket and key - is four documented commands in the app shell.',
    'Same honest scoping as the old minio page: Miget’s native Buckets remain the lower-ops choice for plain storage; Garage is for when you specifically want self-managed S3 with full control.',
  ],
  features: [
    'Full S3 API: path-style, presigned URLs, every S3 SDK works',
    'Single static Rust binary - sips RAM, releases actively',
    'garage-webui: buckets, keys, cluster status, object browser',
    'Baked single-node config; scales to real clusters upstream',
    'AGPL with a non-profit steward - no rug to pull',
    'Drop-in for the catalogue’s filestash/sftpgo S3 frontends',
  ],
  topology: [
    { service: 'garage', role: 'S3 API :3900 + admin API :3903', isPublic: 'no' },
    { service: 'webui', role: 'management UI (:3909)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> webui', isPublic: 'yes' },
  ],
  requiredVars: [
    { name: 'GARAGE_RPC_SECRET / GARAGE_ADMIN_TOKEN', what: 'cluster secret + admin API token' },
  ],
  ramMiB: 1408,
  diskGB: 21,
  services: 3,
  sizingNote:
    'Garage targets 1 GB RAM hardware - it idles far below that. The data volume is the dial; the documented 4-command init assigns its capacity to the layout.',
  faq: [
    {
      q: 'What exactly happened to MinIO?',
      a: 'Image publishing stopped September 2025, an October CVE fix never shipped as an image, the repo entered maintenance in December, and the project was archived April 2026 with users pointed at the commercial AIStor. Our minio template remains, pinned to the last image with this history documented - but new deployments should land here.',
    },
    {
      q: 'Do my S3 tools work against Garage?',
      a: 'Yes - endpoint http://garage:3900, region "garage", path-style addressing: boto3, the AWS CLI, rclone, and the catalogue’s filestash and sftpgo all behave normally. Keys and buckets come from the 4-command init or the web UI afterward.',
    },
    {
      q: 'Why is there a one-time init step?',
      a: 'Garage is honestly a clustered system that also runs single-node: the layout step tells it which node owns how much capacity. Four commands in the app shell, once, documented in the README - the price of an architecture that scales to real multi-node later.',
    },
  ],
};
