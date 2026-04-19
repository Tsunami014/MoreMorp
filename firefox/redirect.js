browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log("Fetching", details.url);
    const url = new URL(details.url);

    //console.log(url)
    if (url.pathname.includes("GameCanvas")) {
      const filter = browser.webRequest.filterResponseData(details.requestId);
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      let data = "";
      filter.ondata = (event) => {
        data += decoder.decode(event.data, { stream: true });
      };
      filter.onstop = () => {
        const patched = patchData(data); // Included  gameCanvas.js
        filter.write(encoder.encode(patched));
        filter.close();
      };
    }

    for (const pth of IMGS) {
      if (url.pathname.endsWith(pth)) {
        const redirectUrl = browser.runtime.getURL("images/"+pth);
        return { redirectUrl };
      }
    }
    if (url.pathname.startsWith("/assets/levels/mm_") && url.pathname.endsWith(".json")) {
      const file = url.pathname.replace("/assets/levels/mm_", "levels/");
      const redirectUrl = browser.runtime.getURL(file);
      return { redirectUrl };
    }
  },
  { urls: ["*://morp.hackclub.com/*"], types: ["image", "script", "xmlhttprequest", "other"] },
  ["blocking"]
);
