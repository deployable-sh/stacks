# Thin wrapper over the official Valkey image.
#
# Why: Valkey takes its password as a server argument, not an env var, and
# the secret should be read from the environment at runtime. The shell
# expands $VALKEY_PASSWORD at start. Append-only persistence is on so the
# data volume survives restarts.
FROM valkey/valkey:8-alpine

CMD ["sh", "-c", "exec valkey-server --requirepass \"$VALKEY_PASSWORD\" --appendonly yes"]
