import type { AppBase } from './index';

export const calcom: AppBase = {
  slug: 'calcom',
  name: 'Cal.com',
  upstream: 'Cal.com',
  upstreamUrl: 'https://cal.com',
  tagline: 'Open-source scheduling - booking pages, availability, team round-robin. Calendly without the per-seat bill.',
  category: 'Scheduling',
  status: 'stable',
  seoTitle: 'Self-host Cal.com: the open-source Calendly alternative',
  seoDescription:
    'Deploy Cal.com - booking pages, availability rules, team round-robin, workflows, and calendar sync - stateless on a managed Postgres. A flat-priced Calendly alternative on your own domain.',
  keywords: [
    'self-host cal.com',
    'calcom docker compose',
    'calendly alternative self-hosted',
    'open source scheduling',
    'booking page self-hosted',
    'cal.com miget',
  ],
  intro: [
    'Cal.com is open-source scheduling done properly: personal and team booking pages, fine-grained availability, round-robin and collective events, reminders and workflows, routing forms, and two-way sync with Google, Office 365, and CalDAV calendars. It is the self-hosted answer to Calendly.',
    'The app is effectively stateless - every booking, event type, and connection lives in a managed Postgres - so this template is just the app plus the database. PORT moves it onto Miget’s public port with no wrapper, and migrations run on start.',
    'The reason to self-host is the same as always: scheduling tools meter features per seat, which scales with your team rather than your usage. Cal.com is one flat plan, on your own domain, with the booking data in a Postgres you control.',
  ],
  features: [
    'Personal and team booking pages with availability rules',
    'Round-robin, collective, and managed event types',
    'Workflows, reminders, and routing forms',
    'Two-way calendar sync (Google, Office 365, CalDAV)',
    'Stateless app on managed Postgres - disposable container',
    'AGPLv3 core; flat pricing instead of per-seat',
  ],
  topology: [
    { service: 'calcom', role: 'scheduling app (stateless, :5000)', isPublic: 'yes' },
    { service: 'db', role: 'managed Postgres (citext) - all state', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NEXTAUTH_SECRET', what: 'session secret (openssl rand -base64 32)' },
    { name: 'CALENDSO_ENCRYPTION_KEY', what: '32-byte AES key (openssl rand -base64 24)' },
    { name: 'NEXT_PUBLIC_WEBAPP_URL / NEXTAUTH_URL', what: 'the https domain' },
  ],
  ramMiB: 3072,
  diskGB: 10,
  services: 2,
  sizingNote: 'The Next.js app wants ~1.5-2 GiB (large image, slow first boot - allow a generous health-check grace). Postgres holds everything, so the app scales and rolls back cleanly.',
  faq: [
    {
      q: 'What does this save vs Calendly?',
      a: 'Calendly is $12-16/user/month and gates features per seat, so a team multiplies fast. Cal.com self-hosted is one flat plan for everyone, with your booking data on your own infrastructure.',
    },
    {
      q: 'Why does the database need the citext extension?',
      a: "Cal.com's Prisma migrations create a case-insensitive text type (citext) on start, so the managed Postgres is provisioned with that extension enabled. It is a standard contrib extension - the template wires it for you.",
    },
    {
      q: 'Is the self-hosted version limited?',
      a: 'The core scheduling app is AGPLv3 and fully functional self-hosted. Some enterprise features under the /ee directory need a paid license key, but booking pages, teams, availability, and calendar sync do not.',
    },
  ],
};
