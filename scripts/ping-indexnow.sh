#!/usr/bin/env bash
# Submit margadeshaka.com URLs to IndexNow (Bing, Yandex, Seznam, DuckDuckGo).
# Run after every production deploy. Returns HTTP 202 on success.
set -euo pipefail

KEY="bfb494b3f2d98cdb2c9042961b3b3c98"
HOST="margadeshaka.com"

# Edit this list when you add new pages — pulls from sitemap.ts.
URLS=(
  "https://${HOST}/"
  "https://${HOST}/compliance"
  "https://${HOST}/privacy"
  "https://${HOST}/terms"
)

# Build the JSON payload.
URL_JSON=$(printf '"%s",' "${URLS[@]}" | sed 's/,$//')
PAYLOAD=$(cat <<JSON
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "https://${HOST}/${KEY}.txt",
  "urlList": [${URL_JSON}]
}
JSON
)

echo "Pinging IndexNow with ${#URLS[@]} URLs..."
HTTP=$(curl -s -o /tmp/indexnow.out -w "%{http_code}" \
  -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")

if [[ "$HTTP" =~ ^20[02]$ ]]; then
  echo "✓ IndexNow accepted (HTTP ${HTTP}). URLs queued for instant indexing."
else
  echo "✗ IndexNow returned HTTP ${HTTP}"
  cat /tmp/indexnow.out
  exit 1
fi
