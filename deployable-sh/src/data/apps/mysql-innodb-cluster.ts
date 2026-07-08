import type { AppBase } from './index';

export const mysqlInnodbCluster: AppBase = {
  slug: 'mysql-innodb-cluster',
  name: 'MySQL InnoDB Cluster',
  upstream: 'MySQL Group Replication',
  upstreamUrl: 'https://dev.mysql.com/doc/refman/8.4/en/group-replication.html',
  license: 'GPL-2.0',
  licenseTier: 'copyleft',
  tagline: 'Native MySQL HA via Group Replication - 3 nodes, automatic primary election and failover.',
  category: 'Databases',
  status: 'experimental',
  seoTitle: 'Self-host MySQL InnoDB Cluster (Group Replication) on Miget',
  seoDescription:
    'Deploy 3-node MySQL high availability using Group Replication - the engine behind InnoDB Cluster - with automatic primary election and a one-shot init that forms the group. Smoke-tested locally.',
  keywords: [
    'self-host mysql innodb cluster',
    'mysql group replication docker',
    'mysql high availability',
    'mysql automatic failover',
    'innodb cluster self-hosted',
    'mysql group replication miget',
  ],
  intro: [
    'MySQL InnoDB Cluster is the native MySQL high-availability stack, built on Group Replication: a group of nodes that replicate synchronously, elect a primary automatically, and fail over without manual intervention. This template runs three nodes and a one-shot init that configures the recovery accounts and forms the group.',
    'Group Replication is the fiddliest topology in this catalogue - it depends on stable inter-node addressing (each node`s group address, the seeds list, and the IP allowlist) and is sensitive to node-identity changes. The nodes are configured with the loose- option prefix so they boot cleanly before the plugin loads, and the init is idempotent. It was smoke-tested locally to a three-member ONLINE group.',
    'This template ships no MySQL Router (its 8.4 image is not published on Docker Hub), so apps connect to a node directly or you add a Router alongside. For simpler synchronous HA, percona-xtradb-cluster and mariadb-galera are easier to operate.',
  ],
  features: [
    'Native MySQL Group Replication (the InnoDB Cluster engine)',
    'Automatic primary election and failover',
    '3 nodes + a one-shot group-forming init',
    'Single-primary mode (one writer, two in sync)',
    'All internal-only; no Router bundled (connect direct)',
    'GPLv2',
  ],
  topology: [
    { service: 'mysql-gr-1/2/3', role: 'Group Replication members (:3306)', isPublic: 'no (internal)' },
    { service: 'mysql-init', role: 'forms the group once, then exits', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'MYSQL_ROOT_PASSWORD', what: 'root password (same on all nodes)' },
    { name: 'MYSQL_REPLICATION_PASSWORD', what: 'Group Replication recovery account' },
  ],
  ramMiB: 3328,
  diskGB: 30,
  services: 4,
  sizingNote: '1 GiB per node minimum; raise for write throughput. Experimental: Group Replication needs stable addressing and careful operation - PXC or Galera are simpler if you just want synchronous HA.',
  faq: [
    {
      q: 'How is this different from Percona XtraDB Cluster?',
      a: 'Both give synchronous, automatic-failover HA. This uses MySQL`s own Group Replication (the InnoDB Cluster engine) in single-primary mode; PXC and mariadb-galera use Galera multi-primary. Group Replication is the native MySQL stack but the most operationally sensitive of the three.',
    },
    {
      q: 'Why no MySQL Router?',
      a: 'The MySQL Router 8.4 image is not published on Docker Hub, so this template omits it - apps connect to a node directly (discover the primary from performance_schema.replication_group_members) or you run a Router alongside. The group itself provides the HA.',
    },
    {
      q: 'Why experimental?',
      a: 'Group Replication depends on stable inter-node addresses and is sensitive to identity changes on a per-pod platform. It is wired with the loose- option prefix and an idempotent init, and was smoke-tested to a 3-member ONLINE group, but it needs more operational care than the other HA templates.',
    },
  ],
};
