FROM dxflrs/garage:v2.3.0
# Garage configures via TOML (env covers secrets only) - baked config,
# single-node layout. Secrets ride GARAGE_RPC_SECRET / GARAGE_ADMIN_TOKEN.
COPY garage.toml /etc/garage.toml
