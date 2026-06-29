# Cal.com

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=calcom&type=stack)

[Cal.com](https://cal.com) - open-source scheduling: personal and team
booking pages, availability rules, round-robin and collective events,
workflows and reminders, and two-way calendar sync (Google, Office 365,
CalDAV). A self-hosted Calendly alternative. The app is stateless - all
state lives in a managed Postgres - and `PORT=5000` puts it on Miget's
public port, so there is no wrapper.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # complete /auth/setup to create the admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `calcom`. The managed
Postgres is provisioned with the **citext** extension (Cal.com's Prisma
migrations require it) and auto-wired. Migrations run on every start, so
deploy a single replica first, then scale. Required variables:

- **`NEXTAUTH_SECRET`** - `openssl rand -base64 32`.
- **`CALENDSO_ENCRYPTION_KEY`** - a 32-byte AES key, `openssl rand -base64 24`.
- **`NEXT_PUBLIC_WEBAPP_URL`** and **`NEXTAUTH_URL`** - the app's https
  domain (the latter with the `/api/auth` suffix). Set these to the real
  domain after first deploy.

On first visit complete the `/auth/setup` wizard to create the admin
account. The image is large (~1.5 GB) so the first boot is slow - allow a
generous health-check grace period. Everything persists in Postgres; the
app container is disposable.

Calendly is $12-16/user/month and meters features per seat; Cal.com self
-hosted is one flat plan for the whole team. AGPLv3 (the commercial
`/ee` features need a paid key, but the core scheduling app does not).
