import type { AppBase } from './index';

export const perconaServer: AppBase = {
  slug: 'percona-server',
  name: 'Percona Server',
  upstream: 'Percona Server for MySQL',
  upstreamUrl: 'https://www.percona.com/software/mysql-database/percona-server',
  tagline: 'A drop-in MySQL replacement with deeper instrumentation and performance tuning, single node.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host Percona Server for MySQL on Miget',
  seoDescription:
    'Run Percona Server for MySQL - a free, fully MySQL-compatible drop-in with richer instrumentation and performance enhancements - as a single node. Uses the same MYSQL_* environment variables.',
  keywords: [
    'self-host percona server',
    'percona server mysql docker',
    'mysql drop-in replacement',
    'percona server self-hosted',
    'mysql performance instrumentation',
    'percona miget',
  ],
  intro: [
    'Percona Server for MySQL is a free, fully MySQL-compatible drop-in with extra instrumentation (expanded INFORMATION_SCHEMA and PERFORMANCE_SCHEMA tables), better diagnostics, and performance enhancements - the same SQL and clients as MySQL, with more visibility into what the server is doing.',
    'This template is a single node configured with the same MYSQL_* environment variables as the MySQL template, internal-only on Miget (apps connect at percona:3306), with an app database and user created on first boot.',
    'Choose Percona Server when you want its instrumentation and tuning for a single database; for synchronous multi-primary high availability, the catalogue has percona-xtradb-cluster.',
  ],
  features: [
    'Fully MySQL-compatible - same SQL, protocol, and clients',
    'Expanded instrumentation and diagnostics',
    'Performance and operational enhancements',
    'Same MYSQL_* env vars as the MySQL template',
    'Internal-only - reached at percona:3306',
    'GPLv2',
  ],
  topology: [
    { service: 'percona', role: 'relational database (:3306)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'MYSQL_ROOT_PASSWORD', what: 'root password' },
    { name: 'MYSQL_PASSWORD', what: 'password for the app user' },
  ],
  ramMiB: 1024,
  diskGB: 10,
  services: 1,
  sizingNote: '1 GiB suits typical workloads; raise for larger buffer pools. A single node is not HA - see percona-xtradb-cluster.',
  faq: [
    {
      q: 'How is it different from plain MySQL?',
      a: 'It is a drop-in replacement: same SQL, protocol, and clients, but with additional instrumentation, diagnostics, and performance features. Apps do not need any changes to run against it.',
    },
    {
      q: 'Does it use the same configuration as MySQL?',
      a: 'Yes - this template uses the same MYSQL_ROOT_PASSWORD / MYSQL_DATABASE / MYSQL_USER / MYSQL_PASSWORD variables, so switching between the mysql and percona-server templates is straightforward.',
    },
    {
      q: 'How do I run it highly available?',
      a: 'Use percona-xtradb-cluster, which is synchronous multi-primary HA (Galera-based) built on Percona Server. This standalone template is a single node.',
    },
  ],
};
