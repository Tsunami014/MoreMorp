const origFetch = window.fetch;
window.fetch = (...args) => {
  console.log("fetch:", args[0]);
  return origFetch(...args);
};

const imgDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
Object.defineProperty(HTMLImageElement.prototype, "src", {
  get: imgDesc.get,
  set(value) {
    console.log("img:", value);
    return imgDesc.set.call(this, value);
  }
});

console.log("MoreMorp loaded successfully!");
