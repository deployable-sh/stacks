# Kong API Gateway

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=kong&type=stack)

DB-backed [Kong Gateway](https://konghq.com) (OSS) in front of your project's
apps, deployable locally with plain Docker Compose or to
[Miget](https://miget.com) as a compose stack.

## Topology

| Service | Role | Public |
|---|---|---|
| `kong` | gateway, proxy on `:5000`, Admin API on `:8001`, Manager on `:8002` | proxy only |
| `admin` | nginx, Kong Manager (web UI) + Admin API at `/api` | behind basic auth |
| `db` | Postgres, real container locally, **managed Postgres service on Miget** | no |

The Admin API itself is reachable only inside the project network. The one
authenticated way in from outside is the `admin` service: nginx serving Kong
Manager and proxying the Admin API under `/api`, both behind HTTP basic auth
(`ADMIN_USERNAME` / `ADMIN_PASSWORD`). Serving UI and API from one origin is
what lets the Manager talk to the Admin API with no domain config and no CORS.

## Files

- `compose.yaml`, portable Compose file; works with plain `docker compose up`
- `compose.miget.yaml`, Miget overrides; marks `db` as `x-miget.managed: postgres`
  and wires Kong's env to the managed credentials via `${{db.*}}` references
- `Dockerfile` + `start-kong.sh`, Kong image whose entrypoint bootstraps /
  upgrades the database schema idempotently before starting (the platform has
  no one-shot job services)
- `admin/`, nginx image for the basic-auth'd Kong Manager + Admin API front
- `.env.example`, local development credentials

## Local

```bash
cp .env.example .env
docker compose up -d --build
curl -i http://localhost:5000          # proxy (404 until you add routes)
open http://localhost:8002             # Kong Manager (basic auth from .env)
curl -s -u admin:change-me localhost:8002/api/status
```

## On Miget

Create a Compose Stack pointing at this repo (path `kong`), the only
variable is `ADMIN_PASSWORD`, which the platform pre-fills with a strong
random secret (accept it or overwrite; the username defaults to `admin`,
override with an `ADMIN_USERNAME` variable). Detection provisions a
**managed Postgres** for `db`, and Kong's connection settings are auto-wired
from the provisioned credentials via `${{db.host}}`-style references in
`compose.miget.yaml` (see the available keys: `host`, `port`, `database`,
`username`, `password`, `url`). The proxy is then live on the `kong` app's
domain, and Kong Manager on the `admin` app's domain.

### Configuring routes

Point a browser at the `admin` app's domain for Kong Manager, or hit the
Admin API on the same domain under `/api`:

```bash
curl -s -u "$ADMIN_USERNAME:$ADMIN_PASSWORD" \
  https://<admin-app-domain>/api/status
```

Or from any app in the same project (the Admin API resolves as `kong:8001`,
no auth needed inside the project network):

```bash
# Route the gateway to another app in the project
curl -s -X POST kong:8001/services \
  --data name=my-api --data url=http://my-api:5000
curl -s -X POST kong:8001/services/my-api/routes \
  --data 'paths[]=/api' --data name=my-api-route

# Rate-limit it
curl -s -X POST kong:8001/services/my-api/plugins \
  --data name=rate-limiting --data config.minute=60
```

Or manage declaratively with [decK](https://github.com/Kong/deck) from a
workstation with project access: `deck gateway sync kong.yaml`.

## Notes

- Plugins, consumers, and keys persist in Postgres, the gateway pods are
  stateless and the managed service carries the state.
- nginx basic auth is the only thing between the internet and the Admin API
  (Kong OSS ships no Admin API auth), keep the platform-generated random
  `ADMIN_PASSWORD`, or pick an equally strong one. For a
  second layer on Miget, enable the platform's app-level Basic Auth on the
  `admin` app, or mark the `admin` service `private: true` in
  `compose.miget.yaml` to keep management project-internal only.
