import type { AppBase } from './index';

export const linkwarden: AppBase = {
  slug: 'linkwarden',
  name: 'Linkwarden',
  upstream: 'Linkwarden',
  upstreamUrl: 'https://linkwarden.app',
  tagline: 'A bookmark manager that preserves pages - screenshot, PDF, readable HTML - so your links never rot.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Linkwarden: bookmark manager with page archiving',
  seoDescription:
    'Deploy Linkwarden - bookmarks that auto-archive as screenshots, PDFs, and readable HTML - in one step on a managed Postgres for $25/month. Outlives Pocket and Raindrop.',
  keywords: [
    'self-host linkwarden',
    'linkwarden docker compose',
    'pocket alternative self-hosted',
    'raindrop alternative',
    'bookmark manager archiving',
    'link rot prevention',
  ],
  intro: [
    'Bookmarks are promises the web keeps breaking - the page moves, changes, or vanishes. Linkwarden fixes that by preserving every save: a screenshot, a PDF, a readable HTML copy, and an archive.org snapshot, alongside collections, tags, and full-text search across all of it.',
    'This template runs the app on a managed Postgres behind a thin proxy (its port is fixed at 3000). Page archiving uses an in-container headless Chromium, so give it about a gigabyte - or flip to a lighter bookmarks-only mode. Archived copies live on the volume.',
    'The case for owning this got made for us: Pocket shut down in 2025 and deleted everyone’s saved articles; Raindrop keeps your library on their servers. Linkwarden keeps both the links and readable copies on infrastructure you control.',
  ],
  features: [
    'Auto-preservation: screenshot, PDF, readable HTML, archive.org',
    'Collections, nested folders, tags, full-text search',
    'Browser extensions and a mobile app',
    'Sharing and collaborative collections',
    'Managed Postgres; archives on the volume',
    'AGPL-3.0',
  ],
  topology: [
    { service: 'linkwarden', role: 'app + archiving (:3000, fixed)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> linkwarden:3000', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NEXTAUTH_SECRET', what: 'session secret' },
    { name: 'NEXTAUTH_URL', what: 'the https domain WITH the /api/v1/auth suffix' },
  ],
  ramMiB: 2048,
  diskGB: 15,
  services: 3,
  sizingNote: 'Archiving runs Chromium - ~1 GiB with it on; set DISABLE_PRESERVATION=true for a lighter bookmarks-only deploy. Archives accumulate on the volume.',
  faq: [
    {
      q: 'Why archive pages instead of just saving links?',
      a: 'Because links die: studies put link rot in the double-digit-percent range within a few years. Linkwarden saves a screenshot, PDF, and readable copy at bookmark time, so a 404 later still leaves you the content you actually wanted.',
    },
    {
      q: 'What is the NEXTAUTH_URL gotcha?',
      a: 'It must include the /api/v1/auth path (e.g. https://links.example.com/api/v1/auth), not just the domain - the most common Linkwarden setup mistake. The README and env example both flag it.',
    },
    {
      q: 'Can I make it lighter?',
      a: 'Yes - set DISABLE_PRESERVATION=true to skip the Chromium archiving and run a bookmarks + tags + search service in well under a gigabyte. You lose the saved copies, keep everything else.',
    },
  ],
};
