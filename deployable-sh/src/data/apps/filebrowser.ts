import type { AppBase } from './index';

export const filebrowser: AppBase = {
  slug: 'filebrowser',
  name: 'FileBrowser',
  upstream: 'FileBrowser',
  upstreamUrl: 'https://filebrowser.org',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'Upload, organize, and share files from a clean web UI - a 30 MB Go binary with share links and user scopes.',
  category: 'Object Storage',
  status: 'stable',
  seoTitle: 'Self-host FileBrowser: web file manager with share links',
  seoDescription:
    'Deploy FileBrowser - a fast web file manager with public share links, previews, and per-user scopes - in one step for $5/month. The simplest self-hosted file sharing there is.',
  keywords: [
    'self-host filebrowser',
    'filebrowser docker compose',
    'web file manager self-hosted',
    'file sharing self-hosted',
    'dropbox alternative simple',
    'filebrowser setup',
  ],
  intro: [
    'Sometimes the requirement is exactly this small: a place to put files, a UI to browse them, and a link to share one. FileBrowser is that tool with no ceremony - a single Apache-2.0 Go binary with previews, an editor, per-user scopes, and public share links, running non-root with a built-in healthcheck.',
    'This template is the catalogue’s simplest stateful deploy: one container, a files volume, an admin login from env. Released near-daily upstream and small enough that the $5 plan carries it with room to spare.',
    'Scope honesty: it shares and serves files, it does not host websites (Miget’s native static hosting does that) and it is volume-backed by design - the S3-backed manager lane belongs to Filestash.',
  ],
  features: [
    'Browse, upload, preview, edit - fast and keyboard-friendly',
    'Public share links with optional expiry',
    'Per-user accounts with scoped directories',
    'Non-root container, built-in healthcheck, ~30 MB',
    'Deterministic admin bootstrap from env',
    'Apache-2.0, very actively maintained',
  ],
  topology: [
    { service: 'filebrowser', role: 'web UI + share links (:5000)', isPublic: 'yes' },
  ],
  requiredVars: [{ name: 'FB_USERNAME / FB_PASSWORD', what: 'admin login' }],
  ramMiB: 256,
  diskGB: 9,
  services: 1,
  sizingNote: 'The binary idles around 30 MB; the files volume is the only real resource. Resize it as the library grows.',
  faq: [
    {
      q: 'FileBrowser or Filestash - which one?',
      a: 'FileBrowser for volume-backed personal/team file sharing with the least setup. Filestash when the backend should be S3 (Miget Buckets). For serving a whole website, use Miget’s native static hosting. Different jobs, different tools.',
    },
    {
      q: 'Can people without accounts receive files?',
      a: 'Yes - share links are public URLs (optionally time-limited) served from your domain. For inbound uploads from outsiders, SFTPGo’s share-upload links are the stronger tool.',
    },
    {
      q: 'Is it safe to expose?',
      a: 'It sits behind its own auth over the platform’s TLS, runs non-root, and has no system access beyond its volumes. Use a strong admin password and scoped users for anything shared.',
    },
  ],
};
