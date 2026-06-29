-- Letta's first migration uses the `vector` type, so the extension must exist
-- before migrations run. The pgvector image ships the extension but does not
-- enable it automatically.
CREATE EXTENSION IF NOT EXISTS vector;
