import type { AppBase } from './index';

export const beszel: AppBase = {
  slug: 'beszel',
  name: 'Beszel',
  upstream: 'Beszel',
  upstreamUrl: 'https://beszel.dev',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline: 'A tiny, beautiful server monitoring hub - CPU, memory, disk, Docker stats, alerts. Datadog it is not.',
  category: 'Monitoring & Analytics',
  status: 'stable',
  seoTitle: 'Self-host Beszel: lightweight server monitoring',
  seoDescription:
    'Deploy the Beszel hub - a tiny, fast server monitoring dashboard for CPU, memory, disk, network, and Docker container stats, with history and alerts. Install agents on your own machines and point them here.',
  keywords: [
    'self-host beszel',
    'beszel docker compose',
    'lightweight server monitoring',
    'datadog alternative self-hosted',
    'docker monitoring self-hosted',
    'beszel hub',
  ],
  intro: [
    'Beszel is a refreshingly small server monitoring tool: CPU, memory, disk, network, temperatures, and per-container Docker stats, with history and configurable alerts (email, webhooks, ntfy, and more). The hub is a single Go binary embedding PocketBase, so it idles in well under 256 MB.',
    'This template deploys the hub - the dashboard and database. The actual metrics come from lightweight agents you install on the machines you want to watch (your own VPS, bare-metal, or home server). An agent inside a Miget container would only see its own sandbox, so agents are not deployed here; install them where your workloads run and point them at this hub.',
    'A thin wrapper sets the hub’s listen port to 5000 (its only port control is a command-line flag). Everything else is one volume and the embedded database - about as light as a monitoring stack gets.',
  ],
  features: [
    'CPU, memory, disk, network, temps, and Docker stats',
    'History plus alerts (email, webhook, ntfy, and more)',
    'Tiny footprint - Go binary + embedded PocketBase',
    'Multi-system dashboard from one hub',
    'Agents installed on your own machines (not on the PaaS)',
    'MIT-licensed; port-5000 wrapper',
  ],
  topology: [
    { service: 'beszel', role: 'monitoring hub + dashboard (:5000)', isPublic: 'yes' },
    { service: 'agents', role: 'installed on your own machines, dial back to the hub', isPublic: 'n/a' },
  ],
  requiredVars: [
    { name: '(none)', what: 'first account on first visit becomes admin' },
    { name: 'APP_URL', what: 'optional: the https domain (links + agent registration)' },
  ],
  ramMiB: 256,
  diskGB: 2,
  services: 1,
  sizingNote: 'The hub is tiny - 256 MiB is generous. It scales with the number of systems and your retention window, both small. Agents run on the hosts you monitor, not here.',
  faq: [
    {
      q: 'Why is only the hub deployed, not the agent?',
      a: 'The agent monitors a real host (CPU, disk, Docker socket). Inside a Miget container it would only see its own sandbox, which is useless. So you deploy the hub here and install agents on the actual machines you want to watch - they dial back to this hub.',
    },
    {
      q: 'What does this save vs Datadog?',
      a: 'Datadog and similar bill per host per month and meter retention. Beszel is one tiny ~$5/month plan watching as many of your machines as you like, with the data on your own infrastructure.',
    },
    {
      q: 'How do I add a machine?',
      a: 'In the hub UI, add a system to get its install command, then run that agent on the target machine. It connects back to the hub over the network (SSH-key or token auth), and the dashboard starts showing its metrics.',
    },
  ],
};
