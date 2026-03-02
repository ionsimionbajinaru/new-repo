(() => {
  const applyButton = document.getElementById("apply-btn");
  const hasDataLayer = Array.isArray(window.dataLayer);
  const sessionStartedAt = Date.now();

  const trackEvent = (name, payload = {}) => {
    if (hasDataLayer) {
      window.dataLayer.push({ event: name, ...payload });
    }

    if (window.plausible) {
      window.plausible(name, { props: payload });
    }

    console.debug("tracking", name, payload);
  };

  if (applyButton) {
    applyButton.addEventListener("click", () => {
      trackEvent("apply_click", { cta: "hero_primary" });
    });
  }

  let scrollTracked = false;
  const onScroll = () => {
    if (scrollTracked) return;

    const scrollArea = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollArea <= 0) return;

    const progress = window.scrollY / scrollArea;
    if (progress >= 0.5) {
      trackEvent("scroll_50", { progress: 0.5 });
      scrollTracked = true;
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      trackEvent("time_on_page", {
        seconds: Math.round((Date.now() - sessionStartedAt) / 1000),
      });
    }
  });

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "REPLACE_WITH_YOUR_CRISP_WEBSITE_ID";

      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }, 1200);
  });
})();
