rm -rf extract
unzip $1 -d extract &>/dev/null

#cp extract/shared/src
rm -rf src/levels
cp -r extract/shared/src/levels/ src

{
  echo "// Auto-generated"
  echo "const LEVELS = ["
  for f in src/levels/*; do
    nam=$(basename "$f")
    printf '  "%s",\n' "${nam%.*}"
  done
  echo "]"
} > src/_*levels.js
