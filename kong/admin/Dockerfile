FROM nginx:1.27-alpine

# htpasswd, used by the entrypoint script to build the basic-auth file
# from ADMIN_USERNAME / ADMIN_PASSWORD at container start.
RUN apk add --no-cache apache2-utils

COPY default.conf /etc/nginx/conf.d/default.conf
COPY 10-htpasswd.sh /docker-entrypoint.d/10-htpasswd.sh
RUN chmod 755 /docker-entrypoint.d/10-htpasswd.sh
