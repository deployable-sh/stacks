import type { AppBase } from './index';

export const owncast: AppBase = {
  slug: 'owncast',
  name: 'Owncast',
  upstream: 'Owncast',
  upstreamUrl: 'https://owncast.online',
  tagline: 'Your own live streaming server - Twitch without the platform cut, RTMP in, HLS out, on your domain.',
  category: 'Media',
  status: 'stable',
  seoTitle: 'Self-host Owncast: your own live streaming server',
  seoDescription:
    'Deploy Owncast - a self-hosted Twitch / YouTube Live alternative with a built-in web player, chat, and federation. Stream from OBS over RTMP, viewers watch HLS in the browser. One plan, no platform cut, no ads.',
  keywords: [
    'self-host owncast',
    'owncast docker compose',
    'twitch alternative self-hosted',
    'live streaming server',
    'rtmp hls self-hosted',
    'restream alternative',
  ],
  intro: [
    'Owncast is a complete live streaming server you run yourself: point OBS (or any RTMP broadcaster) at it, and viewers watch adaptive HLS in a built-in web player on your own domain - with live chat, a custom look, and optional fediverse federation.',
    'A thin wrapper pins the web server to port 5000 (Owncast normally takes that from a command-line flag, which Miget’s env-only config does not pass) while RTMP ingest stays on 1935. Expose 1935 as a public custom TCP port and OBS streams straight in.',
    'Everything - configuration, chat history, and the recorded HLS segments - lives on a single volume, so it is a one-service deploy. The point is ownership: no platform takes a cut of your audience, no algorithm decides who sees you, and there are no ads.',
  ],
  features: [
    'Built-in web video player with adaptive HLS',
    'RTMP ingest from OBS and any standard broadcaster',
    'Live chat, custom theming, and fediverse federation',
    'No platform cut, no ads, no audience middleman',
    'Single container, all state on one volume',
    'GPL-3.0; port-5000 wrapper, RTMP on a custom TCP port',
  ],
  topology: [
    { service: 'owncast', role: 'web player + admin (:5000) + RTMP (:1935)', isPublic: 'yes (1935 custom TCP)' },
    { service: 'data volume', role: 'config, chat, recorded HLS', isPublic: 'no' },
  ],
  requiredVars: [
    { name: '(none)', what: 'change the default admin password and stream key under /admin' },
  ],
  ramMiB: 1024,
  diskGB: 20,
  services: 1,
  sizingNote: 'Transcoding is CPU-bound during a live stream; 1 GiB RAM is comfortable. Size the volume to how much recorded video you keep. Keep replicas at 1.',
  faq: [
    {
      q: 'What does this save vs Twitch, Vimeo, or Restream?',
      a: 'Twitch and YouTube monetize your audience and your data, Vimeo’s Advanced tier is around $75/month, and Restream is $16+/month just to multistream. Owncast is one ~$13/month plan for a channel that is entirely yours.',
    },
    {
      q: 'How do I get OBS streaming to it?',
      a: 'Expose port 1935 as a public custom TCP port on Miget, then point OBS at rtmp://your-app.migetapp.com:1935/live using the stream key from the admin panel. Viewers just open your https domain.',
    },
    {
      q: 'Why the wrapper?',
      a: 'Owncast sets its web port with the -webserverport flag, and a compose command does not reach per-app deploys on Miget. The wrapper bakes -webserverport 5000 into the entrypoint so the player is served on Miget’s public port.',
    },
  ],
};
