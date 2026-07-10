import type { AppBase } from './index';

export const hermes: AppBase = {
  slug: 'hermes',
  name: 'Hermes Agent',
  upstream: 'Hermes Agent (Nous Research)',
  upstreamUrl: 'https://hermes-agent.nousresearch.com',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  licenseNote: 'Nous Research',
  tagline:
    'Nous Research’s self-improving agent - learns skills from experience, with cron, hooks, and a web dashboard.',
  category: 'AI Agents',
  status: 'experimental',
  seoTitle: 'Self-host Hermes Agent (Nous Research) with Docker Compose',
  seoDescription:
    'Deploy Hermes Agent - a self-improving AI agent with a learning loop, scheduled tasks, hooks, and a web dashboard - on your own infrastructure in one step.',
  keywords: [
    'self-host hermes agent',
    'nous research hermes',
    'self-improving ai agent',
    'hermes agent docker',
    'ai agent learning loop',
    'hermes agent setup',
  ],
  intro: [
    'Hermes Agent is Nous Research’s take on agents that get better at your tasks: a learning loop distills successful sessions into reusable skills, so the agent you run in month two is measurably more capable at your workflows than the one you deployed. Plus the practical machinery - cron, hooks, a web dashboard.',
    'This template runs the official image as a single container with a 5 GB /opt/data volume where everything persistent lives: sessions, memories, learned skills, and config. The dashboard sits behind basic auth on your domain; the gateway API stays project-internal unless you opt in.',
    'Like every agent in this catalogue: treat it as a privileged deployment. It runs on your Anthropic API key with a persistent memory - scope the key, cap the spend, and enjoy having an employee who files their own learnings.',
  ],
  features: [
    'Learning loop: successful sessions become reusable skills',
    'Persistent memories, sessions, and skills on the /opt/data volume',
    'Cron-style scheduled tasks and event hooks',
    'Web dashboard behind basic auth',
    'Optional project-internal gateway API for programmatic access',
    'Official Nous Research image, single container',
  ],
  topology: [
    { service: 'hermes', role: 'agent + dashboard (:5000); gateway API :8642 internal', isPublic: 'yes (basic auth)' },
  ],
  requiredVars: [
    { name: 'HERMES_PASSWORD', what: 'dashboard basic auth' },
    { name: 'HERMES_SESSION_SECRET', what: 'session secret (openssl rand -hex 32)' },
    { name: 'ANTHROPIC_API_KEY', what: 'the agent’s model access, billed to you' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    '2 GiB suits the agent runtime; model inference happens via API. The 5 GB volume is where the interesting part - accumulated skills and memories - lives, so back it up if the agent becomes load-bearing.',
  faq: [
    {
      q: 'What makes Hermes different from other self-hosted agents?',
      a: 'The learning loop: it reviews its own successful sessions and distills them into skills it applies to future tasks. Most agents start from zero every session; Hermes is designed to compound.',
    },
    {
      q: 'Why is this template marked experimental?',
      a: 'Hermes Agent’s deployment shape is still stabilizing upstream - image layout and config evolve. The template tracks it, but expect occasional breaking updates; pin versions for anything you rely on.',
    },
    {
      q: 'Can other apps call Hermes programmatically?',
      a: 'Yes - enable the gateway API with API_SERVER_ENABLED=true and an API_SERVER_KEY. It listens project-internally on hermes:8642, so other apps in the project can submit tasks without anything public.',
    },
    {
      q: 'What does the agent remember between restarts?',
      a: 'Everything that matters: sessions, memories, learned skills, and configuration persist on the /opt/data volume across redeploys and restarts.',
    },
  ],
};
