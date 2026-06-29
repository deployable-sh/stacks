# Beszel

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=beszel&type=stack)

[Beszel](https://beszel.dev) - a lightweight server monitoring hub: CPU,
memory, disk, network, temperatures, and Docker container stats, with
history and configurable alerts (email, webhooks, ntfy, and more). It is
a tiny Go binary embedding PocketBase (SQLite), so the hub idles in well
under 256 MB.

## Hub vs agent

This template deploys the **hub** - the dashboard and database. Monitoring
data comes from **agents** you install on the machines you actually want
to watch (your own VPS, bare-metal, or home server). An agent running
inside a Miget container would only see its own sandbox, not a real host,
so agents are **not** deployed here - install them where the workloads
run and point them at this hub.

## Why the wrapper

The hub's listen port is set only by the `--http` flag in the image's
CMD, with no env var. The thin `Dockerfile` overrides CMD to bind port
5000 while keeping the original entrypoint.

## Local

```bash
docker compose up -d --build
open http://localhost:5000      # create the admin account
```

## On Miget

Create a Compose Stack pointing at this repo, path `beszel`. After first
deploy set **`APP_URL`** to the app's https domain. Create the admin
account on first visit (claim it promptly). Then, in the UI, add a system
to get its install command and run that agent on the target machine - it
dials back to this hub.

Datadog and friends bill per host per month and meter retention; Beszel
is one tiny ~$5/month plan watching as many of your machines as you like,
with the data on your own infrastructure. MIT-licensed.
