# Forgejo Runner

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=forgejo-runner&type=stack)

A [Forgejo Actions](https://forgejo.org/docs/latest/admin/actions/)
runner in `host` mode - CI for your self-hosted Forgejo **or for
Codeberg**, with jobs running as shell steps in this container (no
Docker daemon needed). GitHub-Actions-compatible workflow syntax.

## On Miget

1. Create the runner in your Forgejo (or codeberg.org): Settings >
   Actions > Runners - copy its **UUID** and **token** (v12's declarative
   flow; the old `register` command is deprecated).
2. Create a Compose Stack pointing at this repo, path `forgejo-runner`,
   with **`RUNNER_UUID`**, **`RUNNER_TOKEN`**, and **`FORGEJO_URL`** -
   for the catalogue's forgejo template in the same project, that is
   `http://forgejo:5000`.
3. Target it in workflows: `runs-on: miget`.

Host-label notes: steps execute in this container - extend the
`Dockerfile` with node/python/go as your jobs require. No Docker daemon,
so `docker build` steps need kaniko/buildah. One runner can serve
multiple instances - add more entries under `server.connections` in the
generated `/data/config.yml`.

This completes the self-hosted forge story: `forgejo` (the forge) +
`forgejo-runner` (the CI) on one plan, with zero per-minute billing.
