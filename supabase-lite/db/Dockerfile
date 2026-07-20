FROM supabase/postgres:15.8.1.085
# Upstream ships these as bind mounts; the platform has no bind mounts, so
# they are baked at the exact upstream paths (init-scripts run as superuser
# before migrations).
COPY _supabase.sql /docker-entrypoint-initdb.d/migrations/97-_supabase.sql
COPY webhooks.sql  /docker-entrypoint-initdb.d/init-scripts/98-webhooks.sql
COPY roles.sql     /docker-entrypoint-initdb.d/init-scripts/99-roles.sql
COPY jwt.sql       /docker-entrypoint-initdb.d/init-scripts/99-jwt.sql
COPY logs.sql      /docker-entrypoint-initdb.d/migrations/99-logs.sql
