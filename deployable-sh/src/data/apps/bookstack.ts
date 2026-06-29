import type { AppBase } from './index';

export const bookstack: AppBase = {
  slug: 'bookstack',
  name: 'BookStack',
  upstream: 'BookStack',
  upstreamUrl: 'https://www.bookstackapp.com',
  tagline: 'A simple, beautiful wiki - shelves, books, chapters, pages. Confluence calm, on a self-hosted MariaDB.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host BookStack: the simple wiki and docs platform',
  seoDescription:
    'Deploy BookStack - a clean, organized wiki with shelves, books, chapters, and pages, WYSIWYG editing, search, and diagrams - on a self-hosted MariaDB. A friendly Confluence alternative, flat-priced.',
  keywords: [
    'self-host bookstack',
    'bookstack docker compose',
    'confluence alternative self-hosted',
    'wiki open source',
    'documentation platform self-hosted',
    'bookstack mysql',
  ],
  intro: [
    'BookStack is a wiki people actually enjoy using: content is organized into shelves, books, chapters, and pages, with a friendly WYSIWYG editor (markdown too), full-text search, draw.io diagrams, page revisions, roles and permissions, and an API. It is the calm, approachable alternative to Confluence.',
    'It is a Laravel app backed by a self-hosted MariaDB. The LinuxServer image listens on port 80 with no env var to change it, so this template uses a thin wrapper that patches the nginx config to serve port 5000. Uploads and config sit on one volume, or move them to a Miget Bucket to keep the app near-stateless.',
    'The case for self-hosting is the usual per-seat story: documentation tools bill per person every month. BookStack is one flat plan for the whole team, with the content in a MySQL database you own and can back up like any other.',
  ],
  features: [
    'Shelves, books, chapters, pages - structure that makes sense',
    'WYSIWYG and markdown editors, draw.io diagrams',
    'Full-text search, page revisions, roles and permissions',
    'Self-hosted MariaDB; optional Miget Bucket for uploads',
    'OIDC / LDAP / SAML SSO when you want it',
    'MIT-licensed, flat pricing, no per-seat metering',
  ],
  topology: [
    { service: 'bookstack', role: 'wiki (Laravel + nginx, :5000)', isPublic: 'yes' },
    { service: 'db', role: 'MariaDB 11 container (content)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'APP_KEY', what: 'Laravel key (base64:...), pinned - changing it breaks encryption' },
    { name: 'APP_URL', what: 'the https domain, matched exactly (no trailing slash)' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 2,
  sizingNote: 'A PHP-FPM + nginx app is comfortable in 1 GiB. Content lives in MySQL; uploads on the config volume (or a Bucket with STORAGE_TYPE=s3). Change the default admin on first login.',
  faq: [
    {
      q: 'What does this save vs Confluence?',
      a: 'Confluence Standard is about $5-6/user/month, so a 10-person team runs ~$50-60/month and climbs with headcount. BookStack is one flat plan for everyone, with the content in a MySQL you control.',
    },
    {
      q: 'Can uploads go to object storage?',
      a: 'Yes. Set STORAGE_TYPE=s3 plus the STORAGE_S3_* variables to keep images and attachments in a Miget Bucket. That leaves only the MySQL database as state and makes redeploys clean.',
    },
    {
      q: 'Why the wrapper, and what about the default admin?',
      a: 'The image’s nginx listens on port 80 with no env var, so a thin wrapper patches it to port 5000. On first login change the default admin (admin@admin.com / password) immediately.',
    },
  ],
};
