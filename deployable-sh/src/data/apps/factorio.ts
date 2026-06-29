import type { AppBase } from './index';

export const factorio: AppBase = {
  slug: 'factorio',
  name: 'Factorio Server',
  upstream: 'factoriotools/factorio',
  upstreamUrl: 'https://github.com/factoriotools/factorio-docker',
  tagline:
    'A headless Factorio server - the factory grows while everyone sleeps, for $13/month.',
  category: 'Game Servers',
  status: 'stable',
  seoTitle: 'Host a Factorio server with Docker Compose',
  seoDescription:
    'Deploy a headless Factorio server (community-standard image) in one step for $13/month - autosaves on a volume, mods auto-updated, one UDP port.',
  keywords: [
    'factorio server hosting',
    'factorio docker compose',
    'factorio headless server',
    'self-host factorio',
    'factorio dedicated server',
    'cheap factorio hosting',
  ],
  intro: [
    'Factorio multiplayer deserves a server that never sleeps with someone’s laptop. The community-standard image runs the official headless server: a map generates on first boot, the latest save loads ever after, autosaves roll on the volume, and mods can update themselves on restart.',
    'It is one of the lightest game servers there is - 2 GB of RAM carries factories far past the point where the real bottleneck is your friends’ ability to agree on bus layouts. $13/month flat, no slot pricing.',
    'Factorio speaks UDP: after deploy, add a public custom UDP port to the app and share host:port. Server name, password, and admins live in server-settings.json on the volume.',
  ],
  features: [
    'Official headless server via the community-standard image',
    'Auto map generation, latest-save loading, rolling autosaves',
    'Mods on the volume with optional auto-update on start',
    'Server settings as a JSON you actually control',
    'One UDP port, 2 GiB RAM - the lightest game server here',
    'Version pinning via image tags (stable/experimental)',
  ],
  topology: [
    { service: 'factorio', role: 'headless server (UDP :34197)', isPublic: 'via custom public UDP port' },
  ],
  requiredVars: [],
  ramMiB: 2048,
  diskGB: 5,
  services: 1,
  sizingNote:
    '2 GiB handles large factories; UPS (the game’s tick rate) is CPU-bound at megabase scale - the next plan buys cores, not just memory.',
  faq: [
    {
      q: 'How do players connect?',
      a: 'Add a custom public UDP port on the app (internal 34197) and share host:port - players use "Connect to address". For the in-game public server browser, set visibility and your factorio.com token in server-settings.json.',
    },
    {
      q: 'How do saves and mods work across redeploys?',
      a: 'Everything lives on the /factorio volume: saves, mods, settings. Redeploys load the latest autosave; UPDATE_MODS_ON_START=true keeps mods current with the server version.',
    },
    {
      q: 'Why is this cheaper than the Minecraft template?',
      a: 'No JVM: Factorio’s headless server is lean native code. 2 GiB and one UDP port is genuinely the whole footprint until your factory reaches megabase scale - at which point the upgrade is CPU, and you will know.',
    },
  ],
};
