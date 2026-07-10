import type { AppBase } from './index';

export const buildkiteAgent: AppBase = {
  slug: 'buildkite-agent',
  name: 'Buildkite Agent',
  upstream: 'Buildkite agent',
  upstreamUrl: 'https://buildkite.com/docs/agent/v3',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'The hybrid-CI agent - Buildkite runs the control plane, your jobs run here. One token, unmetered minutes.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host a Buildkite agent with Docker Compose',
  seoDescription:
    'Deploy a Buildkite agent in one step - official image, one token, jobs on your own flat-price compute. The cleanest self-hosted CI runner there is.',
  keywords: [
    'buildkite agent docker',
    'buildkite self-hosted',
    'buildkite agent setup',
    'hybrid ci agents',
    'buildkite docker compose',
    'buildkite queue',
  ],
  intro: [
    'Buildkite made the architectural choice the other CI vendors are still backing into: the SaaS runs orchestration, UI, and webhooks, while every build executes on agents you control. Compute was never metered because it was never theirs - which makes the agent the cleanest self-hosted runner in this catalogue.',
    'Official MIT-licensed image, one required token, tags for queue targeting. Jobs run as shell commands in the container; extend the image with your toolchains and raise replicas for parallelism - agents pull independently from the queue.',
    'The standard platform note: no Docker daemon, so plugin-heavy Docker workflows need kaniko/buildah substitutions, while script-based pipelines run untouched.',
  ],
  features: [
    'Official buildkite/agent image - zero wrapper code',
    'One env var to a working agent',
    'Queue targeting via tags (queue=miget)',
    'Replicas = parallel agents, independently pulling jobs',
    'MIT-licensed agent; SaaS control plane does the orchestration',
    'Unmetered build minutes on your flat plan',
  ],
  topology: [
    { service: 'agent', role: 'Buildkite agent, outbound to buildkite.com', isPublic: 'no - no ingress needed' },
  ],
  requiredVars: [
    { name: 'BUILDKITE_AGENT_TOKEN', what: 'Buildkite > Agents > Reveal Agent Token' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    'The agent is a single Go binary; budget RAM for your builds. Scale horizontally with replicas - each agent handles one job at a time by default.',
  faq: [
    {
      q: 'Why is Buildkite the “cleanest” runner here?',
      a: 'Because self-hosted agents are Buildkite’s primary model, not an escape hatch: the official image needs exactly one env var, registration is instant, and there is no minute-metering to escape in the first place. Buildkite charges per user for the control plane; compute was always yours.',
    },
    {
      q: 'How do pipelines target this agent?',
      a: 'Tags: the template sets queue=miget, and pipelines select it with agents: queue: miget. Add more tags (language versions, capabilities) to route specific steps to specific agents.',
    },
    {
      q: 'Does Docker-based tooling work?',
      a: 'The docker-compose and docker plugins need a daemon this platform does not expose. Script steps, artifact upload/download, and the broader plugin ecosystem that shells out work normally - and image builds go through kaniko or buildah like everywhere else in the catalogue.',
    },
  ],
};
