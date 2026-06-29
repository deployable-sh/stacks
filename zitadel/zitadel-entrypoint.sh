#!/bin/busybox sh
export ZITADEL_MASTERKEY="$(/bin/busybox printf %s "$ZITADEL_MASTERKEY" | /bin/busybox cut -c1-32)"
exec /app/zitadel "$@"
