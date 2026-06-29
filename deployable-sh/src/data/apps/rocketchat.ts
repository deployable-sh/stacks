import type { AppBase } from './index';

export const rocketchat: AppBase = {
  slug: 'rocketchat',
  name: 'Rocket.Chat',
  upstream: 'Rocket.Chat',
  upstreamUrl: 'https://www.rocket.chat',
  tagline: 'Team chat with an apps marketplace and omnichannel - stateless, on a MongoDB replica set.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Rocket.Chat with Docker Compose',
  seoDescription:
    'Deploy Rocket.Chat - channels, voice/video, an apps marketplace, and omnichannel - in one step, stateless on a MongoDB replica set, for $25/month. The feature-rich open-source team chat.',
  keywords: [
    'self-host rocket.chat',
    'rocketchat docker compose',
    'slack alternative open source',
    'rocket chat mongodb',
    'omnichannel chat self-hosted',
    'team chat marketplace',
  ],
  intro: [
    'Rocket.Chat is the maximalist open-source team chat: channels, threads, DMs, voice/video, an apps marketplace, and omnichannel (livechat widget, email, social) - the most feature-rich free option, MIT at the core. The app itself is stateless; everything lives in MongoDB.',
    'That MongoDB is the one real requirement: Rocket.Chat needs a replica set (it relies on change streams), which this catalogue’s mongodb template provides as three nodes. Deploy that, point MONGO_URL at it, and the Rocket.Chat container is disposable - a clean cross-template showcase.',
    'This catalogue ships Mattermost as the simpler default team chat (one plain Postgres); Rocket.Chat is here for teams who want its marketplace and omnichannel and are happy running the replica set alongside.',
  ],
  features: [
    'Channels, threads, DMs, voice/video, screen share',
    'Apps marketplace and a rich integration ecosystem',
    'Omnichannel: livechat widget, email, and social inboxes',
    'Stateless app container - all state in MongoDB',
    'Leans on the mongodb replica-set template (3 nodes)',
    'MIT core (enterprise features gated by a key)',
  ],
  topology: [
    { service: 'rocketchat', role: 'server + API (stateless, :5000)', isPublic: 'yes' },
    { service: 'mongo', role: 'MongoDB replica set - the catalogue’s mongodb template on Miget', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ROOT_URL', what: 'the app’s https domain' },
    { name: 'MONGO_URL', what: 'the mongodb template’s replica-set connection string (…?replicaSet=rs0)' },
  ],
  ramMiB: 3072,
  diskGB: 10,
  services: 1,
  sizingNote: 'The app is stateless (2 GiB) - the mongodb template carries persistence. Add its 3-node footprint when budgeting the full setup.',
  faq: [
    {
      q: 'Why does it need a MongoDB replica set?',
      a: 'Rocket.Chat uses MongoDB change streams for realtime updates, which require a replica set - standalone MongoDB is not supported. The catalogue’s mongodb template is a 3-node replica set built for exactly this; point MONGO_URL at it with ?replicaSet=rs0.',
    },
    {
      q: 'Rocket.Chat or Mattermost?',
      a: 'Mattermost is the lower-effort default (one plain managed Postgres, this catalogue’s recommended team chat). Rocket.Chat brings an apps marketplace and omnichannel support, at the cost of running the MongoDB replica set. Pick by whether you want those extras.',
    },
    {
      q: 'Is the app really stateless?',
      a: 'Yes - uploads default to GridFS in MongoDB and all data lives there, so the Rocket.Chat container has no volume. Redeploys and upgrades are clean; back up the mongodb template and you have backed up everything.',
    },
  ],
};
