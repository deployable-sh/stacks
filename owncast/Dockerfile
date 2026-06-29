# Thin wrapper over the official Owncast image.
#
# Why a wrapper: Owncast sets its web port with the `-webserverport` flag,
# and a compose `command:` does not reach per-app deploys on Miget. Baking
# the flag into the entrypoint pins the HTTP server to port 5000 (Miget's
# public port) while leaving RTMP ingest on 1935.
FROM owncast/owncast:0.2.5

WORKDIR /app
ENTRYPOINT ["./owncast", "-webserverport", "5000", "-rtmpport", "1935"]
