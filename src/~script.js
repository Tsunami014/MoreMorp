// From injct.js: `modifyJSON` & `hook`
const origFetch = window.fetch;
window.fetch = async function (...args) {
  if (!args[0].endsWith(".json")) {
    return origFetch(...args)
  }
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

const origLog = console.log;
console.log = (...args)=>{
  if (typeof args[0] === "string" && args[0].includes("Entering exit zone")) {
    origLog("Entered an exit zone!")
  }
  origLog(...args)
}

hook()
console.log("[MoreMorp] Loaded successfully!")
