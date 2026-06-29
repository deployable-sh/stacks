FROM busybox:1.36-musl AS bb

FROM ghcr.io/zitadel/zitadel:v4.15.2
COPY --from=bb /bin/busybox /bin/busybox
COPY zitadel-entrypoint.sh /zitadel-entrypoint.sh
ENTRYPOINT ["/bin/busybox", "sh", "/zitadel-entrypoint.sh"]
CMD ["start-from-init", "--masterkeyFromEnv", "--tlsMode", "external"]
