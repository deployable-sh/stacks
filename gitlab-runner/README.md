# GitLab Runner

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=gitlab-runner&type=stack)

A self-hosted [GitLab Runner](https://docs.gitlab.com/runner/) in shell
mode: jobs run inside this container, your own compute, no CI-minute
quota. Registers itself on first boot and persists registration on a
volume.

## On Miget

1. In GitLab: Settings > CI/CD > Runners > **New runner** (tags and
   run-untagged are configured there) - copy the `glrt-...` token.
2. Create a Compose Stack pointing at this repo, path `gitlab-runner`,
   with **`CI_SERVER_TOKEN`** (and `CI_SERVER_URL` for self-managed).
3. Jobs target it via the tags you chose.

## Shell-executor notes

- Jobs execute in this container as the `gitlab-runner` user: bash, git,
  and whatever you add to the `Dockerfile` (node, python, go, ...).
- No Docker daemon: `docker build` in jobs will not work - use kaniko or
  buildah (rootless) for images. The docker *executor* is likewise not an
  option here; shell mode is the supported socket-less path.
- Trust model: shell jobs share the container - use this runner for
  projects whose committers you trust (GitLab's own guidance).

Hosted comparison: gitlab.com includes 400 compute minutes on Free
(10,000 on Premium) and sells extra minutes at $10 per 1,000. Jobs on
this runner consume zero quota.
