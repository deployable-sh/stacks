import type { APIRoute } from 'astro';
import { APPS } from '../data/apps';
import { SITE } from '../config';
import { hobbyFit, fmtRam } from '../lib/sizing';

export const GET: APIRoute = () => {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'Every stack is portable Docker Compose (runs locally with `docker compose up`) plus',
    'Miget platform overrides for one-step deployment with managed Postgres/Valkey,',
    'persistent volumes, and TLS. Templates source: ' + SITE.repoUrl,
    '',
    '## Stacks',
    '',
    ...APPS.map((a) => {
      const { fit } = hobbyFit(a);
      return `- [${a.name}](${SITE.url}/apps/${a.slug}/): ${a.tagline} (${fmtRam(a.ramMiB)} RAM, from $${fit.usd}/mo)`;
    }),
    '',
    '## Details',
    '',
    `- [Full per-stack facts](${SITE.url}/llms-full.txt): topology, sizing, pricing comparisons`,
    `- [Miget plans](${SITE.migetPlansUrl}): the flat-price compute plans stacks deploy into`,
    `- Pricing comparisons are as of ${SITE.pricingAsOf}, sourced from official vendor pages.`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
