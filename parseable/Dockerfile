# parseable's image is distroless: no /bin/sh, so a shell entrypoint can't run
# (and `RUN` layers can't execute). Bring a static busybox shell so the thin
# store-selecting entrypoint works.
FROM busybox:1.37.0-musl AS sh

FROM parseable/parseable:v2.8.0
# Parseable startup is subcommand-driven (local-store | s3-store), which a
# compose `command:` cannot reach on per-app platform deploys - so a thin
# entrypoint picks the store based on whether P_S3_URL is set.
COPY --from=sh /bin/busybox /bin/sh
# Set the executable bit at COPY time (no shell available for `RUN chmod`).
COPY --chmod=0755 entrypoint.sh /usr/local/bin/parseable-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/parseable-entrypoint.sh"]
