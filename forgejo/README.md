# Forgejo

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=forgejo&type=stack)

[Forgejo](https://forgejo.org) - the community-governed git forge (the
hard fork of Gitea, run by the non-profit Codeberg e.V.): repositories,
issues, pull requests, packages, and CI via Forgejo Actions. One light Go
binary + a managed Postgres.

## Topology

| Service | Role | Public |
|---|---|---|
| `forgejo` | web UI + git over HTTPS (`:5000`) | yes |
| `db` | Postgres - real container locally, **managed Postgres on Miget** | no |

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000      # initial setup; first user becomes admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `forgejo`. The managed
Postgres is provisioned and auto-wired. After first deploy set
**`ROOT_URL`** to the app's https domain (trailing slash) and redeploy -
clone URLs and the UI embed it. Complete the initial setup promptly; the
first registered user becomes admin.

SSH is disabled by design: on an HTTP-first platform, https clone with
tokens (and the web UI, API, packages, Actions) is the complete workflow.
Prefer SSH anyway? Expose a custom TCP port on the app, set
`FORGEJO__server__DISABLE_SSH=false`, `FORGEJO__server__SSH_LISTEN_PORT=2222`
and `FORGEJO__server__SSH_PORT` to the public port number.

Repos live on the `/data` volume; metadata in Postgres. Keep `replicas`
at 1.
