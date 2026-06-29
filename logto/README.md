# Logto

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=logto&type=stack)

[Logto](https://logto.io) - the open-source Auth0 experience: pre-built
hosted sign-in pages, OIDC/OAuth, social logins, organizations, MFA, and
clean SDKs for every framework. MPL-2.0, one container + a managed
Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `logto` | auth endpoint (:3001) + admin console (:3002) | no |
| `web-auth` | nginx :5000 -> auth endpoint | yes (own domain) |
| `web-admin` | nginx :5000 -> admin console | yes (own domain) |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

Two public domains because Logto serves two origins from one process -
the user-facing auth pages and your admin console.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5001     # FIRST admin-console signup becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `logto`. The managed
Postgres is provisioned and auto-wired; seeding is idempotent on every
boot. After first deploy set **`ENDPOINT`** (auth domain) and
**`ADMIN_ENDPOINT`** (admin domain) to the two apps' https URLs,
redeploy, then claim the admin console - the first signup becomes admin.

Logto, Zitadel, authentik, or Keycloak? Logto when you want the
Auth0-style developer experience (drop-in sign-in pages, quickstart
SDKs); Zitadel for B2B multi-tenancy; authentik for flow design;
Keycloak for protocol depth. All four, flat-priced, in this catalogue.
