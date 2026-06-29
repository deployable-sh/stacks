# Shlink

[![Deploy to Miget](https://miget.com/deploy-to-miget.svg)](https://miget.com/deploy?repo=https://github.com/deployable-sh/stacks&path=shlink&type=stack)

[Shlink](https://shlink.io) - a self-hosted URL shortener: short links on
your own domain with a full REST API, QR codes, rich visit analytics
(with optional GeoIP), tags, device-based redirect rules, and link
expiration. The server handles the redirects and exposes the API on port
5000; a managed Postgres holds the links and stats.

## Local

```bash
cp .env.example .env && docker compose up -d
curl http://localhost:5000/rest/health        # -> {"status":"pass"}
```

## On Miget

Create a Compose Stack pointing at this repo, path `shlink`. The managed
Postgres is provisioned and auto-wired. Required variables:

- **`DEFAULT_DOMAIN`** - the app's https domain (e.g. `links.example.com`).
- **`INITIAL_API_KEY`** - a long random string; your first API key
  (`openssl rand -hex 16`).

`IS_HTTPS_ENABLED` is forced to `true` on Miget. All link and visit data
lives in Postgres, so the app is stateless.

### Managing it

Shlink ships no UI of its own - drive it with the REST API, the
`shlink-cli`, or the **Shlink Web Client**. Point the official hosted
client at <https://app.shlink.io> (it talks to your server from your
browser; nothing is sent to a third party), or self-host the
`shlinkio/shlink-web-client` image, using your `DEFAULT_DOMAIN` as the
server URL and the `INITIAL_API_KEY`.

Bitly's paid plans start at $10/month and cap branded links and clicks;
Short.io and Rebrandly meter the same way. Shlink is one ~$13/month plan
with unlimited links, your own domain, and the analytics on your own
infrastructure. MIT.
