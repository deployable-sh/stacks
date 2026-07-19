#!/bin/sh
# Submit the deployed sitemap to IndexNow (Bing, Yandex, Seznam, Naver;
# Perplexity rides on Bing). Meant to run as a Miget cronjob using the site
# image: it reads the sitemaps baked into the image - no network fetch of the
# site itself - and POSTs every URL. The key is public by design; the key file
# served from the site root is the authentication.
set -eu

KEY="${INDEXNOW_KEY:-a8aeec412745d412f048f43f5c70970d}"
SITE_URL="${SITE_URL:-https://deployable.sh}"
HOST="${SITE_URL#https://}"; HOST="${HOST#http://}"; HOST="${HOST%%/*}"
DIR="${SITEMAP_DIR:-/usr/share/nginx/html}"

urls=$(grep -ho '<loc>[^<]*</loc>' "$DIR"/sitemap-*.xml | sed 's/<[^>]*>//g' | grep -v '\.xml$' | sort -u)
[ -n "$urls" ] || { echo "[indexnow] no URLs found in $DIR"; exit 1; }
count=$(echo "$urls" | wc -l | tr -d ' ')
list=$(echo "$urls" | sed 's/.*/"&"/' | paste -sd, -)
body="{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"$SITE_URL/$KEY.txt\",\"urlList\":[$list]}"

echo "[indexnow] submitting $count URL(s) as $HOST (key ${KEY%??????????????????????????}...)"
code=$(curl -s -o /tmp/indexnow-resp -w '%{http_code}' \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data "$body" https://api.indexnow.org/indexnow)
resp=$(cat /tmp/indexnow-resp 2>/dev/null || true)
echo "[indexnow] HTTP $code${resp:+ - $resp}"
case "$code" in 200|202) exit 0 ;; *) exit 1 ;; esac
