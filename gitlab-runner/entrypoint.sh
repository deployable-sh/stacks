#!/bin/bash
set -e

# Register once (config persists on the /etc/gitlab-runner volume).
# Uses the current runner-authentication-token flow (glrt-...); tags and
# run-untagged are configured server-side when you create the runner.
if [ ! -f /etc/gitlab-runner/config.toml ] || ! grep -q "token" /etc/gitlab-runner/config.toml; then
  gitlab-runner register \
    --non-interactive \
    --url "${CI_SERVER_URL:-https://gitlab.com}" \
    --token "${CI_SERVER_TOKEN}" \
    --executor shell \
    --shell bash
fi

exec gitlab-runner run --user=gitlab-runner --working-directory=/home/gitlab-runner
