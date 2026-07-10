import type { AppBase } from './index';

export const typebot: AppBase = {
  slug: 'typebot',
  name: 'Typebot',
  upstream: 'Typebot',
  upstreamUrl: 'https://typebot.io',
  license: 'FSL-1.1',
  licenseTier: 'source-available',
  licenseNote: 'converts to Apache-2.0 after 2y',
  tagline:
    'Conversational forms that outconvert static ones - unlimited chats and seats on a managed Postgres.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Typebot: conversational form builder',
  seoDescription:
    'Deploy Typebot - drag-and-drop conversational forms with embeds, logic and analytics - in one step on a managed Postgres for $25/month. No response caps; compare vs Typeform’s 100-responses-at-$29.',
  keywords: [
    'self-host typebot',
    'typebot docker compose',
    'typeform alternative self-hosted',
    'conversational forms open source',
    'chatbot form builder',
    'typebot setup',
  ],
  intro: [
    'Typeform proved that conversational beats static for completion rates, then priced it like a luxury: $29/month buys 100 responses. Typebot is the open-source version of the idea - a drag-and-drop builder for chat-style forms and bots, with logic, variables, integrations, and result analytics - and it was a top-10 template on Railway by deploy count.',
    'The architecture is template-friendly: two stateless Next.js apps (the builder where you design, the viewer respondents see) on one managed Postgres, each on its own domain with PORT honored - no proxies. The builder runs migrations; the pair redeploys cleanly.',
    'Self-hosted, your ADMIN_EMAIL account gets the unlimited plan: unlimited typebots, chats, and seats. Even Typebot’s own cloud charges $39/month for 2,000 chats.',
  ],
  features: [
    'Drag-and-drop conversational flows: logic, variables, scoring',
    'Embed anywhere: bubble, popup, or full-page on the viewer domain',
    'Integrations: webhooks, OpenAI blocks, Sheets, and more',
    'Results analytics with drop-off insight',
    'Two stateless apps on managed Postgres - clean redeploys',
    'Unlimited chats and seats self-hosted (FSL license)',
  ],
  topology: [
    { service: 'builder', role: 'bot designer + workspace (:5000)', isPublic: 'yes (own domain)' },
    { service: 'viewer', role: 'respondent UI + chat API (:5000)', isPublic: 'yes (own domain)' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'ENCRYPTION_SECRET', what: 'exactly 32 chars, identical on both apps' },
    { name: 'ADMIN_EMAIL', what: 'this account gets the unlimited plan' },
    { name: 'SMTP_*', what: 'magic-link login (or GitHub/Google OAuth vars instead)' },
    { name: 'NEXTAUTH_URL / NEXT_PUBLIC_VIEWER_URL', what: 'the two apps’ https domains after first deploy' },
  ],
  ramMiB: 2560,
  diskGB: 5,
  services: 3,
  sizingNote:
    'Both apps are stateless Next.js processes; the viewer is the traffic-facing one and scales by plan. Uploads need optional S3 config - core flows do not.',
  faq: [
    {
      q: 'How does this compare to Typeform pricing?',
      a: 'Typeform Basic is $29/month for 100 responses - a single popular form blows through that in a day. Self-hosted Typebot has no response meter at all: $25/month infrastructure, unlimited chats, unlimited seats.',
    },
    {
      q: 'Why two apps and two domains?',
      a: 'Separation of concerns upstream: the builder is your internal workspace; the viewer is the public-facing bot runtime you embed on sites. Both honor PORT, so each simply gets its own domain - no proxy sidecars needed.',
    },
    {
      q: 'What does the FSL license mean for me?',
      a: 'Free for internal use and client work; the restriction is reselling access to your instance as a hosted service. Each FSL release converts to Apache-2.0 after two years. For the standard "our company’s forms" use case, nothing changes.',
    },
    {
      q: 'How do logins work without passwords?',
      a: 'Magic links by email (point SMTP at a real relay - or at the mailpit template during testing) or OAuth (GitHub/Google/Azure AD vars). Set DISABLE_SIGNUP=true once your team is aboard.',
    },
  ],
};
