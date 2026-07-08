import type { AppBase } from './index';

export const cronicle: AppBase = {
  slug: 'cronicle',
  name: 'Cronicle',
  upstream: 'Cronicle',
  upstreamUrl: 'https://github.com/jhuckaby/Cronicle',
  license: 'MIT',
  licenseTier: 'permissive',
  tagline:
    'Cron with a UI: schedules, run history, chaining, retries, and alerts - in one 512 MiB container.',
  category: 'Automation & Jobs',
  status: 'stable',
  seoTitle: 'Self-host Cronicle: cron with a web UI via Docker Compose',
  seoDescription:
    'Deploy Cronicle - a cron replacement with a web UI, run history, job chaining, retries and alerting - in one step for $5/month. Stop losing crontabs to forgotten servers.',
  keywords: [
    'self-host cronicle',
    'cron with web ui',
    'cron job scheduler self-hosted',
    'cronicle docker compose',
    'crontab alternative',
    'scheduled jobs dashboard',
  ],
  intro: [
    'Every team has the crontab nobody remembers writing, on the server nobody dares reboot. Cronicle replaces it with something visible: a web UI where jobs have schedules, logs, run history, timelines, retries, chaining, and alerts when things fail - the operational basics crontab never had.',
    'This template runs single-server Cronicle in one container with two small volumes (job data and logs). No required variables - but the UI is public and ships with admin/admin, so changing that password is step one after deploy.',
    'Jobs run inside the container via shell or HTTP plugins: apk add what your scripts need, or - the more platform-native pattern - use HTTP jobs to poke endpoints on your other apps in the project, turning Cronicle into the scheduler for your whole stack.',
  ],
  features: [
    'Web UI: schedules, live logs, run history, and a timeline view',
    'Retries, timeouts, chaining (run B after A), and concurrency limits',
    'Email and webhook alerts on failure',
    'Shell and HTTP request plugins out of the box',
    'Job data and logs on persistent volumes',
    'Single 512 MiB container - cron should not need a cluster',
  ],
  topology: [
    { service: 'cronicle', role: 'scheduler + web UI (:5000)', isPublic: 'yes - change admin/admin immediately' },
  ],
  requiredVars: [],
  ramMiB: 512,
  diskGB: 2,
  services: 1,
  sizingNote:
    'Scheduling is nearly free; RAM is consumed by what your jobs do. Shell jobs that need real resources deserve their own app - drive them via HTTP jobs instead.',
  faq: [
    {
      q: 'Why Cronicle instead of plain cron or platform cronjobs?',
      a: 'Visibility and operations: run history, output logs, failure alerts, retries, and chaining in a UI anyone on the team can read. Platform-native cronjobs are great for app-internal tasks; Cronicle shines as the central, observable scheduler across many services.',
    },
    {
      q: 'How do jobs interact with my other applications?',
      a: 'Two patterns: HTTP plugin jobs that call endpoints on other apps in the project by service name (recommended), or shell jobs inside the Cronicle container - apk add your tooling in a derived image if scripts need more than busybox.',
    },
    {
      q: 'Is the default login really admin/admin?',
      a: 'Yes - and the UI is public on your app domain, so change it immediately after first deploy (Admin → Users). Treat that as part of the deploy checklist, not a someday task.',
    },
    {
      q: 'Can Cronicle run distributed across multiple servers?',
      a: 'Upstream Cronicle supports multi-server clusters, but this template deliberately runs single-server mode - keep replicas at 1. For one scheduler coordinating HTTP jobs, that is the right shape.',
    },
  ],
};
