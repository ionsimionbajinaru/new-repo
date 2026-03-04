(() => {
  const applyButton = document.getElementById("apply-btn");
  const modal = document.getElementById("apply-modal");
  const closeButton = document.getElementById("close-modal");
  const leadForm = document.getElementById("lead-form");
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

  const toggleModal = (open) => {
    if (!modal || !applyButton) return;
    modal.classList.toggle("is-open", open);
    modal.setAttribute("aria-hidden", String(!open));
    applyButton.setAttribute("aria-expanded", String(open));
  };

  applyButton?.addEventListener("click", () => {
    trackEvent("apply_click", { cta: "hero_primary" });
    toggleModal(true);
  });

  closeButton?.addEventListener("click", () => {
    toggleModal(false);
    applyButton?.focus();
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(false);
      applyButton?.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleModal(false);
    }
  });

  leadForm?.addEventListener("submit", () => {
    trackEvent("application_submit", { source: "onsite_form" });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      trackEvent("time_on_page", {
        seconds: Math.round((Date.now() - sessionStartedAt) / 1000),
      });
    }
  });
})();


// ENGAGED 45s
setTimeout(function () {
  if (typeof gtag === "function") {
    gtag('event', 'engaged_30s');
  }
}, 30000);
