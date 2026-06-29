# Oracle Database Free

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=oracle&type=stack)

[Oracle Database Free](https://www.oracle.com/database/free/) (the 26ai
line) - the actual Oracle Database, free for development AND production
under the [Oracle Free Use Terms and Conditions](https://www.oracle.com/downloads/licenses/oracle-free-license.html),
within software-enforced caps: **2 cores, 2 GB RAM, 12 GB user data, one
instance per host**. Single node + 20 GB volume, **internal-only**.

This template uses [`gvenzl/oracle-free`](https://github.com/gvenzl/oci-oracle-free)
(maintained by Oracle database product management; FUTC explicitly permits
redistribution): multi-arch (amd64 + arm64), faster startup, and an app
user bootstrapped on first start. Prefer the official image? Swap in
`container-registry.oracle.com/database/free:latest` and use `ORACLE_PWD`.

## Local

```bash
cp .env.example .env && docker compose up -d
# first start initializes the database - wait for "DATABASE IS READY TO USE!"
sqlplus app/$APP_USER_PASSWORD@//localhost:1521/FREEPDB1
```

## On Miget

Create a Compose Stack pointing at this repo, path `oracle`. Required
variables: **`ORACLE_PASSWORD`** (SYS/SYSTEM) and **`APP_USER_PASSWORD`**
(the `app` schema user in `FREEPDB1`). Apps in the same project connect
with:

```
oracle:1521/FREEPDB1            (service name)
jdbc:oracle:thin:@//oracle:1521/FREEPDB1
```

First start takes a few minutes while the database initializes onto the
volume; subsequent starts are fast. Use the `:23-faststart` image variant
if cold-start time matters more than image size.

Good to know: the caps are enforced by the software itself - it will not
use more than 2 cores / 2 GB RAM, and `ORA-12954` signals the 12 GB data
limit. For bigger Oracle, bring your own license and image. Keep
`replicas` at 1.
