# Actual Budget

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=actual&type=stack)

[Actual](https://actualbudget.org) - local-first envelope budgeting
(the YNAB methodology, open source): budgets live on your devices,
end-to-end encrypted, and this server syncs them. MIT, tiny, beloved -
PikaPods features it on their homepage.

## Local

```bash
docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `actual` - no
variables. **Set the server password on first visit** (until then the
instance is claimable by whoever finds the URL).

Budget files are end-to-end encrypted client-side - the server stores
ciphertext and syncs it between your browser, phone, and desktop apps.
Bank imports work via files or community bank-sync integrations. The
/data volume is the whole state: back it up and your finances are
portable forever.
