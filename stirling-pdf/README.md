# Stirling-PDF

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=stirling-pdf&type=stack)

[Stirling-PDF](https://www.stirlingpdf.com) - 50+ PDF tools in the
browser: merge, split, compress, OCR, convert, sign, redact, watermark.
Everything processes on YOUR server - which is the entire point when
the documents are contracts, medical records, or anything else you
would rather not upload to a random "free PDF tools" site.

## Local

```bash
cp .env.example .env && docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `stirling-pdf`.
Required variable: **`ADMIN_PASSWORD`** (with login enabled, applied on
first startup only). Users and settings persist on the `/configs`
volume.

It is a JVM app - 1 GiB keeps the common tools snappy; raise heap and
plan together for heavy OCR batches (extra OCR languages mount at
`/usr/share/tessdata`). License: MIT core with some proprietary
directories upstream - the tool set here is the open one.
