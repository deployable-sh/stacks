# Thin wrapper over the official Redis image.
#
# Why: Redis takes its password as a server argument, not an env var, and
# the secret should be read from the environment at runtime (not baked or
# compose-interpolated). The shell expands $REDIS_PASSWORD at start.
# Append-only persistence is on so the data volume survives restarts.
FROM redis:8-alpine

CMD ["sh", "-c", "exec redis-server --requirepass \"$REDIS_PASSWORD\" --appendonly yes"]
