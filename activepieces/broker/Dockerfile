FROM valkey/valkey:8
# Activepieces queues jobs in BullMQ - eviction is forbidden.
CMD ["sh", "-c", "exec valkey-server --requirepass \"$AP_REDIS_PASSWORD\" --maxmemory-policy noeviction"]
