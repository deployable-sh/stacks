# Buzz stack — design

Date: 2026-07-26
Upstream: [block/buzz](https://github.com/block/buzz) (Apache-2.0, Rust)
Branch: `feature/block-buzz`

## What Buzz is

A self-hostable workspace where humans and AI agents share the same rooms. Under
the hood it is a Nostr relay: every message, reaction, workflow step, review
approval, and git event is a signed event in one log, whether the author is a
person or a process. The `buzz-relay` binary serves the web UI, the REST API,
the WebSocket relay, and NIP-34 git hosting from a single port.

## Why it fits the catalogue

One public entrypoint, image-only configuration through environment variables,
and real backing services (Postgres, Redis-compatible cache, S3) that map onto
Miget's managed addons. It also extends the catalogue's agent lane: `agent-box`,
`openclaw`, `hermes`, and `kilo` are single agents with a dashboard; Buzz is the
room those agents can sit in alongside people.

## Topology

| Service | Image | Role | Public |
|---|---|---|---|
| `relay` | `ghcr.io/block/buzz:0.2.0` | web UI + REST + WebSocket + git (`:5000`) | yes |
| `db` | `postgres:17-alpine` (local) | event log, membership, media sidecars | no |
| `cache` | `valkey/valkey:8` (local) | pubsub fan-out, rate-limit counters | no |
| `blob` | `minio` + one-shot `blob-init` | media/S3 store, `buzz-media` bucket | no |

On Miget `db` becomes a managed Postgres (`extensions: [pgcrypto]`, the one
extension the migrations require) and `cache` becomes a managed Valkey. `blob`
and `relay` stay containers.

Volumes: `gitdata` → relay `/data/git` (RWO 5 GB, bare NIP-34 repos and the pack
cache), `blobdata` → MinIO (RWO 10 GB). Local runs additionally keep `dbdata`
and `cachedata`; on Miget the managed addons own that storage.

The base `compose.yaml` derives from upstream's `deploy/compose/compose.yml`,
re-pointed at port 5000 (`BUZZ_BIND_ADDR=0.0.0.0:5000`) per the catalogue's
ingress rule. Upstream's readiness probe is kept verbatim — it dials
`/dev/tcp/127.0.0.1/8080` because the runtime image ships without curl or wget.

## Configuration

Wiring that differs on Miget lives in `compose.miget.yaml`:

- `DATABASE_URL: ${{db.url}}`
- `REDIS_URL: redis://:${{cache.password}}@${{cache.host}}:${{cache.port}}`
- `RELAY_URL`, `BUZZ_CORS_ORIGINS` ← `${{relay.public_url}}`;
  `BUZZ_MEDIA_BASE_URL` ← `${{relay.public_url}}/media`

`RELAY_URL` is what the relay derives its community host from
(`relay_url_authority` keeps host plus non-default port and ignores the scheme),
so the `https://` form Miget supplies resolves to the same community that live
requests do. Browser clients never read it — `web/src/shared/lib/relay-url.ts`
derives `wss://` from `window.location`, so nothing is baked at build time.

Secrets use the bare `${VAR:?}` form, which Miget fills with 32 random bytes of
hex (64 characters) — exactly the width `BUZZ_RELAY_PRIVATE_KEY` and
`BUZZ_GIT_HOOK_HMAC_SECRET` require: `POSTGRES_PASSWORD`, `VALKEY_PASSWORD`,
`MINIO_ROOT_PASSWORD`, `BUZZ_RELAY_PRIVATE_KEY`, `BUZZ_GIT_HOOK_HMAC_SECRET`.
No variable carries a `:?prompt` message, because nothing must come from outside
at create time. `BUZZ_AUTO_MIGRATE=true` lets a fresh database self-migrate on
first boot.

## Access model

The stack ships with upstream's defaults: membership enforcement off, so anyone
who has the URL can join. This is deliberate — `RELAY_OWNER_PUBKEY` is a 64-hex
Nostr pubkey the operator cannot possess before the relay exists to mint an
identity in, so requiring it at create time would make the first deploy fail.
It is therefore declared as `${RELAY_OWNER_PUBKEY:-}`.

The README documents locking down as step 2 of the install, not as an appendix:
open the app, create an identity, copy the hex pubkey, set `RELAY_OWNER_PUBKEY`,
`BUZZ_REQUIRE_RELAY_MEMBERSHIP=true`, and `BUZZ_REQUIRE_AUTH_TOKEN=true`, then
redeploy. A half-finished lockdown is loud rather than silent: the relay refuses
to start when membership enforcement is on without a valid owner pubkey or
without a stable relay private key.

## Failure modes worth stating

- **Fresh database.** Without `BUZZ_AUTO_MIGRATE` the relay starts against an
  empty schema and fails on first query. The stack sets it to `true`.
- **Missing `pgcrypto`.** Migration 24 runs `CREATE EXTENSION IF NOT EXISTS
  pgcrypto`; the managed Postgres declares it in `extensions`.
- **Restart amnesia.** An ephemeral `BUZZ_RELAY_PRIVATE_KEY` makes previously
  signed relay events unverifiable after a restart, so the key is a generated
  stack secret rather than a per-boot random.
- **Bucket absent.** MinIO starts empty; `blob-init` creates `buzz-media` and
  removes anonymous access before the relay's `depends_on` gate opens.

## Catalogue changes

`deployable-sh/src/data/apps/buzz.ts` plus its registration in `index.ts`, a
`buzz` entry in `saas-pricing.ts` (Slack, Mattermost, Zulip as the paid
comparators), and a row in the root README table. Category
`Productivity & PM`, status `experimental` — the relay image is at 0.2.x and
upstream ships several releases a week.

## Verification

Local, before anything is called done:

1. `docker compose up -d` and every service reaches healthy.
2. `/_liveness` and `/_readiness` return 200 on the health port.
3. `/` serves the web bundle; a WebSocket upgrade to `/` succeeds.
4. Postgres holds the migrated schema; the `buzz-media` bucket exists.
5. A browser pass: load the UI, create an identity, post a message, restart the
   relay, confirm the message survives. This is also what proves Valkey is an
   acceptable substitute for upstream's Redis rather than an assumption.
