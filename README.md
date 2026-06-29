# Miget Compose Templates

Service catalogue of multi-node clusters and backing services, deployable to
[Miget](https://miget.com) as Compose Stacks, and runnable locally with plain
`docker compose up`.

Each template's README carries a **Deploy to Miget** button for one-click deploy.

## Convention

Every template is a subdirectory with:

- **`compose.yaml`**: portable, vanilla Docker Compose. Works locally with no
  platform tooling.
- **`compose.miget.yaml`**: Miget platform overrides (RAM, privacy, disk
  sizes via `x-miget`), auto-layered on top of the base file by Miget at
  detect and deploy time. Plain `docker compose` ignores it.
- A `README.md` with topology, connection strings, and scaling notes.

When creating a stack on Miget, point it at this repository and set the
stack's *path* to the template directory (e.g. `rabbitmq`).

Platform ground rules baked into every template:

- The public HTTP entrypoint of a stack listens on **port 5000** (the only
  port Miget's ingress reaches); everything else is `private: true`.
- One service block per cluster node: nodes need stable identity and their
  own volume, so scale by adding blocks, **not** `replicas`.
- Per-node named volumes become RWO block PVCs; sizes set in
  `compose.miget.yaml`.
- Image-only services must be configurable via **environment variables**
  (compose `command:` overrides do not reach per-app deploys); flag-driven
  images get a thin Dockerfile wrapper with a baked start script.

## Templates

| Template | What you get | Public entry |
|---|---|---|
| [`rabbitmq`](rabbitmq/) | 3-node RabbitMQ 4.x cluster (quorum-queue ready) | management UI |
| [`kafka`](kafka/) | 3-node Apache Kafka KRaft cluster (official image, env-only) | Kafbat UI |
| [`redpanda`](redpanda/) | 3-broker Redpanda cluster (Kafka-compatible, no JVM) | Redpanda Console |
| [`kong`](kong/) | Kong API Gateway backed by a **managed Postgres** service | gateway proxy + Kong Manager |
| [`mongodb`](mongodb/) | 3-node MongoDB replica set (rs0, stock image) | none (internal) |
| [`n8n`](n8n/) | n8n queue mode: editor + scalable workers, **managed Postgres + Valkey** | editor |
| [`glitchtip`](glitchtip/) | GlitchTip error tracking (Sentry-compatible), **managed Postgres + Valkey** | web UI |
| [`bugsink`](bugsink/) | Bugsink error tracking (Sentry SDKs, single container), **managed Postgres** | web UI |
| [`pocketbase`](pocketbase/) | Pocketbase backend-in-one-file (SQLite, auth, realtime) | app + admin |
| [`cronicle`](cronicle/) | Cronicle, cron with a UI, history, chaining | web UI |
| [`chromadb`](chromadb/) | Chroma vector database | none (internal) |
| [`qdrant`](qdrant/) | Qdrant vector database + dashboard | none (internal) |
| [`meilisearch`](meilisearch/) | Meilisearch instant search (master-key protected) | search API |
| [`minio`](minio/) | MinIO S3-compatible object storage (single node) | console |
| [`keycloak`](keycloak/) | Keycloak IAM (OIDC/SAML), **managed Postgres** | Keycloak |
| [`clickhouse`](clickhouse/) | 3-node ClickHouse cluster (embedded Keeper) | none (internal) |
| [`openclaw`](openclaw/) | OpenClaw autonomous AI agent + dashboard | dashboard (basic auth) |
| [`agent-box`](agent-box/) | Claude Code + opencode + Kilo CLI in a persistent web terminal | terminal (basic auth) |
| [`hermes`](hermes/) | Hermes Agent (Nous Research), self-improving agent + dashboard | dashboard (basic auth) |
| [`kilo`](kilo/) | Kilo headless agent server (`kilo serve`) | API (password) |
| [`convex`](convex/) | Convex self-hosted backend + dashboard (multi-origin proxies) | api / site / dashboard |
| [`supabase`](supabase/) | Full Supabase stack behind Kong (uses **compose profiles**), experimental | Kong gateway |
| [`appsmith`](appsmith/) | Appsmith CE internal-tool builder (all-in-one image + nginx proxy) | builder UI |
| [`tooljet`](tooljet/) | ToolJet CE low-code builder, **managed Postgres** | builder UI |
| [`budibase`](budibase/) | Budibase low-code platform (all-in-one image + nginx proxy) | builder UI |
| [`timescaledb`](timescaledb/) | TimescaleDB time-series Postgres (single node) | none (internal) |
| [`uptime-kuma`](uptime-kuma/) | Uptime Kuma v2 monitoring + status pages (slim, SQLite) | web UI |
| [`umami`](umami/) | Umami v3 privacy-first analytics, **managed Postgres** | dashboard |
| [`vaultwarden`](vaultwarden/) | Vaultwarden Bitwarden-compatible password server | web vault |
| [`langfuse`](langfuse/) | Langfuse v3 LLM observability (web/worker/ClickHouse/Valkey/MinIO), **managed Postgres** | web UI |
| [`litellm`](litellm/) | LiteLLM gateway - virtual keys + budgets, **managed Postgres** | proxy + admin UI |
| [`mssql`](mssql/) | Microsoft SQL Server 2025 (Express - free production license) | none (internal) |
| [`oracle`](oracle/) | Oracle Database Free 26ai (FUTC - production-legal caps) | none (internal) |
| [`ghost`](ghost/) | Ghost 6 publishing (blog/newsletter/memberships), **self-hosted MySQL** | site + admin |
| [`wordpress`](wordpress/) | WordPress (official image + nginx proxy), **self-hosted MySQL** | site |
| [`metabase`](metabase/) | Metabase OSS BI dashboards, **managed Postgres** app DB | web UI |
| [`directus`](directus/) | Directus 11 headless CMS + data studio, **managed Postgres** | studio + API |
| [`nocodb`](nocodb/) | NocoDB Airtable alternative, **managed Postgres** | web UI |
| [`forgejo`](forgejo/) | Forgejo git forge (Gitea fork), **managed Postgres** | web UI + HTTPS git |
| [`prestashop`](prestashop/) | PrestaShop 9 storefront (auto-install + nginx proxy), **self-hosted MySQL** | shop + /admin |
| [`open-mercato`](open-mercato/) | Open Mercato CRM/ERP foundation (builds from upstream repo), experimental | app + /backend |
| [`code-server`](code-server/) | code-server, VS Code in the browser, persistent workspace | IDE (password) |
| [`saleor`](saleor/) | Saleor headless GraphQL commerce (api+worker+dashboard), **managed Postgres** | api / dashboard |
| [`grafana-stack`](grafana-stack/) | Grafana + Prometheus + Loki, datasources pre-provisioned | Grafana |
| [`open-webui`](open-webui/) | Open WebUI - team AI chat over any OpenAI-compatible API | web UI |
| [`flowise`](flowise/) | Flowise visual LLM app builder, **managed Postgres** | builder UI |
| [`jenkins`](jenkins/) | Jenkins LTS controller (built-in node) | web UI |
| [`github-runner`](github-runner/) | GitHub Actions self-hosted runner (PAT auto-registration) | none (outbound) |
| [`gitlab-runner`](gitlab-runner/) | GitLab Runner, shell executor, self-registering (glrt token) | none (outbound) |
| [`forgejo-runner`](forgejo-runner/) | Forgejo Actions runner, host mode - serves Forgejo or Codeberg | none (outbound) |
| [`azp-agent`](azp-agent/) | Azure Pipelines agent (official Dockerfile recipe) | none (outbound) |
| [`buildkite-agent`](buildkite-agent/) | Buildkite agent - hybrid CI, one token | none (outbound) |
| [`mailpit`](mailpit/) | Mailpit dev mail catcher (SMTP sink + UI) | UI (basic auth) |
| [`listmonk`](listmonk/) | listmonk newsletters/mailing lists, **managed Postgres** | admin + public pages |
| [`authentik`](authentik/) | authentik IdP (server+worker, Redis-free), **managed Postgres** | web UI |
| [`zitadel`](zitadel/) | Zitadel passkeys-first IdP (single binary), **managed Postgres** | web UI |
| [`docuseal`](docuseal/) | DocuSeal document signing (+ nginx proxy), **managed Postgres** | web UI |
| [`documenso`](documenso/) | Documenso e-signatures (PKCS#12 sealing), **managed Postgres** | web UI |
| [`typebot`](typebot/) | Typebot conversational forms (builder + viewer), **managed Postgres** | builder / viewer |
| [`twenty`](twenty/) | Twenty CRM (server + worker + noeviction Valkey), **managed Postgres** | web UI |
| [`kestra`](kestra/) | Kestra workflow orchestration (standalone, PROCESS runner), **managed Postgres** | web UI (basic auth) |
| [`filebrowser`](filebrowser/) | FileBrowser web file manager + share links | web UI |
| [`roundcube`](roundcube/) | Roundcube webmail over any IMAP (+ nginx proxy), **managed Postgres** | webmail |
| [`tei`](tei/) | HuggingFace TEI embeddings API on CPU (bge-small) | none (internal) |
| [`phoenix`](phoenix/) | Arize Phoenix LLM tracing/evals (single container) | web UI (auth) |
| [`filestash`](filestash/) | Filestash web file manager over **Miget Buckets** (+ proxy) | web UI |
| [`sftpgo`](sftpgo/) | SFTPGo S3 upload portal (share-upload links, optional SFTP) | web UI |
| [`mariadb-galera`](mariadb-galera/) | 3-node MariaDB Galera cluster (official image, bootstrap-once wrapper) | none (internal) |
| [`minecraft`](minecraft/) | Minecraft Java server (itzg; Paper/Fabric/Forge) | custom TCP port |
| [`factorio`](factorio/) | Factorio headless server | custom UDP port |
| [`chatwoot`](chatwoot/) | Chatwoot CE support inbox (web+sidekiq, pgvector PG, noeviction Valkey) | web UI |
| [`superset`](superset/) | Apache Superset BI (app+worker+beat+init, baked config), **managed Postgres** | web UI |
| [`prefect`](prefect/) | Prefect 3 server (outbound workers as separate apps), **managed Postgres** | web UI (basic auth) |
| [`logto`](logto/) | Logto developer auth (auth + admin domains via proxies), **managed Postgres** | auth / admin |
| [`livekit`](livekit/) | LiveKit WebRTC server (muxed UDP 7882 + TCP 7881) | ws :5000 + custom ports |
| [`livekit-agents`](livekit-agents/) | LiveKit voice agent worker (ElevenLabs/Deepgram/LLM), experimental | none (outbound) |
| [`usesend`](usesend/) | useSend open-source Resend (SES delivery, + proxy), **managed Postgres** | dashboard + API |
| [`cognee`](cognee/) | Cognee agent memory engine (graph + vector, self-contained) | API (JWT) |
| [`garage`](garage/) | Garage S3-compatible store + webui (the MinIO successor) | web UI |
| [`letta`](letta/) | Letta/MemGPT agent server (pgvector PG, + proxy), experimental | API (password) |
| [`dify`](dify/) | Dify LLM app platform (11 services, faithful upstream shape), experimental | entry router |
| [`changedetection`](changedetection/) | changedetection.io page-change monitoring | web UI |
| [`ntfy`](ntfy/) | ntfy push notifications (deny-all auth, declarative users) | web + API |
| [`memos`](memos/) | Memos lightweight markdown notes (SQLite) | web UI |
| [`actual`](actual/) | Actual Budget E2EE sync server | web app |
| [`stirling-pdf`](stirling-pdf/) | Stirling-PDF 50+ PDF tools (login enforced) | web UI |
| [`node-red`](node-red/) | Node-RED with bcrypt adminAuth enforced at boot | editor (auth) |
| [`outline`](outline/) | Outline team wiki (stateless: **managed Postgres** + **Miget Buckets**) | web UI |
| [`hasura`](hasura/) | Hasura v2 CE instant GraphQL, **managed Postgres** | API + console |
| [`typesense`](typesense/) | Typesense instant search (env-only, in-memory) | API (keys) |
| [`infisical`](infisical/) | Infisical secrets manager, **managed Postgres** | web UI |
| [`paperless-ngx`](paperless-ngx/) | Paperless-ngx document management + OCR, **managed Postgres** | web UI |
| [`nats`](nats/) | 3-node NATS cluster with JetStream (flags-only) | none (internal) |
| [`linkwarden`](linkwarden/) | Linkwarden bookmark manager + archiving (+ proxy), **managed Postgres** | web UI |
| [`penpot`](penpot/) | Penpot design platform (frontend+backend+exporter, + proxy), **managed Postgres** | web UI |
| [`temporal`](temporal/) | Temporal durable execution + UI, **managed Postgres**, experimental | UI (gRPC internal) |
| [`openobserve`](openobserve/) | OpenObserve logs/metrics/traces (S3-native → **Miget Buckets**) | web UI + OTLP |
| [`parseable`](parseable/) | Parseable S3-native log lake (single binary) | web UI + ingest |
| [`mattermost`](mattermost/) | Mattermost team chat, **managed Postgres** | web UI |
| [`rocketchat`](rocketchat/) | Rocket.Chat team chat (stateless; uses the `mongodb` template) | web UI |
| [`odoo`](odoo/) | Odoo Community 18 ERP/CRM/ecommerce (threaded), **managed Postgres** | web UI |
| [`bagisto`](bagisto/) | Bagisto Laravel ecommerce (+ nginx proxy), **self-hosted MySQL** | shop + /admin |
| [`activepieces`](activepieces/) | Activepieces automation (AI agents), **managed Postgres** + noeviction Valkey | web UI |
| [`freescout`](freescout/) | FreeScout help desk (listens on 5000 directly), **self-hosted MySQL** | web UI |
| [`miniflux`](miniflux/) | Miniflux minimalist RSS reader (single Go binary), **managed Postgres** | reader + API |
| [`navidrome`](navidrome/) | Navidrome music streaming server (Subsonic, SQLite) | web player |
| [`unleash`](unleash/) | Unleash feature flags (LaunchDarkly alternative), **managed Postgres** | flag API + admin |
| [`docmost`](docmost/) | Docmost collaborative wiki (Confluence/Notion alt), **managed Postgres + Valkey** + Buckets | web UI |
| [`docker-registry`](docker-registry/) | Private container registry (CNCF Distribution, native :5000, S3 to **Miget Buckets**) | registry API |
| [`owncast`](owncast/) | Owncast live streaming server (RTMP ingest 1935, port-5000 wrapper) | player + admin |
| [`shlink`](shlink/) | Shlink URL shortener (REST API, GeoIP analytics), **managed Postgres** | redirects + API |
| [`plane`](plane/) | Plane project management (Jira/Linear alt, community AIO + RabbitMQ + MinIO), **managed Postgres + Valkey** - experimental | web UI |
| [`immich`](immich/) | Immich photos (Google Photos alt, ML worker + VectorChord Postgres, self-contained) - experimental | web UI |
| [`writebook`](writebook/) | Writebook (37signals) free book/docs publisher (Rails + Thruster, SQLite, `HTTP_PORT=5000`) | reader + admin |
| [`fizzy`](fizzy/) | Fizzy (37signals) free kanban (Trello/Asana alt, Rails + Thruster, SQLite) | web UI |
| [`campfire`](campfire/) | Campfire (37signals) free group chat (Slack alt, MIT, self-contained Rails, SQLite) | web UI |
| [`calcom`](calcom/) | Cal.com scheduling (Calendly alt, stateless), **managed Postgres** (citext) | booking app |
| [`jellyfin`](jellyfin/) | Jellyfin media server (Plex alt, SQLite, network.xml port-5000 wrapper) | web player |
| [`plausible`](plausible/) | Plausible CE web analytics (GA alt), **managed Postgres** + ClickHouse sidecar | dashboard |
| [`bookstack`](bookstack/) | BookStack wiki (Confluence alt, nginx port-5000 wrapper), **self-hosted MariaDB** | web UI |
| [`audiobookshelf`](audiobookshelf/) | AudioBookshelf audiobook + podcast server (SQLite, `PORT=5000`) | web player |
| [`karakeep`](karakeep/) | Karakeep (ex-Hoarder) AI bookmarks (SQLite + Meilisearch + headless Chrome) | web UI |
| [`beszel`](beszel/) | Beszel server monitoring **hub** (PocketBase/SQLite, port-5000 wrapper; agents self-installed) | dashboard |
| [`dawarich`](dawarich/) | Dawarich location history (Google Timeline alt, web + worker + **PostGIS** + Valkey) - experimental | web UI |
| [`searxng`](searxng/) | SearXNG private metasearch (200+ engines; RAG backend), `SEARXNG_PORT=5000` | search UI |
| [`ollama`](ollama/) | Ollama local LLM server (OpenAI-compatible API, `OLLAMA_HOST`) - GPU recommended, experimental | API (private) |
| [`redis`](redis/) | Redis standalone (password + AOF persistence) | none (internal) |
| [`redis-sentinel`](redis-sentinel/) | Redis HA: master + 2 replicas + 3 sentinels, automatic failover | none (internal) |
| [`redis-cluster`](redis-cluster/) | Redis Cluster: 3 masters + 3 replicas, sharded (hostname-announced) - experimental | none (internal) |
| [`valkey`](valkey/) | Valkey standalone (BSD Redis-compatible, password + AOF) | none (internal) |
| [`valkey-sentinel`](valkey-sentinel/) | Valkey HA: master + 2 replicas + 3 sentinels, automatic failover | none (internal) |
| [`valkey-cluster`](valkey-cluster/) | Valkey Cluster: 3 masters + 3 replicas, sharded - experimental | none (internal) |
| [`mysql`](mysql/) | MySQL 8.4 standalone (env-configured) | none (internal) |
| [`mariadb`](mariadb/) | MariaDB 11.8 standalone (env-configured) | none (internal) |
| [`mariadb-replication`](mariadb-replication/) | MariaDB async primary/replica (image-wired replication) | none (internal) |
| [`percona-server`](percona-server/) | Percona Server for MySQL standalone (MySQL drop-in + instrumentation) | none (internal) |
| [`percona-xtradb-cluster`](percona-xtradb-cluster/) | Percona XtraDB Cluster: 3-node synchronous multi-primary (Galera) - experimental | none (internal) |
| [`mysql-innodb-cluster`](mysql-innodb-cluster/) | MySQL InnoDB Cluster: 3-node Group Replication, auto-failover - experimental | none (internal) |

A multi-node Elasticsearch template lives in its own repo for now:
[ktaraszk/elasticsearch](https://github.com/ktaraszk/elasticsearch).

## Roadmap

1. Distributed variants: MinIO (4+ nodes), Qdrant distributed,
   multi-shard ClickHouse
2. Platform follow-ups feeding templates: valkey/mysql credential lookup
   for `${{...}}` refs on later deploys; required-vars keyed by template
   variable (Supabase currently prompts the same JWT secret under several
   per-service env keys); one-shot job semantics (`x-miget.type: job`)

## License

MIT, see [LICENSE](LICENSE). The templates themselves are MIT-licensed. Each
upstream project bundled or referenced by a template keeps its own license.
