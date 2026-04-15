#!/bin/sh
OUT=$(cat src/*.js | minify --type js)
echo $OUT > firefox/out.js
rm -rf firefox/assets
cp -r src/assets firefox/assets
