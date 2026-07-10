import type { AppBase } from './index';

export const livekitAgents: AppBase = {
  slug: 'livekit-agents',
  name: 'LiveKit Agents',
  upstream: 'LiveKit Agents (Python starter)',
  upstreamUrl: 'https://docs.livekit.io/agents/',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'A voice AI agent worker - ElevenLabs voice, Deepgram ears, your LLM brain - joining rooms with zero ingress.',
  category: 'Voice & Realtime',
  status: 'experimental',
  seoTitle: 'Deploy a LiveKit voice agent (ElevenLabs + Deepgram) worker',
  seoDescription:
    'Deploy a LiveKit Agents voice worker - ElevenLabs TTS, Deepgram STT, OpenAI-compatible LLM - in one step for $13/month. Outbound-only, CPU-only; pairs with the self-hosted LiveKit server.',
  keywords: [
    'livekit agents deploy',
    'voice ai agent self-hosted',
    'elevenlabs voice agent',
    'deepgram voice bot',
    'voice agent docker',
    'livekit agents worker',
  ],
  intro: [
    'Voice agents stopped being demos: support lines, intake calls, tutoring, companions. The LiveKit Agents framework is what most of them run on - a Python worker that joins rooms, listens via Deepgram, thinks via any OpenAI-compatible LLM, and speaks via ElevenLabs.',
    'The deployment shape could not be friendlier to a PaaS: the worker connects OUTBOUND to your LiveKit server and receives jobs - no ingress, no public port. CPU is plenty; only voice-activity detection runs locally, everything heavy is an API call.',
    'This template builds LiveKit’s official Python starter as a working baseline and is marked experimental for an honest reason: a real product forks the starter to define its own agent - the template’s build context is the line you change.',
  ],
  features: [
    'Full voice pipeline: Deepgram STT, LLM, ElevenLabs TTS, interruption handling',
    'Outbound-only worker - no ingress, scale with replicas',
    'CPU-only: the heavy lifting happens at your providers',
    'OpenAI-compatible LLM slot - the litellm template plugs in',
    'Official starter as the baseline; fork-and-point to customize',
    'Graceful drain on redeploys (conversations finish)',
  ],
  topology: [
    { service: 'agent', role: 'voice agent worker (outbound to LiveKit)', isPublic: 'no - no ingress needed' },
  ],
  requiredVars: [
    { name: 'LIVEKIT_URL / LIVEKIT_API_KEY / LIVEKIT_API_SECRET', what: 'ws://livekit:5000 in-project, or LiveKit Cloud' },
    { name: 'ELEVEN_API_KEY / DEEPGRAM_API_KEY / OPENAI_API_KEY', what: 'the providers your pipeline uses - billed to you' },
  ],
  ramMiB: 2048,
  diskGB: 0,
  services: 1,
  sizingNote:
    'One 2 GiB worker handles a handful of concurrent conversations; replicas share the job queue. The real bill is provider usage - cap it at the keys.',
  faq: [
    {
      q: 'What does a complete self-hosted voice stack look like here?',
      a: 'livekit (the WebRTC server) + this worker + litellm (LLM gateway with budgets) in one project. Audio flows through your server, the agent reasons through your gateway, and the only external spend is the STT/TTS/LLM APIs you chose.',
    },
    {
      q: 'Why is it experimental?',
      a: 'Because the starter agent is a baseline, not your product: real deployments fork agent-starter-python, change the prompt/tools/pipeline, and point this template’s build context at the fork. The infrastructure shape is solid; the agent code is meant to be yours.',
    },
    {
      q: 'Can it use voices other than ElevenLabs?',
      a: 'Yes - the framework has plugins for Cartesia, OpenAI TTS, PlayHT and more; swap the pipeline in your fork and set the matching key. Same for STT and LLM legs.',
    },
  ],
};
