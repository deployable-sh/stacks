FROM grafana/grafana-oss:latest
# Pre-provision the in-stack datasources (file-based provisioning is the
# only mechanism; env interpolation works inside the file if needed).
COPY datasources.yaml /etc/grafana/provisioning/datasources/datasources.yaml
