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

## Running it anywhere else

`hostname-strict` is off, which Keycloak permits only when the proxy in
front overwrites the `Host` header. That holds behind the Miget ingress.
It does not hold for a proxy you configure yourself, and there the default
is unsafe: a request carrying `Host: evil.example.com` makes Keycloak
advertise `http://evil.example.com/realms/master` as its issuer, so
tokens, redirects and password-reset links point at somebody else's domain.

Set `KC_HOSTNAME` to the public URL and the issuer is pinned regardless of
what any header claims:

```bash
KC_HOSTNAME=https://id.example.com docker compose up -d
```

Keycloak logs `If hostname is specified, hostname-strict is effectively
ignored` when it takes effect. Leave the variable empty for local work.
