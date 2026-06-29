# Microsoft SQL Server

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=mssql&type=stack)

Official [SQL Server on Linux](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker)
container (SQL Server 2025), **Express edition by default** - the edition
Microsoft licenses for production at no cost. Single node + 10 GB volume,
**internal-only** (databases never get a public domain).

## Editions and licensing (read this)

- **Express** (default): free production license. Limits: 50 GB per
  database, ~1.4 GB buffer pool, lesser of 1 socket / 4 cores, no SQL
  Agent. Plenty for most app backends.
- **Standard / Enterprise**: set `MSSQL_PID` accordingly **only if you
  hold that license** - the container does not validate keys; setting the
  PID is your attestation (BYOL).
- **Developer editions are not production-legal.** Don't ship them.

The image is **linux/amd64 only** (no arm64 anywhere for SQL Server).

## Local

```bash
cp .env.example .env && docker compose up -d
sqlcmd -S localhost,1433 -U sa -P "$MSSQL_SA_PASSWORD" -C -Q "SELECT @@VERSION"
```

## On Miget

Create a Compose Stack pointing at this repo, path `mssql`. Required
variables: **`ACCEPT_EULA=Y`** (explicit EULA acceptance) and
**`MSSQL_SA_PASSWORD`** (8+ chars, 3 of 4 character classes). Apps in the
same project connect with:

```
Server=mssql,1433;User Id=sa;Password=<password>;TrustServerCertificate=true
```

Create an application database and non-sa login promptly (or set the
`MSSQL_DB` / `MSSQL_USER` / `MSSQL_PASSWORD` env vars to have the
container do it on first start). Data lives on the `/var/opt/mssql`
volume; the container runs non-root (uid 10001). Keep `replicas` at 1.
