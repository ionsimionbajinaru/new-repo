(() => {
  const applyButton = document.getElementById("apply-btn");
  const modal = document.getElementById("apply-modal");
  const closeButton = document.getElementById("close-modal");
  const leadForm = document.getElementById("lead-form");
  const langToggle = document.getElementById("lang-toggle");
  const hasDataLayer = Array.isArray(window.dataLayer);
  const sessionStartedAt = Date.now();

  const copy = {
    en: {
      htmlLang: "en",
      toggleAria: "Switch language to Romanian",
      mainSectionAria: "MVP positioning and conversion section",
      filtersAria: "Authority filters",
      deliveryAria: "Delivery standards",
      closeModalAria: "Close form",
      eyebrow: "Production-Ready MVP Systems",
      headline: "Authority. Conversion. Scale.",
      subheadline: "Built. Deployed. Scaled.",
      applyButton: "Apply for MVP Project",
      microProof: "Global • Remote • Execution without friction",
      filterOne: "High-intent founders only",
      filterTwo: "Clear budget & scope",
      filterThree: "Fast execution mindset",
      cardOne: "• Production-Ready. Not concept slides.",
      cardTwo: "• Analytics + tracking installed.",
      cardThree: "• Weekly demos. Clean deployment.",
      fineprint: "© Ion Simion Băjinaru. All rights reserved.",
      modalTitle: "Apply for MVP Project",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      budgetLabel: "Budget range",
      budgetSelect: "Select budget",
      projectScopeLabel: "Project scope",
      scopePlaceholder: "MVP type, timeline, market",
      submitButton: "Send application",
      formSubject: "New MVP Project Application",
    },
    ro: {
      htmlLang: "ro",
      toggleAria: "Schimbă limba în engleză",
      mainSectionAria: "Secțiune de poziționare MVP și conversie",
      filtersAria: "Filtre de autoritate",
      deliveryAria: "Standarde de livrare",
      closeModalAria: "Închide formularul",
      eyebrow: "Sisteme MVP gata de producție",
      headline: "Autoritate. Conversie. Scalare.",
      subheadline: "Construit. Lansat. Scalabil.",
      applyButton: "Aplică pentru proiect MVP",
      microProof: "Global • Remote • Execuție fără fricțiune",
      filterOne: "Doar fondatori cu intenție ridicată",
      filterTwo: "Buget și scop clar",
      filterThree: "Mentalitate de execuție rapidă",
      cardOne: "• Gata de producție. Nu slide-uri conceptuale.",
      cardTwo: "• Analytics + tracking instalate.",
      cardThree: "• Demo-uri săptămânale. Deploy curat.",
      fineprint: "© Ion Simion Băjinaru. Toate drepturile rezervate.",
      modalTitle: "Aplică pentru proiect MVP",
      fullNameLabel: "Nume complet",
      emailLabel: "Email",
      budgetLabel: "Interval buget",
      budgetSelect: "Selectează bugetul",
      projectScopeLabel: "Scopul proiectului",
      scopePlaceholder: "Tip MVP, timeline, piață",
      submitButton: "Trimite aplicația",
      formSubject: "Aplicație nouă proiect MVP",
    },
  };

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

  const setLanguage = (lang) => {
    const locale = copy[lang] ? lang : "en";
    const dict = copy[locale];

    document.documentElement.setAttribute("lang", dict.htmlLang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.dataset.i18nAriaLabel;
      if (dict[key]) {
        el.setAttribute("aria-label", dict[key]);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    document.querySelectorAll("[data-i18n-value]").forEach((el) => {
      const key = el.dataset.i18nValue;
      if (dict[key]) {
        el.value = dict[key];
      }
    });

    langToggle?.setAttribute("aria-label", dict.toggleAria);
    langToggle?.querySelectorAll(".lang-label").forEach((label) => {
      label.classList.toggle("is-active", label.dataset.lang === locale);
    });

    localStorage.setItem("site-language", locale);
  };

  const initLanguageToggle = () => {
    const initialLanguage = localStorage.getItem("site-language") || "en";
    setLanguage(initialLanguage);

    langToggle?.addEventListener("click", () => {
      const currentLang = localStorage.getItem("site-language") || "en";
      const nextLang = currentLang === "en" ? "ro" : "en";
      setLanguage(nextLang);
      trackEvent("language_toggle", { lang: nextLang });
    });
  };

  initLanguageToggle();

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
    gtag("event", "engaged_30s");
  }
}, 30000);
