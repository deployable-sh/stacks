# Vaultwarden

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=vaultwarden&type=stack)

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) - the
Bitwarden-compatible server in Rust: the official Bitwarden browser
extensions, mobile and desktop apps, and CLI all connect to it unchanged.
One ~tiny container + a 2 GB volume (SQLite, attachments, keys).

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `vaultwarden`. After
first deploy set **`DOMAIN`** to the app's https URL (e.g.
`https://vault.example.com`) and redeploy - the web vault requires HTTPS
(the platform ingress terminates TLS) and WebAuthn/email links embed the
domain.

Recommended hardening, in order:

1. Create your accounts, then set `SIGNUPS_ALLOWED=false` (organization
   invitations keep working).
2. Want the `/admin` page? Set `ADMIN_TOKEN` to an argon2 PHC hash
   (`docker run --rm -it vaultwarden/server /vaultwarden hash --preset owasp`),
   never plaintext.
3. Back up the volume - it holds the encrypted vaults, attachments and
   RSA keys. Your data, your responsibility.

Websocket notifications ride the main port (no extra config). Point any
Bitwarden client at `https://<your-domain>` as the self-hosted server
URL. Keep `replicas` at 1 (SQLite).
