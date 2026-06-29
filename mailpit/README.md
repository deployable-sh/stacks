# Mailpit

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mailpit&type=stack)

[Mailpit](https://mailpit.axllent.org) - the modern dev mail catcher
(MailHog's actively-maintained successor, MIT): an SMTP sink plus a fast
web UI with search, HTML preview, link checking, and an API. Stop sending
test emails to real inboxes.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `mailpit`. One
required variable: **`MP_UI_AUTH`** (`user:password` for the web UI).

Point every app in the project at it - SMTP host `mailpit`, port `1025`,
no auth, no TLS (the project network is the boundary). Works for
Ghost, Chatwoot, Keycloak, Typebot, WordPress - anything with SMTP
settings. Caught messages persist on the volume (last 5,000 kept).

This replaces exactly what hosted mail-testing products charge for
(Mailtrap's testing plans start ~$14/month for 500 test emails). When
you go to production, swap the SMTP settings for a real relay - the
`listmonk` template covers the sending side.
