# Thin wrapper over the official Valkey image for Cluster mode. One image
# is both a cluster node and the one-shot cluster-forming init, selected by
# VALKEY_ROLE. Nodes announce their service hostname so the cluster works
# with DNS rather than raw pod IPs.
FROM valkey/valkey:8-alpine

COPY entrypoint.sh /usr/local/bin/role-entrypoint.sh
RUN chmod +x /usr/local/bin/role-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/role-entrypoint.sh"]
