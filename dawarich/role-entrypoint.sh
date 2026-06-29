#!/bin/sh
# Pick Dawarich's role from DAWARICH_ROLE and hand off to the image's own
# entrypoint script. The web role runs migrations (inside web-entrypoint.sh)
# then starts Puma on port 5000; the sidekiq role runs the worker.
set -e

if [ "${DAWARICH_ROLE:-web}" = "sidekiq" ]; then
  exec sh /var/app/docker/sidekiq-entrypoint.sh
else
  exec sh /var/app/docker/web-entrypoint.sh rails server -b 0.0.0.0 -p 5000
fi
