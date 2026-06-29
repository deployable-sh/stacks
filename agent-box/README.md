# agent-box

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=agent-box&type=stack)

Remote AI coding agents on Miget: a persistent box with
[Claude Code](https://docs.anthropic.com/en/docs/claude-code),
[opencode](https://opencode.ai) and [Kilo CLI](https://kilo.ai) preinstalled, reachable from any browser as
a web terminal (ttyd + tmux) behind basic auth.

Why: kick off long agent runs from a laptop or phone, close the tab, and
reattach later, the tmux session keeps running on the platform, and
`/workspace` (10 GB volume) survives redeploys.

## Local

```bash
cp .env.example .env && docker compose up -d --build
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo. Required variables:
**`TTYD_PASSWORD`** (terminal basic auth) and **`ANTHROPIC_API_KEY`**
(used by both agents, billed to you). Then open the app's domain and:

```bash
cd /workspace && git clone https://github.com/you/your-repo && cd your-repo
claude          # or: opencode / kilo
```

## Notes

- The tmux session is shared: every browser tab attaches to the same
  session (`tmux new -A -s main`). Detach panes/windows as usual.
- Keep `replicas` at 1, one box, one session, one workspace.
- Agent CLIs update fast; rebuild the stack to pick up new versions, or
  pin versions in the Dockerfile for reproducible boxes.
- `git` auth: use a fine-grained PAT or add a deploy key from inside the
  box (`ssh-keygen` persists under /workspace only if you put it there).
