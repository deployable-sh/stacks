#!/bin/bash
set -e

# First boot ever (no grastate.dat): bootstrap a new cluster.
# Any later boot: plain start - the node rejoins via IST/SST.
if [ ! -f /var/lib/mysql/grastate.dat ]; then
  echo "galera: no grastate.dat - bootstrapping new cluster"
  exec docker-entrypoint.sh "$@" --wsrep-new-cluster
fi

exec docker-entrypoint.sh "$@"
