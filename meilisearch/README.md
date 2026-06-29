# Meilisearch

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=meilisearch&type=stack)

[Meilisearch](https://meilisearch.com), instant, typo-tolerant search in a
single container + volume. Public on its app domain; protected by the
master key (`MEILI_ENV=production` rejects keyless requests).

## Local

```bash
cp .env.example .env && docker compose up -d
curl -H "Authorization: Bearer $MEILI_MASTER_KEY" localhost:5000/keys
```

## On Miget

Create a Compose Stack pointing at this repo. One required variable:
**`MEILI_MASTER_KEY`** (`openssl rand -base64 24`). Use the derived
search/admin API keys (`GET /keys`) in your apps, never ship the master
key to a browser. In-project apps can also use `http://meilisearch:5000`.

Keep `replicas` at 1 (single-node store; data on the volume).
