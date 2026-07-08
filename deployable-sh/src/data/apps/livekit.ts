import type { AppBase } from './index';

export const livekit: AppBase = {
  slug: 'livekit',
  name: 'LiveKit',
  upstream: 'LiveKit',
  upstreamUrl: 'https://livekit.io',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'The open-source WebRTC server behind modern voice AI - with the 10,000-port UDP problem collapsed to one.',
  category: 'Voice & Realtime',
  status: 'stable',
  seoTitle: 'Self-host LiveKit: WebRTC server for voice AI and video',
  seoDescription:
    'Deploy LiveKit - the Apache-2.0 WebRTC server powering voice agents and video apps - in one step for $7/month. Single muxed UDP port, websocket signal behind normal HTTPS.',
  keywords: [
    'self-host livekit',
    'livekit docker compose',
    'livekit server setup',
    'webrtc server self-hosted',
    'voice ai infrastructure',
    'livekit cloud alternative',
  ],
  intro: [
    'LiveKit became the substrate of the voice AI wave: a single Apache-2.0 Go binary doing WebRTC rooms, tracks, and selective forwarding, with the Agents framework ecosystem on top. Self-hosting it historically meant a 10,000-port UDP range - hostile to any platform.',
    'This template uses the config that fixes that: ALL media muxes over one UDP port (7882), with one TCP fallback (7881) and the websocket signal on :5000 behind the ordinary HTTPS ingress. Two custom public ports, same numbers inside and out, and WebRTC works.',
    'Pair it with the livekit-agents template and you have a complete self-hosted voice-agent platform: this server moves the audio; the agent worker brings ElevenLabs, Deepgram, and your LLM gateway.',
  ],
  features: [
    'WebRTC rooms, tracks, SFU - the full LiveKit server',
    'Single muxed UDP port instead of a 10,000-port range',
    'Websocket signal behind normal HTTPS (:5000)',
    'Config via one env var (LIVEKIT_CONFIG) - no file mounts',
    'Apache-2.0; the same server LiveKit Cloud runs',
    'Agents ecosystem: voice AI workers join rooms natively',
  ],
  topology: [
    { service: 'livekit', role: 'signal :5000 (HTTPS ingress) + ICE 7881/tcp + media 7882/udp', isPublic: 'yes + two custom ports' },
  ],
  requiredVars: [
    { name: 'LIVEKIT_API_KEY / LIVEKIT_API_SECRET', what: 'the key pair your apps mint access tokens with' },
  ],
  ramMiB: 1024,
  diskGB: 0,
  services: 1,
  sizingNote:
    'Scaling is CPU and bandwidth, not RAM - one node carries small-production voice workloads comfortably. Redis enters only for multi-node.',
  faq: [
    {
      q: 'How does WebRTC work on an HTTP-first platform?',
      a: 'Three ports, deliberately: the signal is a websocket on the normal HTTPS domain, and media rides ONE muxed UDP port (7882) with a TCP fallback (7881) - both exposed as custom public ports with matching numbers, since ICE advertises them. Clients on hostile networks fall back to TCP automatically.',
    },
    {
      q: 'Why self-host instead of LiveKit Cloud?',
      a: 'Cloud is excellent and usage-priced - the honest default for spiky workloads. Self-hosting wins for always-on voice agents (predictable cost), data locality (audio never transits a third party), and pairing with the in-project agent worker at LAN latency.',
    },
    {
      q: 'What do clients connect with?',
      a: 'Access tokens minted from your API key/secret by any LiveKit server SDK - one function call in your backend. The client SDKs (web, mobile, Unity) then connect to wss://your-domain and join rooms.',
    },
  ],
};
