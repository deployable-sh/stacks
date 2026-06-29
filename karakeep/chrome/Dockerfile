# Thin wrapper over Zenika's headless Chromium image for Karakeep.
#
# Why: Karakeep talks to a headless Chrome over the remote-debugging port
# (9222) to crawl pages and take screenshots. That port is opened by
# command-line flags, and a compose `command:` does not reach Miget
# per-app deploys - so the flags are baked into CMD here. The base image's
# ENTRYPOINT is `chromium-browser --headless`, so these are appended.
FROM gcr.io/zenika-hub/alpine-chrome:124

CMD ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--remote-debugging-address=0.0.0.0", "--remote-debugging-port=9222", "--hide-scrollbars"]
