FROM valkey/valkey:8
# Langfuse queues jobs in here - eviction would lose events, so the policy
# is pinned to noeviction. Password comes from REDIS_AUTH at runtime.
CMD ["sh", "-c", "exec valkey-server --requirepass \"$REDIS_AUTH\" --maxmemory-policy noeviction"]
