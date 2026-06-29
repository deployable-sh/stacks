import type { AppBase } from './index';

export const mariadb: AppBase = {
  slug: 'mariadb',
  name: 'MariaDB',
  upstream: 'MariaDB',
  upstreamUrl: 'https://mariadb.org',
  tagline: 'The community MySQL fork, as a single self-hosted node - drop-in compatible, on a flat plan.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host MariaDB (standalone) on Miget',
  seoDescription:
    'Run a standalone MariaDB 11.8 node configured by the official image`s environment variables, internal-only. The community-developed MySQL fork with full control of version and config.',
  keywords: [
    'self-host mariadb',
    'mariadb docker compose',
    'mariadb 11.8',
    'mysql fork',
    'mariadb self-hosted',
    'mariadb miget',
  ],
  intro: [
    'MariaDB is the community-developed fork of MySQL, drop-in compatible for the vast majority of applications and a popular default across CMSes, frameworks, and self-hosted apps. This template is a single MariaDB 11.8 node configured through the official image`s environment variables, with data on a volume.',
    'It runs internal-only on Miget - apps connect at mariadb:3306, and an app database and user are created on first boot. Miget offers managed MySQL for hands-off operation; run this when you specifically want MariaDB or full control of the configuration.',
    'MariaDB has a rich HA story, and the catalogue covers all of it: this standalone node, mariadb-replication (asynchronous primary/replica), and mariadb-galera (synchronous multi-primary cluster).',
  ],
  features: [
    'MariaDB 11.8, the community MySQL fork',
    'Drop-in compatible with MySQL for most apps',
    'Configured entirely by environment variables',
    'App database + user created on first boot',
    'Internal-only - reached at mariadb:3306',
    'GPLv2',
  ],
  topology: [
    { service: 'mariadb', role: 'relational database (:3306)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'MARIADB_ROOT_PASSWORD', what: 'root password' },
    { name: 'MARIADB_PASSWORD', what: 'password for the app user' },
  ],
  ramMiB: 1024,
  diskGB: 10,
  services: 1,
  sizingNote: '1 GiB suits typical workloads; raise for larger buffer pools. A single node is not HA - see mariadb-replication or mariadb-galera.',
  faq: [
    {
      q: 'Is MariaDB compatible with MySQL?',
      a: 'For the large majority of applications, yes - same SQL, same wire protocol, same clients. There are version-specific differences in newer features, but typical CMS/app workloads run unchanged on either.',
    },
    {
      q: 'What HA options does the catalogue offer?',
      a: 'Three modes: this standalone node, mariadb-replication (asynchronous primary/replica for read-scaling and hot standby), and mariadb-galera (synchronous multi-primary cluster where any node accepts writes).',
    },
    {
      q: 'Managed MySQL or this?',
      a: 'Managed MySQL is simpler to operate. Choose this MariaDB template when you specifically want MariaDB, a particular version, or custom server configuration.',
    },
  ],
};
