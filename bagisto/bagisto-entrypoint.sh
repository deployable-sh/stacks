#!/bin/bash
set -e

cd /var/www/bagisto

mkdir -p \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  storage/framework/testing \
  storage/logs \
  storage/app/public
rm -rf storage/lost+found 2>/dev/null || true
chown -R www-data:www-data storage 2>/dev/null || true

sed -i "s/^DB_HOST=.*/DB_HOST=${DB_HOST:-db}/" .env
sed -i "s/^DB_PORT=.*/DB_PORT=${DB_PORT:-3306}/" .env
sed -i "s/^DB_DATABASE=.*/DB_DATABASE=${DB_DATABASE}/" .env
sed -i "s/^DB_USERNAME=.*/DB_USERNAME=${DB_USERNAME}/" .env
sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=${DB_PASSWORD}/" .env
[ -n "$APP_URL" ] && sed -i "s|^APP_URL=.*|APP_URL=${APP_URL}|" .env

KEYFILE=storage/.app_key
case "$APP_KEY" in
  base64:*) ;;
  *)
    if [ -f "$KEYFILE" ]; then
      APP_KEY="$(cat "$KEYFILE")"
    else
      php artisan key:generate --force --no-interaction
      APP_KEY="$(grep '^APP_KEY=' .env | cut -d= -f2-)"
      echo "$APP_KEY" > "$KEYFILE"
    fi
    ;;
esac
export APP_KEY
sed -i "s|^APP_KEY=.*|APP_KEY=${APP_KEY}|" .env

(
  for i in $(seq 1 120); do
    php -r "try{new PDO('mysql:host=${DB_HOST:-db};port=${DB_PORT:-3306}','${DB_USERNAME}','${DB_PASSWORD}');}catch(Exception \$e){exit(1);}" 2>/dev/null && break
    sleep 2
  done
  php artisan migrate --force --no-interaction || true
  if [ ! -f storage/.bagisto-seeded ]; then
    php artisan db:seed --force --no-interaction && touch storage/.bagisto-seeded
  fi
  php artisan storage:link 2>/dev/null || true
  php artisan optimize --no-interaction 2>/dev/null || true
  chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true
) &

exec /usr/local/bin/entrypoint.sh "$@"
