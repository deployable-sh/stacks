# Thin wrapper over the final OSS MinIO release.
#
# Why: Plane needs an S3 bucket to exist before it can store files, and a
# compose `command:` / one-shot init service does not translate cleanly to
# Miget's per-app model. MinIO represents a bucket as a top-level
# directory under its data dir, so creating that directory at boot creates
# the bucket - the same behaviour locally and on Miget, no init container.
FROM minio/minio:RELEASE.2025-09-07T16-13-09Z

ENTRYPOINT ["/bin/sh", "-c", "mkdir -p /data/${MINIO_BUCKET:-uploads} && exec minio server /data --console-address :9001"]
