FROM clickhouse/clickhouse-server:24.8

# Baked cluster topology (embedded Keeper + remote_servers + macros);
# per-node identity comes from KEEPER_ID / REPLICA_NAME env at runtime.
COPY cluster.xml /etc/clickhouse-server/config.d/cluster.xml

# Miget derives app service ports from the image's EXPOSE list: HTTP,
# native, Keeper client, Keeper Raft.
EXPOSE 8123 9000 9181 9234
