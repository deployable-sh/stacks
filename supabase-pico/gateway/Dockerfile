FROM nginx:1.29-alpine
# openssl CLI for deriving ANON_KEY / SERVICE_ROLE_KEY from JWT_SECRET
# (same derivation the kong stacks do in kong-entrypoint.sh).
RUN apk add --no-cache openssl && rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY supabase.conf.template /etc/nginx/templates/supabase.conf.template
COPY derive-keys.sh /derive-keys.sh
RUN chmod 755 /derive-keys.sh
EXPOSE 5000
ENTRYPOINT ["/derive-keys.sh"]
CMD ["nginx", "-g", "daemon off;"]
