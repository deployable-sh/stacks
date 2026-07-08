import type { AppBase } from './index';

export const agentBox: AppBase = {
  slug: 'agent-box',
  name: 'Agent Box',
  upstream: 'Claude Code + opencode + Kilo CLI',
  upstreamUrl: 'https://docs.anthropic.com/en/docs/claude-code',
  license: 'Mixed',
  licenseTier: 'mixed',
  licenseNote: 'bundles Claude Code (proprietary) + opencode (MIT) + Kilo CLI',
  tagline:
    'Claude Code, opencode, and Kilo CLI in a persistent web terminal - start agent runs from anywhere, close the tab, reattach later.',
  category: 'AI Agents',
  status: 'stable',
  seoTitle: 'Run Claude Code in the cloud: persistent web terminal (Agent Box)',
  seoDescription:
    'Deploy a persistent box with Claude Code, opencode, and Kilo CLI in a browser terminal (ttyd + tmux, basic auth). Kick off long agent runs from a laptop or phone and reattach anytime.',
  keywords: [
    'claude code in the cloud',
    'claude code remote server',
    'run claude code from phone',
    'persistent ai coding agent',
    'opencode server',
    'web terminal coding agent',
  ],
  intro: [
    'Coding agents got good enough that the bottleneck moved: your laptop has to stay open while they work. Agent Box moves the agent to the platform - a persistent container with Claude Code, opencode, and Kilo CLI preinstalled, reachable from any browser as a web terminal (ttyd + tmux) behind basic auth.',
    'The workflow it unlocks: kick off a long agent run from a laptop or phone, close the tab, and reattach later - the tmux session keeps running server-side, and the 10 GB /workspace volume survives redeploys. Clone your repos once; your agents and their context live there.',
    'Two variables - TTYD_PASSWORD for the terminal and ANTHROPIC_API_KEY for the agents (billed to you) - and you have a development box that never sleeps.',
  ],
  features: [
    'Claude Code, opencode, and Kilo CLI preinstalled and updated',
    'Browser terminal via ttyd - works from phones and tablets',
    'tmux sessions persist across disconnects: start, close tab, reattach',
    '10 GB /workspace volume survives redeploys',
    'Basic auth on the terminal; API key stays server-side',
    'git, gh, and the usual toolchain included',
  ],
  topology: [
    { service: 'agent-box', role: 'web terminal (ttyd + tmux) with agents inside', isPublic: 'yes (basic auth)' },
  ],
  requiredVars: [
    { name: 'TTYD_PASSWORD', what: 'terminal basic auth' },
    { name: 'ANTHROPIC_API_KEY', what: 'used by the agents, billed to you' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    '2 GiB covers agents plus typical build tooling. Heavy compiles or test suites inside the box may want the next plan up - agents are only as fast as the box they think in.',
  faq: [
    {
      q: 'Why run Claude Code on a server instead of my laptop?',
      a: 'Long runs survive sleep, network drops, and closed lids. The tmux session keeps executing while you are away, and reattaching from any device shows you what happened - agent time stops being coupled to laptop-open time.',
    },
    {
      q: 'Is it safe to expose a terminal to the internet?',
      a: 'The terminal sits behind basic auth over HTTPS, and the API key lives only in server env. Use a long random TTYD_PASSWORD and treat the box like any dev machine: real credentials only where needed, and remember the agents inside can run arbitrary commands - that is the point.',
    },
    {
      q: 'How do I reattach to a running agent session?',
      a: 'Open the app URL, authenticate, and you land back in tmux - the session never ended. From a second device the same applies; tmux multiplexes happily.',
    },
    {
      q: 'What does it cost to run?',
      a: 'The box itself is $13/month (2 GiB hobby plan). The real cost is API usage by the agents, billed to your Anthropic key - the box just keeps them running while your laptop does not have to.',
    },
  ],
};
