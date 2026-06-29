FROM nginx:1.27-alpine
# Miget derives app service ports from the image's EXPOSE list.
EXPOSE 5000
# The stock nginx entrypoint envsubsts *.template with container env, 
# PROXY_TARGET picks the backend origin (3210 API or 3211 HTTP actions).
COPY default.conf.template /etc/nginx/templates/default.conf.template
