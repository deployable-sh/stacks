FROM nodered/node-red:4.1
# A public Node-RED editor without auth = arbitrary code execution.
# This wrapper seeds /data/settings.js (bcrypt adminAuth from env) on
# first boot, so the editor is never exposed open.
USER root
COPY settings.js /usr/src/node-red/settings.template.js
COPY entrypoint.sh /usr/local/bin/nr-entrypoint.sh
RUN chmod +x /usr/local/bin/nr-entrypoint.sh && chown node-red:node-red /usr/src/node-red/settings.template.js
USER node-red
ENTRYPOINT ["/usr/local/bin/nr-entrypoint.sh"]
