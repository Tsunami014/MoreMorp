browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);

    if (url.pathname.startsWith("/moremorp/assets/")) {
      const file = url.pathname.replace("/moremorp/assets/", "assets/");
      const redirectUrl = browser.runtime.getURL(file);

      return { redirectUrl };
    }
  },
  { urls: ["*://morp.hackclub.com/*"], types: ["image"] },
  ["blocking"]
);
