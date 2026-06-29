import type { AppBase } from './index';

export const paperlessNgx: AppBase = {
  slug: 'paperless-ngx',
  name: 'Paperless-ngx',
  upstream: 'Paperless-ngx',
  upstreamUrl: 'https://docs.paperless-ngx.com',
  tagline: 'Scan, OCR, and full-text-search every document you own - the paperless office, on your infrastructure.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Paperless-ngx: document management with OCR',
  seoDescription:
    'Deploy Paperless-ngx - OCR, auto-tagging, and full-text search over all your documents - in one step on a managed Postgres for $25/month. The self-hosted document archive everyone loves.',
  keywords: [
    'self-host paperless-ngx',
    'paperless docker compose',
    'document management self-hosted',
    'ocr document archive',
    'paperless ngx setup',
    'scan to searchable pdf',
  ],
  intro: [
    'Paperless-ngx is the project that finally killed the filing cabinet: feed it scans, PDFs, and emails, and it OCRs every page, auto-tags by content, and makes the whole archive instantly full-text searchable. It is one of the most beloved self-hosted apps in existence - the thing people show friends to explain why they self-host at all.',
    'This template runs the all-in-one image (web, OCR worker, scheduler, and consumer together under s6) on a managed Postgres with a noeviction Valkey queue. Documents, the search index, and the consume directory share one 20 GB volume - media has no S3 backend upstream, so the volume is the right shape.',
    'One admin variable, your OCR language, and a folder you drop files into. Everything else - classification, tagging rules, correspondents - it learns.',
  ],
  features: [
    'OCR to searchable PDF/A with auto-tagging and classification',
    'Full-text search across the entire archive',
    'Consume folder, web upload, email ingestion, and a mobile-friendly UI',
    'Managed Postgres + noeviction Valkey; single all-in-one container',
    'Document versioning, audit log, and saved views',
    'GPL-3.0, hugely active community',
  ],
  topology: [
    { service: 'paperless', role: 'web + OCR worker + consumer (:5000)', isPublic: 'yes' },
    { service: 'broker / db', role: 'noeviction Valkey / managed Postgres', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'PAPERLESS_SECRET_KEY / PAPERLESS_ADMIN_PASSWORD / REDIS_AUTH', what: 'core secrets + first admin' },
    { name: 'PAPERLESS_URL', what: 'the app’s https domain after first deploy' },
  ],
  ramMiB: 3328,
  diskGB: 25,
  services: 3,
  sizingNote: 'OCR is the RAM-hungry step - 2 GiB for the app handles steady ingestion; big batch imports appreciate more. The 20 GB volume holds documents and the index.',
  faq: [
    {
      q: 'What does it actually do to my documents?',
      a: 'On ingestion: OCRs the pages (so scans become searchable), generates an archival PDF/A, extracts a thumbnail, and classifies it - assigning tags, a correspondent, and a document type based on rules and what it has learned. Then it is searchable forever.',
    },
    {
      q: 'How do documents get in?',
      a: 'Three ways: upload in the web UI, drop files into the consume directory (synced via the catalogue’s filebrowser/sftpgo or a scanner), or pipe email in. The API covers programmatic ingestion.',
    },
    {
      q: 'Why one big volume instead of managed storage?',
      a: 'Paperless keeps originals, the archive copies, and the search index on disk and has no S3 backend for media - so a single RWO volume is the honest design. Back that one volume up and your entire archive is portable.',
    },
  ],
};
