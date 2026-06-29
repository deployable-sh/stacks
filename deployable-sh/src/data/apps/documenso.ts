import type { AppBase } from './index';

export const documenso: AppBase = {
  slug: 'documenso',
  name: 'Documenso',
  upstream: 'Documenso',
  upstreamUrl: 'https://documenso.com',
  tagline:
    'The polished open-source DocuSign alternative - teams, templates, API, and real PKCS#12 document sealing.',
  category: 'Business Apps',
  status: 'stable',
  seoTitle: 'Self-host Documenso: open-source document signing',
  seoDescription:
    'Deploy Documenso - signing workflows, teams, templates and an API with PKCS#12-sealed PDFs - in one step on a managed Postgres for $25/month. Unlimited documents, no envelope pricing.',
  keywords: [
    'self-host documenso',
    'documenso docker compose',
    'docusign alternative',
    'pandadoc alternative self-hosted',
    'document signing open source',
    'documenso certificate setup',
  ],
  intro: [
    'Documenso is the venture-grade open-source e-signature product: a signing experience recipients do not need explaining, teams and templates for the senders, an API for automation - and signed PDFs sealed with a real PKCS#12 certificate, so documents carry cryptographic proof, not just an audit log.',
    'The deployment is stateless: one container on a managed Postgres, with the signing certificate supplied as base64 in env (self-signed is explicitly supported - the README has the three openssl commands). NEXT_PUBLIC_* vars are runtime-injected, so the official image deploys behind any domain without rebuilds.',
    'Hosted Documenso runs $25-40/month with the heavier features in higher tiers; DocuSign charges per envelope. Self-hosted is unlimited documents on a $25 plan - the AGPL edition does not gate signing.',
  ],
  features: [
    'Signing workflows with templates, teams, and recipient roles',
    'PKCS#12 document sealing - cryptographic proof in the PDF',
    'API + webhooks for automated sends',
    'Stateless container: cert via env, state in managed Postgres',
    'Runtime-injected public URL - no image rebuilds per domain',
    'AGPL, 13k+ stars, active development',
  ],
  topology: [
    { service: 'documenso', role: 'app + API (:5000)', isPublic: 'yes' },
    { service: 'db', role: 'Postgres 14+ - managed service on Miget, container locally', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'NEXTAUTH_SECRET / NEXT_PRIVATE_ENCRYPTION_KEY (+SECONDARY)', what: 'core secrets' },
    { name: 'SIGNING_CERT_B64 (+ passphrase)', what: 'base64 PKCS#12 cert - self-signed OK, generate once and keep' },
    { name: 'SMTP_*', what: 'the signing flow is email-driven' },
    { name: 'NEXT_PUBLIC_WEBAPP_URL', what: 'the app’s https domain after first deploy' },
  ],
  ramMiB: 3072,
  diskGB: 5,
  services: 2,
  sizingNote:
    'Upstream quotes a 2 GB floor for the app. Fully stateless - the managed Postgres holds everything, so redeploys and the comfort tier are uneventful.',
  faq: [
    {
      q: 'Why does it need a certificate, and is self-signed really OK?',
      a: 'The cert seals signed PDFs so the signature verifies cryptographically inside the document. Documenso explicitly supports self-signed certs (three openssl commands, base64 into env) - the seal proves integrity either way. Generate it once and keep it: old documents verify against the cert that sealed them.',
    },
    {
      q: 'How does pricing compare to DocuSign and PandaDoc?',
      a: 'DocuSign Standard is $30/user/month with 100 envelopes/year; PandaDoc Starter $19/seat with 110 documents/year. This stack is $25/month total, unlimited documents and users - and Documenso’s own cloud Teams tier is $40/month, so even first-party hosting costs more than running it here.',
    },
    {
      q: 'Documenso or DocuSeal?',
      a: 'Documenso for the recipient-facing polish, teams, and cert-sealed PDFs; DocuSeal for the lighter footprint and fastest setup. Both are AGPL with un-gated signing - the honest answer is taste, and the catalogue ships both.',
    },
  ],
};
