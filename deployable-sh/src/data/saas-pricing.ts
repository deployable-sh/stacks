import type { SaasCompareRow } from './types';

/**
 * Managed-service price points per app, researched June 2026 from official
 * pricing pages (sources on each row). Update this file, not the app files,
 * when vendors change prices.
 */
export const SAAS_PRICING: Record<string, { rows: SaasCompareRow[]; note?: string }> = {
  kafka: {
    rows: [
      {
        name: 'Confluent Cloud',
        plan: 'Basic (usage-based)',
        usd: 120,
        priceNote: 'small always-on workload (~2 eCKU avg + transfer + storage); Standard tier from ~$385/mo',
        url: 'https://www.confluent.io/confluent-cloud/pricing/',
      },
      {
        name: 'AWS MSK',
        plan: '3× kafka.t3.small',
        usd: 130,
        priceNote: 'smallest 3-broker provisioned cluster + EBS storage; AWS’s own sizing example (3× m7g.large) lands ~$607/mo',
        url: 'https://aws.amazon.com/msk/pricing/',
      },
    ],
  },
  redpanda: {
    rows: [
      {
        name: 'Redpanda Cloud',
        plan: 'Serverless',
        usd: 95,
        priceNote: 'always-on small workload (base compute + partitions + transfer + storage); BYOC is annual-commit',
        url: 'https://www.redpanda.com/pricing',
      },
      {
        name: 'Confluent Cloud',
        plan: 'Basic (usage-based)',
        usd: 120,
        priceNote: 'comparable small Kafka-API workload',
        url: 'https://www.confluent.io/confluent-cloud/pricing/',
      },
    ],
  },
  rabbitmq: {
    rows: [
      {
        name: 'CloudAMQP',
        plan: 'Big Bunny (3-node HA)',
        usd: 297,
        priceNote: 'cheapest dedicated 3-node HA cluster (~1k msg/s sustained, multi-AZ)',
        url: 'https://www.cloudamqp.com/plans.html',
      },
      {
        name: 'CloudAMQP',
        plan: 'Sassy Squirrel (1 node)',
        usd: 50,
        priceNote: 'cheapest dedicated instance - single node, no HA',
        url: 'https://www.cloudamqp.com/plans.html',
      },
    ],
  },
  mongodb: {
    rows: [
      {
        name: 'MongoDB Atlas',
        plan: 'M10 dedicated',
        usd: 57,
        priceNote: '3-node replica set, 2 GB RAM per node, 10-128 GB storage',
        url: 'https://www.mongodb.com/pricing',
      },
      {
        name: 'MongoDB Atlas',
        plan: 'Flex',
        usd: null,
        priceNote: 'usage-tiered, capped $8-30/mo - shared infrastructure, the pre-dedicated entry point',
        url: 'https://www.mongodb.com/pricing',
      },
    ],
  },
  clickhouse: {
    rows: [
      {
        name: 'ClickHouse Cloud',
        plan: 'Basic',
        usd: 67,
        priceNote: 'development-shaped: single replica active ~6h/day + 500 GB storage (worked example)',
        url: 'https://clickhouse.com/docs/cloud/manage/billing/overview',
      },
      {
        name: 'ClickHouse Cloud',
        plan: 'Scale',
        usd: 499,
        priceNote: 'production: 2× 8 GiB replicas always-on + 1 TB storage (worked example)',
        url: 'https://clickhouse.com/docs/cloud/manage/billing/overview',
      },
    ],
  },
  n8n: {
    rows: [
      {
        name: 'n8n Cloud',
        plan: 'Starter',
        usd: 24,
        priceNote: '2,500 executions/mo, 5 concurrent - no queue mode',
        url: 'https://n8n.io/pricing/',
      },
      {
        name: 'n8n Cloud',
        plan: 'Pro',
        usd: 60,
        priceNote: '10,000 executions/mo, 20 concurrent',
        url: 'https://n8n.io/pricing/',
      },
    ],
    note: 'Self-hosted n8n has no execution metering - the comparison crosses over at a few thousand workflow runs a month.',
  },
  glitchtip: {
    rows: [
      {
        name: 'Sentry',
        plan: 'Team',
        usd: 26,
        priceNote: '50k errors/mo included, pay-as-you-go overage beyond quota',
        url: 'https://sentry.io/pricing/',
      },
    ],
    note: 'Same SDKs on both sides - the variable is whether a noisy deploy is a disk-space event or a billing event.',
  },
  bugsink: {
    rows: [
      {
        name: 'Sentry',
        plan: 'Team',
        usd: 26,
        priceNote: '50k errors/mo included, pay-as-you-go overage beyond quota',
        url: 'https://sentry.io/pricing/',
      },
    ],
  },
  keycloak: {
    rows: [
      {
        name: 'Auth0',
        plan: 'Essentials (B2C)',
        usd: 70,
        priceNote: 'at 1,000 MAU (from $35 at 500 MAU) - scales with users',
        url: 'https://auth0.com/pricing',
      },
      {
        name: 'Clerk',
        plan: 'Pro',
        usd: 25,
        priceNote: 'base + $0.02 per monthly retained user past 50k; SSO connections $75 each',
        url: 'https://clerk.com/pricing',
      },
      {
        name: 'FusionAuth',
        plan: 'Starter (cloud)',
        usd: 162,
        priceNote: 'cheapest managed FusionAuth, billed annually',
        url: 'https://fusionauth.io/pricing',
      },
    ],
    note: 'Identity SaaS prices per user; Keycloak prices per gigabyte. Past hobby scale the curves diverge fast.',
  },
  kong: {
    rows: [
      {
        name: 'Kong Konnect',
        plan: 'Plus (serverless gateway)',
        usd: 25,
        priceNote: 'per gateway, 1M requests/mo included - then $200 per extra 1M (cap 10M)',
        url: 'https://konghq.com/pricing',
      },
    ],
    note: 'Self-hosted Kong OSS has no request metering; Konnect adds the hosted control plane and analytics.',
  },
  supabase: {
    rows: [
      {
        name: 'Supabase Cloud',
        plan: 'Pro',
        usd: 25,
        priceNote: 'per org + metered compute/egress/storage/MAUs past included quotas',
        url: 'https://supabase.com/pricing',
      },
    ],
    note: 'Hosted Pro is excellent value at small scale - self-hosting wins on data ownership and once the meters (egress, MAU, compute) start running.',
  },
  'supabase-lite': {
    rows: [
      {
        name: 'Supabase Cloud',
        plan: 'Pro',
        usd: 25,
        priceNote: 'per org + metered compute/egress/storage/MAUs past included quotas',
        url: 'https://supabase.com/pricing',
      },
    ],
    note: 'The comparison flips versus the full stack: the lite core costs less than hosted Pro while keeping the always-on, no-meters, your-data advantages.',
  },
  pocketbase: {
    rows: [
      {
        name: 'Firebase',
        plan: 'Blaze (usage)',
        usd: null,
        priceNote: '~$1-3/mo for a small app - scales per-read/write/MAU from there',
        url: 'https://firebase.google.com/pricing',
      },
      {
        name: 'Supabase Cloud',
        plan: 'Pro',
        usd: 25,
        priceNote: 'the hosted Postgres-flavored equivalent',
        url: 'https://supabase.com/pricing',
      },
    ],
    note: 'At tiny scale Firebase is nearly free - PocketBase is about owning the stack, SQL access, and a bill that never scales with success.',
  },
  convex: {
    rows: [
      {
        name: 'Convex Cloud',
        plan: 'Professional',
        usd: 25,
        priceNote: 'per developer/mo - 25M function calls, 50 GB storage included, overages metered',
        url: 'https://www.convex.dev/pricing',
      },
    ],
  },
  qdrant: {
    rows: [
      {
        name: 'Qdrant Cloud',
        plan: 'Standard (gpx1, 2 GiB)',
        usd: 26,
        priceNote: 'smallest dedicated node (2 GiB RAM / 0.5 vCPU / 8 GiB disk), single node - HA multiplies',
        url: 'https://qdrant.tech/pricing/',
      },
    ],
  },
  chromadb: {
    rows: [
      {
        name: 'Chroma Cloud',
        plan: 'Starter (usage)',
        usd: null,
        priceNote: '~$0-5/mo small workloads (covered by $5 credit); Team tier $250/mo flat + usage',
        url: 'https://www.trychroma.com/pricing',
      },
    ],
    note: 'Chroma Cloud’s usage pricing is genuinely cheap at small scale - self-hosting is about data locality and no per-query metering.',
  },
  meilisearch: {
    rows: [
      {
        name: 'Meilisearch Cloud',
        plan: 'Cloud',
        usd: 20,
        priceNote: 'floor; realistic small-project usage lands ~$23-30/mo',
        url: 'https://www.meilisearch.com/pricing',
      },
      {
        name: 'Algolia',
        plan: 'Grow (pay-as-you-go)',
        usd: 45,
        priceNote: 'at ~100k searches + 100k records/mo ($0.50 per 1k searches past free tier)',
        url: 'https://www.algolia.com/pricing',
      },
    ],
  },
  minio: {
    rows: [
      {
        name: 'AWS S3',
        plan: 'pay-as-you-go',
        usd: null,
        priceNote: '~$1-3/mo at 20 GB + modest requests; egress $0.09/GB past free allowance',
        url: 'https://aws.amazon.com/s3/pricing/',
      },
      {
        name: 'Cloudflare R2',
        plan: 'pay-as-you-go',
        usd: null,
        priceNote: '~$0.15/mo at 20 GB; zero egress fees by design',
        url: 'https://developers.cloudflare.com/r2/pricing/',
      },
    ],
    note: 'Honest math: at 20 GB, S3/R2 are cheaper than self-hosting. MinIO earns its keep with S3 event hooks, ILM rules, LAN latency to your apps, and zero external dependency - not raw storage price.',
  },
  cronicle: {
    rows: [
      {
        name: 'Cronitor',
        plan: 'Business (pay-as-you-go)',
        usd: 20,
        priceNote: '$2/monitor - ~10 monitored jobs; monitoring only, does not run your jobs',
        url: 'https://cronitor.io/pricing',
      },
      {
        name: 'Healthchecks.io',
        plan: 'Business',
        usd: 20,
        priceNote: '100 checks - again, monitoring; the scheduler is still on you',
        url: 'https://healthchecks.io/pricing/',
      },
    ],
    note: 'There is no true SaaS twin: hosted products monitor crons, Cronicle runs and monitors them.',
  },
  mattermost: {
    rows: [
      { name: 'Slack', plan: 'Pro', usd: 219, priceNote: '$8.75/user/mo (monthly) at 25 users; $7.25 annual', url: 'https://slack.com/pricing' },
      { name: 'Microsoft Teams', plan: 'Essentials', usd: 100, priceNote: '$4/user/mo (annual) at 25 users', url: 'https://www.microsoft.com/microsoft-teams/compare-microsoft-teams-business-options' },
    ],
    note: 'Team chat is per-seat everywhere; Mattermost self-hosted has no seat meter.',
  },
  rocketchat: {
    rows: [
      { name: 'Slack', plan: 'Pro', usd: 219, priceNote: '$8.75/user/mo at 25 users', url: 'https://slack.com/pricing' },
      { name: 'Rocket.Chat Cloud', plan: 'paid', usd: null, priceNote: 'contact-sales; the self-hosted Community edition is free (MIT)', url: 'https://www.rocket.chat/pricing' },
    ],
  },
  odoo: {
    rows: [
      { name: 'Odoo Online', plan: 'Standard', usd: 389, priceNote: '$38.90/user/mo (monthly) at 10 users; $31.10 annual', url: 'https://www.odoo.com/pricing' },
      { name: 'Odoo Online', plan: 'Custom', usd: 762, priceNote: '$76.20/user/mo at 10 users - adds Studio, multi-company, external API', url: 'https://www.odoo.com/pricing' },
    ],
    note: 'Community self-hosted is unlimited users; you trade Enterprise-only apps and official support for a flat plan.',
  },
  bagisto: {
    rows: [
      { name: 'Shopify', plan: 'Basic', usd: 39, priceNote: '$39/mo ($29 annual) + 2.9% + 30¢ per transaction', url: 'https://www.shopify.com/pricing' },
      { name: 'BigCommerce', plan: 'Core', usd: 39, priceNote: '$39/mo ($29 annual); auto-upgrades past $30K trailing GMV', url: 'https://www.bigcommerce.com/essentials/pricing/' },
    ],
    note: 'Self-hosted Bagisto has no platform fee and no GMV cut - your payment-gateway rates only.',
  },
  activepieces: {
    rows: [
      { name: 'Zapier', plan: 'Professional', usd: 30, priceNote: '~$30/mo for 750 tasks (annual $20); pay-per-task overage', url: 'https://zapier.com/pricing' },
      { name: 'Make.com', plan: 'Core', usd: 9, priceNote: '$9/mo for 10,000 operations', url: 'https://www.make.com/en/pricing' },
    ],
    note: 'Self-hosted Activepieces meters neither tasks nor flows.',
  },
  freescout: {
    rows: [
      { name: 'Zendesk', plan: 'Suite Team', usd: 275, priceNote: '$55/agent/mo at 5 agents', url: 'https://www.zendesk.com/pricing/' },
      { name: 'Help Scout', plan: 'Standard', usd: 125, priceNote: '$25/seat/mo at 5 seats', url: 'https://www.helpscout.com/pricing/' },
      { name: 'Freshdesk', plan: 'Growth', usd: 95, priceNote: '$19/agent/mo at 5 agents', url: 'https://www.freshworks.com/freshdesk/pricing/' },
    ],
    note: 'Help desks price per agent; FreeScout is flat with unlimited agents (modules are one-time licenses).',
  },
  openobserve: {
    rows: [
      { name: 'Datadog Logs', plan: 'ingest + index', usd: null, priceNote: '~$0.10/GB ingested AND ~$1.70 per million log events indexed - you pay twice', url: 'https://www.datadoghq.com/pricing/' },
      { name: 'Logz.io', plan: 'usage', usd: null, priceNote: '~$0.92-1.03 per GB/day ingested', url: 'https://logz.io/pricing/' },
      { name: 'Splunk', plan: 'ingest', usd: null, priceNote: 'list ~$1,800-2,700 per GB/day/year - the genre’s villain', url: 'https://www.splunk.com/en_us/products/pricing.html' },
    ],
    note: 'Log SaaS meters every gigabyte (sometimes twice); columnar-on-S3 self-hosting turns retention from a bill into disk space.',
  },
  parseable: {
    rows: [
      { name: 'Datadog Logs', plan: 'ingest + index', usd: null, priceNote: '~$0.10/GB + ~$1.70 per million events', url: 'https://www.datadoghq.com/pricing/' },
      { name: 'Better Stack', plan: 'Logs (retained)', usd: null, priceNote: '~$0.50/GB-mo retained (annual)', url: 'https://betterstack.com/pricing' },
    ],
  },
  changedetection: {
    rows: [
      { name: 'Visualping', plan: 'Personal', usd: 10, priceNote: '10 pages, 1,000 checks/mo (slider to $100 for 200 pages)', url: 'https://visualping.io/pricing' },
      { name: 'Distill.io', plan: 'Starter', usd: 15, priceNote: '5 cloud monitors at 10-min intervals', url: 'https://distill.io/pricing' },
    ],
    note: 'Hosted watchers meter pages and check frequency; self-hosted, both are your call.',
  },
  ntfy: {
    rows: [
      { name: 'ntfy.sh', plan: 'Pro', usd: 10, priceNote: '20k messages/day, 10 reserved topics ($5 Supporter tier below it)', url: 'https://ntfy.sh' },
      { name: 'Pushover', plan: 'license', usd: null, priceNote: '$4.99 one-time per platform; Teams $5/user/mo', url: 'https://pushover.net/pricing' },
    ],
  },
  actual: {
    rows: [
      { name: 'YNAB', plan: 'annual', usd: 9, priceNote: '$109/yr (or $14.99 monthly) - the methodology Actual implements, plus bank sync', url: 'https://www.ynab.com/pricing' },
    ],
    note: 'Actual is free software; the $5 plan is the sync server. YNAB’s bank sync is the one feature you trade (community bridges exist).',
  },
  'stirling-pdf': {
    rows: [
      { name: 'Adobe Acrobat', plan: 'Standard (teams)', usd: 17, priceNote: '$16.99/license/mo (Pro $23.99); individual $14.99', url: 'https://www.adobe.com/acrobat/pricing.html' },
      { name: 'Stirling', plan: 'Processor (hosted)', usd: null, priceNote: 'usage-based $0.05 per PDF processed', url: 'https://www.stirling.com/pricing' },
    ],
  },
  outline: {
    rows: [
      { name: 'Notion', plan: 'Business', usd: 200, priceNote: '$20/seat/mo annual at 10 seats ($24 monthly)', url: 'https://www.notion.com/pricing' },
      { name: 'Confluence', plan: 'Standard', usd: 67, priceNote: '~$6.70/user/mo monthly at 10 users (annual tiers cheaper)', url: 'https://www.atlassian.com/software/confluence/pricing' },
    ],
    note: 'Wikis are per-seat everywhere except your own: Outline self-hosted has no seat concept.',
  },
  typesense: {
    rows: [
      { name: 'Typesense Cloud', plan: 'smallest cluster', usd: 22, priceNote: '$0.03/hr for 0.5 GB RAM, no HA - the identical open-source binary, hosted', url: 'https://cloud.typesense.org/pricing' },
      { name: 'Algolia', plan: 'Grow (pay-as-you-go)', usd: 45, priceNote: 'at ~100k searches + 100k records/mo', url: 'https://www.algolia.com/pricing' },
    ],
  },
  hasura: {
    rows: [
      { name: 'Hasura DDN', plan: 'Base', usd: 150, priceNote: '$5 per active model/mo - a 30-table API with traffic costs $150/mo', url: 'https://hasura.io/pricing' },
    ],
    note: 'v2 CE self-hosted has no per-model arithmetic; DDN is the cloud-first v3 product.',
  },
  infisical: {
    rows: [
      { name: 'Infisical Cloud', plan: 'Pro', usd: 18, priceNote: 'per identity/mo - and machines count as identities', url: 'https://infisical.com/pricing' },
      { name: 'HCP Vault', plan: 'Standard (small)', usd: 1152, priceNote: '~$1.58/hr + ~$112 per client/mo; the $22/mo dev tier has no SLA', url: 'https://www.hashicorp.com/en/pricing/consumption-table' },
    ],
  },
  penpot: {
    rows: [
      { name: 'Figma', plan: 'Professional', usd: 160, priceNote: '$16/full-seat/mo annual at 10 seats ($20 monthly); Dev seats $12', url: 'https://www.figma.com/pricing' },
      { name: 'Penpot Cloud', plan: 'Unlimited', usd: 70, priceNote: '$7/user/mo at 10 users (capped $175; free tier ≤8 members)', url: 'https://penpot.app/pricing' },
    ],
  },
  linkwarden: {
    rows: [
      { name: 'Raindrop.io', plan: 'Pro', usd: null, priceNote: '~$28/yr - and Pocket shut down in 2025 with all user data deleted, which is the whole argument for owning your bookmarks', url: 'https://raindrop.io/pro/buy' },
    ],
  },
  temporal: {
    rows: [
      { name: 'Temporal Cloud', plan: 'Essentials', usd: 100, priceNote: '1M actions + storage included, then $25-50 per million actions', url: 'https://temporal.io/pricing' },
    ],
  },
  letta: {
    rows: [
      {
        name: 'Letta Cloud',
        plan: 'paid',
        usd: 20,
        priceNote: 'from $20/mo + $0.10 per active agent + usage (free tier: 5k credits)',
        url: 'https://docs.letta.com/guides/api/plans',
      },
    ],
  },
  dify: {
    rows: [
      {
        name: 'Dify Cloud',
        plan: 'Professional',
        usd: 59,
        priceNote: 'per workspace: 5,000 message credits/mo, 3 members, 50 apps; Team $159/mo',
        url: 'https://dify.ai/pricing',
      },
    ],
    note: 'Self-hosted Dify has no message-credit meter; LLM calls bill at your providers either way.',
  },
  usesend: {
    rows: [
      {
        name: 'Resend',
        plan: 'Pro',
        usd: 20,
        priceNote: '50k emails/mo ($35 for 100k); the developer experience useSend mirrors',
        url: 'https://resend.com/pricing',
      },
      {
        name: 'Postmark',
        plan: 'Basic',
        usd: 15,
        priceNote: '10k emails/mo, $1.80 per extra 1k',
        url: 'https://postmarkapp.com/pricing',
      },
    ],
    note: 'Self-hosted, delivery costs SES postage (~$0.10/1k) - the platform fee disappears and the per-email curve flattens.',
  },
  prefect: {
    rows: [
      {
        name: 'Prefect Cloud',
        plan: 'Starter',
        usd: 100,
        priceNote: 'past the free Hobby tier (2 users / 5 deployments)',
        url: 'https://www.prefect.io/pricing',
      },
    ],
  },
  logto: {
    rows: [
      {
        name: 'Auth0',
        plan: 'Essentials (B2C)',
        usd: 70,
        priceNote: 'at 1,000 MAU; Professional from $240/mo - the experience Logto cloned, minus the meter',
        url: 'https://auth0.com/pricing',
      },
      {
        name: 'Clerk',
        plan: 'Pro',
        usd: 25,
        priceNote: 'base + $0.02 per monthly retained user past 50k; SSO connections $75 each',
        url: 'https://clerk.com/pricing',
      },
    ],
  },
  chatwoot: {
    rows: [
      {
        name: 'Intercom',
        plan: 'Essential',
        usd: 145,
        priceNote: '$29/seat/mo at 5 agents, + $0.99 per Fin AI resolution',
        url: 'https://www.intercom.com/pricing',
      },
      {
        name: 'Zendesk',
        plan: 'Suite Team',
        usd: 275,
        priceNote: '$55/agent/mo at 5 agents',
        url: 'https://www.zendesk.com/pricing/',
      },
      {
        name: 'Chatwoot Cloud',
        plan: 'Startups',
        usd: 95,
        priceNote: '$19/agent/mo (annual) at 5 agents - same software, their hosting',
        url: 'https://www.chatwoot.com/pricing',
      },
    ],
  },
  superset: {
    rows: [
      {
        name: 'Preset',
        plan: 'Professional',
        usd: 300,
        priceNote: '$20/user/mo at 15 users (Starter base $100/mo + per-user) - hosted Superset',
        url: 'https://preset.io/pricing/',
      },
      {
        name: 'Metabase Cloud',
        plan: 'Starter',
        usd: 100,
        priceNote: 'the adjacent hosted-BI reference: base + $6/user',
        url: 'https://www.metabase.com/pricing/',
      },
    ],
  },
  phoenix: {
    rows: [
      {
        name: 'Arize AX',
        plan: 'Pro',
        usd: 50,
        priceNote: 'past the free 25k spans/mo tier',
        url: 'https://arize.com/pricing/',
      },
      {
        name: 'LangSmith',
        plan: 'Plus',
        usd: 39,
        priceNote: 'per seat + $2.50 per 1k traces past the included 10k',
        url: 'https://www.langchain.com/pricing',
      },
    ],
  },
  kestra: {
    rows: [
      {
        name: 'Astronomer',
        plan: 'Developer (managed Airflow)',
        usd: 255,
        priceNote: 'from $0.35/hr per always-on deployment, workers extra - the managed-orchestrator reference point',
        url: 'https://www.astronomer.io/pricing/',
      },
    ],
    note: 'Kestra Cloud itself is usage-priced; the open-source core this template ships is the full product for self-hosters.',
  },
  typebot: {
    rows: [
      {
        name: 'Typeform',
        plan: 'Basic',
        usd: 29,
        priceNote: '100 responses/mo, 1 user ($25 annual); Plus $59 for 1,000 responses',
        url: 'https://www.typeform.com/pricing/',
      },
      {
        name: 'Typebot Cloud',
        plan: 'Starter',
        usd: 39,
        priceNote: '2,000 chats/mo, 2 seats; +$10 per extra 500 chats',
        url: 'https://typebot.com/pricing',
      },
    ],
    note: 'Self-hosted Typebot grants the unlimited plan to your admin account - no chat or seat meters anywhere.',
  },
  twenty: {
    rows: [
      {
        name: 'Attio',
        plan: 'Plus',
        usd: 290,
        priceNote: '$29/user/mo annual at 10 users (~$36 monthly)',
        url: 'https://attio.com/pricing',
      },
      {
        name: 'Pipedrive',
        plan: 'Lite',
        usd: 140,
        priceNote: '$14/user/mo annual at 10 users ($24 monthly)',
        url: 'https://www.pipedrive.com/en/pricing',
      },
      {
        name: 'HubSpot',
        plan: 'Starter',
        usd: 150,
        priceNote: '$15/seat/mo annual at 10 seats - contact tiers and hub upgrades climb from there',
        url: 'https://www.hubspot.com/products/crm/starter',
      },
    ],
    note: 'CRMs are the purest per-seat genre; Twenty self-hosted makes headcount free.',
  },
  docuseal: {
    rows: [
      {
        name: 'DocuSign',
        plan: 'Standard',
        usd: 30,
        priceNote: 'per user/mo (annual) - capped at 100 envelopes per user per YEAR, overage billed per envelope',
        url: 'https://ecom.docusign.com/plans-and-pricing/esignature',
      },
      {
        name: 'Dropbox Sign',
        plan: 'Essentials',
        usd: 15,
        priceNote: '1 user, 5 templates ($10/mo billed yearly)',
        url: 'https://sign.dropbox.com/products/dropbox-sign/pricing',
      },
      {
        name: 'DocuSeal Pro',
        plan: 'cloud/on-prem',
        usd: 20,
        priceNote: 'per user/mo - adds white-label, SSO, reminders, bulk send to the free core',
        url: 'https://www.docuseal.com/pricing',
      },
    ],
    note: 'The envelope is the strangest meter in SaaS; self-hosted signing has no counter at all.',
  },
  documenso: {
    rows: [
      {
        name: 'DocuSign',
        plan: 'Standard',
        usd: 30,
        priceNote: 'per user/mo (annual), 100 envelopes per user per year',
        url: 'https://ecom.docusign.com/plans-and-pricing/esignature',
      },
      {
        name: 'PandaDoc',
        plan: 'Starter',
        usd: 19,
        priceNote: 'per seat/mo (annual), 110 documents/year, $3.50 per extra doc on monthly',
        url: 'https://www.pandadoc.com/pricing/',
      },
      {
        name: 'Documenso Cloud',
        plan: 'Teams',
        usd: 40,
        priceNote: '5 users included, +$8/user - same software, their hosting',
        url: 'https://documenso.com/pricing',
      },
    ],
  },
  authentik: {
    rows: [
      {
        name: 'Auth0',
        plan: 'Essentials (B2C)',
        usd: 70,
        priceNote: 'at 1,000 MAU; Professional $240+/mo - the free tier now covers 25k MAU but the paid cliff is steep',
        url: 'https://auth0.com/pricing',
      },
      {
        name: 'Okta',
        plan: 'Starter Suite',
        usd: 60,
        priceNote: '$6/user/mo at 10 users, with a $1,500 annual contract minimum',
        url: 'https://www.okta.com/pricing/',
      },
    ],
    note: 'Identity SaaS counts users; authentik does not - users are rows in your managed Postgres.',
  },
  zitadel: {
    rows: [
      {
        name: 'Okta',
        plan: 'Starter Suite',
        usd: 60,
        priceNote: '$6/user/mo at 10 users; $1,500/year minimum contract',
        url: 'https://www.okta.com/pricing/',
      },
      {
        name: 'WorkOS',
        plan: 'SSO connections',
        usd: 125,
        priceNote: 'per SSO connection per month - each B2B customer with SSO is a new line item',
        url: 'https://workos.com/pricing',
      },
    ],
    note: 'Zitadel models each B2B customer as an organization with its own SSO config - unlimited orgs and connections on the flat plan.',
  },
  mailpit: {
    rows: [
      {
        name: 'Mailtrap',
        plan: 'Testing Basic',
        usd: 14,
        priceNote: '~500 test emails/mo in the sandbox product - the exact job Mailpit does unmetered',
        url: 'https://mailtrap.io/pricing',
      },
    ],
  },
  listmonk: {
    rows: [
      {
        name: 'Resend',
        plan: 'Pro',
        usd: 20,
        priceNote: '50k emails/mo - works great AS the relay under listmonk too',
        url: 'https://resend.com/pricing',
      },
      {
        name: 'Postmark',
        plan: 'Basic',
        usd: 15,
        priceNote: '10k emails/mo, $1.80 per extra 1k',
        url: 'https://postmarkapp.com/pricing',
      },
    ],
    note: 'listmonk is the list/campaign layer, not the pipe: pair it with SES (~$0.10/1k) or any relay above - no per-subscriber pricing anywhere in the stack.',
  },
  'github-runner': {
    rows: [
      {
        name: 'GitHub Actions',
        plan: 'hosted runners',
        usd: null,
        priceNote: '$0.006/min Linux 2-core past included minutes (2,000-3,000/mo on Free/Team) - 30k monthly minutes ≈ $165 overage',
        url: 'https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions',
      },
    ],
    note: 'Self-hosted runners are free on GitHub’s side; the announced per-minute fee for them was retracted in December 2025.',
  },
  'gitlab-runner': {
    rows: [
      {
        name: 'GitLab CI/CD',
        plan: 'hosted compute',
        usd: null,
        priceNote: '400 min/mo on Free (10,000 on Premium at $29/user/mo); extra minutes $10 per 1,000',
        url: 'https://about.gitlab.com/pricing/',
      },
    ],
    note: 'Jobs on your own runner consume zero compute-minute quota on any GitLab tier.',
  },
  'azp-agent': {
    rows: [
      {
        name: 'Azure Pipelines',
        plan: 'Microsoft-hosted',
        usd: 40,
        priceNote: 'per parallel job per month; self-hosted parallel jobs $15/mo each (first free)',
        url: 'https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/',
      },
    ],
  },
  'forgejo-runner': { rows: [] },
  'buildkite-agent': { rows: [] },
  'grafana-stack': {
    rows: [
      {
        name: 'Grafana Cloud',
        plan: 'Pro (usage)',
        usd: null,
        priceNote: '$19/mo base + $6.50 per 1k active metric series + ~$0.55/GB logs all-in; the free tier is genuinely generous',
        url: 'https://grafana.com/pricing/',
      },
      {
        name: 'Datadog',
        plan: 'Infrastructure Pro',
        usd: 15,
        priceNote: 'per host per month (annual; $18 on-demand) - before logs, APM, and custom-metric add-ons',
        url: 'https://www.datadoghq.com/pricing/',
      },
    ],
    note: 'Observability meters compound with growth; a flat self-hosted stack turns the bill into a constant.',
  },
  'open-webui': {
    rows: [
      {
        name: 'ChatGPT Business',
        plan: 'per seat',
        usd: 250,
        priceNote: '$25/user/mo monthly ($20 annual) at 10 users - before any API usage',
        url: 'https://openai.com/business/chatgpt-pricing/',
      },
      {
        name: 'Claude Team',
        plan: 'per seat',
        usd: 250,
        priceNote: '$25/seat/mo monthly ($20 annual) at 10 users; premium seats $125/mo',
        url: 'https://claude.com/pricing',
      },
    ],
    note: 'Self-hosted, the team pays raw API token prices (via the litellm template) plus $13/month for the UI - no seats.',
  },
  flowise: {
    rows: [
      {
        name: 'Flowise Cloud',
        plan: 'Starter',
        usd: 35,
        priceNote: '10,000 predictions/mo cap, 1 GB storage',
        url: 'https://flowiseai.com/pricing',
      },
      {
        name: 'Dify Cloud',
        plan: 'Professional',
        usd: 59,
        priceNote: 'per workspace: 5,000 message credits/mo, 3 members, 50 apps',
        url: 'https://dify.ai/pricing',
      },
    ],
    note: 'Self-hosted Flowise has no prediction meter - flows run on your provider keys at raw token prices.',
  },
  medusa: {
    rows: [
      {
        name: 'Shopify',
        plan: 'Basic',
        usd: 29,
        priceNote: 'annual billing ($39 monthly) + 2.9% + 30¢ per card transaction, +2% more on third-party gateways',
        url: 'https://www.shopify.com/pricing',
      },
      {
        name: 'Medusa Cloud',
        plan: 'Develop',
        usd: 29,
        priceNote: 'entry tier, 0% GMV fees; Launch $99, Scale $299',
        url: 'https://medusajs.com/pricing/',
      },
      {
        name: 'BigCommerce',
        plan: 'Core',
        usd: 29,
        priceNote: 'annual billing; auto-upgrades past $30K trailing-12-month GMV',
        url: 'https://www.bigcommerce.com/essentials/pricing/',
      },
    ],
    note: 'The platform fee is never the real cost in commerce - the percentage is. Self-hosted Medusa takes 0% of GMV at any scale; your gateway rates are the only per-transaction cost.',
  },
  saleor: {
    rows: [
      {
        name: 'Saleor Cloud',
        plan: 'Select',
        usd: 1599,
        priceNote: 'entry paid tier: $200K monthly GMV included, 0.8% overage (free non-commercial sandbox exists)',
        url: 'https://saleor.io/pricing',
      },
      {
        name: 'Shopify',
        plan: 'Grow',
        usd: 79,
        priceNote: 'annual billing + 2.7% + 30¢ per transaction, +1% on third-party gateways',
        url: 'https://www.shopify.com/pricing',
      },
    ],
    note: 'Saleor Cloud is priced for funded mid-market teams; the BSD-licensed core self-hosts with no GMV math at all.',
  },
  prestashop: {
    rows: [
      {
        name: 'Shopify',
        plan: 'Basic',
        usd: 29,
        priceNote: 'annual billing + 2.9% + 30¢ per card transaction, +2% more on third-party gateways',
        url: 'https://www.shopify.com/pricing',
      },
      {
        name: 'BigCommerce',
        plan: 'Core',
        usd: 29,
        priceNote: 'annual billing; 2% open-payment-provider fee outside embedded gateways',
        url: 'https://www.bigcommerce.com/essentials/pricing/',
      },
    ],
    note: 'PrestaShop itself is free software: no platform fee, no GMV cut, your gateway rates only - the classic European storefront play.',
  },
  sylius: {
    rows: [
      {
        name: 'Adobe Commerce',
        plan: 'license (entry)',
        usd: 1833,
        priceNote: '~$22K/year entry license (under $1M revenue), GMV-tiered upward; the mid-market platform Sylius typically replaces',
        url: 'https://business.adobe.com/products/magento/magento-commerce.html',
      },
      {
        name: 'Shopify',
        plan: 'Grow',
        usd: 79,
        priceNote: 'annual billing + per-transaction fees; customization ceiling is the reason teams reach for a framework',
        url: 'https://www.shopify.com/pricing',
      },
    ],
    note: 'Sylius is a framework, not a turnkey shop - the comparison is against the platforms agencies replace with it.',
  },
  mssql: {
    rows: [
      {
        name: 'Azure SQL Database',
        plan: 'Standard S0',
        usd: 15,
        priceNote: '10 DTU, 250 GB - the production-recommended floor (Basic at $4.90 exists: 5 DTU / 2 GB, genuinely tiny)',
        url: 'https://azure.microsoft.com/en-us/pricing/details/azure-sql-database/single/',
      },
      {
        name: 'AWS RDS for SQL Server',
        plan: 'Express, db.t3.small',
        usd: 34,
        priceNote: '2 vCPU / 2 GiB + 20 GiB storage, Single-AZ',
        url: 'https://aws.amazon.com/rds/sqlserver/pricing/',
      },
    ],
    note: 'Honest math: tiny Azure tiers undercut self-hosting on sticker price. The case here is locality (same project network as your apps), no per-database billing, and a plan that also runs the apps.',
  },
  oracle: {
    rows: [
      {
        name: 'AWS RDS for Oracle',
        plan: 'SE2 (license incl.), db.t3.small',
        usd: 57,
        priceNote: '2 vCPU / 2 GiB + 20 GiB storage, Single-AZ',
        url: 'https://aws.amazon.com/rds/oracle/pricing/',
      },
      {
        name: 'OCI Base Database',
        plan: 'Standard, ECPU',
        usd: 172,
        priceNote: 'minimums: 4 ECPUs + 256 GB storage, license included',
        url: 'https://www.oracle.com/database/base-database-service/pricing/',
      },
      {
        name: 'Oracle Autonomous DB',
        plan: 'Serverless (always-on)',
        usd: 493,
        priceNote: '2-ECPU minimum with auto-stop off; serverless pays off only with real idle time',
        url: 'https://www.oracle.com/cloud/price-list/',
      },
    ],
    note: 'OCI also has an Always Free tier (the honest budget option) - but it lives on OCI. This template puts the same free engine next to your apps.',
  },
  ghost: {
    rows: [
      {
        name: 'Ghost(Pro)',
        plan: 'Starter',
        usd: 18,
        priceNote: '1,000 members, 1 staff user; Publisher tier (custom themes) $29/mo',
        url: 'https://ghost.org/pricing/',
      },
      {
        name: 'Substack',
        plan: 'free + cut',
        usd: null,
        priceNote: '10% of paid-subscription revenue + Stripe fees, forever',
        url: 'https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost',
      },
    ],
    note: 'Self-hosted Ghost keeps 100% of subscription revenue and has no member or staff caps - the same software Ghost(Pro) runs.',
  },
  wordpress: {
    rows: [
      {
        name: 'WordPress.com',
        plan: 'Business',
        usd: 25,
        priceNote: 'billed annually ($40 monthly) - the cheapest tier that allows plugin installs',
        url: 'https://wordpress.com/pricing/',
      },
      {
        name: 'WP Engine',
        plan: 'Startup',
        usd: 30,
        priceNote: '1 site, 25k visits/mo, 10 GB storage',
        url: 'https://wpengine.com/plans/',
      },
    ],
    note: 'Self-hosted WordPress has no visit caps, full plugin freedom, and the managed MySQL handles the part that usually hurts.',
  },
  metabase: {
    rows: [
      {
        name: 'Metabase Cloud',
        plan: 'Starter',
        usd: 100,
        priceNote: 'base with 5 users included, then $6/user/mo',
        url: 'https://www.metabase.com/pricing/',
      },
    ],
    note: 'Same OSS core. Cloud adds hosting and support; Pro features (SSO, sandboxing) are a separate $575/mo tier either way.',
  },
  directus: {
    rows: [
      {
        name: 'Directus Cloud',
        plan: 'hosting add-on',
        usd: 99,
        priceNote: 'cheapest cloud hosting (3 seats, 25 collections); the license itself is free either way',
        url: 'https://directus.com/pricing',
      },
    ],
  },
  nocodb: {
    rows: [
      {
        name: 'Airtable',
        plan: 'Team',
        usd: 200,
        priceNote: '$20/seat/mo annual at 10 seats; 50k records per base cap',
        url: 'https://airtable.com/pricing',
      },
    ],
    note: 'Airtable meters seats and records; NocoDB self-hosted has neither - and it sits on a real Postgres you can query directly.',
  },
  forgejo: {
    rows: [
      {
        name: 'GitHub',
        plan: 'Team',
        usd: 40,
        priceNote: '$4/user/mo at 10 users (first-12-months rate); CI minutes metered beyond 3,000/mo',
        url: 'https://github.com/pricing',
      },
      {
        name: 'GitLab',
        plan: 'Premium',
        usd: 290,
        priceNote: '$29/user/mo at 10 users, billed annually',
        url: 'https://about.gitlab.com/pricing/',
      },
    ],
    note: 'For private team forges the per-seat math compounds; Forgejo is a flat plan with unlimited repos, users, and Actions minutes bounded only by your compute.',
  },
  'uptime-kuma': {
    rows: [
      {
        name: 'UptimeRobot',
        plan: 'Solo',
        usd: 8,
        priceNote: '10 monitors at 60s intervals; more monitors = higher tiers',
        url: 'https://uptimerobot.com/pricing/',
      },
      {
        name: 'Better Stack',
        plan: 'Uptime (usage)',
        usd: 25,
        priceNote: 'per 50-monitor bundle on top of the 10-monitor free tier; incident management seats $34/mo extra',
        url: 'https://betterstack.com/uptime/pricing',
      },
      {
        name: 'Pingdom',
        plan: 'Synthetics entry',
        usd: 10,
        priceNote: '10 uptime checks, 1 transaction check, 50 SMS alerts (annual billing)',
        url: 'https://www.pingdom.com/pricing/',
      },
    ],
    note: 'Hosted plans meter by monitor count; Uptime Kuma monitors as much as you like for the price of the container it runs in.',
  },
  umami: {
    rows: [
      {
        name: 'Plausible',
        plan: 'Starter',
        usd: 9,
        priceNote: '1 site, 10k pageviews/mo, 3-year retention',
        url: 'https://plausible.io/#pricing',
      },
      {
        name: 'Fathom',
        plan: 'entry',
        usd: 15,
        priceNote: '100k pageviews/mo across up to 50 sites',
        url: 'https://usefathom.com/pricing',
      },
      {
        name: 'Umami Cloud',
        plan: 'paid',
        usd: 20,
        priceNote: '1M events/mo, then $0.02 per extra 1k events',
        url: 'https://umami.is/pricing',
      },
    ],
    note: 'Self-hosted Umami has no site or event caps and keeps visitor data on your infrastructure - the entire point of privacy-first analytics.',
  },
  vaultwarden: {
    rows: [
      {
        name: 'Bitwarden',
        plan: 'Teams',
        usd: 40,
        priceNote: '$4/user/mo at 10 users; Enterprise (SSO, policies) $6/user',
        url: 'https://bitwarden.com/pricing/business/',
      },
      {
        name: '1Password',
        plan: 'Business',
        usd: 80,
        priceNote: '$7.99/user/mo at 10 users; Teams Starter Pack $19.95 flat for up to 10',
        url: 'https://1password.com/pricing',
      },
    ],
    note: 'Vaultwarden speaks the Bitwarden API - the official browser extensions and mobile apps work unchanged, with unlimited users and every paid-tier feature (TOTP, attachments, organizations) included.',
  },
  langfuse: {
    rows: [
      {
        name: 'Langfuse Cloud',
        plan: 'Core',
        usd: 29,
        priceNote: '100k tracing units/mo, then graduated overage from $8/100k; Pro $199/mo',
        url: 'https://langfuse.com/pricing',
      },
      {
        name: 'LangSmith',
        plan: 'Plus',
        usd: 39,
        priceNote: 'per seat + 10k traces included, then $2.50 per 1k base traces',
        url: 'https://www.langchain.com/pricing',
      },
    ],
    note: 'LLM tracing volume explodes the moment agents ship - every span is a unit. Self-hosted Langfuse meters nothing; ClickHouse compression eats traces for breakfast.',
  },
  litellm: {
    rows: [
      {
        name: 'OpenRouter',
        plan: 'pay-as-you-go',
        usd: null,
        priceNote: '5.5% fee on credit purchases on top of provider model prices',
        url: 'https://openrouter.ai/docs/faq',
      },
      {
        name: 'Portkey',
        plan: 'Production',
        usd: 49,
        priceNote: '100k logs/mo, then $9 per extra 100k; 30-day retention',
        url: 'https://portkey.ai/pricing',
      },
    ],
    note: 'A self-hosted gateway adds no percentage fee and no log metering - your provider keys, your spend caps, LAN latency to your apps.',
  },
  timescaledb: {
    rows: [
      {
        name: 'Tiger Cloud',
        plan: 'Performance',
        usd: 30,
        priceNote: 'published floor (hourly-metered compute) + storage ~$0.88/GB-mo post-compression; Timescale Inc. is now TigerData',
        url: 'https://www.tigerdata.com/pricing',
      },
      {
        name: 'InfluxDB Cloud',
        plan: 'Serverless (usage)',
        usd: null,
        priceNote: '~$10-15/mo small workload ($0.0025/MB in, ~$1.46/GB-mo stored, $0.012 per 100 queries) - scales with use',
        url: 'https://www.influxdata.com/influxdb-pricing/',
      },
    ],
    note: 'Tiger Cloud has a genuinely useful free tier (750 MB/service); self-hosting wins once data is always-on and growing.',
  },
  appsmith: {
    rows: [
      {
        name: 'Retool',
        plan: 'Team',
        usd: 150,
        priceNote: 'for 5 builders ($10/ea) + 20 end users ($5/ea), billed annually; monthly billing runs ~$200',
        url: 'https://retool.com/pricing',
      },
      {
        name: 'Appsmith Cloud',
        plan: 'Business',
        usd: 375,
        priceNote: '$15/user/mo at 25 users (5 builders + 20 end users)',
        url: 'https://www.appsmith.com/pricing',
      },
    ],
    note: 'Per-seat pricing is the whole story here: self-hosted Appsmith CE has unlimited users at a flat infrastructure price.',
  },
  tooljet: {
    rows: [
      {
        name: 'Retool',
        plan: 'Team',
        usd: 150,
        priceNote: 'for 5 builders + 20 end users, billed annually',
        url: 'https://retool.com/pricing',
      },
      {
        name: 'ToolJet Cloud',
        plan: 'Pro',
        usd: 79,
        priceNote: 'flat: unlimited builders, 100 end users, capped at 5 apps; Team tier $199/mo lifts the caps',
        url: 'https://www.tooljet.ai/pricing',
      },
    ],
    note: 'Self-hosted ToolJet CE has no app or user caps; the meter that matters is just the RAM it runs on.',
  },
  budibase: {
    rows: [
      {
        name: 'Retool',
        plan: 'Team',
        usd: 150,
        priceNote: 'for 5 builders + 20 end users, billed annually',
        url: 'https://retool.com/pricing',
      },
      {
        name: 'Budibase Cloud',
        plan: 'Premium',
        usd: 349,
        priceNote: '$49 base + $50 per extra creator + $5 per end user (5 creators + 20 users shown)',
        url: 'https://budibase.com/pricing/',
      },
    ],
    note: 'Budibase’s open-source core self-hosts with unlimited creators and users; paid tiers gate SSO and branding, not seats.',
  },
  'agent-box': { rows: [] },
  openclaw: { rows: [] },
  hermes: { rows: [] },
  kilo: { rows: [] },
  plane: {
    rows: [
      { name: 'Linear', plan: 'Business', usd: 160, priceNote: '$16/user/mo at 10 users', url: 'https://linear.app/pricing' },
      { name: 'ClickUp', plan: 'Unlimited', usd: 70, priceNote: '$7/user/mo at 10 users', url: 'https://clickup.com/pricing' },
      { name: 'Jira', plan: 'Standard', usd: 75, priceNote: '~$7.53/user/mo at 10 users', url: 'https://www.atlassian.com/software/jira/pricing' },
    ],
    note: 'Project tools meter every seat; Plane self-hosted is one flat plan for the whole team.',
  },
  docmost: {
    rows: [
      { name: 'Notion', plan: 'Business', usd: 200, priceNote: '$20/seat/mo at 10 seats', url: 'https://www.notion.com/pricing' },
      { name: 'Confluence', plan: 'Standard', usd: 60, priceNote: '~$6.05/user/mo at 10 users', url: 'https://www.atlassian.com/software/confluence/pricing' },
    ],
    note: 'Wikis are per-seat everywhere except your own; Docmost has no seat concept.',
  },
  immich: {
    rows: [
      { name: 'Google One', plan: '2 TB', usd: 10, priceNote: '$9.99/mo - rented space, library mined', url: 'https://one.google.com/about/plans' },
      { name: 'iCloud+', plan: '2 TB', usd: 10, priceNote: '$9.99/mo - rented space', url: 'https://www.apple.com/icloud/' },
    ],
    note: 'Cloud photo plans rent storage by the month; Immich is your photos on your own disk, exportable.',
  },
  navidrome: {
    rows: [
      { name: 'Spotify', plan: 'Premium', usd: 13, priceNote: '$12.99/mo - a perpetual rental', url: 'https://www.spotify.com/premium/' },
      { name: 'Apple Music', plan: 'Individual', usd: 11, priceNote: '$10.99/mo', url: 'https://www.apple.com/apple-music/' },
      { name: 'Plex Pass', plan: 'Monthly', usd: 7, priceNote: '$6.99/mo; lifetime rises to $749.99 on Jul 1 2026', url: 'https://www.plex.tv/plex-pass/' },
    ],
    note: 'Streaming rentals never stop billing; Navidrome streams a library you own outright.',
  },
  miniflux: {
    rows: [
      { name: 'Feedly', plan: 'Pro', usd: 7, priceNote: '$7/mo; higher tiers cap sources', url: 'https://feedly.com/i/pro' },
      { name: 'Inoreader', plan: 'Pro', usd: 8, priceNote: '~$7-9/mo', url: 'https://www.inoreader.com/pricing' },
    ],
    note: 'Same money as a hosted reader, with no source caps and your history in a Postgres you control.',
  },
  unleash: {
    rows: [
      { name: 'Statsig', plan: 'Pro', usd: 150, priceNote: 'from $150/mo', url: 'https://www.statsig.com/pricing' },
      { name: 'Flagsmith', plan: 'Start-Up', usd: 40, priceNote: '$40/mo flat, then scales', url: 'https://www.flagsmith.com/pricing' },
      { name: 'LaunchDarkly', plan: 'usage-based', usd: null, priceNote: '~$10 per connection + per-MAU - scales with your traffic', url: 'https://launchdarkly.com/pricing/' },
    ],
    note: 'Flag services meter MAU or connections; Unleash self-hosted is flat and evaluates flags on your own infrastructure.',
  },
  'docker-registry': {
    rows: [
      { name: 'Docker Hub', plan: 'Pro', usd: 9, priceNote: '$9/user/mo annual ($11 monthly); meters pull rates', url: 'https://www.docker.com/pricing/' },
      { name: 'GitHub Packages', plan: 'private storage', usd: null, priceNote: '~$0.25/GB-mo storage + $0.50/GB egress for private repos', url: 'https://docs.github.com/en/billing/managing-billing-for-github-packages/about-billing-for-github-packages' },
    ],
    note: 'Hosted registries meter seats, storage, and pull rates; self-hosted is one small plan plus Bucket storage, unlimited private repos.',
  },
  owncast: {
    rows: [
      { name: 'Vimeo', plan: 'Advanced', usd: 75, priceNote: '$75/mo for live streaming', url: 'https://vimeo.com/upgrade' },
      { name: 'Restream', plan: 'Standard', usd: 16, priceNote: '$16/mo just to multistream', url: 'https://restream.io/pricing' },
    ],
    note: 'Streaming platforms take a cut of your audience or a monthly fee; Owncast is your own server, no middleman.',
  },
  shlink: {
    rows: [
      { name: 'Dub', plan: 'Business', usd: 75, priceNote: '$75/mo', url: 'https://dub.co/pricing' },
      { name: 'Bitly', plan: 'Core', usd: 10, priceNote: '$10/mo for just 100 branded links', url: 'https://bitly.com/pages/pricing' },
      { name: 'Short.io', plan: 'Hobby', usd: 5, priceNote: '$5/mo; paid tiers scale with clicks', url: 'https://short.io/pricing' },
    ],
    note: 'Shorteners cap links and clicks aggressively; Shlink is unlimited on your own domain.',
  },
  writebook: {
    rows: [
      { name: 'Notion', plan: 'Plus (sites)', usd: 100, priceNote: '$10/seat/mo at 10 seats to publish as a site', url: 'https://www.notion.com/pricing' },
      { name: 'GitBook', plan: 'Premium', usd: 40, priceNote: '$8/editor/mo at 5 editors - hosted docs', url: 'https://www.gitbook.com/pricing' },
    ],
    note: 'Writebook is free software; the only cost is the small plan it runs on. The comparisons are what hosted publishing charges for the same job.',
  },
  fizzy: {
    rows: [
      { name: 'Asana', plan: 'Starter', usd: 135, priceNote: '$13.49/user/mo at 10 users', url: 'https://asana.com/pricing' },
      { name: 'Trello', plan: 'Premium', usd: 125, priceNote: '$12.50/user/mo at 10 users (Standard $6)', url: 'https://trello.com/pricing' },
    ],
    note: 'Fizzy is free software; per-seat kanban pricing simply does not apply.',
  },
  campfire: {
    rows: [
      { name: 'Slack', plan: 'Pro', usd: 88, priceNote: '$8.75/user/mo at 10 users; meters message history', url: 'https://slack.com/pricing' },
      { name: 'Microsoft Teams', plan: 'Essentials', usd: 40, priceNote: '$4/user/mo at 10 users, plus the Microsoft 365 pull', url: 'https://www.microsoft.com/microsoft-teams/compare-microsoft-teams-options' },
    ],
    note: 'Campfire is free software; full history and files stay on your infrastructure, with no per-seat meter.',
  },
  calcom: {
    rows: [
      { name: 'Calendly', plan: 'Teams', usd: 160, priceNote: '$16/seat/mo at 10 seats', url: 'https://calendly.com/pricing' },
      { name: 'Calendly', plan: 'Standard', usd: 120, priceNote: '$12/seat/mo at 10 seats', url: 'https://calendly.com/pricing' },
    ],
    note: 'Scheduling tools meter per seat; Cal.com self-hosted is one flat plan for the whole team.',
  },
  jellyfin: {
    rows: [
      { name: 'Netflix', plan: 'Standard', usd: 15, priceNote: '$15.49/mo - a rotating catalogue you do not own', url: 'https://www.netflix.com' },
      { name: 'Plex Pass', plan: 'Monthly', usd: 7, priceNote: '$6.99/mo; lifetime rises to $749.99 on Jul 1 2026', url: 'https://www.plex.tv/plex-pass/' },
    ],
    note: 'Jellyfin is free software; you pay only for the plan it runs on, and the library is yours.',
  },
  plausible: {
    rows: [
      { name: 'Fathom', plan: 'Starter', usd: 15, priceNote: '$15/mo (100k pageviews)', url: 'https://usefathom.com/pricing' },
      { name: 'Plausible Cloud', plan: 'Growth', usd: 9, priceNote: 'from $9/mo, metered by pageviews', url: 'https://plausible.io/#pricing' },
    ],
    note: 'Self-hosted Plausible is one flat plan regardless of traffic, with visitor data on your own infrastructure.',
  },
  bookstack: {
    rows: [
      { name: 'Notion', plan: 'Business', usd: 200, priceNote: '$20/seat/mo at 10 seats', url: 'https://www.notion.com/pricing' },
      { name: 'Confluence', plan: 'Standard', usd: 60, priceNote: '~$6/user/mo at 10 users', url: 'https://www.atlassian.com/software/confluence/pricing' },
    ],
    note: 'BookStack is free software on a flat plan; no per-seat metering.',
  },
  audiobookshelf: {
    rows: [
      { name: 'Audible', plan: 'Premium Plus', usd: 15, priceNote: '$14.95/mo for one credit; you license, not own', url: 'https://www.audible.com' },
    ],
    note: 'AudioBookshelf is free software; it serves a library you own outright, to every device.',
  },
  karakeep: {
    rows: [
      { name: 'Raindrop.io', plan: 'Pro', usd: 3, priceNote: '$3/mo; Pocket shut down in 2025', url: 'https://raindrop.io/pro' },
    ],
    note: 'Karakeep adds archiving, search, and AI tagging as free software, with everything on your own box.',
  },
  beszel: {
    rows: [
      { name: 'Datadog', plan: 'Pro', usd: 150, priceNote: '~$15/host/mo at 10 hosts (annual)', url: 'https://www.datadoghq.com/pricing/' },
    ],
    note: 'Monitoring SaaS bills per host and meters retention; Beszel watches as many machines as you like on one tiny plan.',
  },
  dawarich: {
    rows: [
      { name: 'Google Maps Timeline', plan: 'free', usd: null, priceNote: 'free, but paid for with your location data', url: 'https://www.google.com/maps/timeline' },
    ],
    note: 'Dawarich keeps your entire location history on your own infrastructure instead of a data-mining service.',
  },
  searxng: {
    rows: [
      { name: 'Kagi', plan: 'Professional', usd: 10, priceNote: '$10/mo for private search', url: 'https://kagi.com/pricing' },
    ],
    note: 'Kagi charges for private search; SearXNG is free software giving you private metasearch on your own domain (and a RAG backend).',
  },
  ollama: {
    rows: [
      { name: 'OpenAI API', plan: 'usage-based', usd: null, priceNote: 'per-token, per call - scales with usage', url: 'https://openai.com/api/pricing/' },
    ],
    note: 'Ollama runs open models with no per-token bill; the trade is you provide the compute (a GPU is strongly recommended).',
  },
  redis: {
    rows: [
      { name: 'AWS ElastiCache', plan: 'cache.t4g.micro', usd: 12, priceNote: 'smallest on-demand node/mo; HA doubles it', url: 'https://aws.amazon.com/elasticache/pricing/' },
      { name: 'Redis Cloud', plan: 'Fixed', usd: 5, priceNote: 'from $5/mo for a tiny instance, scales with memory', url: 'https://redis.io/pricing/' },
    ],
    note: 'Managed Redis/Valkey bills per node (and per AZ for HA); this is one flat plan on your own infrastructure.',
  },
  valkey: {
    rows: [
      { name: 'AWS ElastiCache', plan: 'Valkey, cache.t4g.micro', usd: 12, priceNote: 'smallest on-demand node/mo (ElastiCache now defaults to Valkey)', url: 'https://aws.amazon.com/elasticache/pricing/' },
      { name: 'Aiven', plan: 'Caching Startup', usd: 31, priceNote: 'smallest managed Valkey plan/mo', url: 'https://aiven.io/pricing' },
    ],
    note: 'Managed caches bill per node; self-hosted Valkey is one flat plan, BSD-licensed.',
  },
  'redis-sentinel': {
    rows: [
      { name: 'AWS ElastiCache', plan: 'Multi-AZ (2 nodes)', usd: 24, priceNote: 'primary + replica on-demand/mo for the smallest size', url: 'https://aws.amazon.com/elasticache/pricing/' },
      { name: 'Redis Cloud', plan: 'HA (multi-AZ)', usd: 28, priceNote: 'highly-available tier, scales with memory', url: 'https://redis.io/pricing/' },
    ],
    note: 'Managed HA caches bill per node per AZ; this runs the whole failover topology on one flat plan.',
  },
  'valkey-sentinel': {
    rows: [
      { name: 'AWS ElastiCache', plan: 'Multi-AZ (2 nodes)', usd: 24, priceNote: 'primary + replica on-demand/mo for the smallest size', url: 'https://aws.amazon.com/elasticache/pricing/' },
      { name: 'Aiven', plan: 'Caching Business', usd: 80, priceNote: 'smallest HA managed Valkey plan/mo', url: 'https://aiven.io/pricing' },
    ],
    note: 'Managed HA caches bill per node; the whole Sentinel topology here is one flat plan, BSD-licensed.',
  },
  'redis-cluster': {
    rows: [
      { name: 'AWS ElastiCache', plan: 'cluster mode (6 nodes)', usd: 72, priceNote: '3 shards + 3 replicas on-demand/mo at the smallest size', url: 'https://aws.amazon.com/elasticache/pricing/' },
      { name: 'Redis Cloud', plan: 'Flexible (sharded)', usd: null, priceNote: 'priced by memory + throughput across shards', url: 'https://redis.io/pricing/' },
    ],
    note: 'Managed cluster mode bills every shard and replica; self-hosted is one flat plan.',
  },
  'valkey-cluster': {
    rows: [
      { name: 'AWS ElastiCache', plan: 'cluster mode (6 nodes)', usd: 72, priceNote: '3 shards + 3 replicas on-demand/mo at the smallest size', url: 'https://aws.amazon.com/elasticache/pricing/' },
    ],
    note: 'Managed sharded caches bill every node; the full 6-node cluster here is one flat plan, BSD-licensed.',
  },
  mysql: {
    rows: [
      { name: 'AWS RDS', plan: 'db.t4g.micro', usd: 15, priceNote: 'smallest single-AZ instance/mo + storage', url: 'https://aws.amazon.com/rds/mysql/pricing/' },
      { name: 'PlanetScale', plan: 'Scaler', usd: 39, priceNote: 'from $39/mo, then usage-based', url: 'https://planetscale.com/pricing' },
    ],
    note: 'Managed MySQL bills per instance (and per AZ for HA) plus storage/transfer; this is one flat plan.',
  },
  mariadb: {
    rows: [
      { name: 'AWS RDS for MariaDB', plan: 'db.t4g.micro', usd: 15, priceNote: 'smallest single-AZ instance/mo + storage', url: 'https://aws.amazon.com/rds/mariadb/pricing/' },
      { name: 'Aiven for MySQL', plan: 'Startup', usd: 31, priceNote: 'smallest managed plan/mo', url: 'https://aiven.io/pricing' },
    ],
    note: 'Managed MariaDB/MySQL bills per instance; self-hosted is one flat plan.',
  },
  'mariadb-replication': {
    rows: [
      { name: 'AWS RDS', plan: 'primary + read replica', usd: 30, priceNote: 'two smallest instances/mo + storage', url: 'https://aws.amazon.com/rds/mysql/pricing/' },
    ],
    note: 'A managed read replica is a second billed instance; here the primary + replica is one flat plan.',
  },
  'percona-server': {
    rows: [
      { name: 'AWS RDS', plan: 'db.t4g.micro', usd: 15, priceNote: 'smallest single-AZ MySQL instance/mo + storage', url: 'https://aws.amazon.com/rds/mysql/pricing/' },
    ],
    note: 'No managed cloud offers Percona Server instrumentation on a small flat plan; self-hosting does.',
  },
  'percona-xtradb-cluster': {
    rows: [
      { name: 'AWS RDS', plan: 'Multi-AZ', usd: 30, priceNote: 'standby instance roughly doubles the bill, smallest size', url: 'https://aws.amazon.com/rds/mysql/pricing/' },
      { name: 'Aiven for MySQL', plan: 'Business (HA)', usd: 80, priceNote: 'smallest HA managed plan/mo', url: 'https://aiven.io/pricing' },
    ],
    note: 'Managed synchronous HA bills every node/AZ; the 3-node cluster here is one flat plan.',
  },
  'mysql-innodb-cluster': {
    rows: [
      { name: 'AWS RDS', plan: 'Multi-AZ', usd: 30, priceNote: 'standby instance roughly doubles the bill, smallest size', url: 'https://aws.amazon.com/rds/mysql/pricing/' },
    ],
    note: 'Managed MySQL HA bills the standby instance and per AZ; the 3-node group here is one flat plan.',
  },
};
