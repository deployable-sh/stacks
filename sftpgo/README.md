# SFTPGo

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=sftpgo&type=stack)

[SFTPGo](https://sftpgo.com) - the upload portal for **Miget Buckets**:
create users whose storage IS an S3 bucket (custom endpoint, path-style,
optional key prefix per user), give outsiders share-upload links, and
optionally front it all with SFTP or WebDAV. AGPL Go binary, ~50 MB.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000/web/admin
```

## On Miget

Create a Compose Stack pointing at this repo, path `sftpgo`. Required
variable: **`ADMIN_PASSWORD`** (admin at `/web/admin`; end users get
`/web/client`).

Wiring a user to a Miget bucket (admin UI > Users > filesystem):
provider **AWS S3 (compatible)**, your bucket name, the bucket's S3
endpoint, access/secret keys, **force path style: on**, and optionally a
key prefix to confine the user to a folder. The user's web client,
shares, and SFTP all read/write that bucket.

Killer feature for client work: **shares** - a write-enabled link (with
password, expiry, and usage caps) lets someone upload straight into a
bucket folder with no account.

SFTP: listens on `:2022` project-internally; to offer real SFTP, add a
custom public TCP port on the app and map it. Web-only deployments can
ignore it entirely.
