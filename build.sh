#!/bin/sh
OUT=$(cat src/*.js | minify --type js)
echo $OUT > firefox/out.js
