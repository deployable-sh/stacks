import type { AppData, Category, SaasCompareRow } from '../types';
import { SAAS_PRICING } from '../saas-pricing';

/** App data as authored per-template; SaaS pricing rows merge in from saas-pricing.ts. */
export type AppBase = Omit<AppData, 'saasCompare' | 'saasCompareNote'>;

import { kafka } from './kafka';
import { redpanda } from './redpanda';
import { rabbitmq } from './rabbitmq';
import { mongodb } from './mongodb';
import { clickhouse } from './clickhouse';
import { qdrant } from './qdrant';
import { chromadb } from './chromadb';
import { meilisearch } from './meilisearch';
import { supabase } from './supabase';
import { supabaseLite } from './supabase-lite';
import { pocketbase } from './pocketbase';
import { convex } from './convex';
import { keycloak } from './keycloak';
import { kong } from './kong';
import { glitchtip } from './glitchtip';
import { bugsink } from './bugsink';
import { n8n } from './n8n';
import { cronicle } from './cronicle';
import { minio } from './minio';
import { agentBox } from './agent-box';
import { openclaw } from './openclaw';
import { hermes } from './hermes';
import { kilo } from './kilo';
import { appsmith } from './appsmith';
import { tooljet } from './tooljet';
import { budibase } from './budibase';
import { timescaledb } from './timescaledb';
import { uptimeKuma } from './uptime-kuma';
import { umami } from './umami';
import { vaultwarden } from './vaultwarden';
import { langfuse } from './langfuse';
import { litellm } from './litellm';
import { mssql } from './mssql';
import { oracle } from './oracle';
import { ghost } from './ghost';
import { wordpress } from './wordpress';
import { metabase } from './metabase';
import { directus } from './directus';
import { nocodb } from './nocodb';
import { forgejo } from './forgejo';
import { openMercato } from './open-mercato';
import { prestashop } from './prestashop';
import { codeServer } from './code-server';
import { saleor } from './saleor';
import { grafanaStack } from './grafana-stack';
import { openWebui } from './open-webui';
import { flowise } from './flowise';
import { jenkins } from './jenkins';
import { githubRunner } from './github-runner';
import { gitlabRunner } from './gitlab-runner';
import { forgejoRunner } from './forgejo-runner';
import { azpAgent } from './azp-agent';
import { buildkiteAgent } from './buildkite-agent';
import { mailpit } from './mailpit';
import { listmonk } from './listmonk';
import { authentik } from './authentik';
import { zitadel } from './zitadel';
import { docuseal } from './docuseal';
import { documenso } from './documenso';
import { typebot } from './typebot';
import { twenty } from './twenty';
import { kestra } from './kestra';
import { filebrowser } from './filebrowser';
import { roundcube } from './roundcube';
import { tei } from './tei';
import { phoenix } from './phoenix';
import { filestash } from './filestash';
import { sftpgo } from './sftpgo';
import { mariadbGalera } from './mariadb-galera';
import { minecraft } from './minecraft';
import { factorio } from './factorio';
import { chatwoot } from './chatwoot';
import { superset } from './superset';
import { prefect } from './prefect';
import { logto } from './logto';
import { livekit } from './livekit';
import { livekitAgents } from './livekit-agents';
import { usesend } from './usesend';
import { cognee } from './cognee';
import { garage } from './garage';
import { letta } from './letta';
import { dify } from './dify';
import { changedetection } from './changedetection';
import { ntfy } from './ntfy';
import { memos } from './memos';
import { actual } from './actual';
import { stirlingPdf } from './stirling-pdf';
import { nodeRed } from './node-red';
import { outline } from './outline';
import { hasura } from './hasura';
import { typesense } from './typesense';
import { infisical } from './infisical';
import { paperlessNgx } from './paperless-ngx';
import { nats } from './nats';
import { linkwarden } from './linkwarden';
import { penpot } from './penpot';
import { temporal } from './temporal';
import { openobserve } from './openobserve';
import { parseable } from './parseable';
import { mattermost } from './mattermost';
import { rocketchat } from './rocketchat';
import { odoo } from './odoo';
import { bagisto } from './bagisto';
import { activepieces } from './activepieces';
import { freescout } from './freescout';
import { miniflux } from './miniflux';
import { navidrome } from './navidrome';
import { unleash } from './unleash';
import { docmost } from './docmost';
import { dockerRegistry } from './docker-registry';
import { owncast } from './owncast';
import { shlink } from './shlink';
import { plane } from './plane';
import { immich } from './immich';
import { writebook } from './writebook';
import { fizzy } from './fizzy';
import { campfire } from './campfire';
import { calcom } from './calcom';
import { jellyfin } from './jellyfin';
import { plausible } from './plausible';
import { bookstack } from './bookstack';
import { audiobookshelf } from './audiobookshelf';
import { karakeep } from './karakeep';
import { beszel } from './beszel';
import { dawarich } from './dawarich';
import { searxng } from './searxng';
import { ollama } from './ollama';
import { redis } from './redis';
import { valkey } from './valkey';
import { redisSentinel } from './redis-sentinel';
import { valkeySentinel } from './valkey-sentinel';
import { redisCluster } from './redis-cluster';
import { valkeyCluster } from './valkey-cluster';
import { mysql } from './mysql';
import { mariadb } from './mariadb';
import { mariadbReplication } from './mariadb-replication';
import { perconaServer } from './percona-server';
import { perconaXtradbCluster } from './percona-xtradb-cluster';
import { mysqlInnodbCluster } from './mysql-innodb-cluster';

export const CATEGORY_ORDER: Category[] = [
  'Streaming & Messaging',
  'Databases',
  'Caches & Key-Value',
  'Search & Vectors',
  'Backend Platforms',
  'Auth & API Gateway',
  'Error Tracking',
  'Monitoring & Analytics',
  'CMS & Publishing',
  'Dev Tools',
  'Internal Tools',
  'Business Apps',
  'Productivity & PM',
  'Scheduling',
  'Automation & Jobs',
  'Email & Newsletters',
  'Object Storage',
  'Security',
  'LLM Infrastructure',
  'AI Agents',
  'Voice & Realtime',
  'Media',
  'Game Servers',
];

const BASES: AppBase[] = [
  kafka,
  redpanda,
  rabbitmq,
  mongodb,
  clickhouse,
  qdrant,
  chromadb,
  meilisearch,
  supabase,
  supabaseLite,
  pocketbase,
  convex,
  keycloak,
  kong,
  glitchtip,
  bugsink,
  n8n,
  cronicle,
  minio,
  agentBox,
  openclaw,
  hermes,
  kilo,
  appsmith,
  tooljet,
  budibase,
  timescaledb,
  uptimeKuma,
  umami,
  vaultwarden,
  langfuse,
  litellm,
  mssql,
  oracle,
  ghost,
  wordpress,
  metabase,
  directus,
  nocodb,
  forgejo,
  openMercato,
  prestashop,
  codeServer,
  saleor,
  grafanaStack,
  openWebui,
  flowise,
  jenkins,
  githubRunner,
  gitlabRunner,
  forgejoRunner,
  azpAgent,
  buildkiteAgent,
  mailpit,
  listmonk,
  authentik,
  zitadel,
  docuseal,
  documenso,
  typebot,
  twenty,
  kestra,
  filebrowser,
  roundcube,
  tei,
  phoenix,
  filestash,
  sftpgo,
  mariadbGalera,
  minecraft,
  factorio,
  chatwoot,
  superset,
  prefect,
  logto,
  livekit,
  livekitAgents,
  usesend,
  cognee,
  garage,
  letta,
  dify,
  changedetection,
  ntfy,
  memos,
  actual,
  stirlingPdf,
  nodeRed,
  outline,
  hasura,
  typesense,
  infisical,
  paperlessNgx,
  nats,
  linkwarden,
  penpot,
  temporal,
  openobserve,
  parseable,
  mattermost,
  rocketchat,
  odoo,
  bagisto,
  activepieces,
  freescout,
  miniflux,
  navidrome,
  unleash,
  docmost,
  dockerRegistry,
  owncast,
  shlink,
  plane,
  immich,
  writebook,
  fizzy,
  campfire,
  calcom,
  jellyfin,
  plausible,
  bookstack,
  audiobookshelf,
  karakeep,
  beszel,
  dawarich,
  searxng,
  ollama,
  redis,
  valkey,
  redisSentinel,
  valkeySentinel,
  redisCluster,
  valkeyCluster,
  mysql,
  mariadb,
  mariadbReplication,
  perconaServer,
  perconaXtradbCluster,
  mysqlInnodbCluster,
];

export const APPS: AppData[] = BASES.map((b) => {
  const pricing = SAAS_PRICING[b.slug] ?? { rows: [] as SaasCompareRow[] };
  return { ...b, saasCompare: pricing.rows, saasCompareNote: pricing.note };
});

export function appsByCategory(): Map<Category, AppData[]> {
  const m = new Map<Category, AppData[]>();
  for (const c of CATEGORY_ORDER) m.set(c, []);
  for (const a of APPS) m.get(a.category)!.push(a);
  return m;
}

export function getApp(slug: string): AppData | undefined {
  return APPS.find((a) => a.slug === slug);
}
