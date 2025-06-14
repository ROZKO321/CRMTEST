const langSelect = document.getElementById("languageToggle");
let translations = {};

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) el.innerText = translations[key];
  });
}

function loadLanguage(lang = "ru") {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      translations = data;
      applyTranslations();
    });
  localStorage.setItem("crmLang", lang);
}

langSelect?.addEventListener("change", () => {
  const lang = langSelect.value;
  loadLanguage(lang);
});

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("crmLang") || "ru";
  langSelect.value = saved;
  loadLanguage(saved);
});
