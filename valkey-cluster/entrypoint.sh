#!/bin/sh
# One image, two roles (VALKEY_ROLE = node | init).
#  - node: a cluster-enabled Valkey that announces its own service hostname,
#    so clients (and redirects) use DNS names instead of raw pod IPs.
#  - init: waits for every node, then forms the cluster once (idempotent -
#    it checks cluster_state:ok first), 3 masters + 3 replicas.
# Auth is OPTIONAL: set VALKEY_PASSWORD to require a password; leave it
# blank for a no-auth local run. When blank the auth options and the
# valkey-cli -a flag are omitted (a blank password would otherwise error).
set -e

PASS="$VALKEY_PASSWORD"

case "${VALKEY_ROLE:-node}" in
  node)
    set -- valkey-server \
      --cluster-enabled yes \
      --cluster-config-file /data/nodes.conf \
      --cluster-node-timeout 5000 \
      --cluster-announce-hostname "$VALKEY_ANNOUNCE_HOST" \
      --cluster-preferred-endpoint-type hostname \
      --appendonly yes
    [ -n "$PASS" ] && set -- "$@" --requirepass "$PASS" --masterauth "$PASS"
    exec "$@"
    ;;
  init)
    NODES="$CLUSTER_NODES"
    AUTH=""
    [ -n "$PASS" ] && AUTH="-a $PASS"
    for n in $NODES; do
      h="${n%%:*}"
      until valkey-cli $AUTH -h "$h" ping 2>/dev/null | grep -q PONG; do
        echo "waiting for $h..."; sleep 2
      done
    done
    first="${NODES%% *}"; fh="${first%%:*}"
    if valkey-cli $AUTH -h "$fh" cluster info 2>/dev/null | grep -q 'cluster_state:ok'; then
      echo "cluster already formed - nothing to do"; exit 0
    fi
    echo "forming cluster: $NODES"
    exec valkey-cli $AUTH --cluster create $NODES --cluster-replicas 1 --cluster-yes
    ;;
  *)
    echo "unknown VALKEY_ROLE: $VALKEY_ROLE" >&2; exit 1 ;;
esac
