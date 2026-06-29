# deployable.sh, service catalogue site

A static marketing/funnel site for the Miget compose-template catalogue, living
in `deployable-sh/` inside this repo. Goal: capture search intent for
self-hostable apps ("self-host n8n", "Sentry alternative pricing", "managed
Kafka cost") and convert it into Miget compose-stack deploys.

## Decisions (user-approved)

- **Stack:** Astro 5, fully static output, zero client JS except trivial
  progressive enhancements. `@astrojs/sitemap`.
- **Scope:** all 22 template directories, including WIP (hermes, kilo, convex,
  supabase) marked with an `experimental` badge.
- **Pricing:** every app page compares (a) the managed SaaS equivalent
  (n8n Cloud, Sentry, Atlas, Confluent, …) and (b) running the same stack on
  other PaaS (Railway, Render, Fly.io, DO App Platform, Heroku) against the
  Miget plan that fits the stack. Numbers researched June 2026, sourced,
  and dated on-page.
- **Design:** dark terminal-grade. Near-black background, phosphor-green
  accent, monospace display accents, subtle grid texture, syntax-highlighted
  YAML. No web-font downloads (system mono/sans stacks), perf is part of SEO.

## Architecture

```
deployable-sh/
  astro.config.mjs        site: https://deployable.sh, sitemap, shiki
  src/
    config.ts             site constants, Miget plan ladder, PaaS rates, links
    lib/sizing.ts         plan-fit: stack RAM/disk -> Hobby + Pro plan match
    data/types.ts         AppData interface
    data/apps/<slug>.ts   one typed data file per app (22)
    data/apps/index.ts    aggregate + category ordering
    layouts/Base.astro    head/SEO/OG/JSON-LD, header, footer
    components/           AppCard, CategorySection, SpecTable, PlanRec,
                          SaasCompare, PaasCompare, Faq, DeploySteps, Badge
    pages/index.astro     hero, category grid, how-it-works, pricing teaser
    pages/apps/[slug].astro  app detail page (getStaticPaths over data)
    pages/llms.txt.ts     AI-SEO: catalogue summary endpoint
    pages/llms-full.txt.ts  AI-SEO: full per-app facts
    pages/404.astro
  public/ favicon.svg, robots.txt, og image
```

## App page content model

Per app: SEO title/description/keywords; hero (what it is, why self-host on
Miget); feature list; topology table (from template README); required env
vars; **Miget sizing**, stack RAM/disk totals from `compose.miget.yaml`,
matched to the smallest fitting plan plus a comfort tier, Hobby and
Professional; **SaaS comparison table** with sources; **PaaS comparison
table** computed from researched $/GiB-RAM rates; deploy steps (Miget compose
stack + local `docker compose up`); FAQ (4-6 Q/A).

## SEO / AI-SEO

- Unique title/meta/canonical per page, OG + Twitter cards.
- JSON-LD: `SoftwareApplication` + `FAQPage` + `BreadcrumbList` per app page,
  `WebSite` + `ItemList` on the index.
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.
- Semantic HTML, static, no blocking assets, Core Web Vitals as ranking input.
- Pricing claims carry "as of June 2026" and source links (trust signal for
  both crawlers and LLM retrieval).

## Sizing math (from compose.miget.yaml, managed addons included)

RAM totals (MiB) / disk (GB): kafka 7168/30, redpanda 6656/30, rabbitmq
3072/6, mongodb 3200/30, clickhouse 6144/60, n8n 3328/6, glitchtip 3840/5,
bugsink 2048/5, keycloak 3072/5, kong 2304/5, supabase 9216 full · 6656
core/20, convex 2816/10, pocketbase 512/2, cronicle 512/2, meilisearch
1024/5, minio 1024/20, qdrant 1024/10, chromadb 1024/10, agent-box 2048/10,
openclaw 2048/5, hermes 2048/5, kilo 2048/10.

Plan ladder (June 2026, miget.com/plans): Hobby 512MiB $5 · 1GiB $7 · 2GiB
$13 · 2v/2GiB $19 · 2v/4GiB $25 · 4v/8GiB $49 · 8v/16GiB $97. Professional
1v/2GiB $22 · 2v/4GiB $43 · 4v/8GiB $85 · 8v/16GiB $169 · 16v/32GiB $337.

## Verification

`npm run build` clean; spot-check rendered HTML for JSON-LD validity and
sitemap/llms endpoints; all 22 app pages generated.
