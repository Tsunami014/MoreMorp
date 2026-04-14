// From injct.js: `modifyJSON` & `hook`
const origFetch = window.fetch;
window.fetch = (...args) => {
  let orig = origFetch(...args);
  if (args[0].endsWith(".json")) {
    orig = modifyJSON(args[0], orig)
  }
  return orig;
};

// We don't need this for now, but it works
/*const imgDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src")
Object.defineProperty(HTMLImageElement.prototype, "src", {
  get: imgDesc.get,
  set(value) {
    console.log("img:", value)
    return imgDesc.set.call(this, value)
  }
})*/

hook()
console.log("MoreMorp loaded successfully!")
