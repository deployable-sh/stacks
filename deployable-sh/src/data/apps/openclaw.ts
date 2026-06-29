import type { AppBase } from './index';

export const openclaw: AppBase = {
  slug: 'openclaw',
  name: 'OpenClaw',
  upstream: 'OpenClaw',
  upstreamUrl: 'https://openclaw.ai',
  tagline:
    'An autonomous AI agent you run yourself: web dashboard, scheduled tasks, plugins, persistent workspace.',
  category: 'AI Agents',
  status: 'stable',
  seoTitle: 'Self-host OpenClaw: autonomous AI agent with Docker Compose',
  seoDescription:
    'Deploy OpenClaw - an autonomous AI agent with a web dashboard, scheduled tasks, and plugins - on your own infrastructure in one step. Your agent, your data, your API key.',
  keywords: [
    'self-host openclaw',
    'openclaw docker compose',
    'autonomous ai agent self-hosted',
    'openclaw setup',
    'ai agent dashboard',
    'personal ai agent server',
  ],
  intro: [
    'OpenClaw is an autonomous agent designed to live on a server, not in a chat tab: it has a dashboard, scheduled tasks, a plugin system, and a persistent workspace where its files and context accumulate. Think of it as hiring an agent and giving it a desk.',
    'This template runs the coollabsio all-in-one image (nginx + gateway, env-driven) with a 5 GB /data volume. Three secrets configure it: your Anthropic API key, a dashboard password, and a gateway token; after first deploy you pin OPENCLAW_ALLOWED_ORIGINS to your https domain.',
    'Treat it as a privileged deployment - an autonomous agent with an API budget and a persistent disk. Give it its own API key with a spending limit, and read its task history the way you would review a new hire’s work.',
  ],
  features: [
    'Web dashboard for conversations, tasks, and agent configuration',
    'Scheduled/recurring tasks - the agent works while you sleep',
    'Plugin system for tools and integrations',
    'Persistent /data workspace survives redeploys',
    'All-in-one image: nginx + gateway, configured by env',
    'Basic auth + gateway token + origin allowlist',
  ],
  topology: [
    { service: 'openclaw', role: 'agent + dashboard (:5000)', isPublic: 'yes (basic auth)' },
  ],
  requiredVars: [
    { name: 'ANTHROPIC_API_KEY', what: 'the agent’s model access, billed to you; set a spend limit' },
    { name: 'AUTH_PASSWORD', what: 'dashboard basic auth' },
    { name: 'OPENCLAW_GATEWAY_TOKEN', what: 'gateway token (openssl rand -hex 24)' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    '2 GiB runs the agent and dashboard comfortably; the model does the heavy thinking remotely. The 5 GB volume holds the agent’s accumulated workspace and state.',
  faq: [
    {
      q: 'What can OpenClaw actually do autonomously?',
      a: 'Whatever its tasks and plugins allow: recurring research, monitoring and summarizing, file processing in its workspace, calling external APIs. You define tasks in the dashboard; it executes on schedule and keeps history you can audit.',
    },
    {
      q: 'Why does the template call this a privileged deployment?',
      a: 'Because it is an autonomous agent with your API key and a persistent disk. Scope the key, set a billing limit, use a strong dashboard password, and lock OPENCLAW_ALLOWED_ORIGINS to your domain - the standard posture for anything that acts on its own.',
    },
    {
      q: 'What does running OpenClaw cost?',
      a: 'Infrastructure is $13/month (2 GiB hobby plan). Model usage on your Anthropic key dominates real cost and scales with how busy you keep the agent - a spending limit on the key keeps surprises out.',
    },
    {
      q: 'Does the agent’s memory survive redeploys?',
      a: 'Yes - state and workspace live on the /data volume. Redeploying the image (updates, config changes) leaves the agent’s accumulated context intact.',
    },
  ],
};
