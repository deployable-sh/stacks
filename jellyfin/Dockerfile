# Thin wrapper over the official Jellyfin image.
#
# Why a wrapper: Jellyfin's HTTP listen port comes from InternalHttpPort in
# network.xml - there is NO env var or CLI flag for it (ASPNETCORE_URLS is
# ignored), and a compose `command:` does not reach Miget per-app deploys.
# The entrypoint below seeds network.xml with port 5000 on first boot
# (write-if-missing, so it never clobbers settings you change later), then
# hands off to the real Jellyfin binary.
FROM jellyfin/jellyfin:10.11.11

COPY entrypoint.sh /usr/local/bin/miget-entrypoint.sh
RUN chmod +x /usr/local/bin/miget-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/miget-entrypoint.sh"]
