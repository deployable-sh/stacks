#!/bin/bash
set -e

# Seed settings.js (with adminAuth) once; flows and settings then live
# on the /data volume like any Node-RED install.
if [ ! -f /data/settings.js ]; then
  if [ -z "$NODERED_PASSWORD_HASH" ]; then
    echo "error: NODERED_PASSWORD_HASH is required (bcrypt; node-red admin hash-pw)" >&2
    exit 1
  fi
  sed -e "s|__USERNAME__|${NODERED_USERNAME:-admin}|" \
      -e "s|__PASSWORD_HASH__|${NODERED_PASSWORD_HASH}|" \
      /usr/src/node-red/settings.template.js > /data/settings.js
fi

exec npm --no-update-notifier --no-fund start --cache /data/.npm -- --userDir /data
