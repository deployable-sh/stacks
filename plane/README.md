# Plane

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=plane&type=stack)

[Plane](https://plane.so) - open-source project management: issues,
cycles (sprints), modules, a roadmap, Gantt and kanban views, pages, and
analytics. A self-hosted Jira / Linear / ClickUp alternative. This
template runs the **community all-in-one image** (API, web, background
workers, real-time collaboration, and the Caddy proxy in one container),
with a RabbitMQ sidecar for Celery tasks and an in-stack MinIO for file
storage. On Miget the database and cache become managed services.

> Status: heavier stack (~4 GB total) with several moving parts - treat
> it as a power-user template. The AIO image is bound to port 5000 with
> `SITE_ADDRESS=:5000`, so no proxy wrapper is needed.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000          # create the first admin account
```

The bundled Postgres, Valkey, RabbitMQ, and MinIO (wrapper pre-creates
the `uploads` bucket) come up together.

## On Miget

Create a Compose Stack pointing at this repo, path `plane`. The managed
Postgres and Valkey are provisioned and auto-wired; RabbitMQ and MinIO
run as **private** sidecars (not publicly reachable), and only the
`plane` service is public. Required variables:

- **`SECRET_KEY`** - a long random string (`openssl rand -hex 32`).
- **`WEB_URL`** and **`CORS_ALLOWED_ORIGINS`** - the app's https domain.
- **`MINIO_ROOT_PASSWORD`** - the in-stack object-store password.
- **`RABBITMQ_PASSWORD`** - matches the `AMQP_URL` in `compose.miget.yaml`.

Give the stack a plan with at least 4 GB of RAM. The `plane` service
wants ~3 GB; RabbitMQ and MinIO take ~0.5 GB each. Uploaded files live on
the MinIO volume and issues live in managed Postgres.

Jira Standard is ~$7.53/user/month, Linear is $8-16/user, ClickUp
Business is $12/user - all metered per seat. Plane self-hosted is one
flat ~$45-65/month plan for an unlimited team, with your data on your own
infrastructure. AGPL-3.0 (the community edition).
