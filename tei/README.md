# Text Embeddings Inference (TEI)

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=tei&type=stack)

[TEI](https://github.com/huggingface/text-embeddings-inference) - Hugging
Face's Rust embeddings server: small models like `BAAI/bge-small-en-v1.5`
(384-dim) serve real RAG workloads from CPU in ~512 MB, over both TEI's
native API and an **OpenAI-compatible `/v1/embeddings`** endpoint.

**Internal-only by design**: TEI has no built-in auth, so it never gets a
public domain - apps in the same project call `http://tei:5000`.

## Local

```bash
docker compose up -d        # first start downloads the model (~130 MB)
curl localhost:5000/v1/embeddings -H 'Content-Type: application/json' \
  -d '{"input": "hello world"}'
```

## On Miget

Create a Compose Stack pointing at this repo, path `tei` - no variables
(set `MODEL_ID` to swap models; one model per instance). The model
caches on the volume, so restarts are fast.

This closes the RAG loop entirely in-project: embed with `tei`, store in
`qdrant`/`chromadb`, retrieve from your apps or `open-webui`/`flowise` -
zero per-token embedding costs, no data leaving the project network.
Reranking: TEI also serves reranker models (`/rerank`) - run a second
instance with a reranker `MODEL_ID`.

Note: the `cpu-*` images are amd64; CPU latency for bge-small is in the
tens of milliseconds per text. Apache-2.0.
