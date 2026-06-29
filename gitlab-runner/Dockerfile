FROM gitlab/gitlab-runner:latest
# Shell-executor runner with register-on-first-boot. The stock image is
# minimal (bash, git, curl) - extend this Dockerfile with the toolchains
# your jobs need (node, python, build-essential, ...).
COPY entrypoint.sh /usr/local/bin/runner-entrypoint.sh
RUN chmod +x /usr/local/bin/runner-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/runner-entrypoint.sh"]
