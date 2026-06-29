FROM webkul/bagisto:2.4.6

RUN sed -i 's/80 default_server/5000 default_server/g' /etc/nginx/conf.d/bagisto.conf

COPY bagisto-entrypoint.sh /usr/local/bin/bagisto-entrypoint.sh
RUN chmod +x /usr/local/bin/bagisto-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/bagisto-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
