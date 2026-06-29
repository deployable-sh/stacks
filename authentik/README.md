# authentik

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=authentik&type=stack)

[authentik](https://goauthentik.io) - the modern open-source identity
provider: OIDC, SAML, LDAP, SCIM, proxy auth, and visually-designed
login flows (MFA, conditional access) without writing code. Server +
worker on a managed Postgres - **no Redis**: since 2025.10 authentik
runs everything on Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `server` | authentik UI + APIs + flows (`:5000`) | yes |
| `worker` | background tasks, outposts orchestration | no |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000/if/flow/initial-setup/
```

## On Miget

Create a Compose Stack pointing at this repo, path `authentik`. The
managed Postgres is provisioned and auto-wired (sslmode=require).
Required variables: **`AUTHENTIK_SECRET_KEY`**
(`openssl rand -base64 60`), **`AUTHENTIK_BOOTSTRAP_PASSWORD`** and
**`AUTHENTIK_BOOTSTRAP_EMAIL`** (akadmin login, applied on first start).

Register your apps as OIDC/SAML providers in the admin UI; every
standard auth library points at the issuer URL on your domain. authentik
vs the catalogue's `keycloak`: same job, different style - authentik's
flow designer and lighter footprint vs Keycloak's two decades of
enterprise hardening. Both beat per-MAU SaaS pricing by construction.

License: MIT core (enterprise features are license-key gated, off by
default). Media and custom templates live on shared volumes.
