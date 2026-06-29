# Memos

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=memos&type=stack)

[Memos](https://usememos.com) - the lightweight note hub: quick
markdown notes with tags, search, and selective sharing. A single Go
binary on SQLite, MIT-licensed - the "capture a thought in two seconds"
tool, on your infrastructure.

## Local

```bash
docker compose up -d
open http://localhost:5000      # first signup becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `memos` - no
variables. **Claim it immediately**: the first signup becomes the Host
(admin) account, after which registration can be closed in settings.

Notes, assets, and the SQLite database all live on the volume. Mobile
and API clients exist in the community; the REST API is first-class.
Outgrowing SQLite is unlikely for notes, but Postgres is one
MEMOS_DRIVER/MEMOS_DSN pair away.
