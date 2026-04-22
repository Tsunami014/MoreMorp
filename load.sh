rm -rf extract
unzip $1 -d extract &>/dev/null

mv extract/shared/src/assets/manifest.json src/manif.json
rm -rf src/levels
mv extract/shared/src/levels/ src

rm -rf src/images/*
while read -r f; do
  mv "$f" src/images/"$(basename "$f")"
done < <(find extract/client -name "*.webp")

{
  echo "// Auto-generated"
  echo "const PATCH = {"
  gen() {
    echo "  $1: {"
    printf '  prefix: "%s", data: [\n' "$3/"
    for f in "$2"/*; do
      printf '    "%s",\n' "$(basename "$f")"
    done
    if [[ -v 4 ]]; then
      echo "]}}"
    else
      echo "  ]},"
    fi
  }
  gen IMGS src/images images
  gen LEVELS src/levels levels end

  echo "PATCH.IMGS.data.push('portal.webp')"
} > src/replace.js

echo "Loaded in assets from requested file!"
