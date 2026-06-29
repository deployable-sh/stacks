#!/bin/sh
# Seed network.xml so Jellyfin's HTTP server listens on port 5000, then
# start Jellyfin. Write-if-missing: only seeds on a fresh /config volume,
# so any port change you make later in the UI is preserved.
set -e

CONF_DIR=/config/config
NET_XML="$CONF_DIR/network.xml"

if [ ! -f "$NET_XML" ]; then
  mkdir -p "$CONF_DIR"
  cat > "$NET_XML" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<NetworkConfiguration xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <InternalHttpPort>5000</InternalHttpPort>
  <PublicHttpPort>5000</PublicHttpPort>
  <EnableHttps>false</EnableHttps>
  <RequireHttps>false</RequireHttps>
</NetworkConfiguration>
EOF
fi

exec /jellyfin/jellyfin "$@"
