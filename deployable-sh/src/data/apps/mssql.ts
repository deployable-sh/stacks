import type { AppBase } from './index';

export const mssql: AppBase = {
  slug: 'mssql',
  name: 'SQL Server',
  upstream: 'Microsoft SQL Server 2025',
  upstreamUrl: 'https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker',
  tagline:
    'Microsoft SQL Server 2025 on Linux - Express edition with its free production license, internal-only, one variable to accept the EULA.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host Microsoft SQL Server: Express edition with Docker Compose',
  seoDescription:
    'Deploy SQL Server 2025 (Linux container, Express edition - free production license, 50 GB per database) in one step for $13/month. The official Microsoft image, internal-only.',
  keywords: [
    'sql server docker compose',
    'mssql self-hosted',
    'sql server express production',
    'sql server linux container',
    'cheap sql server hosting',
    'azure sql alternative',
  ],
  intro: [
    'Plenty of stacks are married to SQL Server - .NET shops, legacy line-of-business apps, vendors who only certify against MSSQL. What is less known: Microsoft licenses the Express edition for production at no cost, and SQL Server 2025 raised its ceiling to 50 GB per database. That covers a remarkable number of real workloads.',
    'This template runs the official Linux container (mcr.microsoft.com/mssql/server:2025) internal-only - databases never get a public domain - with data on a persistent volume. Two variables: an explicit ACCEPT_EULA=Y (your acceptance, not baked in) and the sa password.',
    'Need Standard or Enterprise? Set MSSQL_PID to your licensed edition - the container model is bring-your-own-license, and setting the PID is the attestation. Developer editions stay out of production; this template defaults to the edition that is actually free there.',
  ],
  features: [
    'Official Microsoft image, SQL Server 2025 on Linux',
    'Express edition: free production license, 50 GB per database',
    'Full T-SQL, columnstore, JSON, and the tooling ecosystem (.NET, SSMS, sqlcmd)',
    'Explicit EULA acceptance via variable - nothing silently agreed',
    'BYOL path: switch MSSQL_PID to Standard/Enterprise you already own',
    'Internal-only, persistent /var/opt/mssql volume, non-root container',
  ],
  topology: [
    { service: 'mssql', role: 'SQL Server 2025 (:1433)', isPublic: 'no (by design)' },
  ],
  requiredVars: [
    { name: 'ACCEPT_EULA', what: 'set Y to accept the Microsoft EULA - deliberate, not baked into the template' },
    { name: 'MSSQL_SA_PASSWORD', what: '8+ chars, 3 of 4 character classes' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    'Express caps its buffer pool at ~1.4 GB, so 2 GiB is the natural fit - the edition cannot use more. BYOL Standard wants the next plans up. Note: amd64 only; SQL Server has no arm64 story at all.',
  faq: [
    {
      q: 'Is it really legal to run SQL Server Express in production for free?',
      a: 'Yes - Microsoft offers a free production license for Express, linked from their own container deployment docs. The limits are technical, not legal: 50 GB per database (2025), ~1.4 GB buffer pool, up to 4 cores, no SQL Agent. The template defaults to Express for exactly this reason.',
    },
    {
      q: 'How does this compare to Azure SQL Database pricing?',
      a: 'Azure SQL meters compute (DTUs or vCores) plus storage per database, around the clock for always-on workloads. This stack is $13/month flat on a 2 GiB plan - and the same plan still hosts the app that talks to it. For Express-sized workloads the difference is roughly an order of magnitude.',
    },
    {
      q: 'Can I bring my own Standard or Enterprise license?',
      a: 'Yes - set MSSQL_PID=Standard (or Enterprise) and you attest to holding that license; the container does not validate keys. Raise the RAM in compose.miget.yaml accordingly - Standard 2025 can use up to 256 GB of buffer pool if you give it a plan that big.',
    },
    {
      q: 'How do my apps connect?',
      a: 'From the same Miget project: Server=mssql,1433 with the sa credentials (or better, an app login you create on first boot via MSSQL_DB/MSSQL_USER/MSSQL_PASSWORD). The instance is private with no ingress route - exactly how a database should live.',
    },
    {
      q: 'Why is there no arm64 image?',
      a: 'Microsoft only builds SQL Server containers for x86-64, and the old arm64 workaround (Azure SQL Edge) was retired in September 2025. If your platform nodes are amd64 - as Miget standard plans are - this is a non-issue.',
    },
  ],
};
