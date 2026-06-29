# LiveKit Agents

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=livekit-agents&type=stack)

A voice AI agent worker on the [LiveKit Agents](https://docs.livekit.io/agents/)
framework: it joins LiveKit rooms and converses - Deepgram for ears,
ElevenLabs for voice, any OpenAI-compatible LLM for the brain (the
catalogue's `litellm` gateway slots in via OPENAI-compatible config).

**Experimental**: builds LiveKit's official Python starter
(agent-starter-python) from its repo as a starting point - fork it and
point the build context at your fork the moment you customize the agent.

## Topology

Outbound-only: the worker registers with your LiveKit server over
websocket and receives jobs. No ingress, no public port - the friendliest
deploy shape there is. CPU suffices: only voice-activity detection runs
locally; STT/TTS/LLM are API calls.

## Local

```bash
cp .env.example .env && docker compose up -d --build
```

## On Miget

Deploy the `livekit` template first (or use LiveKit Cloud), then create
a Compose Stack pointing at this repo, path `livekit-agents`, with
**`LIVEKIT_URL`** (`ws://livekit:5000` in-project),
**`LIVEKIT_API_KEY`/`SECRET`**, and the provider keys your pipeline
uses. Open a room with any LiveKit client and the agent joins.

Scale: one 2 GiB worker handles a handful of concurrent voice sessions;
add replicas for more (workers share the job queue). Give agents
long stop grace - mid-conversation jobs finish on SIGTERM.
