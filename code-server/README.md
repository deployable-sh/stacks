# code-server

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=code-server&type=stack)

[code-server](https://github.com/coder/code-server) - VS Code in the
browser: a persistent cloud development environment with your extensions,
terminal, and a 10 GB home volume, reachable from any device.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `code-server`. One
required variable: **`PASSWORD`** (browser login). Open the app's domain,
log in, clone your repos into `/home/coder` - everything there survives
redeploys (settings and extensions live in the home volume too).

Pairs naturally with the catalogue's `agent-box` (Claude Code + opencode
in a terminal): same idea, IDE versus terminal. Extensions install from
the Open VSX registry (code-server's marketplace).

Language servers and builds run inside this container - bump RAM in
`compose.miget.yaml` for heavy toolchains. Keep `replicas` at 1.
