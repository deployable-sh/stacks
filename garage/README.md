# Garage

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=garage&type=stack)

[Garage](https://garagehq.deuxfleurs.fr) - the S3-compatible object
store the self-hosting community moved to after MinIO archived its open
source in 2026: a single static Rust binary, AGPL, actively released,
designed for exactly this job. With
[garage-webui](https://github.com/khairul169/garage-webui) as the
management UI (which now does more than MinIO's gutted console did).

## Topology

| Service | Role | Public |
|---|---|---|
| `garage` | S3 API :3900, admin API :3903 | no |
| `webui` | cluster/buckets/keys/objects UI (:3909) | no |
| `web` | nginx `:5000` -> webui | yes |

## Local

```bash
cp .env.example .env && docker compose up -d --build
```

## On Miget

Create a Compose Stack pointing at this repo, path `garage`. Required
variables: **`GARAGE_RPC_SECRET`** (hex) and **`GARAGE_ADMIN_TOKEN`**.

One-time init (app shell on the `garage` service - four commands):

```bash
garage status                                   # note the node ID
garage layout assign -z dc1 -c 10G <node-id>
garage layout apply --version 1
garage bucket create my-bucket
garage key create my-app-key                    # prints S3 credentials
garage bucket allow --read --write my-bucket --key my-app-key
```

Apps then use endpoint `http://garage:3900`, region `garage`,
path-style addressing - boto3, the catalogue's `filestash`/`sftpgo`,
anything S3. Buckets/keys can also be managed in the web UI after init.

Why this instead of the `minio` template: MinIO's last image is frozen
(Sep 2025) with an unpatched CVE and an object-browser-only console;
upstream archived in April 2026. Garage is the maintained path.
