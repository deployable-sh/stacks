# deployable.sh

The service-catalogue website for this templates repository: every stack
described for humans and crawlers (SEO + `llms.txt`), with June-2026 pricing
comparisons against managed SaaS equivalents and other PaaS, and Miget plan
recommendations computed from each template's `compose.miget.yaml` footprint.

Built with Astro 5, fully static, zero client JS.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Deploy

It is itself a catalogue-convention template: `compose.yaml` +
`compose.miget.yaml` (nginx serving the static build on :5000, 128 MiB).
Point a Miget Compose Stack at this repo with path `deployable-sh`, then add
the `deployable.sh` domain to the app.

## Editing content

- Per-app copy: `src/data/apps/<slug>.ts`
- SaaS price points (single source of truth): `src/data/saas-pricing.ts`
- PaaS effective rates + Miget plan ladder: `src/config.ts`
- Plan-fit math: `src/lib/sizing.ts`

When a template's RAM/disk changes in its `compose.miget.yaml`, update
`ramMiB` / `diskGB` in that app's data file - plan recommendations and all
comparison tables recompute at build time.
