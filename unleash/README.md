# Unleash

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=unleash&type=stack)

[Unleash](https://www.getunleash.io) - the open-source feature flag and
toggle platform: gradual rollouts, user/segment targeting, A/B testing,
kill switches, and SDKs for every language. Single stateless container
on a managed Postgres (no Redis).

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # admin / unleash4all
```

## On Miget

Create a Compose Stack pointing at this repo, path `unleash`. The managed
Postgres is provisioned and auto-wired. No required variables - but log
in as **admin / unleash4all** and **change the password immediately**
(or seed `INIT_ADMIN_API_TOKENS` for headless setup).

Wire your apps with the Unleash SDKs (server-side and frontend), pointed
at the API on your domain with an API token. The OSS core is free with
up to 2 environments; RBAC/SSO and unlimited environments are paid tiers.

The economics: LaunchDarkly is usage-priced ($10/connection + $8.33 per
1k client MAU), Flagsmith Start-Up $40/month, Statsig Pro $150 - Unleash
self-hosted is a flat $5/month plan with no flag or MAU meter.

License note: Unleash 8.x source is AGPL-3.0; the prebuilt official image
this template uses remains Apache-2.0 (copyleft only triggers if you
modify and redistribute the source).
