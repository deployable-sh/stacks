#!/bin/sh
set -e

# Wait for the database, then create the schema. Bootstrap is a no-op on an
# already-bootstrapped database, so the retry loop doubles as a readiness
# wait (the managed Postgres may still be provisioning on first deploy).
i=0
until kong migrations bootstrap; do
  i=$((i + 1))
  if [ "$i" -ge 30 ]; then
    echo "Kong database not reachable after ${i} attempts, giving up" >&2
    exit 1
  fi
  echo "Kong database not ready (attempt ${i}/30), retrying in 5s..."
  sleep 5
done

# Apply any pending migrations after an image upgrade (no-ops otherwise).
kong migrations up
kong migrations finish

exec /docker-entrypoint.sh kong docker-start
