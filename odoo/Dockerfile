FROM odoo:18
# Odoo's master password (admin_passwd) and HTTP port live in odoo.conf,
# not env. This wrapper writes a conf from env at boot (so the master
# password stays a secret) and keeps Odoo in threaded mode on :5000 -
# which serves websockets/livechat on the same port (no 8072 split).
USER root
COPY odoo-entrypoint.sh /usr/local/bin/odoo-entrypoint.sh
RUN chmod +x /usr/local/bin/odoo-entrypoint.sh
USER odoo
ENTRYPOINT ["/usr/local/bin/odoo-entrypoint.sh"]
CMD ["odoo"]
