# Jenkins

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=jenkins&type=stack)

[Jenkins](https://www.jenkins.io) LTS - the automation server: pipelines
as code, 1,800+ plugins, and webhooks from every forge. Controller with
the built-in node, which runs jobs in-controller - the honest shape for
small teams on a PaaS.

## Local

```bash
docker compose up -d
open http://localhost:5000
docker compose exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## On Miget

Create a Compose Stack pointing at this repo, path `jenkins` - no
variables. First visit asks for the initial admin password: open the
app's shell (or logs) and read
`/var/jenkins_home/secrets/initialAdminPassword`, then run the setup
wizard (suggested plugins are fine). Everything - config, plugins, jobs,
history - lives on the `jenkins_home` volume.

Build notes for a PaaS:

- Jobs run on the built-in node inside this container: `sh` steps, any
  toolchain you install (Manage Jenkins > Tools, or a derived image).
- **No Docker socket**: `docker build` inside jobs will not work - build
  images with kaniko/buildah-style rootless tools, or push to a registry
  with native builders.
- Outgrowing the built-in node? Run `jenkins/inbound-agent` as a separate
  app in the project, pointed at this controller (`-url http://jenkins:5000`)
  with a node secret from the UI - agents scale independently of the
  controller.

Webhooks from GitHub/Forgejo/GitLab reach the public domain; the
catalogue's `forgejo` template pairs naturally. Bump `JAVA_OPTS`/RAM
together if you raise the plan.
