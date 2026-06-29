# changedetection.io

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=changedetection&type=stack)

[changedetection.io](https://changedetection.io) - watch any web page
for changes (prices, stock, content, competitors' pages) with filters,
diffs, and notifications to 80+ targets (the in-project `ntfy` template
included). Single container, one volume.

## Local

```bash
docker compose up -d
open http://localhost:5000
```

## On Miget

Create a Compose Stack pointing at this repo, path `changedetection` -
no required variables. Set **`BASE_URL`** to the app's https domain
(notification links embed it) and **set a UI password in Settings
immediately** (the UI ships open).

The built-in fast fetcher covers most sites without a browser. JS-heavy
pages upstream handle with a Chrome sidecar that needs privileges a PaaS
does not grant - that one capability is honestly out of scope here.
