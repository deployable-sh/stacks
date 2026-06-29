# Azure Pipelines self-hosted agent - Microsoft's official Dockerfile
# recipe (the agent has no published image; this is the documented way).
FROM ubuntu:24.04

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates git jq libicu74 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /azp/

COPY start.sh ./
RUN chmod +x start.sh && \
    useradd -m -d /home/agent agent && \
    chown -R agent:agent /azp /home/agent

USER agent

ENTRYPOINT ["./start.sh"]
