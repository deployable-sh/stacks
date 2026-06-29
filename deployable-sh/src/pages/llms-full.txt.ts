import type { APIRoute } from 'astro';
import { APPS } from '../data/apps';
import { SITE } from '../config';
import { hobbyFit, proFit, fmtRam } from '../lib/sizing';

export const GET: APIRoute = () => {
  const blocks = APPS.map((a) => {
    const hobby = hobbyFit(a);
    const pro = proFit(a);
    const lines = [
      `## ${a.name}`,
      '',
      `URL: ${SITE.url}/apps/${a.slug}/`,
      `Category: ${a.category}${a.status === 'experimental' ? ' (experimental)' : ''}`,
      `Upstream: ${a.upstream}, ${a.upstreamUrl}`,
      `Template source: ${SITE.repoUrl}/tree/main/${a.slug}`,
      '',
      ...a.intro,
      '',
      `Footprint: ${fmtRam(a.ramMiB)} RAM, ${a.diskGB} GB disk, ${a.services} service(s).`,
      `Miget sizing: Hobby ${fmtRam(hobby.fit.ramMiB)} plan at $${hobby.fit.usd}/mo; Professional ${fmtRam(pro.fit.ramMiB)} at $${pro.fit.usd}/mo.`,
      ...(a.saasCompare.length > 0
        ? [
            `Managed-service comparison (${SITE.pricingAsOf}): ` +
              a.saasCompare
                .map((r) => `${r.name} ${r.plan} ${r.usd === null ? '(usage-based)' : `~$${r.usd}/mo`}`)
                .join('; ') + '.',
          ]
        : []),
      '',
      'FAQ:',
      ...a.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`),
    ];
    return lines.join('\n');
  });

  const doc = [
    `# ${SITE.name}, full catalogue facts`,
    '',
    SITE.description,
    `Pricing data as of ${SITE.pricingAsOf}; sources are linked on each page.`,
    '',
    ...blocks,
    '',
  ].join('\n\n');

  return new Response(doc, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
