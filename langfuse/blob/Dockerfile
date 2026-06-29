FROM minio/minio:RELEASE.2025-09-07T16-13-09Z
# Pre-create the `langfuse` bucket on the data volume, then serve S3 on
# :9000 (no console - the service is project-internal).
ENTRYPOINT ["sh", "-c", "mkdir -p /data/langfuse && exec minio server /data --address :9000"]
