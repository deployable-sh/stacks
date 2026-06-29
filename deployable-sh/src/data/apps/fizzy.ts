import type { AppBase } from './index';

export const fizzy: AppBase = {
  slug: 'fizzy',
  name: 'Fizzy',
  upstream: 'Fizzy (37signals)',
  upstreamUrl: 'https://www.fizzy.do',
  tagline: '37signals’ free kanban - fast boards for bugs, issues, and ideas. Trello without the per-seat bill.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Fizzy: 37signals’ free open-source kanban',
  seoDescription:
    'Deploy Fizzy - the free kanban board from the makers of Basecamp - as a single container with SQLite. A fast Trello / Asana alternative on your own domain for the price of a small plan.',
  keywords: [
    'self-host fizzy',
    'fizzy 37signals docker',
    'trello alternative self-hosted',
    'kanban open source',
    'asana alternative self-hosted',
    'fizzy kanban self-host',
  ],
  intro: [
    'Fizzy is 37signals’ free kanban: fast, focused boards for bugs, issues, ideas, and small projects - "kanban as it should be, not as it has been." It is a deliberately simple Trello / Asana alternative from the makers of Basecamp, with auto-closing stale cards, webhooks to Slack or Campfire, public boards, and native mobile apps.',
    'Like the rest of the 37signals stack it is a Rails app behind Thruster, backed by SQLite, in one container. This template sets HTTP_PORT to 5000 and DISABLE_SSL=true (Miget terminates TLS), so there is no wrapper or sidecar - the board, its cards, and uploads all live on a single volume.',
    'The software is free, so the per-seat math that makes hosted kanban expensive simply disappears: one small plan covers the whole team, and the data sits on infrastructure you own.',
  ],
  features: [
    'Fast kanban boards for bugs, issues, and ideas',
    'Auto-close stale cards, public boards, native mobile apps',
    'Webhooks to Slack and Campfire',
    'Single container: SQLite + uploads on one volume',
    'Thruster front-end; HTTP_PORT=5000, no proxy wrapper',
    'Free software (O’Saasy source-available license)',
  ],
  topology: [
    { service: 'fizzy', role: 'kanban boards (:5000)', isPublic: 'yes' },
    { service: 'storage volume', role: 'SQLite + uploads', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'Rails secret (openssl rand -hex 64)' },
    { name: 'BASE_URL', what: 'the app’s https domain, set after first deploy' },
  ],
  ramMiB: 512,
  diskGB: 3,
  services: 1,
  sizingNote: 'A Rails app plus Thruster idles comfortably in 512 MiB; the Hobby plan covers it. SMTP (invites) and VAPID (push) are optional env. Keep replicas at 1 (single SQLite file).',
  faq: [
    {
      q: 'Is Fizzy free?',
      a: 'Yes - Fizzy is free to self-host. The source is published under 37signals’ O’Saasy license, which lets you run it for your own use freely; it only prevents you from reselling Fizzy itself as a competing hosted service.',
    },
    {
      q: 'What does this save vs Trello or Asana?',
      a: 'Trello Standard is $6/user/month and Premium $12.50, and Asana Starter is $13.49/user - all per seat, so a 10-person team runs $60-135/month. Fizzy is free software on one small Miget plan for the whole team.',
    },
    {
      q: 'How does it reach port 5000?',
      a: 'Fizzy serves through Thruster, which reads HTTP_PORT. The template sets HTTP_PORT=5000 and DISABLE_SSL=true so it listens on Miget’s public port with plain HTTP behind Miget’s TLS termination - no wrapper needed.',
    },
  ],
};
