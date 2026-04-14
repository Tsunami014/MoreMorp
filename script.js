const s = document.createElement("script");

// Otherwise it wouldn't load properly
s.textContent = `
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    console.log("Intercepted fetch:", args);
    return originalFetch.apply(this, args);
  };

  console.log("MoreMorp successfully loaded!");
`;

// Inject immediately
document.documentElement.appendChild(s);
s.remove();
