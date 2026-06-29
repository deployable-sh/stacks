# Keycloak

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=keycloak&type=stack)

[Keycloak](https://www.keycloak.org), identity & access management
(OIDC, SAML, social login, user federation) backed by a managed Postgres.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo. The managed Postgres is
provisioned and auto-wired; required variables: **`KC_ADMIN_USERNAME`** /
**`KC_ADMIN_PASSWORD`** (bootstrap admin, applied on the first start
against an empty database). Production mode (`start`) with HTTP on 5000, 
TLS terminates at the platform ingress and the X-Forwarded headers are
trusted, so issuer URLs come out as the app's https domain.

All state lives in Postgres, the Keycloak pod itself is stateless.
Keycloak is RAM-hungry (JVM + Quarkus): 2 GB default here.
