// From injct.js: `modifyJSON` & `hook`
const origFetch = window.fetch;
window.fetch = async function (...args) {
  if (!args[0].endsWith(".json")) {
    return origFetch(...args)
  }
  console.log("Fetching", args[0])
  let orig = await origFetch(...args);
  const data = await orig.clone().json();
  modifyJSON(args[0], data)

  return new Response(JSON.stringify(data), {
    status: orig.status,
    statusText: orig.statusText,
    headers: new Headers(orig.headers),
  });
};

// This works if needed later
/*const imgDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src")
Object.defineProperty(HTMLImageElement.prototype, "src", {
  get: imgDesc.get,
  set(value) {
    //console.log("img:", value)
    return imgDesc.set.call(this, value)
  }
})*/

hook()
console.log("[MoreMorp] Loaded successfully!")
