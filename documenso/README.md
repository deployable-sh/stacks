# Documenso

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=documenso&type=stack)

[Documenso](https://documenso.com) - the open-source DocuSign
alternative: signing workflows, templates, teams, and an API, with real
PKCS#12 document sealing. One app container + a managed Postgres;
no volumes (the signing cert rides env as base64).

## Topology

| Service | Role | Public |
|---|---|---|
| `documenso` | app + API (`:5000`) | yes |
| `db` | Postgres 14+ - real container locally, **managed Postgres on Miget** | no |

## The signing certificate

Signed PDFs are sealed with a PKCS#12 certificate. A self-signed one is
explicitly fine (commands in `.env.example`) - generate it once, base64
it into **`SIGNING_CERT_B64`**, and never regenerate casually: documents
sealed with the old cert verify against it. For legally-stronger sealing
buy a cert and drop it into the same variable.

## Local

```bash
cp .env.example .env    # generate secrets + cert per the comments
docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `documenso`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`NEXTAUTH_SECRET`**, **`NEXT_PRIVATE_ENCRYPTION_KEY`** (+
`_SECONDARY_KEY`), **`SIGNING_CERT_B64`** (+ passphrase), **`SMTP_*`**
(the signing flow is email-driven - the catalogue's `mailpit` works for
testing), and **`NEXT_PUBLIC_WEBAPP_URL`** set to the app's https domain
after first deploy (runtime-injected, no rebuild).

DocuSeal or Documenso? DocuSeal is the lighter, faster-to-value pick;
Documenso brings the polished product UX and team features. Both are in
the catalogue - and both end the per-envelope counting.
