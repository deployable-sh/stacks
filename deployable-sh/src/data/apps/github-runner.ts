import type { AppBase } from './index';

export const githubRunner: AppBase = {
  slug: 'github-runner',
  name: 'GitHub Actions Runner',
  upstream: 'actions/runner (via myoung34 image)',
  upstreamUrl: 'https://docs.github.com/en/actions/hosting-your-own-runners',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'A self-hosted GitHub Actions runner - your workflows on flat-price compute, zero per-minute billing.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host a GitHub Actions runner with Docker Compose',
  seoDescription:
    'Deploy a self-hosted GitHub Actions runner in one step for $13/month flat. PAT-based auto-registration, ephemeral mode, replicas for scale - and no $0.006/minute metering.',
  keywords: [
    'self-hosted github actions runner',
    'github runner docker compose',
    'github actions minutes cost',
    'cheap github actions runner',
    'github runner setup',
    'actions runner paas',
  ],
  intro: [
    'GitHub Actions minutes are the quiet line item that grows with every push: $0.006/minute for Linux 2-core past the included quota, more for bigger machines. A self-hosted runner removes the meter - and gets you exactly the CPU, RAM, and caching behavior you choose.',
    'This template uses the de-facto env-driven runner image with PAT-based auto-registration: set a token and a repo (or org), deploy, and the runner appears in Settings > Actions. Registration state persists across redeploys; EPHEMERAL mode plus replicas gives clean-slate scale-out.',
    'The honest constraint, documented rather than discovered: run: steps and JS/composite actions work fully; container: jobs and Docker container actions need a daemon a PaaS does not expose - image builds go through kaniko or buildah instead.',
  ],
  features: [
    'PAT-based auto-registration: deploy and it appears in GitHub',
    'Repo or org scope; custom labels for runs-on targeting',
    'Ephemeral mode + replicas for clean parallel runners',
    'Registration survives redeploys (state volume)',
    'No per-minute billing - the plan is the whole CI bill',
    'kaniko/buildah path documented for image builds',
  ],
  topology: [
    { service: 'runner', role: 'Actions runner, outbound long-poll to GitHub', isPublic: 'no - no ingress needed' },
  ],
  requiredVars: [
    { name: 'ACCESS_TOKEN', what: 'PAT (repo scope for repo runners, admin:org for org runners)' },
    { name: 'REPO_URL or ORG_NAME', what: 'where the runner registers (with RUNNER_SCOPE)' },
  ],
  ramMiB: 2048,
  diskGB: 1,
  services: 1,
  sizingNote:
    'Size to your builds, not the runner (it idles under 100 MB). 2 GiB suits typical Node/Python/Go builds; compile-heavy jobs want the next plan up.',
  faq: [
    {
      q: 'How much does this save vs hosted runners?',
      a: 'GitHub includes 2,000-3,000 minutes/month on Free/Team plans, then bills $0.006/min for Linux 2-core. A team burning 30,000 monthly minutes pays ~$165 in overage; this runner is $13/month flat at any volume - and you can give it more cores than the hosted 2-core default for the same price.',
    },
    {
      q: 'What workflows will NOT work on it?',
      a: 'Anything needing the Docker daemon: container: jobs, services: blocks (Postgres-in-CI style), and Docker container actions. The fixes are standard: native services (your project already runs real databases), kaniko/buildah for image builds, and JS-based actions which all work.',
    },
    {
      q: 'How do I run more jobs in parallel?',
      a: 'Set EPHEMERAL=true and raise replicas - each replica registers itself, takes one job, deregisters, repeats. Clean state per job, parallelism equal to replica count, all inside the same flat plan.',
    },
    {
      q: 'Is a PAT in env safe?',
      a: 'The token only mints runner registration tokens and lives server-side in your stack env. Use a fine-grained PAT scoped to the one repo/org, and rotate it like any credential. GitHub’s JIT-config flow exists for stricter setups; this template favors the simple, durable registration.',
    },
  ],
};
