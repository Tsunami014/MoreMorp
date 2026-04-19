#!/bin/sh
rm -rf dist

# All
OUT=$(cat src/_*.js | minify --type js)

# Firefox
mkdir -p dist/firefox
cp firefox/manifest.json dist/firefox
cat src/replace.js src/gameCanvas.js firefox/redirect.js | minify --type js > dist/firefox/redirect.js
echo "$OUT" > dist/firefox/out.js
cp -r src/images dist/firefox/images
cp -r src/levels dist/firefox/levels
echo "Built firefox extension at dist/firefox"
