# Thin wrapper over the Dawarich image.
#
# Why a wrapper: one image runs in two roles (web + Sidekiq worker), each
# started by a different entrypoint script, and the web server's port is
# passed as a start argument - none of which a compose `command:` can carry
# to Miget per-app deploys. This wrapper branches on DAWARICH_ROLE and
# starts the right process (web binds port 5000).
FROM freikin/dawarich:1.8.1

COPY role-entrypoint.sh /usr/local/bin/role-entrypoint.sh
RUN chmod +x /usr/local/bin/role-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/role-entrypoint.sh"]
