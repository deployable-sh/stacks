FROM node:22-bookworm

# Miget derives app service ports from the image's EXPOSE list, and the
# ingress targets 5000.
EXPOSE 5000

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ripgrep curl ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g @kilocode/cli

COPY start.sh /usr/local/bin/start.sh
RUN chmod 755 /usr/local/bin/start.sh

WORKDIR /workspace
ENTRYPOINT ["/usr/local/bin/start.sh"]
