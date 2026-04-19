browser.webRequest.onBeforeRequest.addListener(
  (details) => {
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

    if (url.pathname.startsWith("/moremorp/assets/")) {
      const file = url.pathname.replace("/moremorp/assets/", "assets/");
      const redirectUrl = browser.runtime.getURL(file);

      return { redirectUrl };
    }
  },
  { urls: ["*://morp.hackclub.com/*"], types: ["image", "script"] },
  ["blocking"]
);
