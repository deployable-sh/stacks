import type { AppBase } from './index';

export const codeServer: AppBase = {
  slug: 'code-server',
  name: 'code-server',
  upstream: 'code-server (Coder)',
  upstreamUrl: 'https://github.com/coder/code-server',
  tagline:
    'VS Code in the browser - a persistent cloud dev environment with your extensions and a 10 GB workspace, from any device.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host code-server: VS Code in the browser',
  seoDescription:
    'Deploy code-server - VS Code in the browser with a persistent workspace - in one step for $13/month flat. The self-hosted alternative to GitHub Codespaces hourly billing.',
  keywords: [
    'self-host code-server',
    'code-server docker compose',
    'vs code in browser',
    'github codespaces alternative',
    'cloud ide self-hosted',
    'remote development environment',
  ],
  intro: [
    'code-server is the original "VS Code in a browser tab": the full editor - extensions, terminal, debugger - served from a container you own. Open it from a desktop, a tablet, or a borrowed machine, and your environment is exactly where you left it.',
    'This template is one container with a 10 GB home volume: settings, extensions, and cloned repos all persist across redeploys. Password auth in front, your toolchains inside - apt and language runtimes install like on any dev box.',
    'It completes the catalogue’s remote-dev story: agent-box gives you Claude Code and opencode in a terminal; code-server gives you the IDE. Same flat-price logic against Codespaces-style hourly metering - a box that is always on costs $13/month, not cents-per-minute anxiety.',
  ],
  features: [
    'Full VS Code: extensions (Open VSX), terminal, debugging, settings sync via the volume',
    'Persistent 10 GB /home/coder workspace across redeploys',
    'Password-protected, served over the platform’s TLS',
    'Works from tablets and any browser',
    'Install your toolchains: node, python, go, docker CLIs, whatever apt has',
    'Pairs with agent-box for the terminal-first agent workflow',
  ],
  topology: [
    { service: 'code-server', role: 'VS Code in the browser (:5000)', isPublic: 'yes (password)' },
  ],
  requiredVars: [{ name: 'PASSWORD', what: 'browser login (openssl rand -base64 18)' }],
  ramMiB: 2048,
  diskGB: 10,
  services: 1,
  sizingNote:
    '2 GiB covers the editor plus typical language servers. Heavy compiles, containers-in-dev, or big monorepos want the next plan up - the IDE is only as fast as the box.',
  faq: [
    {
      q: 'How does this compare to GitHub Codespaces?',
      a: 'Codespaces bills by the core-hour plus storage, which is great for spiky use and stressful for always-on. This box is $13/month flat, always warm, with state that never gets reclaimed. The trade: you maintain the toolchain inside it - which for a personal dev box is usually a feature.',
    },
    {
      q: 'Can I use my VS Code extensions?',
      a: 'code-server installs from Open VSX, which carries the large majority of popular extensions. A few Microsoft-proprietary ones (the official C# debugger, Live Share) are licensed only for official builds - the honest caveat of every VS Code fork.',
    },
    {
      q: 'Is it safe to expose an IDE to the internet?',
      a: 'It sits behind password auth over the platform’s TLS, like the catalogue’s other dev boxes. Use a long random password, keep real secrets in env rather than files where possible, and treat it like any machine that can run code - because it is one.',
    },
    {
      q: 'code-server or agent-box?',
      a: 'code-server when you want to write code in an IDE from anywhere; agent-box when you want agents (Claude Code, opencode) doing the writing in a persistent tmux session. Many people run both against the same repos - they are $5-13/month each, not a platform decision.',
    },
  ],
};
