FROM kong:3.9

# Miget derives app service ports from the image's EXPOSE list (compose
# `ports:` are not propagated), so the proxy (5000) and Kong Manager (8002)
# listeners must be declared here; 8001 is already exposed by the base image.
EXPOSE 5000 8002

# DB-backed Kong needs `kong migrations bootstrap` before first start, 
# normally a one-shot compose service, but the platform has no job
# semantics, so the (idempotent) migrations run in the entrypoint instead.
USER root
COPY start-kong.sh /usr/local/bin/start-kong.sh
RUN chmod 755 /usr/local/bin/start-kong.sh
USER kong

ENTRYPOINT ["/usr/local/bin/start-kong.sh"]
