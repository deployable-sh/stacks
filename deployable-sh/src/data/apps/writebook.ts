import type { AppBase } from './index';

export const writebook: AppBase = {
  slug: 'writebook',
  name: 'Writebook',
  upstream: 'Writebook (37signals)',
  upstreamUrl: 'https://once.com/writebook',
  tagline: '37signals’ free publishing tool - write and share books, manuals, and docs from your own domain.',
  category: 'CMS & Publishing',
  status: 'stable',
  seoTitle: 'Self-host Writebook: 37signals’ free publishing tool',
  seoDescription:
    'Deploy Writebook - the free, self-hosted book and documentation publisher from the makers of Basecamp - as a single container with SQLite. A clean reader on your own domain for the price of a small plan.',
  keywords: [
    'self-host writebook',
    'writebook docker compose',
    '37signals writebook self-hosted',
    'gitbook alternative self-hosted',
    'publish books online self-hosted',
    'once writebook',
  ],
  intro: [
    'Writebook is 37signals’ free publishing tool: write and share books, manuals, and documentation with a clean, fast reader on your own domain. It is the same Rails stack that runs Basecamp and HEY, distributed as a single Docker image and given away at no cost.',
    'It runs behind Thruster, 37signals’ HTTP/2 proxy, so this template just sets HTTP_PORT to 5000 and DISABLE_SSL=true (Miget terminates TLS) - no wrapper, no sidecar. The content lives in SQLite and uploaded images sit alongside it, so the whole thing is one self-contained container on one volume.',
    'Because the software itself is free, there is no per-book or per-seat bill to escape - the only cost is the small plan it runs on. Publishing platforms that host the same thing take a cut or charge per editor; Writebook serves it from infrastructure you own.',
  ],
  features: [
    'Books, manuals, and docs with a clean, fast reader',
    'The Basecamp/HEY Rails stack, given away free',
    'Single container: SQLite + image uploads on one volume',
    'Thruster front-end; HTTP_PORT=5000, no proxy wrapper',
    'Your content on your own domain, no platform cut',
    'MIT-licensed source',
  ],
  topology: [
    { service: 'writebook', role: 'publisher + reader (:5000)', isPublic: 'yes' },
    { service: 'storage volume', role: 'SQLite + uploaded images', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'Rails secret (openssl rand -hex 64)' },
  ],
  ramMiB: 512,
  diskGB: 5,
  services: 1,
  sizingNote: 'A Rails app plus Thruster idles comfortably in 512 MiB; the Hobby plan covers it. Size the volume to your images. Keep replicas at 1 (single SQLite file).',
  faq: [
    {
      q: 'Is Writebook really free?',
      a: 'Yes. 37signals released Writebook at no cost and put the source under the MIT license. There is no purchase, no license server, and no per-book fee - you only pay for the small Miget plan it runs on.',
    },
    {
      q: 'How does it get onto port 5000 without a wrapper?',
      a: 'Writebook serves through Thruster, which reads HTTP_PORT. This template sets HTTP_PORT=5000 so it listens on Miget’s public port, and DISABLE_SSL=true so Rails does not force HTTPS redirects behind Miget’s TLS termination.',
    },
    {
      q: 'What should I compare it to?',
      a: 'GitBook charges per editor for hosted docs and Leanpub takes a royalty on sales; Notion-as-a-site is per seat. Writebook does the same job - polished, readable publishing - as free software on your own domain.',
    },
  ],
};
