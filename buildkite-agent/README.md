# Buildkite Agent

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=buildkite-agent&type=stack)

A [Buildkite](https://buildkite.com/docs/agent/v3/docker) agent: Buildkite
hosts the UI and orchestration, your agents run the jobs - the hybrid-CI
model where compute was always meant to be yours. This is the cleanest
runner in the catalogue: official image, one token, done.

## On Miget

Create a Compose Stack pointing at this repo, path `buildkite-agent`.
One required variable: **`BUILDKITE_AGENT_TOKEN`** (Buildkite > Agents >
Reveal Agent Token). Target it in pipelines with `agents: queue: miget`.

Jobs run as shell commands in this container (`/buildkite/builds`).
Extend the image (`FROM buildkite/agent:3-ubuntu`) with your toolchains,
or use Buildkite plugins that do not require Docker. As everywhere on
the platform: no Docker daemon - image builds go through kaniko/buildah.

Scale by raising `replicas` - agents are independent and pull from the
queue. MIT-licensed agent; Buildkite's per-user SaaS pricing covers the
control plane, while the build minutes here are yours, unmetered.
