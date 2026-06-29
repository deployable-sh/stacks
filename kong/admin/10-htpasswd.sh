#!/bin/sh
# Generate the basic-auth credential file from env at container start.
set -e
: "${ADMIN_USERNAME:?ADMIN_USERNAME must be set}"
: "${ADMIN_PASSWORD:?ADMIN_PASSWORD must be set}"
htpasswd -bc /etc/nginx/.htpasswd "$ADMIN_USERNAME" "$ADMIN_PASSWORD"
