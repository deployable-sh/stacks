import type { AppBase } from './index';

export const tei: AppBase = {
  slug: 'tei',
  name: 'TEI Embeddings',
  upstream: 'Text Embeddings Inference (Hugging Face)',
  upstreamUrl: 'https://github.com/huggingface/text-embeddings-inference',
  license: 'Apache-2.0',
  licenseTier: 'permissive',
  tagline:
    'A self-hosted embeddings API on CPU - bge-small in 512 MB, OpenAI-compatible, zero per-token bills.',
  category: 'LLM Infrastructure',
  status: 'stable',
  seoTitle: 'Self-host an embeddings API: HuggingFace TEI on CPU',
  seoDescription:
    'Deploy Text Embeddings Inference - an OpenAI-compatible /v1/embeddings endpoint serving bge-small from CPU in ~512 MB - for $7/month. Make your RAG stack fully self-contained.',
  keywords: [
    'self-hosted embeddings api',
    'text embeddings inference docker',
    'openai embeddings alternative',
    'bge-small cpu serving',
    'rag embeddings self-hosted',
    'tei huggingface',
  ],
  intro: [
    'Embeddings are the quiet recurring cost of RAG: every document chunk and every query goes through the API meter, forever. Small open models ended that trade - bge-small at 384 dimensions handles real retrieval workloads, and Hugging Face’s TEI serves it from CPU in about half a gigabyte of RAM, no GPU anywhere.',
    'TEI is a Rust server with an OpenAI-compatible /v1/embeddings endpoint, so existing clients just change the base URL. It is internal-only by design (no built-in auth): apps in your project call http://tei:5000 over the private network.',
    'This completes the catalogue’s self-contained RAG loop: embed with tei, store in qdrant or chromadb, generate via the litellm gateway, trace in langfuse or phoenix - with the embedding leg now costing exactly $7/month flat.',
  ],
  features: [
    'OpenAI-compatible /v1/embeddings plus native /embed and /rerank',
    'bge-small default: 384-dim, tens of ms per text on CPU',
    'Rust + candle: ~512 MB RSS, no Python, no GPU',
    'Model cached on a volume - fast restarts',
    'Swap MODEL_ID for other embedders or rerankers',
    'Apache-2.0, internal-only posture by default',
  ],
  topology: [
    { service: 'tei', role: 'embeddings API (:5000)', isPublic: 'no (by design - no built-in auth)' },
  ],
  requiredVars: [],
  ramMiB: 1024,
  diskGB: 2,
  services: 1,
  sizingNote:
    'bge-small fits comfortably in 1 GiB; larger embedders (bge-base/large) want the next plans. One model per instance - run a second instance for a reranker.',
  faq: [
    {
      q: 'How good is bge-small compared to API embeddings?',
      a: 'For typical RAG retrieval it is competitive with commercial small embeddings - strong MTEB scores at 384 dimensions, which also halves your vector storage versus 768+ dim models. Test with your corpus; swapping MODEL_ID is one variable.',
    },
    {
      q: 'What does this actually save?',
      a: 'API embeddings meter every chunk at index time and every query forever, and re-indexing a corpus repeats the whole bill. Self-hosted, the marginal cost of embedding is zero - re-index freely, embed logs, embed everything.',
    },
    {
      q: 'Why is it internal-only?',
      a: 'TEI ships no authentication, so it must not face the internet. In-project apps reach tei:5000 over the private network - the same posture as the qdrant and chromadb templates it pairs with.',
    },
    {
      q: 'Can it rerank too?',
      a: 'Yes - TEI serves reranker models on /rerank. Run a second instance with a reranker MODEL_ID (e.g. bge-reranker variants) and call it after retrieval for a meaningful quality lift.',
    },
  ],
};
