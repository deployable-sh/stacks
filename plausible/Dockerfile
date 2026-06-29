# Thin wrapper over Plausible Community Edition.
#
# Why: Plausible does NOT auto-run its database setup - the official
# compose passes a `command:` that creates and migrates the databases
# before starting. A compose `command:` does not reach Miget per-app
# deploys, so that chain is baked into the image's CMD here (createdb and
# migrate are idempotent, so they are safe to run on every start).
FROM ghcr.io/plausible/community-edition:v3.2.1

ENTRYPOINT []
CMD ["sh", "-c", "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"]
