# Thin wrapper over the official Beszel hub image.
#
# Why a wrapper: the hub's listen port is set only by the `--http` flag in
# the image's CMD (there is no env var for it), and a compose `command:`
# does not reach Miget per-app deploys. Overriding CMD here pins it to port
# 5000 while keeping the inherited ENTRYPOINT (/beszel).
FROM henrygd/beszel:0.18.7

CMD ["serve", "--http=0.0.0.0:5000"]
