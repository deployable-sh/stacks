FROM mariadb:11.8
# Bootstrap-once wrapper for node 1: --wsrep-new-cluster must fire ONLY
# on the very first boot (empty datadir). A permanent flag would trip
# Galera's safe_to_bootstrap guard and crash-loop on every restart.
COPY galera-entrypoint.sh /usr/local/bin/galera-entrypoint.sh
RUN chmod +x /usr/local/bin/galera-entrypoint.sh
ENTRYPOINT ["galera-entrypoint.sh"]
