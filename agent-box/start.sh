#!/bin/sh
set -e
: "${TTYD_PASSWORD:?TTYD_PASSWORD is required}"

# One shared tmux session: reconnecting from the browser resumes exactly
# where the agent left off instead of starting a fresh shell.
exec ttyd -p 5000 -W \
  -c "${TTYD_USERNAME:-agent}:${TTYD_PASSWORD}" \
  tmux new -A -s main
