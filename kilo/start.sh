#!/bin/sh
set -e
: "${KILO_SERVER_PASSWORD:?KILO_SERVER_PASSWORD is required}"
exec kilo serve --hostname 0.0.0.0 --port 5000
