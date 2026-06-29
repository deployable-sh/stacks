import type { AppBase } from './index';

export const mailpit: AppBase = {
  slug: 'mailpit',
  name: 'Mailpit',
  upstream: 'Mailpit',
  upstreamUrl: 'https://mailpit.axllent.org',
  tagline:
    'The dev mail catcher - every test email from every app in your project, in one searchable UI, for $5/month.',
  category: 'Email & Newsletters',
  status: 'stable',
  seoTitle: 'Self-host Mailpit: dev email testing with Docker Compose',
  seoDescription:
    'Deploy Mailpit - the modern MailHog successor: SMTP sink + web UI with search and HTML preview - in one step for $5/month. Replaces paid email-testing sandboxes.',
  keywords: [
    'self-host mailpit',
    'mailpit docker compose',
    'mailhog alternative',
    'mailtrap alternative',
    'email testing self-hosted',
    'smtp sink dev',
  ],
  intro: [
    'Every stack sends email eventually - signups, resets, invoices - and testing it against real inboxes is how staging secrets leak and customers get confused. Mailpit is the modern answer (MailHog stopped updating in 2020): an SMTP sink that catches everything, with a fast UI for search, HTML preview, and link checking.',
    'The project-network deployment is the killer version of it: every app in your Miget project points its SMTP settings at mailpit:1025 - Ghost, Chatwoot, Keycloak, Typebot, anything - and all their mail lands in one authenticated UI. No per-inbox setup, no third party seeing your test data.',
    'One tiny Go container, one variable, $5/month. Hosted email-testing sandboxes charge ~$14/month for 500 test emails; Mailpit keeps your last 5,000 with no meter.',
  ],
  features: [
    'Catches all SMTP from the project network (mailpit:1025)',
    'Web UI: search, HTML/source preview, link checking, API',
    'Basic-auth protected UI; messages persist on the volume',
    'MIT, actively maintained - the de-facto MailHog successor',
    'Zero configuration beyond one auth variable',
    'The cheapest genuinely useful template in the catalogue',
  ],
  topology: [
    { service: 'mailpit', role: 'web UI (:5000 public) + SMTP sink (:1025 project-internal)', isPublic: 'UI only' },
  ],
  requiredVars: [{ name: 'MP_UI_AUTH', what: 'user:password for the web UI' }],
  ramMiB: 256,
  diskGB: 1,
  services: 1,
  sizingNote: 'A single Go binary that idles around 30 MB - 256 MiB is generous. The 5,000-message cap keeps the volume tiny.',
  faq: [
    {
      q: 'How is this different from Mailtrap?',
      a: 'Same job - catch test email before it reaches humans - without the meter: Mailtrap’s testing plans start around $14/month for 500 test emails. Mailpit on the $5 plan keeps 5,000 with full search, and your message contents never leave your project.',
    },
    {
      q: 'How do apps send to it?',
      a: 'Set SMTP host mailpit, port 1025, no auth, no TLS - the project network is the boundary, and the SMTP port has no public route. Every template in this catalogue with SMTP settings works against it unchanged.',
    },
    {
      q: 'Is this for production email?',
      a: 'No - deliberately. Mailpit catches mail; it never delivers it. For real sending, configure a relay (SES, Resend, Postmark) in your apps, and use the listmonk template when the job is newsletters.',
    },
  ],
};
