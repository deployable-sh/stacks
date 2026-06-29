import type { AppBase } from './index';

export const docuseal: AppBase = {
  slug: 'docuseal',
  name: 'DocuSeal',
  upstream: 'DocuSeal',
  upstreamUrl: 'https://www.docuseal.com',
  tagline:
    'Open-source document signing - field builder, multiple submitters, verified PDF eSignatures - with no envelope counting.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host DocuSeal: open-source DocuSign alternative',
  seoDescription:
    'Deploy DocuSeal - WYSIWYG document fields, signing workflows, verified PDF eSignatures, API and webhooks - in one step on a managed Postgres for $25/month. No per-envelope pricing.',
  keywords: [
    'self-host docuseal',
    'docuseal docker compose',
    'docusign alternative open source',
    'document signing self-hosted',
    'esignature self-hosted',
    'docuseal setup',
  ],
  intro: [
    'E-signature SaaS invented the strangest meter in software: the envelope. DocuSign Standard charges $30 per user per month and still caps you at 100 envelopes a year - sending an NDA twice a week exhausts it. DocuSeal is the open-source answer, and its signing core is genuinely complete in the free edition.',
    'You get a WYSIWYG field builder (12 field types), multi-submitter flows, automatic PDF eSignatures with verification, an API, and webhooks - one Rails container on a managed Postgres, with attachments on a volume or S3.',
    'Emails drive signature requests, so any SMTP relay plugs in - including the catalogue’s mailpit for testing the flow end-to-end before pointing at a real relay.',
  ],
  features: [
    'WYSIWYG template builder with 12 field types',
    'Multiple submitters, signing order, completion webhooks',
    'Automatic PDF eSignature + verification',
    'API for programmatic sends; embeds in the Pro tier',
    'Managed Postgres via one DATABASE_URL; S3 storage optional',
    'AGPL core - the signing features are not paywalled',
  ],
  topology: [
    { service: 'docuseal', role: 'app (:3000, fixed port)', isPublic: 'no' },
    { service: 'web', role: 'nginx :5000 -> docuseal:3000', isPublic: 'yes' },
    { service: 'db', role: 'Postgres - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'SECRET_KEY_BASE', what: 'openssl rand -hex 64 - pin it across redeploys' },
    { name: 'HOST / FORCE_SSL', what: 'the app’s domain' },
    { name: 'SMTP_*', what: 'signature-request emails (mailpit:1025 for testing)' },
  ],
  ramMiB: 2048,
  diskGB: 10,
  services: 3,
  sizingNote:
    'A single Puma process serves typical signing volume comfortably; documents live on the volume (or S3). Raise WEB_CONCURRENCY with RAM if traffic grows.',
  faq: [
    {
      q: 'What does the math look like vs DocuSign?',
      a: 'DocuSign Standard: $30/user/month, 100 envelopes per user per year, overage billed per envelope. DocuSeal here: $25/month total, unlimited users and documents. A 5-person team sending contracts weekly saves over $1,500 a year and stops counting envelopes entirely.',
    },
    {
      q: 'Are self-hosted signatures legally valid?',
      a: 'DocuSeal produces standard PDF eSignatures with verification and a full audit trail - the same technical mechanism the SaaS products use, generally valid for ESIGN/eIDAS-grade consent flows. For qualified/advanced signature regimes, consult counsel; that is true of every e-sign product.',
    },
    {
      q: 'What is in the Pro tier I am not getting?',
      a: 'White-labeling, SSO/SAML, automated reminders, bulk CSV sends, conditional fields, and the embeddable signing components - $20/user/month upstream. The core loop (build template, send, sign, verify, webhook) is fully in the free edition.',
    },
    {
      q: 'DocuSeal or Documenso?',
      a: 'DocuSeal is lighter (half the RAM) and fastest to value; Documenso has the more polished product UX, team management, and PKCS#12 document sealing. Both are in the catalogue - deploy both for a weekend and keep the one your team likes.',
    },
  ],
};
