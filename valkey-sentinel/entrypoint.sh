#!/bin/sh
# One image, three roles (VALKEY_ROLE = master | replica | sentinel).
# Auth is OPTIONAL: set VALKEY_PASSWORD to require a password everywhere;
# leave it blank for a no-auth local run (the official image's default).
# When blank, the auth options are omitted entirely - emitting an empty
# `sentinel auth-pass mymaster` is a fatal config error.
# Replicas announce their own service name (VALKEY_ANNOUNCE_HOST) and
# sentinels resolve hostnames (service DNS) so failover works on a
# multi-pod network.
set -e

PASS="$VALKEY_PASSWORD"
MASTER_HOST="${VALKEY_MASTER_HOST:-valkey-master}"
QUORUM="${SENTINEL_QUORUM:-2}"
ANNOUNCE="${VALKEY_ANNOUNCE_HOST:-}"

case "${VALKEY_ROLE:-master}" in
  master)
    set -- valkey-server --appendonly yes
    [ -n "$PASS" ] && set -- "$@" --requirepass "$PASS" --masterauth "$PASS"
    [ -n "$ANNOUNCE" ] && set -- "$@" --replica-announce-ip "$ANNOUNCE"
    exec "$@"
    ;;
  replica)
    set -- valkey-server --replicaof "$MASTER_HOST" 6379 --appendonly yes
    [ -n "$PASS" ] && set -- "$@" --requirepass "$PASS" --masterauth "$PASS"
    [ -n "$ANNOUNCE" ] && set -- "$@" --replica-announce-ip "$ANNOUNCE"
    exec "$@"
    ;;
  sentinel)
    CONF=/tmp/sentinel.conf
    {
      echo "port 26379"
      echo "sentinel resolve-hostnames yes"
      echo "sentinel announce-hostnames yes"
      echo "sentinel monitor mymaster $MASTER_HOST 6379 $QUORUM"
      [ -n "$PASS" ] && echo "sentinel auth-pass mymaster $PASS"
      echo "sentinel down-after-milliseconds mymaster 5000"
      echo "sentinel failover-timeout mymaster 60000"
      echo "sentinel parallel-syncs mymaster 1"
    } > "$CONF"
    exec valkey-sentinel "$CONF"
    ;;
  *)
    echo "unknown VALKEY_ROLE: $VALKEY_ROLE" >&2; exit 1 ;;
esac
