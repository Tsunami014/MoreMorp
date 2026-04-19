#!/bin/sh
OUT=$(cat src/_*.js | minify --type js)
echo $OUT > firefox/out.js
rm -rf firefox/assets
cp -r src/assets firefox/assets
