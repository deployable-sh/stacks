FROM supabase/postgres:15.8.1.085
# Upstream ships these as bind mounts; the platform has no bind mounts, so
# they are baked at the exact upstream paths (init-scripts run as superuser
# before migrations).
COPY _supabase.sql /docker-entrypoint-initdb.d/migrations/97-_supabase.sql
COPY webhooks.sql  /docker-entrypoint-initdb.d/init-scripts/98-webhooks.sql
COPY roles.sql     /docker-entrypoint-initdb.d/init-scripts/99-roles.sql
COPY jwt.sql       /docker-entrypoint-initdb.d/init-scripts/99-jwt.sql
COPY logs.sql      /docker-entrypoint-initdb.d/migrations/99-logs.sql
# Nano sizing baked as CMD (compose command: overrides do not reach Miget
# per-app deploys): small shared_buffers and a low connection cap keep
# Postgres inside a 192 MiB allocation. compose.yaml mirrors these flags
# so local runs behave identically.
CMD ["postgres", \
     "-c", "config_file=/etc/postgresql/postgresql.conf", \
     "-c", "data_directory=/var/lib/postgresql/data/pgdata", \
     "-c", "log_min_messages=fatal", \
     "-c", "shared_buffers=64MB", \
     "-c", "max_connections=40", \
     "-c", "maintenance_work_mem=32MB"]
