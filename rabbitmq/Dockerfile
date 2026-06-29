FROM rabbitmq:4.1-management

# Baked cluster config: classic-config peer discovery (rabbit@rmq-1/2/3),
# management UI on 5000 (the only port Miget's ingress may reach).
COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

# Shared Erlang cookie, nodes can only cluster with an identical cookie.
# Baked into the image (NOT the data volume, which is mounted at
# /var/lib/rabbitmq/mnesia so it never shadows this file).
# Regenerate before real use: openssl rand -hex 24 > erlang.cookie
COPY erlang.cookie /var/lib/rabbitmq/.erlang.cookie
USER root
# Also pre-create + own the mnesia dir so the (root-owned) named volume mounted
# there inherits rabbitmq ownership - otherwise Ra "could not create its data
# directory" on first boot.
RUN chown rabbitmq:rabbitmq /var/lib/rabbitmq/.erlang.cookie \
    && chmod 600 /var/lib/rabbitmq/.erlang.cookie \
    && mkdir -p /var/lib/rabbitmq/mnesia \
    && chown -R rabbitmq:rabbitmq /var/lib/rabbitmq/mnesia
USER rabbitmq
