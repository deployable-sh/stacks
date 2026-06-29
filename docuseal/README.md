# DocuSeal

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=docuseal&type=stack)

[DocuSeal](https://www.docuseal.com) - open-source document signing: a
WYSIWYG field builder (12 field types), multiple submitters, automatic
PDF eSignatures with verification, API and webhooks. The signing core is
fully functional in the free AGPL edition.

## Topology

| Service | Role | Public |
|---|---|---|
| `docuseal` | DocuSeal (Rails, `:3000` - no port env) | no |
| `web` | nginx `:5000` -> `docuseal:3000` | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # create the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `docuseal`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`SECRET_KEY_BASE`** (`openssl rand -hex 64` - pin it, or sessions and
encrypted data break on redeploys), **`HOST`** + **`FORCE_SSL`** (the
app's domain), and **`SMTP_*`** (signature-request emails - any relay;
the catalogue's `mailpit` works for testing at `mailpit:1025`).

Attachments live on the `/data` volume (S3-compatible storage supported
via `AWS_*`/`S3_ATTACHMENTS_BUCKET` if you prefer stateless). Pro
features (white-label, SSO, reminders, bulk send) are license-key gated
upstream - signing itself is not.
