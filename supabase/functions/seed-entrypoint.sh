#!/bin/sh
set -e
# Miget has no host bind mounts and the shared RWX volume mounts empty, while
# the edge-runtime image ships no functions. Seed the dispatcher + example on
# first boot so edge-runtime can start; later edits (Studio, git) land in the
# same shared volume and are preserved.
if [ ! -e /home/deno/functions/main/index.ts ]; then
  mkdir -p /home/deno/functions
  cp -R /opt/seed-functions/. /home/deno/functions/
fi
exec edge-runtime "$@"
