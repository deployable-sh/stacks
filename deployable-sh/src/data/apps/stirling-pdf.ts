import type { AppBase } from './index';

export const stirlingPdf: AppBase = {
  slug: 'stirling-pdf',
  name: 'Stirling-PDF',
  upstream: 'Stirling-PDF',
  upstreamUrl: 'https://www.stirlingpdf.com',
  tagline: '50+ PDF tools in your browser, processed entirely on your server - the "free PDF site" without the data leak.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Stirling-PDF: 50+ PDF tools on your server',
  seoDescription:
    'Deploy Stirling-PDF - merge, split, compress, OCR, sign, redact, convert - in one step for $7/month. Documents never leave your infrastructure.',
  keywords: [
    'self-host stirling pdf',
    'stirling pdf docker compose',
    'pdf tools self-hosted',
    'ilovepdf alternative',
    'pdf ocr self-hosted',
    'adobe acrobat alternative',
  ],
  intro: [
    'Everyone has uploaded a contract to a random "free PDF merge" site and felt vaguely bad about it. Stirling-PDF is that entire genre - 50+ tools: merge, split, compress, OCR, convert, sign, redact, watermark - running on YOUR server, where the documents already live and never leave.',
    'One container with login enabled and the initial admin baked from env on first start. 65k GitHub stars of teams who decided document processing belongs in-house. The team-license math against per-seat PDF suites does itself.',
  ],
  features: [
    'Merge, split, rotate, compress, convert (Office/image/PDF)',
    'OCR (tesseract; extra languages mountable)',
    'Sign, redact, watermark, flatten, permissions',
    'Pipelines for repeatable multi-step jobs',
    'Login enabled + env-baked initial admin',
  ],
  topology: [{ service: 'stirling-pdf', role: '50+ PDF tools (:5000)', isPublic: 'yes (login)' }],
  requiredVars: [{ name: 'ADMIN_PASSWORD', what: 'initial admin (applied on first startup only)' }],
  ramMiB: 2048,
  diskGB: 1,
  services: 1,
  sizingNote: 'A JVM app: 1 GiB keeps common tools snappy; heavy OCR batches want heap and plan raised together.',
  faq: [
    {
      q: 'Why not just use the free PDF websites?',
      a: 'Because "free PDF site" means uploading contracts, payslips, and medical records to an unknown party’s server. Stirling-PDF gives the whole team the same tools where the documents already live - for one $7/month plan instead of per-seat PDF-suite licenses.',
    },
    {
      q: 'Does OCR work for my language?',
      a: 'English ships in; additional tesseract language packs mount at /usr/share/tessdata. OCR is the heaviest operation - batch jobs appreciate a bigger heap.',
    },
    {
      q: 'What is the license situation?',
      a: 'MIT core with some proprietary directories upstream (their paid/enterprise features). The 50+ tool set this template ships is the open part - feature gates, if you hit one, are upstream tiers, not template restrictions.',
    },
  ],
};
