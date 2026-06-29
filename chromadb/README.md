# ChromaDB

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=chromadb&type=stack)

[Chroma](https://www.trychroma.com) vector database, single container +
volume, **internal-only** (Chroma has no built-in auth; the project network
is the boundary, like the MongoDB template).

## Local

```bash
docker compose up -d
curl localhost:8000/api/v2/heartbeat
```

## On Miget

Create a Compose Stack pointing at this repo, no variables, no public
domain (by design). Apps in the same project connect with:

```python
import chromadb
client = chromadb.HttpClient(host="chroma", port=8000)
```

Data persists on the volume. Keep `replicas` at 1 (single-node store).
