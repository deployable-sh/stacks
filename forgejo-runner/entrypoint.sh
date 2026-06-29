#!/bin/sh
set -e

# Forgejo runner v12: registration is declarative - the server connection
# (url + uuid + token from the Forgejo/Codeberg UI) lives in config.yml.
# Generated once on the /data volume; jobs run with the `host` label
# (shell in this container - no docker daemon needed).
CONFIG=/data/config.yml

if [ ! -f "$CONFIG" ]; then
  cat > "$CONFIG" <<EOF
log:
  level: info
runner:
  file: /data/.runner
  capacity: ${RUNNER_CAPACITY:-1}
  labels:
    - "${RUNNER_LABELS:-miget:host}"
server:
  connections:
    - url: ${FORGEJO_URL:-https://codeberg.org}
      uuid: ${RUNNER_UUID}
      token: ${RUNNER_TOKEN}
EOF
fi

exec forgejo-runner daemon -c "$CONFIG"
