# Thin wrapper over the official CNCF Distribution registry.
#
# Why a wrapper: Miget configures images through environment variables
# only (a compose `command:` does not reach per-app deploys), and the
# stock image ships a filesystem-storage config.yml that conflicts if you
# also pass S3 settings. The entrypoint below writes a clean config.yml
# from env at boot - filesystem when no S3 vars are set, S3 (Miget
# Buckets) when they are - and builds an htpasswd file from
# REGISTRY_AUTH_USER / REGISTRY_AUTH_PASSWORD so the registry is never
# left open.
FROM registry:3.0.0

# htpasswd (bcrypt) for generating credentials at start.
RUN apk add --no-cache apache2-utils

COPY entrypoint.sh /usr/local/bin/miget-entrypoint.sh
RUN chmod +x /usr/local/bin/miget-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/miget-entrypoint.sh"]
