# listmonk

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=listmonk&type=stack)

[listmonk](https://listmonk.app) - high-performance self-hosted
newsletters and mailing lists: subscribers, campaigns, templates,
double-opt-in, and analytics in one Go binary on Postgres. Replace
per-subscriber SaaS pricing with a flat plan.

## Topology

| Service | Role | Public |
|---|---|---|
| `listmonk` | admin UI + public subscription pages (`:5000`) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000/admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `listmonk`. The
managed Postgres is provisioned and auto-wired; one required variable:
**`LISTMONK_ADMIN_PASSWORD`**. The startup command runs listmonk's
idempotent install and upgrade on every deploy - schema stays current
automatically.

Sending: configure any SMTP relay in Settings > SMTP - Amazon SES
(~$0.10 per 1,000 emails), Resend, Mailgun, Postmark all work. listmonk
manages lists, consent, templates, and campaign analytics; the relay
just delivers. Public subscription pages live on the same domain.

Sizing honesty: listmonk comfortably handles millions of subscribers on
this footprint - the database and your relay's rate limits are the real
ceilings, not the app.
