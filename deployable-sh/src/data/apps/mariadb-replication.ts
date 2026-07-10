import type { AppBase } from './index';

export const mariadbReplication: AppBase = {
  slug: 'mariadb-replication',
  name: 'MariaDB Replication',
  upstream: 'MariaDB',
  upstreamUrl: 'https://mariadb.com/kb/en/standard-replication/',
  license: 'GPL-2.0',
  licenseTier: 'copyleft',
  tagline: 'Asynchronous primary/replica MariaDB - a writable primary streaming to a read-only replica.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host MariaDB primary/replica replication on Miget',
  seoDescription:
    'Deploy asynchronous MariaDB replication - one writable primary streaming its binlog to a read-only replica - wired entirely from the image`s environment variables. Read-scaling and hot standby.',
  keywords: [
    'self-host mariadb replication',
    'mariadb primary replica',
    'mysql read replica self-hosted',
    'mariadb binlog replication',
    'mariadb master slave docker',
    'mariadb replication miget',
  ],
  intro: [
    'This is classic asynchronous MariaDB replication: one primary accepts writes and streams its binary log to a read-only replica. It is the standard topology for read-scaling (send reads to the replica) and for keeping a hot standby copy of your data.',
    'The official MariaDB image wires it from environment variables - the primary creates the replication user automatically, and the replica configures itself against the primary and starts replicating on first boot, so there are no init scripts. The replica is started read-only.',
    'Replication is asynchronous: the replica can lag slightly under load, and a failed primary does not auto-promote (that is a manual or external-tooling step). For synchronous, automatic multi-primary HA, use mariadb-galera.',
  ],
  features: [
    'Writable primary + read-only replica',
    'Binlog replication wired from environment variables',
    'No init scripts - the image configures the replica',
    'Read-scaling and hot-standby topology',
    'Both nodes internal-only',
    'GPLv2',
  ],
  topology: [
    { service: 'mariadb-primary', role: 'writable primary (:3306)', isPublic: 'no (internal)' },
    { service: 'mariadb-replica', role: 'read-only replica (:3306)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'MARIADB_ROOT_PASSWORD', what: 'root password (same on both nodes)' },
    { name: 'MARIADB_PASSWORD', what: 'app user password' },
    { name: 'MARIADB_REPLICATION_PASSWORD', what: 'replication account password' },
  ],
  ramMiB: 2048,
  diskGB: 20,
  services: 2,
  sizingNote: '1 GiB per node suits typical workloads. The replica holds a full copy of the data, so size both volumes the same. Asynchronous - expect small replica lag under load.',
  faq: [
    {
      q: 'What is this good for?',
      a: 'Read-scaling (route read-heavy queries to the replica to offload the primary) and keeping a hot standby copy of your database. It is the most common MySQL/MariaDB replication setup.',
    },
    {
      q: 'Does it fail over automatically?',
      a: 'No. Asynchronous replication does not auto-promote the replica if the primary dies - promotion is a manual or tooling-driven step. For automatic failover use mariadb-galera (synchronous multi-primary).',
    },
    {
      q: 'How is the replica set up?',
      a: 'Automatically. The official image creates the replication user on the primary and, on the replica, configures replication against MARIADB_MASTER_HOST and starts it on first boot - no scripts to run.',
    },
  ],
};
