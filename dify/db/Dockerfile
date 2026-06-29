FROM postgres:15-alpine
# The plugin daemon uses its own database alongside the api's - created
# at first init (baked, since bind mounts are not portable to platforms).
COPY 01-plugin-db.sql /docker-entrypoint-initdb.d/01-plugin-db.sql
