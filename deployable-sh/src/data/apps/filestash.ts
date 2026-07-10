import type { AppBase } from './index';

export const filestash: AppBase = {
  slug: 'filestash',
  name: 'Filestash',
  upstream: 'Filestash',
  upstreamUrl: 'https://www.filestash.app',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline:
    'A polished web file manager over Miget Buckets - browse, preview, and share what lives in S3.',
  category: 'Object Storage',
  status: 'stable',
  seoTitle: 'Self-host Filestash: web file manager over S3 buckets',
  seoDescription:
    'Deploy Filestash - a fast web file manager with previews and share links over any S3-compatible bucket (Miget Buckets first) - for $7/month. Dropbox UX over storage you already own.',
  keywords: [
    'self-host filestash',
    'filestash docker compose',
    's3 file manager web',
    'web ui for s3 bucket',
    'miget buckets file manager',
    'dropbox alternative s3',
  ],
  intro: [
    'Buckets are where files live; Filestash is how humans use them: a fast web manager with previews (images, video, office documents), editing, and share links - over any S3-compatible backend, with path-style addressing always forced so Miget Buckets just work.',
    'The admin console pre-configures the connection (endpoint + keys, optionally pre-filled) so users land directly in the bucket. AGPL, very actively maintained, and famously light - the docs quote 128 MB.',
    'It completes a three-tool storage lane with distinct jobs: filebrowser (volume-backed simplicity), filestash (the bucket UI), sftpgo (the upload portal).',
  ],
  features: [
    'S3-compatible backends with forced path-style - buckets just work',
    'Previews: images, video, PDFs, office docs; in-browser editing',
    'Share links with password, expiry, and domain restriction',
    'Admin-preconfigured connections - users land in the bucket',
    'Pluggable auth (htpasswd/LDAP/OIDC) when you need it',
    '~128 MB, AGPL, shipped weekly',
  ],
  topology: [
    { service: 'filestash', role: 'file manager (:8334, no port env)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> filestash:8334', isPublic: 'yes' },
  ],
  requiredVars: [
    { name: '(none)', what: 'claim /admin on first visit, then configure the S3 connection there' },
  ],
  ramMiB: 640,
  diskGB: 1,
  services: 2,
  sizingNote:
    'State is just config (1 GB volume) - the files stay in the bucket. Big uploads stream through the proxy unbuffered.',
  faq: [
    {
      q: 'How does this relate to Miget’s own bucket UI?',
      a: 'The platform UI is for operating buckets; Filestash is for the humans who use the files daily - previews, editing, and share links you can hand to a client. Same bucket underneath, different audience.',
    },
    {
      q: 'Filestash, FileBrowser, or SFTPGo?',
      a: 'Filestash when the data lives in buckets and people need a rich UI over it. FileBrowser for the simplest volume-backed sharing. SFTPGo when outsiders must upload into buckets (share-upload links, per-user prefixes, SFTP). All three are $5-7/month.',
    },
    {
      q: 'What is the first-deploy checklist?',
      a: 'Visit /admin immediately (the first visitor sets the admin password), add the S3 connection with your bucket endpoint and keys, and set APPLICATION_URL to your domain. Two minutes, documented in the README.',
    },
  ],
};
