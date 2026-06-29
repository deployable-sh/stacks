# Docker Registry

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=docker-registry&type=stack)

Your own private container registry - the [CNCF Distribution
registry](https://distribution.github.io/distribution/) (the same engine
behind Docker Hub) - with https, basic-auth, and image storage on a
Miget Bucket so the service itself holds no state. Listens natively on
port 5000.

## Why the wrapper

Miget configures images through environment variables only, and the
stock image ships a filesystem-storage config that conflicts if you also
pass S3 settings. The thin `Dockerfile` + `entrypoint.sh` write a clean
`config.yml` from env at boot (filesystem when no S3 vars are set, S3
when they are) and build an htpasswd file from `REGISTRY_AUTH_USER` /
`REGISTRY_AUTH_PASSWORD`, so the registry is never accidentally left
open.

## Local

```bash
cp .env.example .env && docker compose up -d --build
docker login localhost:5000                 # REGISTRY_AUTH_USER / PASSWORD
docker tag alpine localhost:5000/alpine && docker push localhost:5000/alpine
```

## On Miget

Create a Compose Stack pointing at this repo, path `docker-registry`.
Required variable: **`REGISTRY_AUTH_PASSWORD`**. Point the
**`REGISTRY_STORAGE_S3_*`** block at a Miget Bucket
(`REGIONENDPOINT` = the Bucket's S3 endpoint) and every layer lands in
object storage - redeploys and rollbacks keep all images. Then
`docker login your-app.migetapp.com` and push.

Docker Hub charges $9/user/month for the Pro plan (and meters pull
rates); GitHub Container Registry bills private storage and egress. A
self-hosted registry is one small ~$5-13/month plan plus Bucket storage,
with unlimited private repos and no pull-rate caps. Apache-2.0.
