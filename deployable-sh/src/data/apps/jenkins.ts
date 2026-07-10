import type { AppBase } from './index';

export const jenkins: AppBase = {
  slug: 'jenkins',
  name: 'Jenkins',
  upstream: 'Jenkins LTS',
  upstreamUrl: 'https://www.jenkins.io',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'The automation server that still runs the world’s CI - pipelines as code, 1,800+ plugins, your minutes are free.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host Jenkins LTS with Docker Compose',
  seoDescription:
    'Deploy Jenkins LTS - pipelines as code, 1,800+ plugins, webhooks from every forge - in one step for $13/month flat. No CI-minute metering, ever.',
  keywords: [
    'self-host jenkins',
    'jenkins docker compose',
    'jenkins lts setup',
    'ci server self-hosted',
    'jenkins pipelines',
    'free ci minutes',
  ],
  intro: [
    'Jenkins is unfashionable and unkillable: pipelines as code, an integration for literally everything, and two decades of answers on every error message you will ever see. For teams that want CI they own - cron-scheduled jobs, deploy pipelines, glue automation - it remains the pragmatic choice.',
    'This template runs the LTS controller with its built-in node, which executes jobs in-controller: the honest, right-sized shape for small teams. Everything (config, plugins, jobs, history) persists on the jenkins_home volume.',
    'The PaaS reality is documented rather than hidden: there is no Docker socket, so jobs build artifacts with toolchains in the container and build images with rootless tools (kaniko-style) - and when builds outgrow the controller, inbound agents deploy as separate apps in the same project.',
  ],
  features: [
    'Declarative pipelines (Jenkinsfile) and classic freestyle jobs',
    '1,800+ plugins: every SCM, notifier, and deploy target',
    'Webhooks from GitHub, GitLab, and the catalogue’s forgejo template',
    'Everything on one volume - trivially backupable',
    'Scale out later with inbound agents as separate apps',
    'No CI-minute meter - your plan is the only bill',
  ],
  topology: [
    { service: 'jenkins', role: 'controller + built-in node (:5000)', isPublic: 'yes' },
  ],
  requiredVars: [],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    '2 GiB with a 1.5 GB JVM heap suits a small team’s pipelines. Heavy parallel builds want a bigger plan or inbound agents on their own apps - scale the workers, not the controller.',
  faq: [
    {
      q: 'Why Jenkins in 2026 instead of GitHub Actions?',
      a: 'Minutes and ownership. Hosted CI meters every build minute past the included quota; Jenkins on a $13/month plan runs unlimited jobs. It also does things Actions does not: long-lived stateful jobs, cross-repo orchestration, and pipelines against forges you self-host - like the forgejo template next to it.',
    },
    {
      q: 'Can jobs build Docker images here?',
      a: 'Not with the Docker daemon - the platform exposes no socket. Use rootless image builders (kaniko, buildah) inside jobs, or let Miget itself build images from your repos. Plain build/test/deploy jobs need nothing special.',
    },
    {
      q: 'How do I add build capacity?',
      a: 'Deploy jenkins/inbound-agent as a separate app in the project, create a node in the controller UI, and start the agent with the node secret pointing at http://jenkins:5000. Agents scale and get RAM independently of the controller.',
    },
    {
      q: 'Where is the initial admin password?',
      a: 'In /var/jenkins_home/secrets/initialAdminPassword inside the container - read it from the app shell or logs on first boot, then complete the setup wizard. After that, auth is whatever you configure (local users, OIDC via plugin, even the keycloak template).',
    },
  ],
};
