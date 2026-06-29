import type { AppBase } from './index';

export const mariadbGalera: AppBase = {
  slug: 'mariadb-galera',
  name: 'MariaDB Galera',
  upstream: 'MariaDB 11.8 LTS + Galera',
  upstreamUrl: 'https://mariadb.org',
  tagline:
    '3-node synchronous multi-primary MySQL-family HA on the official image - every node writes, any node can die.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host a MariaDB Galera cluster with Docker Compose',
  seoDescription:
    'Deploy a 3-node MariaDB 11.8 Galera cluster in one step - official image, flag-driven clustering, restart-safe bootstrap wrapper. MySQL-family HA without paywalled images.',
  keywords: [
    'mariadb galera docker compose',
    'mysql cluster self-hosted',
    'galera cluster setup',
    'mariadb ha cluster',
    'bitnami mariadb-galera alternative',
    'multi primary mysql',
  ],
  intro: [
    'MySQL-family high availability got harder to ship in 2025 when Broadcom paywalled the Bitnami images everyone’s tutorials used. The good news, verified by actually running clusters: the OFFICIAL mariadb image carries the Galera library, and a 3-node multi-primary cluster forms from pure command-line flags plus one env var.',
    'Galera is synchronous: every node accepts writes, every commit lands on the quorum, and a node loss costs availability nothing. The traps are operational, and this template handles each one found in testing - the bootstrap flag fires only on a genuinely first boot (a permanent flag crash-loops on restart), stop_grace_period is 2 minutes (the 10-second default SIGKILLs mariadbd and poisons cluster state), and the cold-start recovery procedure is documented rather than discovered at 3am.',
    'An app database and user replicate to all nodes at bootstrap. Apps connect to any node - list all three for driver-level failover.',
  ],
  features: [
    'Synchronous multi-primary: write to any node, lose any node',
    'Official mariadb:11.8 LTS image - no forks, no paywalled registries',
    'Flag-driven clustering; bootstrap-once wrapper (tested) on node 1',
    'stop_grace_period and recovery runbook handled, not hand-waved',
    'App database/user replicated cluster-wide at bootstrap',
    'Per-node volumes; healthchecks via the image’s --galera_online',
  ],
  topology: [
    { service: 'galera-1', role: 'node + bootstrap-once wrapper (:3306)', isPublic: 'no' },
    { service: 'galera-2, galera-3', role: 'nodes (join via SST/IST)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'MARIADB_ROOT_PASSWORD', what: 'root on all nodes' },
    { name: 'MARIADB_APP_PASSWORD', what: 'the replicated app user/database' },
  ],
  ramMiB: 3072,
  diskGB: 15,
  services: 3,
  sizingNote:
    'Nodes idle near 135 MiB with default buffer pools - 1 GiB each leaves real working-set room. Three nodes is the quorum minimum; scale by adding blocks to the gcomm list.',
  faq: [
    {
      q: 'Why not the managed MySQL?',
      a: 'The managed MySQL is the right default for a single instance. This template exists for the HA case - synchronous multi-primary across three nodes - which managed single-instance offerings do not provide. Different reliability class, same project network.',
    },
    {
      q: 'What happened to the Bitnami images everyone used?',
      a: 'Broadcom moved Bitnami to paid “Secure Images” in late 2025; the free mariadb-galera images are frozen without security updates. This template needs none of that: the official mariadb image has shipped the Galera library all along, configured via flags.',
    },
    {
      q: 'What does the bootstrap wrapper actually solve?',
      a: 'Galera’s classic foot-gun: --wsrep-new-cluster must run exactly once, on the first node’s first boot. Left in the command permanently, the safe_to_bootstrap guard crash-loops the node on every restart - verified by testing. The wrapper checks for grastate.dat and adds the flag only when the datadir is genuinely new.',
    },
    {
      q: 'What if the whole cluster stops uncleanly?',
      a: 'Galera refuses to guess which node has the newest data - by design. The README gives the two-step recovery (pick the highest-seqno node, flip safe_to_bootstrap, start it first). It is a documented 2-minute procedure, not an outage mystery.',
    },
  ],
};
