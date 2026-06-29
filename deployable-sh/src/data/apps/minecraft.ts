import type { AppBase } from './index';

export const minecraft: AppBase = {
  slug: 'minecraft',
  name: 'Minecraft Server',
  upstream: 'itzg/minecraft-server',
  upstreamUrl: 'https://docker-minecraft-server.readthedocs.io',
  tagline:
    'A Paper/Fabric/Forge Minecraft server on flat-price compute - your world, your mods, no per-slot pricing.',
  category: 'Game Servers',
  status: 'stable',
  seoTitle: 'Host a Minecraft server with Docker Compose',
  seoDescription:
    'Deploy a Minecraft Java server (Paper, Fabric, Forge, Vanilla via the itzg image) in one step for $25/month flat - no player-slot pricing, world on a persistent volume.',
  keywords: [
    'minecraft server hosting',
    'minecraft docker compose',
    'itzg minecraft server',
    'paper server setup',
    'cheap minecraft hosting',
    'self-host minecraft',
  ],
  intro: [
    'The itzg image is the most-deployed game server container in existence for a reason: set TYPE and VERSION, and it fetches and runs Paper, Fabric, Forge, or Vanilla - mods, datapacks, and world on a persistent volume, console via rcon.',
    'Game hosting traditionally prices by player slots and tiers RAM behind upsells. A flat compute plan inverts that: 2 GB of Paper heap comfortably carries a 10-20 player community for $25/month, and raising MEMORY plus the plan is the entire scaling procedure.',
    'Two honest notes: Mojang’s EULA is yours to accept (EULA=TRUE is deliberately not pre-set), and Minecraft speaks raw TCP - after deploy you add a public custom TCP port to the app and hand players that address. No HTTP anywhere.',
  ],
  features: [
    'Paper, Fabric, Forge, Vanilla - one TYPE variable',
    'World, mods, configs on a persistent volume',
    'Version pinning or LATEST auto-tracking',
    'rcon console from the app shell',
    'No player-slot pricing - heap and plan are the only dials',
    'The standard image with years of documented options',
  ],
  topology: [
    { service: 'minecraft', role: 'Java server (TCP :25565)', isPublic: 'via custom public TCP port' },
  ],
  requiredVars: [{ name: 'EULA', what: 'set TRUE yourself - Mojang requires each operator to accept' }],
  ramMiB: 3072,
  diskGB: 10,
  services: 1,
  sizingNote:
    'Container RAM = JVM heap + ~50% overhead: MEMORY=2G in a 3 GiB container is the sweet spot. Modpacks want 4G+ heap on the next plan.',
  faq: [
    {
      q: 'How do players connect if the platform is HTTP-first?',
      a: 'Miget supports custom public TCP ports: add one mapped to 25565 in the app settings and share host:port. The HTTP-on-5000 convention simply does not apply - this template is the catalogue’s first pure-TCP citizen.',
    },
    {
      q: 'How many players does this run?',
      a: 'Paper with a 2 GB heap typically carries 10-20 concurrent players; vanilla less, aggressively-optimized Paper more. Modpacks change the math entirely - size heap to the pack’s recommendation and the plan above it.',
    },
    {
      q: 'Why must I set EULA myself?',
      a: 'Mojang’s EULA binds the server operator - you. The image (correctly) refuses to start until EULA=TRUE, and this template (correctly) refuses to accept it on your behalf. One variable, informed consent.',
    },
    {
      q: 'Can I run mods and plugins?',
      a: 'Yes - drop plugins/mods into the volume (or use the image’s MODRINTH/CURSEFORGE env helpers), set TYPE to match the loader, restart. Everything persists across redeploys.',
    },
  ],
};
