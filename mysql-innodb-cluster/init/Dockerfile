# One-shot init that forms the Group Replication group via the MySQL
# client (already present in the mysql image). Runs once and exits.
FROM mysql:8.4

COPY init.sh /usr/local/bin/gr-init.sh
RUN chmod +x /usr/local/bin/gr-init.sh

ENTRYPOINT ["/usr/local/bin/gr-init.sh"]
