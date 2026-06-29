# Qdrant

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=qdrant&type=stack)

[Qdrant](https://qdrant.tech) vector database, single container + volume,
**internal-only** by default (no API key is configured; the project network
is the boundary).

## Local

```bash
docker compose up -d
open http://localhost:6333/dashboard
```

## On Miget

Create a Compose Stack pointing at this repo, no variables, no public
domain (by design). Apps in the same project connect with:

```python
from qdrant_client import QdrantClient
client = QdrantClient(host="qdrant", port=6333)   # grpc_port=6334
```

To expose the dashboard publicly, first set
`QDRANT__SERVICE__API_KEY` (env) and remove `private: true` in
`compose.miget.yaml`, never expose it keyless. Single node; keep
`replicas` at 1 (distributed mode is a future variant).
