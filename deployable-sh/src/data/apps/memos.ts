import type { AppBase } from './index';

export const memos: AppBase = {
  slug: 'memos',
  name: 'Memos',
  upstream: 'Memos',
  upstreamUrl: 'https://usememos.com',
  tagline: 'The lightweight note hub - markdown thoughts captured in seconds, on your own $5 server.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Memos: lightweight markdown notes',
  seoDescription:
    'Deploy Memos - quick markdown notes with tags, search, and sharing in a single Go binary on SQLite - for $5/month. 40k-star privacy-first note-taking.',
  keywords: [
    'self-host memos',
    'memos docker compose',
    'note taking self-hosted',
    'markdown notes server',
    'usememos setup',
    'private notes app',
  ],
  intro: [
    'Memos occupies the sweet spot note apps keep abandoning: fast capture of markdown thoughts with tags and search, no folders to file into, no sync subscription, no lock-in. A single MIT-licensed Go binary on SQLite - 40k stars of people who wanted exactly this.',
    'One container, one volume, one rule: the first signup becomes the admin, so claim your instance right after deploy. A first-class REST API feeds the community’s mobile clients and your own scripts.',
  ],
  features: [
    'Instant markdown capture with tags and full-text search',
    'Selective sharing of individual memos',
    'First-class REST API; community mobile clients',
    'Single Go binary + SQLite - one small volume',
    'MIT, active, 40k+ stars',
  ],
  topology: [{ service: 'memos', role: 'notes hub (:5000)', isPublic: 'yes - first signup becomes admin' }],
  requiredVars: [],
  ramMiB: 256,
  diskGB: 2,
  services: 1,
  sizingNote: 'Notes are small; so is this. Claim the instance immediately - first signup is the Host account, then close registration in settings.',
  faq: [
    {
      q: 'Memos or a full wiki like Outline?',
      a: 'Memos is for capture - thoughts, snippets, links, journal lines - not document hierarchies. Teams wanting structured docs want a wiki; individuals wanting a second brain inbox want this. Many run both.',
    },
    {
      q: 'Where does my data live and can I leave?',
      a: 'A SQLite file and assets on the volume - the most portable storage there is. Export via API or copy the database; no proprietary format anywhere.',
    },
    {
      q: 'Can multiple people use it?',
      a: 'Yes - the Host invites users (or leaves registration open on a trusted domain), and memos are private per-user unless shared. For heavy multi-user, the Postgres driver is one env pair away.',
    },
  ],
};
