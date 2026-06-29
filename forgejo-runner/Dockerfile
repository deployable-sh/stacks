FROM code.forgejo.org/forgejo/runner:12
USER root
# Host-label runner: jobs run in this container - add toolchains here.
COPY entrypoint.sh /usr/local/bin/runner-entrypoint.sh
RUN chmod +x /usr/local/bin/runner-entrypoint.sh
# The /data volume is written by the entrypoint (config.yml); make it owned by
# the runtime user so a fresh (root-owned) named volume inherits writable perms.
RUN mkdir -p /data && chown 1001:1001 /data
USER 1001
ENTRYPOINT ["/usr/local/bin/runner-entrypoint.sh"]
