import type { AppBase } from './index';

export const forgejoRunner: AppBase = {
  slug: 'forgejo-runner',
  name: 'Forgejo Runner',
  upstream: 'Forgejo Actions runner',
  upstreamUrl: 'https://forgejo.org/docs/latest/admin/actions/',
  tagline:
    'CI for your Forgejo instance or Codeberg - GitHub-Actions-compatible workflows on your own compute.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host a Forgejo Actions runner (works with Codeberg)',
  seoDescription:
    'Deploy a Forgejo Actions runner in one step - host-mode jobs, GitHub-Actions-compatible syntax, serves self-hosted Forgejo or Codeberg. $13/month flat, no minute metering.',
  keywords: [
    'forgejo runner docker',
    'codeberg actions runner',
    'forgejo actions setup',
    'gitea act runner alternative',
    'self-hosted ci forgejo',
    'codeberg ci',
  ],
  intro: [
    'Forgejo Actions speaks GitHub Actions workflow syntax, which means the ecosystem muscle memory transfers - but the runners are yours to provide. This template deploys one in host mode: jobs execute as shell steps in the runner container, no Docker daemon required.',
    'It pairs perfectly with the catalogue’s forgejo template (point FORGEJO_URL at http://forgejo:5000 and the whole forge + CI story lives in one project) - and it serves Codeberg too, since Codeberg runs Forgejo and lets you register your own runners.',
    'Registration uses the v12 declarative flow: create the runner in the UI, copy its UUID and token, deploy. The runner connects outbound; no ingress, no public port, nothing to firewall.',
  ],
  features: [
    'GitHub-Actions-compatible workflow syntax',
    'Host mode: socket-less shell execution in this container',
    'Serves self-hosted Forgejo AND codeberg.org',
    'v12 declarative registration (UUID + token from the UI)',
    'One runner can connect to multiple instances',
    'Completes the forge story next to the forgejo template',
  ],
  topology: [
    { service: 'runner', role: 'Forgejo Actions runner, outbound connection', isPublic: 'no - no ingress needed' },
  ],
  requiredVars: [
    { name: 'RUNNER_UUID / RUNNER_TOKEN', what: 'from the runner you create in Forgejo/Codeberg (Settings > Actions > Runners)' },
    { name: 'FORGEJO_URL', what: 'https://codeberg.org, or http://forgejo:5000 for the in-project forge' },
  ],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    'The runner itself is light; jobs set the budget. Extend the Dockerfile with the toolchains your workflows expect - host mode runs them directly.',
  faq: [
    {
      q: 'Does this work with Codeberg?',
      a: 'Yes - Codeberg runs Forgejo and supports user/org/repo-level self-hosted runners. Create the runner under your Codeberg settings, drop the UUID and token here, and your Codeberg workflows run on your own compute.',
    },
    {
      q: 'Will my GitHub Actions workflows just run?',
      a: 'Mostly - Forgejo Actions implements the workflow syntax and most actions from the ecosystem work. Jobs run with the host label here, so container: jobs and Docker actions need the usual socket-less substitutions (kaniko/buildah for image builds).',
    },
    {
      q: 'Forgejo runner or Gitea act_runner?',
      a: 'Same lineage, matching governance choice: this catalogue ships Forgejo (the forge) so it ships the Forgejo runner. Gitea’s act_runner is configured almost identically (env-based registration) if you run Gitea instead.',
    },
  ],
};
