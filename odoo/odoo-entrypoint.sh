#!/bin/bash
set -e

CONF=/var/lib/odoo/odoo.conf
cat > "$CONF" <<EOF
[options]
admin_passwd = ${ODOO_ADMIN_PASSWORD}
http_port = 5000
workers = 0
list_db = ${ODOO_LIST_DB:-True}
proxy_mode = True
db_host = ${HOST}
db_port = ${DB_PORT:-5432}
db_user = ${USER}
db_password = ${PASSWORD}
db_name = ${DB_NAME}
EOF
export ODOO_RC="$CONF"
unset PORT

if [ -n "$DB_NAME" ] && ! PGPASSWORD="$PASSWORD" psql -h "$HOST" -p "${DB_PORT:-5432}" -U "$USER" -d "$DB_NAME" -tAc "SELECT 1 FROM ir_module_module LIMIT 1" >/dev/null 2>&1; then
  odoo -i base --without-demo=all --stop-after-init
fi

exec /entrypoint.sh "$@"
