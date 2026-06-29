FROM valkey/valkey:8
# Celery broker + caches for Superset - queues must not evict.
CMD ["sh", "-c", "exec valkey-server --requirepass \"$REDIS_AUTH\" --maxmemory-policy noeviction"]
