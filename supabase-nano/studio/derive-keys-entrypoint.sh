#!/bin/sh
# Derive SUPABASE_ANON_KEY / SUPABASE_SERVICE_KEY as deterministic HS256 JWTs
# from JWT_SECRET -- byte-identical claims to the kong entrypoint's derivation,
# so every service in the stack computes the same two keys. Runs only when the
# keys are unset/empty (the Miget override empties them; plain docker compose
# with the base file keeps the demo defaults and never enters this branch).
set -e

if [ -n "$JWT_SECRET" ] && [ -z "$SUPABASE_ANON_KEY" ]; then
  eval "$(node -e '
const crypto = require("crypto");
const b64u = (s) => Buffer.from(s).toString("base64url");
const hdr = b64u(JSON.stringify({alg: "HS256", typ: "JWT"}));
for (const role of ["anon", "service_role"]) {
  const pay = b64u(JSON.stringify({role, iss: "supabase", iat: 1700000000, exp: 2000000000}));
  const sig = crypto.createHmac("sha256", process.env.JWT_SECRET)
    .update(hdr + "." + pay).digest("base64url");
  const name = role === "anon" ? "DERIVED_ANON" : "DERIVED_SERVICE";
  console.log(`${name}=${hdr}.${pay}.${sig}`);
}')"
  export SUPABASE_ANON_KEY="$DERIVED_ANON"
  export SUPABASE_SERVICE_KEY="$DERIVED_SERVICE"
  unset DERIVED_ANON DERIVED_SERVICE
fi

exec "$@"
