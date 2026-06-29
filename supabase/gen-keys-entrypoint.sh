#!/bin/sh
# Derive ANON_KEY and SERVICE_ROLE_KEY as deterministic HS256 JWTs signed with
# JWT_SECRET. Fixed claims => every service computes the identical token, so the
# keys match across the stack. Miget generates JWT_SECRET (a random string); it
# cannot produce a signed JWT, so we derive the two keys here at startup.
set -e

b64url() { base64 | tr '+/' '-_' | tr -d '=\n'; }

if [ -n "$JWT_SECRET" ]; then
  HDR=$(printf '%s' '{"alg":"HS256","typ":"JWT"}' | b64url)
  for role in anon service_role; do
    PAY=$(printf '%s' "{\"role\":\"$role\",\"iss\":\"supabase\",\"iat\":1700000000,\"exp\":2000000000}" | b64url)
    SIG=$(printf '%s' "$HDR.$PAY" | openssl dgst -binary -sha256 -hmac "$JWT_SECRET" | b64url)
    if [ "$role" = "anon" ]; then
      ANON_KEY="$HDR.$PAY.$SIG"
    else
      SERVICE_ROLE_KEY="$HDR.$PAY.$SIG"
    fi
  done
  export ANON_KEY SERVICE_ROLE_KEY
  export SERVICE_KEY="$SERVICE_ROLE_KEY"
  export SUPABASE_ANON_KEY="$ANON_KEY"
  export SUPABASE_SERVICE_KEY="$SERVICE_ROLE_KEY"
  export SUPABASE_SERVICE_ROLE_KEY="$SERVICE_ROLE_KEY"
fi

exec "$@"
