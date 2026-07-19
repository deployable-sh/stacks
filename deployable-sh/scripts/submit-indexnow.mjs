#!/usr/bin/env node
// Submit the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver; Perplexity
// rides on Bing). The key is public by design - authentication is the key file
// served from the site root. Run AFTER deploy, against the live site.
//
// Usage: node scripts/submit-indexnow.mjs [--dry-run]

const SITE_URL = (process.env.SITE_URL || "https://deployable.sh").replace(/\/$/, "");
const KEY = process.env.INDEXNOW_KEY || "a8aeec412745d412f048f43f5c70970d";
const HOST = new URL(SITE_URL).host;
const DRY = process.argv.includes("--dry-run");

async function xml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "deployable-indexnow/1.0" } });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

function locs(body) {
  return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const index = await xml(`${SITE_URL}/sitemap-index.xml`);
const urls = [...new Set((await Promise.all(locs(index).map(xml))).flatMap(locs))];
console.log(`[indexnow] ${urls.length} URL(s) from the live sitemap`);
if (urls.length === 0) process.exit(1);
if (DRY) {
  console.log(urls.slice(0, 5).join("\n") + (urls.length > 5 ? `\n... +${urls.length - 5} more` : ""));
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: urls }),
});
console.log(`[indexnow] ${res.ok ? "OK" : "FAILED"} (HTTP ${res.status})`);
if (!res.ok) process.exit(1);
