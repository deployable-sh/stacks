#!/bin/sh
# Derive ANON_KEY / SERVICE_ROLE_KEY as deterministic HS256 JWTs signed with
# JWT_SECRET - the same derivation the kong-based supabase stacks perform.
# Miget generates JWT_SECRET (random) but cannot produce a signed JWT, so the
# API keys are derived here. Fixed claims => deterministic => every service
# that derives the same way gets identical keys.
set -e

b64url() { base64 | tr '+/' '-_' | tr -d '=\n'; }

if [ -n "$JWT_SECRET" ] && [ -z "$ANON_KEY" ]; then
  hdr=$(printf '%s' '{"alg":"HS256","typ":"JWT"}' | b64url)
  for role in anon service_role; do
    pay=$(printf '%s' "{\"role\":\"$role\",\"iss\":\"supabase\",\"iat\":1700000000,\"exp\":2000000000}" | b64url)
    sig=$(printf '%s' "$hdr.$pay" | openssl dgst -binary -sha256 -hmac "$JWT_SECRET" | b64url)
    if [ "$role" = "anon" ]; then
      export ANON_KEY="$hdr.$pay.$sig"
    else
      export SERVICE_ROLE_KEY="$hdr.$pay.$sig"
    fi
  done
fi

# Empty keys must never reach the config: an empty string in the apikey map
# would turn "no apikey header" into a valid credential.
: "${ANON_KEY:?ANON_KEY missing and JWT_SECRET not set - cannot derive API keys}"
: "${SERVICE_ROLE_KEY:?SERVICE_ROLE_KEY missing and JWT_SECRET not set - cannot derive API keys}"

# Hand over to the stock nginx entrypoint (it envsubsts /etc/nginx/templates).
exec /docker-entrypoint.sh "$@"
