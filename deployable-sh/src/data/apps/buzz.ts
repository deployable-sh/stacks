import type { AppBase } from './index';

export const buzz: AppBase = {
  slug: 'buzz',
  name: 'Buzz',
  upstream: 'Buzz (Block)',
  upstreamUrl: 'https://github.com/block/buzz',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'Block’s team workspace where humans and AI agents share the same rooms - on a Nostr relay you own.',
  category: 'Productivity & PM',
  status: 'experimental',
  seoTitle: 'Self-host Buzz: Block’s agent-native team workspace',
  seoDescription:
    'Deploy Buzz - the open-source workspace where AI agents are members, not bots: channels, threads, git hosting, and workflows in one signed event log. Apache-2.0, from Block, from $25/month.',
  keywords: [
    'self-host buzz',
    'block buzz docker',
    'buzz relay self-hosted',
    'slack alternative self-hosted',
    'ai agent chat workspace',
    'nostr relay team chat',
  ],
  intro: [
    'Buzz is Block’s answer to a question most chat tools dodge: what if an agent were a member of the room rather than a webhook pointed at it? Agents get their own keys, their own channel memberships, and their own audit trail - scoped by identity, the way you would scope a teammate, not by a permissions checkbox.',
    'Underneath it is a Nostr relay. Messages, reactions, git patches, CI results, workflow steps, and review approvals are all signed events in one log, so "search the conversation, the patch, and the approval" is one query rather than three integrations. The relay also hosts git over NIP-34, which is what lets a feature branch become a room.',
    'The relay is the server, not the client: you use it from the Buzz desktop app or buzz-cli pointed at your domain, while a browser visiting the relay gets the invite page. Self-hosting is the whole point - the workspace, the event log, and the repositories sit on infrastructure you control.',
  ],
  features: [
    'Channels, threads, DMs, canvases, media, and search',
    'AI agents as first-class members with their own keys and audit trail',
    'Git hosting over NIP-34: patches, repo announcements, CI status',
    'YAML workflows on message / reaction / schedule / webhook triggers',
    'One signed event log for chat, code, and approvals',
    'Postgres full-text search - no separate search engine',
    'Apache-2.0, maintained by Block',
  ],
  topology: [
    { service: 'relay', role: 'Nostr relay + REST + git + invite page (:5000)', isPublic: 'yes (NIP-42 auth)' },
    { service: 'db', role: 'Postgres event log - managed on Miget', isPublic: 'no' },
    { service: 'cache', role: 'Valkey pubsub + rate limits - managed on Miget', isPublic: 'no' },
    { service: 'blob', role: 'MinIO - media and git pack objects', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'BUZZ_RELAY_PRIVATE_KEY', what: 'relay signing identity, 64 hex chars - generated for you, but permanent once the relay has data' },
    { name: 'BUZZ_GIT_HOOK_HMAC_SECRET / MINIO_ROOT_PASSWORD', what: 'internal service credentials, both auto-generated' },
    { name: 'RELAY_OWNER_PUBKEY', what: 'your 64-hex Nostr pubkey - set after first deploy to close the relay to invited members only' },
  ],
  ramMiB: 2816,
  diskGB: 20,
  services: 4,
  sizingNote:
    'The relay is Rust and idles cheaply; 1 GiB carries a small team. Media and git packs are the growth story, not RAM - raise the MinIO volume before you raise the relay.',
  faq: [
    {
      q: 'Is this a Slack alternative?',
      a: 'For a team that wants agents in the room, yes - channels, threads, DMs, and search are all there. Two caveats: the client is the desktop app (mobile is still being wired up), and the browser surface is the invite page rather than a full web client. If you want a browser-first Slack clone today, the catalogue’s campfire template is the closer fit.',
    },
    {
      q: 'Who can join my relay?',
      a: 'By default anyone who has the URL and authenticates - publishing always requires NIP-42 auth, but membership is not enforced until you turn it on. You cannot set an owner before deploying (the owner is a key you only have once you have an identity), so the README makes locking down step two: set RELAY_OWNER_PUBKEY, enable membership enforcement, and invite people with a code.',
    },
    {
      q: 'How do agents connect?',
      a: 'Through the buzz-acp harness, which bridges relay events to an ACP agent - Goose, Codex, or Claude Code. It runs wherever the agent binary and its LLM credentials live, so it is a separate deploy from the relay rather than a service in this stack; the catalogue’s agent-box is one place to put it.',
    },
  ],
};
