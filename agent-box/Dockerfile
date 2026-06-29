FROM node:22-bookworm

# Miget derives app service ports from the image's EXPOSE list, and the
# ingress targets 5000, ttyd must listen there.
EXPOSE 5000

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       tmux git ripgrep jq curl ca-certificates openssh-client \
    && rm -rf /var/lib/apt/lists/*

# ttyd has no apt package on Debian bookworm ("no installation candidate"),
# so install the static release binary for the build arch.
RUN arch="$(dpkg --print-architecture)" \
    && case "$arch" in \
         amd64) t=x86_64 ;; \
         arm64) t=aarch64 ;; \
         armhf) t=arm ;; \
         *) t=x86_64 ;; \
       esac \
    && curl -fsSL "https://github.com/tsl0922/ttyd/releases/download/1.7.7/ttyd.${t}" -o /usr/local/bin/ttyd \
    && chmod +x /usr/local/bin/ttyd \
    && ttyd --version

# The agents. Pin versions for reproducible boxes.
RUN npm install -g @anthropic-ai/claude-code opencode-ai @kilocode/cli

COPY start.sh /usr/local/bin/start.sh
RUN chmod 755 /usr/local/bin/start.sh

WORKDIR /workspace
ENTRYPOINT ["/usr/local/bin/start.sh"]
