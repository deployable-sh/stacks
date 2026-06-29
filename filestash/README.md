# Filestash

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=filestash&type=stack)

[Filestash](https://www.filestash.app) - the polished web file manager
over S3: browse, upload, preview (images, video, office docs), edit, and
share files that live in **Miget Buckets**. AGPL, very actively
maintained, runs in 128 MB.

## Topology

| Service | Role | Public |
|---|---|---|
| `filestash` | file manager (`:8334`, no port env) | no |
| `web` | nginx `:5000` -> `filestash:8334` | yes |

## Local

```bash
docker compose up -d --build
open http://localhost:5000          # then /admin to configure
```

## On Miget

Create a Compose Stack pointing at this repo, path `filestash` - no
required variables. Then, promptly:

1. Visit `/admin` and set the admin password (first visitor claims it).
2. Add a connection: backend **S3**, endpoint = your Miget bucket's S3
   endpoint, access/secret keys from the bucket. Path-style addressing
   is always forced by Filestash, so S3-compatible endpoints just work.
   Pre-fill credentials to drop users straight into the bucket.
3. Set `APPLICATION_URL` to the app's https domain.

Share links (password, expiry, domain-restricted) serve from your
domain. Config persists on the small state volume; the files themselves
never leave the bucket.
