export type Category =
  | 'Streaming & Messaging'
  | 'Databases'
  | 'Caches & Key-Value'
  | 'Search & Vectors'
  | 'Backend Platforms'
  | 'Auth & API Gateway'
  | 'Error Tracking'
  | 'Monitoring & Analytics'
  | 'CMS & Publishing'
  | 'Dev Tools'
  | 'Internal Tools'
  | 'Business Apps'
  | 'Productivity & PM'
  | 'Scheduling'
  | 'Automation & Jobs'
  | 'Email & Newsletters'
  | 'Object Storage'
  | 'Security'
  | 'LLM Infrastructure'
  | 'AI Agents'
  | 'Voice & Realtime'
  | 'Media'
  | 'Game Servers';

export interface TopologyRow {
  service: string;
  role: string;
  isPublic: string; // 'yes' | 'no' | qualifier text
}

export interface SaasCompareRow {
  name: string;
  plan: string;
  usd: number | null; // null => usage-based, see note
  priceNote: string; // e.g. '/mo' qualifiers, volume included
  url: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface AppData {
  slug: string;
  name: string;
  upstream: string; // upstream project name
  upstreamUrl: string;
  /** Upstream license (SPDX-ish token), its risk tier, and an optional caveat */
  license?: string;
  licenseTier?: 'permissive' | 'copyleft' | 'network' | 'source-available' | 'proprietary' | 'mixed';
  licenseNote?: string;
  tagline: string; // card + meta description seed, one sentence
  category: Category;
  status: 'stable' | 'experimental';
  /** SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Optional long-form production guide (miget.com blog) */
  guideUrl?: string;
  /** Body copy: 2-3 paragraphs, plain text (rendered as <p>s) */
  intro: string[];
  features: string[];
  topology: TopologyRow[];
  requiredVars: { name: string; what: string }[];
  /** Resource footprint from compose.miget.yaml (managed addons included) */
  ramMiB: number;
  diskGB: number;
  services: number;
  sizingNote?: string;
  /** What you'd pay elsewhere for the managed equivalent */
  saasCompare: SaasCompareRow[];
  saasCompareNote?: string;
  faq: Faq[];
}
