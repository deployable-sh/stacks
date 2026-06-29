# Thin wrapper over the official Redis image for a Sentinel HA topology.
# One image plays master, replica, or sentinel based on REDIS_ROLE; the
# entrypoint builds the right command/config from environment variables.
FROM redis:8-alpine

COPY entrypoint.sh /usr/local/bin/role-entrypoint.sh
RUN chmod +x /usr/local/bin/role-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/role-entrypoint.sh"]
