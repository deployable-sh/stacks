# LiveKit

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=livekit&type=stack)

[LiveKit](https://livekit.io) - the Apache-2.0 WebRTC server powering
modern voice agents and video apps: rooms, tracks, selective forwarding,
and the Agents framework ecosystem. Single Go binary.

## The port story (the part that matters)

WebRTC normally wants a 10,000-port UDP range - hostile to any PaaS.
LiveKit collapses it: `rtc.udp_port` muxes ALL media over **one UDP
port (7882)**, with **7881/tcp** as the ICE fallback and the websocket
signal on **:5000** behind the normal HTTP ingress.

## Local

```bash
cp .env.example .env && docker compose up -d
# ws://localhost:5000 with your key/secret
```

## On Miget

1. Create a Compose Stack pointing at this repo, path `livekit`, with
   **`LIVEKIT_API_KEY`** / **`LIVEKIT_API_SECRET`**.
2. Add two PUBLIC custom ports on the app: **7881/tcp** and
   **7882/udp** - keep the public numbers identical (the server
   advertises exactly these to clients via ICE; `use_external_ip: true`
   discovers the public address).
3. Clients connect to `wss://<domain>` with tokens minted from your
   key/secret (server SDKs do this in one call).

Pair with the `livekit-agents` template for ElevenLabs/Deepgram voice
agents that join rooms automatically. TURN/TLS is available upstream as
an extra fallback if some networks still refuse UDP+TCP - see LiveKit's
ports-and-firewalls docs. Redis is only needed multi-node; one node is
real production for small workloads.
