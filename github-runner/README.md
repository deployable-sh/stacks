# GitHub Actions Runner

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=github-runner&type=stack)

A self-hosted [GitHub Actions runner](https://docs.github.com/en/actions/hosting-your-own-runners):
your workflows, your hardware, zero per-minute billing. Uses
[`myoung34/github-runner`](https://github.com/myoung34/docker-github-actions-runner)
(the de-facto env-driven runner image) with PAT-based auto-registration.

## On Miget

Create a Compose Stack pointing at this repo, path `github-runner`.
Required variables: **`ACCESS_TOKEN`** (PAT - `repo` scope for repo
runners, `admin:org` for org runners) and **`REPO_URL`** (or
`RUNNER_SCOPE=org` + `ORG_NAME`). The runner appears under Settings >
Actions > Runners; target it with `runs-on: [self-hosted, miget]`.

## What works (and what doesn't) without Docker

- Works: `run:` steps, JavaScript and composite actions, `setup-*`
  toolchain actions, artifact upload/download, caches.
- Does not work: `container:` jobs, `services:` blocks, and Docker
  container actions - there is no Docker daemon in a PaaS container.
  Build images inside jobs with kaniko or buildah (rootless), or let
  Miget build from your repos directly.

Toolchains: the runner image is Ubuntu-based; install what jobs need in a
derived image, or use `setup-node`/`setup-python` style actions per job.

Scale-out: this is the one runner template where `replicas` make sense
with `EPHEMERAL=true` - each replica registers itself and takes one job
at a time. Hosted comparison: GitHub charges $0.006/min for Linux 2-core
runners past the included quota; this runner's minutes are free forever.
