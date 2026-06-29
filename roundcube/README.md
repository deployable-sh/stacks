# Roundcube

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=roundcube&type=stack)

[Roundcube](https://roundcube.net) - the standard open-source webmail
client: folders, search, contacts, filters, and a clean responsive skin.
It is a CLIENT: point it at any existing IMAP/SMTP provider (Fastmail,
Gmail app passwords, your VPS Dovecot) and own the interface and session
data - no mail server here, by design (a PaaS cannot credibly run one).

## Topology

| Service | Role | Public |
|---|---|---|
| `roundcube` | webmail (:80, no port env) | no |
| `web` | nginx `:5000` -> `roundcube:80` | yes |
| `db` | Postgres (sessions/settings/contacts) - **managed on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000      # log in with your mailbox credentials
```

## On Miget

Create a Compose Stack pointing at this repo, path `roundcube`. The
managed Postgres is provisioned and auto-wired (the container is
stateless with an external DB). Required variables: **`IMAP_HOST`**
(e.g. `ssl://imap.fastmail.com`) and **`SMTP_SERVER`**
(e.g. `tls://smtp.fastmail.com`). Users log in with their own mailbox
credentials; settings and contacts live in your Postgres.

Multi-provider trick: `ROUNDCUBEMAIL_DEFAULT_HOST` accepts a single
default; advanced multi-host setups go in a mounted config. For an
account *aggregator* UX (multiple IMAP accounts in one inbox), Cypht is
the upstream alternative worth knowing.
