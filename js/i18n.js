document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("languageToggle");
  if (langToggle) {
    langToggle.value = localStorage.getItem("crmLang") || "ru";

    langToggle.addEventListener("change", () => {
      const lang = langToggle.value;
      localStorage.setItem("crmLang", lang);
      loadLanguage();
    });
  }

  loadLanguage();
});

function loadLanguage() {
  const lang = localStorage.getItem("crmLang") || "ru";
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });
    });
}
