import type { AppBase } from './index';

export const nodeRed: AppBase = {
  slug: 'node-red',
  name: 'Node-RED',
  upstream: 'Node-RED (OpenJS)',
  upstreamUrl: 'https://nodered.org',
  tagline: 'Flow-based automation for APIs, MQTT, and devices - with auth made mandatory, not optional.',
  category: 'Automation & Jobs',
  status: 'stable',
  seoTitle: 'Self-host Node-RED with enforced admin auth',
  seoDescription:
    'Deploy Node-RED - visual flow-based automation with thousands of community nodes - in one step for $5/month, with bcrypt admin auth enforced at boot (an open editor is RCE).',
  keywords: [
    'self-host node-red',
    'node-red docker compose',
    'node-red auth setup',
    'flow based automation',
    'mqtt automation self-hosted',
    'node-red secure deployment',
  ],
  intro: [
    'Node-RED is the OpenJS Foundation’s flow programming tool: wire webhooks, APIs, MQTT, schedules, and devices together visually, with thousands of community nodes for everything from Modbus to Telegram. Two decades of IoT and integration muscle live in its palette.',
    'This template fixes the deployment footgun upstream leaves open: a public Node-RED editor without auth is arbitrary code execution. The wrapper seeds bcrypt adminAuth into settings.js on first boot and refuses to start without your hash - secure by construction, not by checklist.',
  ],
  features: [
    'Visual flow editor with thousands of community nodes',
    'Webhooks, MQTT, HTTP, schedules, function nodes (JS)',
    'Auth ENFORCED: bcrypt admin seeded at boot, or no boot',
    'Flows, credentials, and installed nodes persist on one volume',
    'Apache-2.0, OpenJS-governed',
  ],
  topology: [{ service: 'node-red', role: 'flow editor + runtime (:5000)', isPublic: 'yes (enforced auth)' }],
  requiredVars: [{ name: 'NODERED_PASSWORD_HASH', what: 'bcrypt (one docker run command in .env.example)' }],
  ramMiB: 512,
  diskGB: 2,
  services: 1,
  sizingNote: 'Light by default; heavy flows and chatty MQTT raise it. Install nodes from the palette - they persist on the volume.',
  faq: [
    {
      q: 'Why does this template enforce auth when upstream does not?',
      a: 'Because the editor executes arbitrary JavaScript by design - on a public domain, an open editor is remote code execution within minutes of being indexed. The wrapper exits loudly without a bcrypt hash; the inconvenience is the feature.',
    },
    {
      q: 'Node-RED or n8n?',
      a: 'Node-RED for device/MQTT/protocol wiring and the engineering-automation crowd; n8n (in this catalogue, queue mode) for SaaS integrations with credential management and a marketplace of app nodes. Genuinely different ecosystems - pick by what you are wiring.',
    },
    {
      q: 'Can flows receive webhooks from the internet?',
      a: 'Yes - HTTP-in nodes listen on your domain alongside the editor. Secure the endpoints your flows expose (the enforced auth covers the editor, not your custom routes - add header checks in flows).',
    },
  ],
};
