rm -rf extract
unzip $1 -d extract &>/dev/null

rm -rf src/levels
mv extract/shared/src/levels/ src
{
  echo "// Auto-generated"
  echo "const LEVELS = ["
  for f in src/levels/*; do
    nam=$(basename "$f")
    printf '  "%s",\n' "${nam%.*}"
  done
  echo "]"
} > src/_*levels.js

while read -r f; do
  mv "$f" src/images/"$(basename "$f")"
done < <(find extract/client -name "*.webp")
{
  echo "// Auto-generated"
  echo "const IMGS = ["
  for f in src/images/*; do
    printf '  "%s",\n' "$(basename "$f")"
  done
  echo "]"
} > src/images.js
