# Thin wrapper: bakes supabase's default functions (main dispatcher + hello
# example, from the upstream repo) and seeds them into the shared RWX volume
# on first boot, since Miget has no host bind mounts. Keep the tag in sync
# with the base compose.
FROM supabase/edge-runtime:v1.74.0
COPY main  /opt/seed-functions/main
COPY hello /opt/seed-functions/hello
COPY --chmod=755 seed-entrypoint.sh /seed-entrypoint.sh
ENTRYPOINT ["/seed-entrypoint.sh"]
