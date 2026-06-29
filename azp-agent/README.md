# Azure Pipelines Agent

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=azp-agent&type=stack)

A self-hosted [Azure Pipelines agent](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/docker)
(Azure DevOps), built from Microsoft's official Dockerfile recipe - the
agent ships no container image, this is the documented path. The agent
downloads itself from your org on first boot, registers into a pool, and
runs jobs in-container.

## On Miget

Create a Compose Stack pointing at this repo, path `azp-agent`. Required
variables: **`AZP_URL`** (https://dev.azure.com/your-org) and
**`AZP_TOKEN`** (PAT with *Agent Pools - read & manage* scope). The agent
appears in your pool (default `Default`); target it in YAML pipelines
with `pool: Default`.

Notes:

- Script, checkout, and task steps run in this container - extend the
  `Dockerfile` with the toolchains your pipelines need.
- No Docker daemon: container jobs and Docker tasks need hosted agents
  or rootless builders (kaniko/buildah) instead.
- The agent deregisters cleanly on shutdown (trap in start.sh) and
  re-registers on the next boot with `--replace`.

The economics: Microsoft-hosted parallel jobs cost $40/month each;
self-hosted parallel jobs are $15/month (first one free) with unlimited
minutes - and this agent's compute is already inside your flat plan.
