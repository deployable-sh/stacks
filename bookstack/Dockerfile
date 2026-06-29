# Thin wrapper over the LinuxServer BookStack image.
#
# Why a wrapper: the image's nginx listens on port 80, baked into the
# config template - there is no env var for it, and a compose `command:`
# does not reach Miget per-app deploys. This patches the nginx site
# template so the first-boot config listens on port 5000 (Miget's public
# port). The 443 listener is left as-is (LinuxServer auto-generates a
# self-signed cert); Miget only routes to 5000.
FROM lscr.io/linuxserver/bookstack:26.05.1

RUN sed -i \
      -e 's/listen 80 default_server;/listen 5000 default_server;/' \
      -e 's/listen \[::\]:80 default_server;/listen [::]:5000 default_server;/' \
      /defaults/nginx/site-confs/default.conf.sample

EXPOSE 5000
