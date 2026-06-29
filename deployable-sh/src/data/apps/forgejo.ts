import type { AppBase } from './index';

export const forgejo: AppBase = {
  slug: 'forgejo',
  name: 'Forgejo',
  upstream: 'Forgejo (Codeberg e.V.)',
  upstreamUrl: 'https://forgejo.org',
  tagline:
    'The community-governed git forge (Gitea fork) - repos, PRs, packages, and CI Actions on a 1 GiB container.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host Forgejo (Gitea fork): git hosting with Docker Compose',
  seoDescription:
    'Deploy Forgejo - self-hosted git with issues, pull requests, packages, and Forgejo Actions CI - in one step for $13/month flat. Unlimited private repos and users vs GitHub Team per-seat pricing.',
  keywords: [
    'self-host forgejo',
    'self-host gitea',
    'forgejo docker compose',
    'github alternative self-hosted',
    'git server self-hosted',
    'forgejo actions ci',
  ],
  intro: [
    'A team forge is the classic self-host win: code is the asset you least want metered or mined, and a Go binary serves it from a gigabyte of RAM. Forgejo is the community-governed hard fork of Gitea - run by the non-profit Codeberg e.V., GPL-licensed, monthly security releases - with everything a small forge needs: repos, issues, PRs, packages, and GitHub-Actions-compatible CI via Forgejo Actions.',
    'This template runs Forgejo on a managed Postgres with repos on a 10 GB volume. It deliberately ships HTTPS-first: git clone over https with tokens covers the full workflow on an HTTP-first platform, and SSH can be enabled over a custom TCP port if you want it.',
    'Why Forgejo over Gitea? Governance: Gitea’s trademark moved to a for-profit in 2022; Forgejo answered with a non-profit home and an independent release train. Same lineage, community steering wheel - the safer two-decade bet for where your code lives.',
  ],
  features: [
    'Repos, issues, pull requests, wikis, releases - the full forge',
    'Forgejo Actions: GitHub-Actions-compatible workflow CI',
    'Package registry: npm, container images, Maven, PyPI, and more',
    'Light: a Go binary at 1 GiB serves whole teams',
    'Managed Postgres auto-provisioned and auto-wired; repos on a volume',
    'HTTPS-first git; optional SSH via custom TCP port',
  ],
  topology: [
    { service: 'forgejo', role: 'web UI + git over HTTPS (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ROOT_URL', what: 'set to the app’s https domain (trailing slash) after first deploy - clone URLs embed it' },
  ],
  ramMiB: 2048,
  diskGB: 15,
  services: 2,
  sizingNote:
    '1 GiB runs a team forge comfortably. CI runners are the real resource consumers - register Forgejo Actions runners as separate apps sized to your build load.',
  faq: [
    {
      q: 'Forgejo or Gitea - which should I deploy?',
      a: 'They remain very similar technically; the difference is governance. Forgejo lives under the non-profit Codeberg e.V. with GPL licensing and an independent release cadence, after Gitea’s trademark moved to a for-profit. For infrastructure you intend to keep for years, the community-governed fork is the conservative choice - and the env config maps 1:1 if you ever switch.',
    },
    {
      q: 'How does this compare to GitHub Team or GitLab Premium?',
      a: 'GitHub Team is $4/user/month with metered CI minutes; GitLab Premium is $29/user/month. A 10-person team pays $40-290/month there - this stack is $13/month flat with unlimited repos, users, and Actions minutes bounded only by your runners.',
    },
    {
      q: 'Can I run CI on it?',
      a: 'Yes - Forgejo Actions speaks the GitHub Actions workflow format, so most existing workflows port over. Deploy runner(s) as separate apps in the project and register them against your forge; size them to your build load, not the forge.',
    },
    {
      q: 'How do I clone without SSH?',
      a: 'git clone https://your-domain/org/repo with a personal access token works everywhere and is the default here. Want SSH anyway? Add a custom TCP port on the app, enable SSH in the env, and set SSH_PORT to the public port so clone URLs come out right.',
    },
  ],
};
