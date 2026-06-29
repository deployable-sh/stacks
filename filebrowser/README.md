# FileBrowser

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=filebrowser&type=stack)

[FileBrowser](https://filebrowser.org) - a fast web UI over a file
volume: upload, organize, preview, edit, and share files via public
links, with per-user scopes. Apache-2.0, non-root, ~30 MB of Go.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `filebrowser`.
Required variables: **`FB_USERNAME`** / **`FB_PASSWORD`** (admin login).
Files live on the 10 GB `/srv` volume; share links serve straight from
your domain.

Want S3 (Miget Buckets) behind the UI instead of a volume? That is the
`filestash` lane - FileBrowser is deliberately the simple volume-backed
tool. For serving a whole static website, use Miget’s native static hosting.
