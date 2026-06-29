# useSend

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=usesend&type=stack)

[useSend](https://usesend.com) (formerly Unsend) - the open-source
Resend alternative: transactional email API, campaigns, contacts, and
delivery analytics, with the actual sending done by **your AWS SES**
(~$0.10 per 1,000 emails - deliverability is SES's job, the platform is
yours).

## Topology

| Service | Role | Public |
|---|---|---|
| `usesend` | dashboard + API (Next.js, :3000) | no |
| `web` | nginx `:5000` -> `usesend:3000` | yes |
| `broker` | Valkey, noeviction (BullMQ send queue) | no |
| `db` | Postgres - **managed Postgres on Miget** | no |

## Prerequisites (the honest list)

- An AWS account with SES production access (out of sandbox) and an IAM
  key pair scoped to SES (+SNS for delivery webhooks).
- A GitHub OAuth app - useSend's login provider. Callback URL:
  `https://<domain>/api/auth/callback/github`.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `usesend`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`NEXTAUTH_SECRET`**, **`REDIS_AUTH`**, **`AWS_*`** (SES), and
**`GITHUB_ID`/`GITHUB_SECRET`**. After first deploy set
**`NEXTAUTH_URL`** to the app's https domain and update the OAuth
callback. Verify your sending domain in the dashboard (SES DKIM records)
and mint API keys per app.

Migrations run on start (prisma migrate deploy). AGPL-3.0.
