# Typesense

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=typesense&type=stack)

[Typesense](https://typesense.org) - the typo-tolerant instant-search
engine built for raw speed: a C++ binary with in-memory indexes, facets,
filtering, vector + hybrid search, and an InstantSearch-compatible
adapter. The performance-obsessed sibling to the catalogue's
`meilisearch`.

## Local

```bash
cp .env.example .env && docker compose up -d
curl -H "X-TYPESENSE-API-KEY: $TYPESENSE_API_KEY" localhost:5000/health
```

## On Miget

Create a Compose Stack pointing at this repo, path `typesense`. One
required variable: **`TYPESENSE_API_KEY`** (the admin key - mint scoped,
search-only keys via the API for anything browser-facing). In-project
apps index and search at `http://typesense:5000`.

Sizing is honest and simple: indexes live in RAM, budget ~2-3x the size
of the fields you index. Typesense Cloud charges $21.60/month for a
0.5 GB node of this exact binary; the 1 GiB plan here is $7. Clustering
(Raft) exists upstream when one node stops being enough.

Meilisearch or Typesense? Meilisearch for the gentlest DX and built-in
hybrid AI search; Typesense for raw speed at scale and richer filtering.
Both are here - benchmark with your data for one afternoon.
