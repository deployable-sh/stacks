# Zitadel

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=zitadel&type=stack)

[Zitadel](https://zitadel.com) - modern identity infrastructure: OIDC,
SAML, passkeys-first login, multi-tenant organizations, and JS actions
for custom logic. One stateless Go binary on Postgres - the lightest
full IdP in the catalogue (~512 MB).

## The one thing to get right

**`ZITADEL_EXTERNALDOMAIN` is baked into instance data at first setup.**
Set it to the final domain (custom domain or the app's platform host),
with `ZITADEL_EXTERNALPORT=443` and `ZITADEL_EXTERNALSECURE=true`,
BEFORE the first deploy.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
# zitadel-admin@zitadel.localhost / Password1! (forced change on login)
```

## On Miget

Create a Compose Stack pointing at this repo, path `zitadel`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`ZITADEL_MASTERKEY`** (exactly 32 chars) and the
**`ZITADEL_EXTERNALDOMAIN`** / `EXTERNALPORT=443` / `EXTERNALSECURE=true`
trio (see above). First login: `zitadel-admin@zitadel.localhost` /
`Password1!`, changed on first use.

Zitadel vs the catalogue's `keycloak` and `authentik`: pick Zitadel for
passkeys-first UX, B2B multi-tenancy (each customer gets an org), and
the smallest footprint; Keycloak for enterprise-protocol breadth;
authentik for visual flow design. All three run on a flat plan instead
of per-MAU pricing.

License note: Zitadel moved from Apache-2.0 to AGPL-3.0 with v3 (2025) -
self-hosting it unmodified for your users is unaffected.
