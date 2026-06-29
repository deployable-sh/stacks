FROM apache/superset:6.1.0-dev
# Dict/class config (Celery, caches) cannot be expressed as env vars -
# the officially documented pattern is a baked superset_config.py that
# reads the simple values from env.
COPY superset_config.py /app/superset_config.py
ENV SUPERSET_CONFIG_PATH=/app/superset_config.py
