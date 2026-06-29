FROM postgres:16-alpine
# Temporal needs two databases (state + visibility). Create the second
# at first init (baked - bind mounts are not portable to platforms).
COPY 01-visibility-db.sql /docker-entrypoint-initdb.d/01-visibility-db.sql
