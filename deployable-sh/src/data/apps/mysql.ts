import type { AppBase } from './index';

export const mysql: AppBase = {
  slug: 'mysql',
  name: 'MySQL',
  upstream: 'MySQL',
  upstreamUrl: 'https://www.mysql.com',
  license: 'GPL-2.0',
  licenseTier: 'copyleft',
  tagline: 'The world`s most popular open-source database, as a single self-hosted node on a flat plan.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host MySQL (standalone) on Miget',
  seoDescription:
    'Run a standalone MySQL 8.4 LTS node configured by the official image`s environment variables, internal-only on your own infrastructure. Full control of version and config for one flat plan.',
  keywords: [
    'self-host mysql',
    'mysql docker compose',
    'mysql 8.4',
    'rds alternative',
    'mysql self-hosted',
    'mysql miget',
  ],
  intro: [
    'MySQL is the most widely deployed open-source relational database, behind a huge share of web apps and frameworks. This template is a single MySQL 8.4 LTS node, configured entirely through the official image`s environment variables, with data on a volume and an app database and user created on first boot.',
    'It runs internal-only on Miget - apps in the same project connect at mysql:3306. Miget also offers managed MySQL as an addon (backups and failover handled for you), which is the better choice for most apps; this template is for full control of the version and configuration.',
    'For high availability, the catalogue has mysql-innodb-cluster (Group Replication) and percona-xtradb-cluster (synchronous multi-primary); for the MariaDB fork, see the mariadb templates.',
  ],
  features: [
    'MySQL 8.4 LTS, the standard relational database',
    'Configured entirely by environment variables',
    'App database + user created on first boot',
    'Internal-only - reached at mysql:3306',
    'Data on a volume',
    'GPLv2',
  ],
  topology: [
    { service: 'mysql', role: 'relational database (:3306)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'MYSQL_ROOT_PASSWORD', what: 'root password' },
    { name: 'MYSQL_PASSWORD', what: 'password for the app user' },
  ],
  ramMiB: 1024,
  diskGB: 10,
  services: 1,
  sizingNote: '1 GiB suits small-to-medium workloads; raise RAM for larger buffer pools. A single node is not HA - see mysql-innodb-cluster or percona-xtradb-cluster.',
  faq: [
    {
      q: 'Should I use this or managed MySQL?',
      a: 'For most apps, managed MySQL is less to operate (backups, failover, upgrades handled for you). Use this template when you need a specific version, custom configuration, or a private in-project database you fully control.',
    },
    {
      q: 'What does this save vs RDS?',
      a: 'AWS RDS for MySQL starts around $15/month for the smallest instance and roughly doubles for Multi-AZ, plus storage and transfer. This is one flat plan on your own infrastructure.',
    },
    {
      q: 'How do I get high availability?',
      a: 'A single node has a single point of failure. For HA use mysql-innodb-cluster (Group Replication with automatic failover) or percona-xtradb-cluster (synchronous multi-primary).',
    },
  ],
};
