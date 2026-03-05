(() => {
  // Referințe către elementele principale din interfață.
  const applyButton = document.getElementById("apply-btn");
  const modal = document.getElementById("apply-modal");
  const closeButton = document.getElementById("close-modal");
  const techStackButton = document.getElementById("tech-stack-btn");
  const techStackModal = document.getElementById("tech-stack-modal");
  const closeTechButton = document.getElementById("close-tech-modal");
  const leadForm = document.getElementById("lead-form");
  const langToggle = document.getElementById("lang-toggle");
  const privacyButton = document.getElementById("privacy-btn");
  const cookiePolicyButton = document.getElementById("cookie-policy-btn");
  const contactInfoButton = document.getElementById("contact-info-btn");
  const privacyModal = document.getElementById("privacy-modal");
  const cookiePolicyModal = document.getElementById("cookie-policy-modal");
  const contactInfoModal = document.getElementById("contact-info-modal");
  const closePrivacyButton = document.getElementById("close-privacy-modal");
  const closeCookiePolicyButton = document.getElementById("close-cookie-policy-modal");
  const closeContactInfoButton = document.getElementById("close-contact-info-modal");

  // Chei și constante folosite pentru localizare și tracking.
  const LANGUAGE_KEY = "site-language";
  const DETECTED_LANGUAGE_KEY = "detected-site-language";
  const SUPPORTED_LANGUAGES = ["en", "ro", "it"];
  const IP_LOOKUP_ENDPOINT = "https://ipapi.co/json/";
  const sessionStartedAt = Date.now();
  const COOKIE_CONSENT_KEY = "cookie-consent";
  const GTM_CONTAINER_ID = "GTM-WWH778WP";
  let analyticsLoaded = false;

  // Config pentru conversia bugetelor din USD în monede locale.
  const currencyByLocale = {
    ro: { code: "RON", rate: 4.5 },
    it: { code: "EUR", rate: 0.92 },
  };

  // Variantele standard de buget afișate în formular.
  const budgetOptions = [
    {
      value: "under-10000",
      usdMin: 0,
      usdMax: 10000,
      labels: {
        en: "< $10,000",
        ro: "Sub ~45.000 RON",
        it: "Sotto ~9.200 EUR",
      },
    },
    {
      value: "10000",
      usdMin: 10000,
      usdMax: 25000,
      labels: {
        en: "$10,000 – $25,000",
      },
    },
    {
      value: "25000",
      usdMin: 25000,
      usdMax: 50000,
      labels: {
        en: "$25,000 – $50,000",
      },
    },
    {
      value: "50000",
      usdMin: 50000,
      labels: {
        en: "$50,000+",
      },
    },
  ];

  // Dicționarul de traduceri pentru text și atribute.
  const copy = {
    en: {
      htmlLang: "en",
      toggleAria: "Language selector",
      mainSectionAria: "MVP positioning and conversion section",
      filtersAria: "Authority filters",
      deliveryAria: "Delivery standards",
      closeModalAria: "Close form",
      closeTechModalAria: "Close tech stack",
      techGridAria: "Technology stack icons",
      eyebrow: "Production-Ready MVP Systems",
      headline: "Authority. Conversion. Scale.",
      subheadline: "Built. Deployed. Scaled.",
      applyButton: "Apply for MVP Project",
      techStackButton: "Tech Stack",
      microProof: "Global • Remote • Execution without friction",
      filterOne: "High-intent founders only",
      filterTwo: "Clear budget & scope",
      filterThree: "Fast execution mindset",
      cardOne: "• Production-Ready. Not concept slides.",
      cardTwo: "• Analytics + tracking installed.",
      cardThree: "• Weekly demos. Clean deployment.",
      fineprint: "© Ion Simion Băjinaru. All rights reserved.",
      modalTitle: "Apply for MVP Project",
      techStackTitle: "Tech Stack",
      githubPortfolioLink: "View code portfolio →",
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
      toggleAria: "Selector limbă",
      mainSectionAria: "Secțiune de poziționare MVP și conversie",
      filtersAria: "Filtre de autoritate",
      deliveryAria: "Standarde de livrare",
      closeModalAria: "Închide formularul",
      closeTechModalAria: "Închide tehnologiile",
      techGridAria: "Iconițe stack tehnologic",
      eyebrow: "Sisteme MVP gata de producție",
      headline: "Autoritate. Conversie. Scalare.",
      subheadline: "Construit. Lansat. Scalabil.",
      applyButton: "Aplică pentru proiect MVP",
      techStackButton: "Tech Stack",
      microProof: "Global • Remote • Execuție fără fricțiune",
      filterOne: "Doar fondatori cu intenție ridicată",
      filterTwo: "Buget și scop clar",
      filterThree: "Mentalitate de execuție rapidă",
      cardOne: "• Gata de producție. Nu slide-uri conceptuale.",
      cardTwo: "• Analytics + tracking instalate.",
      cardThree: "• Demo-uri săptămânale. Deploy curat.",
      fineprint: "© Ion Simion Băjinaru. Toate drepturile rezervate.",
      modalTitle: "Aplică pentru proiect MVP",
      techStackTitle: "Tech Stack",
      githubPortfolioLink: "Vezi portofoliul de cod →",
      fullNameLabel: "Nume complet",
      emailLabel: "Email",
      budgetLabel: "Interval buget",
      budgetSelect: "Selectează bugetul",
      projectScopeLabel: "Scopul proiectului",
      scopePlaceholder: "Tip MVP, timeline, piață",
      submitButton: "Trimite aplicația",
      formSubject: "Aplicație nouă proiect MVP",
    },
    it: {
      htmlLang: "it",
      toggleAria: "Selettore lingua",
      mainSectionAria: "Sezione di posizionamento MVP e conversione",
      filtersAria: "Filtri di autorevolezza",
      deliveryAria: "Standard di consegna",
      closeModalAria: "Chiudi modulo",
      closeTechModalAria: "Chiudi stack tecnologico",
      techGridAria: "Icone dello stack tecnologico",
      eyebrow: "Sistemi MVP pronti per la produzione",
      headline: "Autorevolezza. Conversione. Scala.",
      subheadline: "Creato. Distribuito. Scalato.",
      applyButton: "Candidati per un progetto MVP",
      techStackButton: "Tech Stack",
      microProof: "Globale • Da remoto • Esecuzione senza attriti",
      filterOne: "Solo founder ad alta intenzione",
      filterTwo: "Budget e obiettivo chiari",
      filterThree: "Mentalità di esecuzione rapida",
      cardOne: "• Pronto per la produzione. Non slide concettuali.",
      cardTwo: "• Analytics + tracking installati.",
      cardThree: "• Demo settimanali. Deploy pulito.",
      fineprint: "© Ion Simion Băjinaru. Tutti i diritti riservati.",
      modalTitle: "Candidati per un progetto MVP",
      techStackTitle: "Tech Stack",
      githubPortfolioLink: "Vedi portfolio codice →",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      budgetLabel: "Fascia di budget",
      budgetSelect: "Seleziona il budget",
      projectScopeLabel: "Ambito del progetto",
      scopePlaceholder: "Tipo di MVP, timeline, mercato",
      submitButton: "Invia candidatura",
      formSubject: "Nuova candidatura progetto MVP",
    },
  };

  // Formatează valori numerice pentru moneda locală.
  const formatConvertedAmount = (amount, locale) => {
    const formatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    });

    return formatter.format(Math.round(amount));
  };

  // Construiește eticheta de buget în funcție de limba activă.
  const buildBudgetLabel = (budgetOption, locale) => {
    if (locale === "en") {
      return budgetOption.labels.en;
    }

    const currencyConfig = currencyByLocale[locale];
    if (!currencyConfig) {
      return budgetOption.labels.en;
    }

    const { rate, code } = currencyConfig;
    const minAmount = formatConvertedAmount(budgetOption.usdMin * rate, locale);
    const maxAmount = budgetOption.usdMax
      ? formatConvertedAmount(budgetOption.usdMax * rate, locale)
      : null;

    if (budgetOption.usdMin === 0 && maxAmount) {
      const prefix = locale === "ro" ? "Sub" : "Sotto";
      return `${prefix} ~${maxAmount} ${code}`;
    }

    if (maxAmount) {
      return `~${minAmount} – ${maxAmount} ${code}`;
    }

    return `~${minAmount}+ ${code}`;
  };

  // Citește limba din parametru URL, dacă este validă.
  const getLanguageFromParam = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang")?.trim().toLowerCase();
    return SUPPORTED_LANGUAGES.includes(lang) ? lang : null;
  };

  // Citește limba preferată salvată de utilizator.
  const getLanguageFromStorage = () => {
    const lang = localStorage.getItem(LANGUAGE_KEY)?.trim().toLowerCase();
    return SUPPORTED_LANGUAGES.includes(lang) ? lang : null;
  };

  // Citește limba detectată anterior pe baza IP-ului.
  const getDetectedLanguageFromStorage = () => {
    const lang = localStorage.getItem(DETECTED_LANGUAGE_KEY)?.trim().toLowerCase();
    return SUPPORTED_LANGUAGES.includes(lang) ? lang : null;
  };

  // Mapează țara detectată către limba implicită de afișare.
  const mapCountryToLanguage = (countryCode) => {
    const normalizedCountry = countryCode?.trim().toUpperCase();

    if (normalizedCountry === "RO") {
      return "ro";
    }

    if (normalizedCountry === "IT") {
      return "it";
    }

    return "en";
  };

  // Detectează limba din IP și memorează rezultatul pentru reutilizare.
  const detectLanguageFromIP = async () => {
    const cachedLanguage = getDetectedLanguageFromStorage();
    if (cachedLanguage) {
      return cachedLanguage;
    }

    try {
      const response = await fetch(IP_LOOKUP_ENDPOINT, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`IP detection failed with status ${response.status}`);
      }

      const payload = await response.json();
      const detectedLanguage = mapCountryToLanguage(payload?.country_code);
      localStorage.setItem(DETECTED_LANGUAGE_KEY, detectedLanguage);
      return detectedLanguage;
    } catch (error) {
      console.warn("Unable to detect language by IP.", error);
      return null;
    }
  };

  // Stabilește limba inițială folosind prioritatea: URL -> storage -> IP -> EN.
  const resolveInitialLanguage = async () => {
    const languageFromParam = getLanguageFromParam();
    if (languageFromParam) {
      return languageFromParam;
    }

    const languageFromStorage = getLanguageFromStorage();
    if (languageFromStorage) {
      return languageFromStorage;
    }

    return (await detectLanguageFromIP()) || "en";
  };


  // Încarcă Google Tag Manager doar după consimțământ explicit (accept).
  const loadAnalytics = () => {
    if (analyticsLoaded || !GTM_CONTAINER_ID) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
    document.head.appendChild(script);

    analyticsLoaded = true;

    setTimeout(() => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "engaged_30s");
      }
    }, 30000);
  };

  // Controlează bannerul GDPR și persistă preferința în localStorage.
  const initCookieConsent = () => {
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept");
    const rejectButton = document.getElementById("cookie-reject");
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!banner || !acceptButton || !rejectButton) {
      return;
    }

    const hideBanner = () => {
      banner.hidden = true;
    };

    if (savedConsent === "accepted") {
      hideBanner();
      loadAnalytics();
      return;
    }

    if (savedConsent === "rejected") {
      hideBanner();
      return;
    }

    banner.hidden = false;

    acceptButton.addEventListener("click", () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      hideBanner();
      loadAnalytics();
      trackEvent("cookie_consent", { consent: "accepted" });
    });

    rejectButton.addEventListener("click", () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
      hideBanner();
      console.info("Cookie consent rejected: analytics remains blocked.");
    });
  };

  // Trimite evenimente către instrumentele de analytics disponibile.
  const trackEvent = (name, payload = {}) => {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...payload });
    }

    if (window.plausible) {
      window.plausible(name, { props: payload });
    }

    console.debug("tracking", name, payload);
  };

  // Deschide sau închide un modal și sincronizează atributele de accesibilitate.
  const toggleModal = (modalElement, triggerElement, open) => {
    if (!modalElement || !triggerElement) {
      return;
    }

    modalElement.classList.toggle("is-open", open);
    modalElement.setAttribute("aria-hidden", String(!open));
    triggerElement.setAttribute("aria-expanded", String(open));
  };


  // Leagă deschiderea/închiderea pentru un modal generic cu trigger și buton de close.
  const bindModal = (openButton, modalElement, closeButtonElement) => {
    openButton?.addEventListener("click", () => {
      toggleModal(modalElement, openButton, true);
    });

    closeButtonElement?.addEventListener("click", () => {
      toggleModal(modalElement, openButton, false);
      openButton?.focus();
    });

    modalElement?.addEventListener("click", (event) => {
      if (event.target === modalElement) {
        toggleModal(modalElement, openButton, false);
        openButton?.focus();
      }
    });
  };

  // Actualizează textele simple pe baza atributului data-i18n.
  const updateLocalizedText = (dict) => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dict[key]) {
        element.textContent = dict[key];
      }
    });
  };

  // Actualizează aria-label pe elementele care au cheie i18n dedicată.
  const updateLocalizedAriaLabels = (dict) => {
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (dict[key]) {
        element.setAttribute("aria-label", dict[key]);
      }
    });
  };

  // Actualizează placeholder-ele localizate din formular.
  const updateLocalizedPlaceholders = (dict) => {
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (dict[key]) {
        element.setAttribute("placeholder", dict[key]);
      }
    });
  };

  // Actualizează valorile elementelor care folosesc data-i18n-value.
  const updateLocalizedValues = (dict) => {
    document.querySelectorAll("[data-i18n-value]").forEach((element) => {
      const key = element.dataset.i18nValue;
      if (dict[key]) {
        element.value = dict[key];
      }
    });
  };

  // Reface opțiunile de buget în limba curentă, păstrând selecția existentă.
  const updateBudgetOptions = (dict, locale) => {
    const budgetSelect = leadForm?.querySelector('select[name="budget"]');
    if (!budgetSelect) {
      return;
    }

    const selectedValue = budgetSelect.value;
    const placeholder = budgetSelect.querySelector("option[value='']");

    if (placeholder) {
      placeholder.textContent = dict.budgetSelect;
    }

    budgetSelect
      .querySelectorAll("option[value]:not([value=''])")
      .forEach((option) => option.remove());

    budgetOptions.forEach((budgetOption) => {
      const option = document.createElement("option");
      option.value = budgetOption.value;
      option.textContent = buildBudgetLabel(budgetOption, locale);
      budgetSelect.appendChild(option);
    });

    if (selectedValue) {
      budgetSelect.value = selectedValue;
    }
  };

  // Evidențiază limba activă în controlul de schimbare limbă.
  const updateLanguageToggleState = (dict, locale) => {
    langToggle?.setAttribute("aria-label", dict.toggleAria);
    langToggle?.querySelectorAll(".lang-label").forEach((label) => {
      label.classList.toggle("is-active", label.dataset.lang === locale);
    });
  };

  // Aplică limba în pagină și, opțional, salvează preferința utilizatorului.
  const setLanguage = (lang, options = {}) => {
    const { persistPreference = false } = options;
    const locale = copy[lang] ? lang : "en";
    const dict = copy[locale];

    document.documentElement.setAttribute("lang", dict.htmlLang);

    updateLocalizedText(dict);
    updateLocalizedAriaLabels(dict);
    updateLocalizedPlaceholders(dict);
    updateLocalizedValues(dict);
    updateBudgetOptions(dict, locale);
    updateLanguageToggleState(dict, locale);

    if (persistPreference) {
      localStorage.setItem(LANGUAGE_KEY, locale);
    }
  };

  // Inițializează limba inițială și ascultă interacțiunile de schimbare limbă.
  const initLanguageToggle = async () => {
    const initialLanguage = await resolveInitialLanguage();
    setLanguage(initialLanguage, { persistPreference: false });

    langToggle?.addEventListener("click", (event) => {
      const target = event.target.closest("[data-lang]");
      const nextLang = target?.dataset.lang;

      if (!nextLang || !SUPPORTED_LANGUAGES.includes(nextLang)) {
        return;
      }

      setLanguage(nextLang, { persistPreference: true });
      trackEvent("language_toggle", { lang: nextLang });
    });
  };

  // Pornire inițială pentru modulele de consimțământ și localizare.
  initCookieConsent();
  initLanguageToggle();

  // Deschide modalul de aplicare și trimite eveniment de click pe CTA.
  applyButton?.addEventListener("click", () => {
    trackEvent("apply_click", { cta: "hero_primary" });
    toggleModal(modal, applyButton, true);
  });

  techStackButton?.addEventListener("click", () => {
    trackEvent("tech_stack_open", { source: "hero_secondary" });
    toggleModal(techStackModal, techStackButton, true);
  });

  // Leagă închiderea pentru modalurile existente.
  closeButton?.addEventListener("click", () => {
    toggleModal(modal, applyButton, false);
    applyButton?.focus();
  });

  closeTechButton?.addEventListener("click", () => {
    toggleModal(techStackModal, techStackButton, false);
    techStackButton?.focus();
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(modal, applyButton, false);
      applyButton?.focus();
    }
  });

  techStackModal?.addEventListener("click", (event) => {
    if (event.target === techStackModal) {
      toggleModal(techStackModal, techStackButton, false);
      techStackButton?.focus();
    }
  });

  // Activează modalurile legale nou adăugate.
  bindModal(privacyButton, privacyModal, closePrivacyButton);
  bindModal(cookiePolicyButton, cookiePolicyModal, closeCookiePolicyButton);
  bindModal(contactInfoButton, contactInfoModal, closeContactInfoButton);

  // Închide modalul activ la apăsarea tastei Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (techStackModal?.classList.contains("is-open")) {
      toggleModal(techStackModal, techStackButton, false);
      techStackButton?.focus();
      return;
    }

    if (modal?.classList.contains("is-open")) {
      toggleModal(modal, applyButton, false);
      applyButton?.focus();
      return;
    }

    if (privacyModal?.classList.contains("is-open")) {
      toggleModal(privacyModal, privacyButton, false);
      privacyButton?.focus();
      return;
    }

    if (cookiePolicyModal?.classList.contains("is-open")) {
      toggleModal(cookiePolicyModal, cookiePolicyButton, false);
      cookiePolicyButton?.focus();
      return;
    }

    if (contactInfoModal?.classList.contains("is-open")) {
      toggleModal(contactInfoModal, contactInfoButton, false);
      contactInfoButton?.focus();
    }
  });

  // Trimite eveniment analytics la trimiterea formularului.
  leadForm?.addEventListener("submit", () => {
    trackEvent("application_submit", { source: "onsite_form" });
  });

  // Măsoară timpul petrecut în pagină când tab-ul devine inactiv.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      trackEvent("time_on_page", {
        seconds: Math.round((Date.now() - sessionStartedAt) / 1000),
      });
    }
  });
})();
