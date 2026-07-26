FROM kong/kong:3.9.1
# Upstream bind-mounts these; baked instead. The entrypoint evals env vars
# (ANON key, dashboard basic auth) into the declarative config at start.
EXPOSE 5000
USER root
COPY kong.yml /home/kong/temp.yml
COPY kong-entrypoint.sh /home/kong/kong-entrypoint.sh
RUN chmod 755 /home/kong/kong-entrypoint.sh && chown -R kong /home/kong
USER kong
ENTRYPOINT ["/home/kong/kong-entrypoint.sh"]
