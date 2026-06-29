FROM pgvector/pgvector:pg16
# Enable the pgvector extension on first DB init - Letta's migrations use the
# `vector` type immediately and do not create the extension themselves.
COPY init.sql /docker-entrypoint-initdb.d/10-vector.sql
