FROM valkey/valkey:8
# Cache role: bounded memory with LRU eviction (Open Mercato's CACHE_*
# uses this purely as a cache; durable state lives in Postgres).
CMD ["valkey-server", "--maxmemory", "384mb", "--maxmemory-policy", "allkeys-lru"]
