#!/bin/sh
# Build config.yml and htpasswd from environment, then start the registry.
set -e

AUTH_DIR=/auth
CONFIG=/etc/distribution/config.yml
mkdir -p "$AUTH_DIR" "$(dirname "$CONFIG")"

# --- credentials -----------------------------------------------------------
AUTH_BLOCK=""
if [ -n "$REGISTRY_AUTH_USER" ] && [ -n "$REGISTRY_AUTH_PASSWORD" ]; then
  htpasswd -Bbn "$REGISTRY_AUTH_USER" "$REGISTRY_AUTH_PASSWORD" > "$AUTH_DIR/htpasswd"
  AUTH_BLOCK="auth:
  htpasswd:
    realm: ${REGISTRY_AUTH_REALM:-Registry}
    path: $AUTH_DIR/htpasswd"
else
  echo "WARNING: REGISTRY_AUTH_USER / REGISTRY_AUTH_PASSWORD not set - registry is OPEN." >&2
fi

# --- storage ---------------------------------------------------------------
if [ -n "$REGISTRY_STORAGE_S3_BUCKET" ]; then
  STORAGE_BLOCK="  s3:
    region: ${REGISTRY_STORAGE_S3_REGION:-auto}
    regionendpoint: ${REGISTRY_STORAGE_S3_REGIONENDPOINT}
    bucket: ${REGISTRY_STORAGE_S3_BUCKET}
    accesskey: ${REGISTRY_STORAGE_S3_ACCESSKEY}
    secretkey: ${REGISTRY_STORAGE_S3_SECRETKEY}
    forcepathstyle: ${REGISTRY_STORAGE_S3_FORCEPATHSTYLE:-true}
    rootdirectory: ${REGISTRY_STORAGE_S3_ROOTDIRECTORY:-/}"
else
  STORAGE_BLOCK="  filesystem:
    rootdirectory: /var/lib/registry"
fi

cat > "$CONFIG" <<EOF
version: 0.1
log:
  fields:
    service: registry
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
storage:
  delete:
    enabled: true
$STORAGE_BLOCK
$AUTH_BLOCK
EOF

# The registry binary reads REGISTRY_* env vars as native config overrides, so
# our auth HELPER vars (REGISTRY_AUTH_USER/PASSWORD/REALM) collide with the
# expected auth map ("cannot unmarshal str into configuration.Parameters").
# Drop them now that htpasswd is built; config.yml carries the real settings.
unset REGISTRY_AUTH_USER REGISTRY_AUTH_PASSWORD REGISTRY_AUTH_REALM

exec registry serve "$CONFIG"
