# Infisical

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=infisical&type=stack)

[Infisical](https://infisical.com) - the open-source secrets manager:
projects with environments, secret versioning, references, dynamic
secrets, and first-class integrations (Kubernetes operator, CI
runners, Terraform, SDKs). Stateless container on a managed Postgres
with a noeviction Valkey.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # create the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `infisical`. The
managed Postgres is auto-wired and migrations run on start. Required
variables: **`ENCRYPTION_KEY`** (`openssl rand -hex 16`),
**`AUTH_SECRET`** (`openssl rand -base64 32`), **`REDIS_AUTH`**. After
first deploy set **`SITE_URL`** to the app's https domain. SMTP is
optional (invites/MFA emails - the catalogue's `mailpit` works for
testing).

The natural consumers live next door: inject secrets into the CI
runner templates, your apps, and agents via the Infisical CLI/SDKs or
the machine-identity flow - with versioning and audit instead of env
vars scattered across dashboards. MIT core (enterprise dirs licensed
separately upstream).
