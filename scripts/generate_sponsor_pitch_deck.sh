#!/usr/bin/env bash
# Render the Beyond Stage Zero sponsor pitch deck to a 16:9 PDF.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/docs/pitch-deck/index.html"
OUT="$ROOT/docs/BSZ-Sponsor-Pitch-Deck.pdf"
ARTIFACT_DIR="${ARTIFACT_DIR:-/opt/cursor/artifacts}"
USER_DATA="$(mktemp -d /tmp/bsz-deck-chrome.XXXXXX)"

cleanup() {
  rm -rf "$USER_DATA"
}
trap cleanup EXIT

if [[ ! -f "$HTML" ]]; then
  echo "Missing deck HTML: $HTML" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")" "$ARTIFACT_DIR"

# Headless Chrome print — CSS @page sets 16:9. Timeout avoids hung Chrome processes.
timeout 60s google-chrome \
  --headless=new \
  --disable-gpu \
  --no-first-run \
  --no-default-browser-check \
  --disable-extensions \
  --disable-background-networking \
  --disable-sync \
  --disable-translate \
  --metrics-recording-only \
  --user-data-dir="$USER_DATA" \
  --no-pdf-header-footer \
  --hide-scrollbars \
  --virtual-time-budget=10000 \
  --run-all-compositor-stages-before-draw \
  --print-to-pdf="$OUT" \
  --print-to-pdf-no-header \
  "file://$HTML"

cp "$OUT" "$ARTIFACT_DIR/BSZ-Sponsor-Pitch-Deck.pdf"
echo "Wrote $OUT"
echo "Copied $ARTIFACT_DIR/BSZ-Sponsor-Pitch-Deck.pdf"
