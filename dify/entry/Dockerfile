FROM nginx:1.27-alpine
# Miget derives app service ports from the image's EXPOSE list.
EXPOSE 5000
COPY proxy-common.conf /etc/nginx/proxy-common.conf
COPY default.conf /etc/nginx/conf.d/default.conf
