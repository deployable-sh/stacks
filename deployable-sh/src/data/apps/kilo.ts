import type { AppBase } from './index';

export const kilo: AppBase = {
  slug: 'kilo',
  name: 'Kilo (headless)',
  upstream: 'Kilo',
  upstreamUrl: 'https://kilo.ai',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  licenseNote: 'open-source AI coding agent',
  tagline:
    'Kilo in server mode - a persistent remote coding agent your IDE extension and CLI clients attach to.',
  category: 'AI Agents',
  status: 'experimental',
  seoTitle: 'Run Kilo as a headless server: persistent remote coding agent',
  seoDescription:
    'Deploy Kilo - the open-source AI coding agent - in headless server mode. Your IDE extension, kilo attach, and the Cloud Agents UI connect to a persistent agent with a 10 GB workspace.',
  keywords: [
    'kilo server mode',
    'kilo headless',
    'remote ai coding agent',
    'kilo serve setup',
    'kilo docker compose',
    'persistent coding agent server',
  ],
  intro: [
    'Kilo is an open-source AI coding agent; kilo serve is its headless mode - an HTTP+SSE API that Kilo clients attach to. Run it on a platform and the agent outlives your editor: the IDE extension, kilo attach from a terminal, or the Cloud Agents web UI (via Remote Connections) all connect to the same persistent brain.',
    'This template runs server mode behind HTTP basic auth with a 10 GB /workspace volume that survives redeploys. Clone your repos into the workspace once; every client that attaches sees the same state.',
    'Two variables: KILO_SERVER_PASSWORD for the API and ANTHROPIC_API_KEY (or configure another provider through Kilo’s config in the workspace). Prefer a terminal over an API? The agent-box template ships the Kilo CLI alongside Claude Code and opencode in a browser terminal.',
  ],
  features: [
    'kilo serve: HTTP+SSE API for IDE, CLI, and web clients',
    'Persistent 10 GB /workspace across redeploys',
    'Attach from the IDE extension, kilo attach, or Cloud Agents UI',
    'HTTP basic auth on the API',
    'Provider-flexible: Anthropic by default, others via Kilo config',
    'Single container, official open-source agent',
  ],
  topology: [
    { service: 'kilo', role: 'kilo serve - HTTP+SSE API (:5000)', isPublic: 'yes (basic auth)' },
  ],
  requiredVars: [
    { name: 'KILO_SERVER_PASSWORD', what: 'HTTP basic auth on the API' },
    { name: 'ANTHROPIC_API_KEY', what: 'model access, billed to you (other providers via Kilo config)' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    '2 GiB fits the agent runtime and typical repo tooling. Big monorepos or heavyweight builds in the workspace want the next plan up.',
  faq: [
    {
      q: 'What is the difference between Kilo and agent-box?',
      a: 'Interface. This template exposes Kilo’s server API for programmatic and IDE clients; agent-box gives you a browser terminal with the Kilo CLI (plus Claude Code and opencode) inside. Same agent family, API versus terminal.',
    },
    {
      q: 'How do I connect my IDE to it?',
      a: 'Point the Kilo extension (or kilo attach) at https://your-app-domain with KILO_SERVER_PASSWORD as the basic-auth credential. The Cloud Agents web UI connects the same way via Remote Connections.',
    },
    {
      q: 'Why run Kilo remotely instead of locally?',
      a: 'Persistence and reach: long tasks keep running after your editor closes, the workspace state is shared by every client you attach from, and a phone or tablet can check on (or redirect) the agent mid-task.',
    },
    {
      q: 'Why is this marked experimental?',
      a: 'Kilo’s server mode and remote-connection protocol are young and moving fast upstream. It works today; expect the template to track breaking changes. Pin image versions for stability.',
    },
  ],
};
