# Outline

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=outline&type=stack)

[Outline](https://www.getoutline.com) - the team wiki that feels like a
product: a genuinely fast editor, nested collections, full-text search,
granular permissions, and a public API. This template is the catalogue's
cleanest big-app deploy: **zero volumes** - documents in the managed
Postgres, uploads in a Miget Bucket, queues in a noeviction Valkey.

## Topology

| Service | Role | Public |
|---|---|---|
| `outline` | wiki (stateless, `:5000`) | yes |
| `broker` | Valkey, noeviction (Bull queues) | no |
| `db` | Postgres - **managed Postgres on Miget** | no |

## Auth (better than the old tutorials say)

Since Outline 1.0 no external auth provider is required: the first-run
setup screen bootstraps your workspace and admin, then **SMTP
magic-links** sign the team in (invite-based). For SSO, the OIDC_* env
vars point at the catalogue's `authentik`, `keycloak`, `zitadel`, or
`logto` - the natural pairing.

## On Miget

Create a Compose Stack pointing at this repo, path `outline`. The
managed Postgres is auto-wired; create a private Miget Bucket for the
S3_* variables. Required: **`SECRET_KEY`**, **`UTILS_SECRET`**,
**`REDIS_AUTH`**, **`S3_*`**, **`SMTP_*`**, and **`URL`** set to the
https domain after first deploy. Run the first-run setup promptly.

License note: BSL-1.1 (source-available; converts to Apache-2.0 over
time) - free to self-host for your team; it restricts offering Outline
itself as a competing service.
