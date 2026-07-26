# Bakes the pooler config upstream bind-mounts at /etc/pooler/pooler.exs
# (Miget has no bind mounts); supavisor's command reads it at boot.
FROM supabase/supavisor:2.9.5
COPY pooler.exs /etc/pooler/pooler.exs
