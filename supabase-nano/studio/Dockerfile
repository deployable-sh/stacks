# Thin wrapper deriving per-deploy API keys from the generated JWT_SECRET
# (same pattern as ../kong). Keep the tag in sync with the base compose.
FROM supabase/studio:2026.06.03-sha-0bca601
COPY --chmod=755 derive-keys-entrypoint.sh /derive-keys-entrypoint.sh
ENTRYPOINT ["/derive-keys-entrypoint.sh", "docker-entrypoint.sh"]
# Changing ENTRYPOINT resets the inherited CMD; restore it.
CMD ["node", "apps/studio/server.js"]
