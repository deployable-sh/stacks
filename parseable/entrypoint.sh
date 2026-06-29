#!/bin/sh
set -e

# S3 mode if a bucket URL is configured, else local disk on the volume.
if [ -n "$P_S3_URL" ]; then
  exec /usr/bin/parseable s3-store
else
  exec /usr/bin/parseable local-store
fi
