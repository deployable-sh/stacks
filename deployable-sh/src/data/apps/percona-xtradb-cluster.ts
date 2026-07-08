import type { AppBase } from './index';

export const perconaXtradbCluster: AppBase = {
  slug: 'percona-xtradb-cluster',
  name: 'Percona XtraDB Cluster',
  upstream: 'Percona XtraDB Cluster',
  upstreamUrl: 'https://www.percona.com/software/mysql-database/percona-xtradb-cluster',
  license: 'GPL-2.0',
  licenseTier: 'copyleft',
  tagline: 'Synchronous multi-primary MySQL HA (Galera) - 3 nodes, every node writable, no replica lag.',
  category: 'Databases',
  status: 'experimental',
  seoTitle: 'Self-host Percona XtraDB Cluster (PXC) on Miget',
  seoDescription:
    'Deploy Percona XtraDB Cluster - 3-node synchronous multi-primary MySQL HA built on Galera. Every node accepts writes, transactions replicate to all nodes before commit. Driven by env vars.',
  keywords: [
    'self-host percona xtradb cluster',
    'pxc docker compose',
    'mysql synchronous replication',
    'galera mysql cluster',
    'mysql multi-primary ha',
    'percona xtradb cluster miget',
  ],
  intro: [
    'Percona XtraDB Cluster (PXC) is synchronous, multi-primary MySQL high availability built on Galera. All three nodes accept reads and writes, and a transaction is replicated to every node before commit returns - so there is no replica lag and any single node can fail without data loss.',
    'Clustering is driven entirely by the image`s environment variables: the first node bootstraps the cluster and the others join it, syncing via SST. It is the MySQL-side counterpart to the catalogue`s mariadb-galera template.',
    'It is marked experimental because synchronous clusters need operational care - notably, a full cold start may require bootstrapping the most-advanced node first. For asynchronous primary/replica instead, see mariadb-replication; for a single node, percona-server.',
  ],
  features: [
    'Synchronous multi-primary - every node writable',
    'No replica lag; a node can fail without data loss',
    '3 nodes, clustering driven by environment variables',
    'SST auto-sync for joining nodes',
    'All internal-only, password-protected',
    'GPLv2',
  ],
  topology: [
    { service: 'pxc-node1', role: 'bootstrap node (:3306)', isPublic: 'no (internal)' },
    { service: 'pxc-node2/3', role: 'joining nodes (writable)', isPublic: 'no (internal)' },
  ],
  requiredVars: [
    { name: 'MYSQL_ROOT_PASSWORD', what: 'root password (same on all nodes)' },
    { name: 'MYSQL_PASSWORD', what: 'app user password' },
  ],
  ramMiB: 3072,
  diskGB: 30,
  services: 3,
  sizingNote: '1 GiB per node minimum; raise for real write throughput (every node applies every write). Three nodes, all internal. Experimental: cold-start needs Galera-style care.',
  faq: [
    {
      q: 'How is this different from primary/replica replication?',
      a: 'PXC is synchronous and multi-primary: writes commit on all nodes together, so there is no replica lag and any node accepts writes. Primary/replica (mariadb-replication) is asynchronous - one writable primary, replicas that can lag and need manual promotion.',
    },
    {
      q: 'PXC or mariadb-galera?',
      a: 'They are the same class of cluster (both Galera-based synchronous multi-primary) on different forks - PXC on Percona/MySQL, mariadb-galera on MariaDB. Pick the one matching the database your app targets.',
    },
    {
      q: 'Why experimental?',
      a: 'Synchronous clusters are sensitive to startup ordering: a full cold start can require bootstrapping the most-advanced node first to avoid split-brain. Everything is wired and validated, but it needs the operational care any Galera cluster does.',
    },
  ],
};
