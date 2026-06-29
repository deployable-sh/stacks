# Thin wrapper over ClickHouse for Plausible.
#
# Why: Plausible's official compose mounts four ClickHouse config files and
# a compose volume-mount/`command:` does not reach Miget per-app deploys -
# so the configs are baked into the image. They cap ClickHouse's resource
# use (it assumes a big box by default), disable noisy logs, and make it
# listen on all interfaces so the Plausible app can reach it.
FROM clickhouse/clickhouse-server:24.12-alpine

COPY logs.xml ipv4-only.xml low-resources.xml /etc/clickhouse-server/config.d/
COPY default-profile-low-resources-overrides.xml /etc/clickhouse-server/users.d/
