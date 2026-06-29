FROM valkey/valkey:8
# Celery queues - eviction is forbidden.
CMD ["sh", "-c", "exec valkey-server --requirepass \"$REDIS_AUTH\" --maxmemory-policy noeviction"]
