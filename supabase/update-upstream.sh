#!/bin/sh
# Re-vendor the pinned upstream Supabase docker files. Review the diff of
# upstream-docker-compose.yml afterwards and re-apply the adaptation
# (see compose.yaml header) if services/env changed.
set -e
BASE=https://raw.githubusercontent.com/supabase/supabase/master/docker
curl -sfo upstream-docker-compose.yml $BASE/docker-compose.yml
curl -sfo .env.upstream-example $BASE/.env.example
curl -sfo kong/kong.yml $BASE/volumes/api/kong.yml
curl -sfo kong/kong-entrypoint.sh $BASE/volumes/api/kong-entrypoint.sh
sed -i'' 's/realtime-dev\.supabase-realtime/realtime/g' kong/kong.yml
for f in realtime.sql webhooks.sql roles.sql jwt.sql _supabase.sql logs.sql pooler.sql; do
  curl -sfo db/$f $BASE/volumes/db/$f
done
echo "vendored; diff upstream-docker-compose.yml against compose.yaml"
