# Thin wrapper over the official Valkey image for a Sentinel HA topology.
# One image plays master, replica, or sentinel based on VALKEY_ROLE; the
# entrypoint builds the right command/config from environment variables.
FROM valkey/valkey:8-alpine

COPY entrypoint.sh /usr/local/bin/role-entrypoint.sh
RUN chmod +x /usr/local/bin/role-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/role-entrypoint.sh"]
