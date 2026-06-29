import type { AppBase } from './index';

export const oracle: AppBase = {
  slug: 'oracle',
  name: 'Oracle Database Free',
  upstream: 'Oracle Database Free (26ai)',
  upstreamUrl: 'https://www.oracle.com/database/free/',
  tagline:
    'The actual Oracle Database, free for production under the FUTC license - 2 cores, 2 GB RAM, 12 GB data, zero invoices.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host Oracle Database Free with Docker Compose',
  seoDescription:
    'Deploy Oracle Database Free (26ai) in one step for $25/month - legal for production under Oracle’s Free Use Terms, with hard caps of 2 cores, 2 GB RAM and 12 GB user data. Multi-arch image.',
  keywords: [
    'oracle database docker compose',
    'oracle database free production',
    'oracle xe successor',
    'self-host oracle database',
    'oracle free 26ai',
    'cheap oracle hosting',
  ],
  intro: [
    'Sometimes the requirement is simply "Oracle": a vendor app certified against it, a team fluent in PL/SQL, an integration test suite that needs the real thing. Oracle Database Free is Oracle’s answer - the genuine database engine (the 26ai line), licensed under the Free Use Terms and Conditions, which explicitly allow internal production use, not just dev and test.',
    'The catch is enforced by the software, not a sales call: 2 CPU cores, 2 GB of memory, 12 GB of user data, one instance per host. Within that envelope it is a full Oracle: PL/SQL, partitioning, JSON-relational duality, the works.',
    'This template runs the gvenzl/oracle-free image (maintained by Oracle’s own database product manager, redistribution blessed by the FUTC): multi-arch, faster startup than the official build, and an app schema user bootstrapped in FREEPDB1 on first start. Internal-only, 20 GB volume, two passwords.',
  ],
  features: [
    'Real Oracle Database (26ai line) - PL/SQL, JSON duality, partitioning',
    'FUTC license: production use is explicitly permitted, free',
    'Caps enforced in software: 2 cores, 2 GB RAM, 12 GB user data',
    'Multi-arch image with app user bootstrap (FREEPDB1)',
    'Faststart image variant available for quick cold starts',
    'Internal-only single node + 20 GB volume',
  ],
  topology: [
    { service: 'oracle', role: 'Oracle Database Free (:1521, service FREEPDB1)', isPublic: 'no (by design)' },
  ],
  requiredVars: [
    { name: 'ORACLE_PASSWORD', what: 'SYS / SYSTEM / PDBADMIN password' },
    { name: 'APP_USER_PASSWORD', what: 'password for the bootstrapped app schema user in FREEPDB1' },
  ],
  ramMiB: 3072,
  diskGB: 20,
  services: 1,
  sizingNote:
    'The database caps itself at 2 GB SGA+PGA; the third gigabyte covers listener, server processes, and OS overhead. First start initializes the database onto the volume and takes a few minutes - later starts are quick.',
  faq: [
    {
      q: 'Is Oracle Database Free actually legal for production?',
      a: 'Yes - the Free Use Terms and Conditions permit "running the Programs for your own internal business operations" alongside dev, test, and demo use. No support contract, no fees, and the resource limits are enforced by the software itself rather than by audits.',
    },
    {
      q: 'What happens when I hit the 12 GB data limit?',
      a: 'The database raises ORA-12954 and stops accepting new data - it does not bill you, it just stops. If your data outgrows Free, that is the moment to discuss a real Oracle license (and a bigger plan), or to ask whether Postgres could take the workload.',
    },
    {
      q: 'Why the gvenzl image instead of Oracle’s official one?',
      a: 'It is maintained by Oracle’s database product management, the FUTC explicitly permits redistribution, and it is better operationally: amd64 + arm64, slimmer variants, faststart builds, and APP_USER bootstrap. The template works with the official container-registry.oracle.com/database/free image too - swap the image and use ORACLE_PWD.',
    },
    {
      q: 'How do applications connect?',
      a: 'From the same Miget project: oracle:1521/FREEPDB1 - e.g. jdbc:oracle:thin:@//oracle:1521/FREEPDB1 with the app user, or sqlplus app/<password>@//oracle:1521/FREEPDB1. The instance is private with no ingress route.',
    },
    {
      q: 'How does this compare to Oracle’s cloud database pricing?',
      a: 'OCI’s always-on managed Oracle offerings meter ECPUs and storage by the hour and land at multiples of this $25/month plan. Oracle even has an Always Free tier on OCI - the honest comparison - but it ties you to OCI; this template puts the same free engine next to your apps on your platform.',
    },
  ],
};
