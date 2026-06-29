# Typebot

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=typebot&type=stack)

[Typebot](https://typebot.io) - the open-source conversational form
builder: drag-and-drop bot flows that outconvert static forms, embeds
for any site, and results analytics. Two stateless apps (builder +
viewer) on one managed Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `builder` | bot designer + workspace (`:5000`) | yes (own domain) |
| `viewer` | what respondents see + chat API (`:5000`) | yes (own domain) |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

Both apps honor `PORT`, so no proxies - each gets its own domain
directly. The builder runs migrations on start.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # builder; viewer serves on :5001
```

## On Miget

Create a Compose Stack pointing at this repo, path `typebot`. The
managed Postgres is provisioned and auto-wired. Required variables:
**`ENCRYPTION_SECRET`** (exactly 32 chars - identical on both apps),
**`ADMIN_EMAIL`** (gets the unlimited plan), and **`SMTP_*`** for
magic-link login (GitHub/Google OAuth vars work instead). After first
deploy set **`NEXTAUTH_URL`** (builder domain) and
**`NEXT_PUBLIC_VIEWER_URL`** (viewer domain), then redeploy. Set
`DISABLE_SIGNUP=true` once your team is in.

License note: FSL-1.1 (converts to Apache-2.0 after two years) - free
for internal use and client work; you may not resell access to your
instance as a service.
