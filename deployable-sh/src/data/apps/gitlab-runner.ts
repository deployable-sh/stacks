import type { AppBase } from './index';

export const gitlabRunner: AppBase = {
  slug: 'gitlab-runner',
  name: 'GitLab Runner',
  upstream: 'GitLab Runner',
  upstreamUrl: 'https://docs.gitlab.com/runner/',
  tagline:
    'A shell-executor GitLab Runner that registers itself on first boot - your pipelines, zero compute-minute quota.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host GitLab Runner (shell executor) with Docker Compose',
  seoDescription:
    'Deploy a self-registering GitLab Runner in one step for $13/month flat. Modern glrt-token flow, shell executor, persistent config - jobs consume zero GitLab compute minutes.',
  keywords: [
    'self-host gitlab runner',
    'gitlab runner docker compose',
    'gitlab compute minutes cost',
    'gitlab runner shell executor',
    'gitlab runner registration token',
    'gitlab ci self-hosted',
  ],
  intro: [
    'GitLab meters CI by compute minutes - 400/month on Free, 10,000 on Premium, $10 per extra thousand. Jobs on your own runner consume zero quota, which converts CI from a metered resource into a fixed cost.',
    'This template wraps the official image with a register-on-first-boot entrypoint using the current runner-authentication-token flow (glrt-..., created in the GitLab UI where tags and run-untagged live now; the legacy registration-token flow is deprecated and disabled by default). Registration persists on a volume, so redeploys do not create runner zombies.',
    'It runs the shell executor: jobs execute in this container as the gitlab-runner user, with whatever toolchains you bake into the Dockerfile. That is the supported socket-less mode - and the trust model (jobs share the environment) is stated plainly, per GitLab’s own guidance.',
  ],
  features: [
    'Self-registering with the modern glrt- token flow',
    'Shell executor: the supported no-docker-socket mode',
    'Config and registration persist across redeploys',
    'Extend the Dockerfile with your toolchains',
    'Works with gitlab.com and self-managed GitLab',
    'Zero compute-minute consumption, forever',
  ],
  topology: [
    { service: 'runner', role: 'GitLab Runner, outbound poll to GitLab', isPublic: 'no - no ingress needed' },
  ],
  requiredVars: [
    { name: 'CI_SERVER_TOKEN', what: 'runner authentication token (glrt-...) from Settings > CI/CD > Runners > New runner' },
    { name: 'CI_SERVER_URL', what: 'https://gitlab.com or your self-managed instance' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    'The runner process is tiny (~50 MB); jobs are the budget. 2 GiB covers typical builds; raise concurrency only with RAM to match.',
  faq: [
    {
      q: 'How does this compare to GitLab’s hosted minutes?',
      a: 'Free includes 400 compute minutes a month - one active project exhausts that in days - and extra minutes cost $10 per 1,000. Premium’s 10,000 minutes come bundled with $29/user/month seats. This runner is $13/month with no meter at all.',
    },
    {
      q: 'Why the shell executor instead of docker?',
      a: 'The docker executor needs the Docker socket, which a PaaS container does not have. Shell mode runs jobs directly in this container - GitLab supports it (maintenance mode: security fixes continue), and for trusted-team pipelines it is operationally simpler anyway.',
    },
    {
      q: 'Where did tags and run-untagged settings go?',
      a: 'Server-side: with the glrt- token flow you configure them when creating the runner in the GitLab UI, not at register time. The template’s register call intentionally passes only the URL, token, and executor.',
    },
    {
      q: 'Can jobs build Docker images?',
      a: 'Not with the daemon - use kaniko (runs as an unprivileged container step in shell mode too) or buildah. For everything else - tests, builds, deploys via API - nothing changes.',
    },
  ],
};
