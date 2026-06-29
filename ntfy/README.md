# ntfy

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=ntfy&type=stack)

[ntfy](https://ntfy.sh) - push notifications as an HTTP primitive:
`curl -d "backup done" https://your-domain/alerts` and every subscribed
phone (iOS/Android apps) and browser gets it. Topics, priorities,
attachments, scheduled delivery - one tiny Go binary.

## Local

```bash
cp .env.example .env && docker compose up -d
curl -u admin:yourpass -d "hello" localhost:5000/test
```

## On Miget

Create a Compose Stack pointing at this repo, path `ntfy`. Required
variables: **`NTFY_BASE_URL`** (the app's https domain) and
**`NTFY_AUTH_USERS`** - declarative users as `name:bcryptHash:role`
(generate the hash with `ntfy user hash`; role `admin` for yourself).
Access defaults to **deny-all**: topics are private until you grant
access, which is the right posture on a public domain.

Point the mobile apps at your domain, subscribe to topics, and wire
everything in your projects to it: deploy scripts, the `uptime-kuma`
and `changedetection` templates, cron jobs - one `curl` is a
notification. Self-hosting removes ntfy.sh's reserved-topic limits and
keeps your alert content on your infrastructure.
