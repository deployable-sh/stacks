import type { AppBase } from './index';

export const azpAgent: AppBase = {
  slug: 'azp-agent',
  name: 'Azure Pipelines Agent',
  upstream: 'Azure Pipelines agent',
  upstreamUrl: 'https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/docker',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'A self-hosted Azure DevOps agent from Microsoft’s official recipe - $13/month vs $40/month per hosted parallel job.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host an Azure Pipelines agent with Docker Compose',
  seoDescription:
    'Deploy an Azure DevOps self-hosted agent in one step - built from Microsoft’s official Dockerfile recipe, auto-registering into your pool. $13/month flat vs $40/month per Microsoft-hosted parallel job.',
  keywords: [
    'azure pipelines self-hosted agent',
    'azure devops agent docker',
    'azp agent container',
    'azure devops parallel job cost',
    'self-hosted build agent',
    'azure pipelines docker compose',
  ],
  intro: [
    'Azure DevOps prices CI by the parallel job: $40/month per Microsoft-hosted pipeline, $15/month per additional self-hosted one - and the free grant for new organizations currently requires a request form. Bringing your own agent is the documented, encouraged escape hatch.',
    'Microsoft ships no agent container image; their docs provide a Dockerfile recipe instead - which is exactly what this template packages. On first boot the agent downloads itself from your organization, registers into the pool with your PAT, and starts taking jobs; on shutdown it deregisters cleanly.',
    'Script, checkout, and task steps run in-container. The usual platform note applies: no Docker daemon, so container jobs and Docker tasks stay on hosted agents or switch to rootless builders.',
  ],
  features: [
    'Built from Microsoft’s official Dockerfile recipe - no third-party image',
    'Auto-registers on boot, deregisters on shutdown (--replace safe)',
    'Pool-based targeting: pool: Default in your YAML',
    'Service-principal auth supported upstream if PATs are banned',
    'Extend the Dockerfile with your toolchains',
    'Unlimited minutes - the plan is the bill',
  ],
  topology: [
    { service: 'agent', role: 'Azure Pipelines agent, outbound to dev.azure.com', isPublic: 'no - no ingress needed' },
  ],
  requiredVars: [
    { name: 'AZP_URL', what: 'https://dev.azure.com/your-org' },
    { name: 'AZP_TOKEN', what: 'PAT with Agent Pools (read, manage) scope' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    'The agent idles light; .NET and Java builds are the RAM consumers. One agent = one parallel job - add replicas (each with a distinct AZP_AGENT_NAME via prefix) for concurrency.',
  faq: [
    {
      q: 'What does this replace, cost-wise?',
      a: 'Each Microsoft-hosted parallel job is $40/month; each extra self-hosted parallel job license is $15/month (the first is free). The agent’s compute here rides the same flat plan as the rest of your stack - so a second and third pipeline cost license fees only, not VM bills.',
    },
    {
      q: 'Why is there no official agent image?',
      a: 'Microsoft deliberately documents a build-your-own Dockerfile (the agent version-locks to your org and updates itself). This template is that recipe, faithfully: ubuntu:24.04, the documented start.sh flow, non-root agent user, clean deregistration trap.',
    },
    {
      q: 'Do classic and YAML pipelines both work?',
      a: 'Yes - the agent is the same for both. Target it via the agent pool. Container jobs and Docker@2-style tasks need a daemon this platform does not expose; everything script- and task-based runs normally.',
    },
  ],
};
