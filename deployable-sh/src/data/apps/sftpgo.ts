import type { AppBase } from './index';

export const sftpgo: AppBase = {
  slug: 'sftpgo',
  name: 'SFTPGo',
  upstream: 'SFTPGo',
  upstreamUrl: 'https://sftpgo.com',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline:
    'The upload portal for Miget Buckets - per-user S3 storage, share-upload links for outsiders, optional SFTP.',
  category: 'Object Storage',
  status: 'stable',
  seoTitle: 'Self-host SFTPGo: S3-backed upload portal with share links',
  seoDescription:
    'Deploy SFTPGo - per-user S3-backed storage (Miget Buckets), write-enabled share links for external uploads, and optional SFTP/WebDAV - for $5/month. The client-file-exchange answer.',
  keywords: [
    'self-host sftpgo',
    'sftpgo docker compose',
    's3 upload portal',
    'client file upload self-hosted',
    'sftp to s3 gateway',
    'wetransfer alternative self-hosted',
  ],
  intro: [
    'Every agency and consultancy has the same recurring problem: getting large files FROM clients. SFTPGo solves it elegantly - create a share-upload link (password, expiry, usage caps) and the client uploads straight into a Miget Bucket folder, no account, no WeTransfer.',
    'Underneath is a serious multi-protocol file server: each user’s filesystem can BE an S3 bucket (custom endpoint, forced path-style, per-user key prefix to confine them to a folder), fronted by a web client, and optionally real SFTP over a custom TCP port or WebDAV.',
    'A single AGPL Go binary at ~50 MB, with a proper admin UI and REST API for automation - the smallest template in the catalogue that replaces an entire category of file-exchange SaaS.',
  ],
  features: [
    'Per-user S3 backends: bucket + endpoint + key prefix per user',
    'Share links: read AND write (upload) with password/expiry/caps',
    'Web client for users; admin UI + REST API for you',
    'Optional SFTP (custom TCP port) and WebDAV fronts',
    'Env-bootstrapped admin; SQLite state on a small volume',
    '~50 MB Go binary, actively maintained, AGPL',
  ],
  topology: [
    { service: 'sftpgo', role: 'web admin + client (:5000); SFTP :2022 project-internal', isPublic: 'web yes; SFTP via optional custom TCP port' },
  ],
  requiredVars: [{ name: 'ADMIN_PASSWORD', what: 'admin login at /web/admin' }],
  ramMiB: 512,
  diskGB: 6,
  services: 1,
  sizingNote:
    'The binary is tiny; uploads stream through to the bucket. The home volume only matters for users you deliberately keep volume-backed.',
  faq: [
    {
      q: 'How do client uploads work without accounts?',
      a: 'Create a user mapped to a bucket prefix, then issue a write-enabled share link with a password and expiry. The client opens the link in a browser and drops files - they land in your bucket folder, and the link can self-expire after N uses.',
    },
    {
      q: 'Can I offer real SFTP?',
      a: 'Yes - SFTPGo listens on :2022 inside the project; add a public custom TCP port on the app and map it, and classic SFTP clients connect with per-user credentials while reading/writing the same buckets.',
    },
    {
      q: 'How is each user wired to a Miget Bucket?',
      a: 'In the admin UI: filesystem provider "AWS S3 (compatible)", bucket name, the bucket’s S3 endpoint, keys, force-path-style on, and an optional key prefix to confine the user to a subfolder. Scriptable via the REST API for onboarding automation.',
    },
  ],
};
