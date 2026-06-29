# Cronicle

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=cronicle&type=stack)

[Cronicle](https://github.com/jhuckaby/Cronicle), a cron replacement with
a web UI: schedules, run history, chaining, retries, and alerts. Single
container, two small volumes (job data + logs).

## Local

```bash
docker compose up -d
open http://localhost:5000      # admin / admin
```

## On Miget

Create a Compose Stack pointing at this repo, no variables. **Change the
default `admin`/`admin` password immediately** (the UI is public). Jobs run
inside this container (shell/HTTP plugins), `apk add` what your scripts
need, or call other apps in the project over HTTP by service name.

Image: [`soulteary/cronicle`](https://github.com/soulteary/docker-cronicle)
(community; Cronicle ships no official image). Pin a version tag for
production. Single-server mode, keep `replicas` at 1.
