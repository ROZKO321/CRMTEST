const translations = {
  en: {
    welcome: "Welcome to CRM",
    login: "Login",
    enterCredentials: "Please enter credentials",
    invalidLogin: "Invalid login or password",
  },
  ru: {
    welcome: "Добро пожаловать в CRM",
    login: "Войти",
    enterCredentials: "Пожалуйста, введите данные",
    invalidLogin: "Неверный логин или пароль",
  }
};

function translatePage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
dashboard: "Dashboard",
dashboardWelcome: "Use the menu to navigate through the CRM system.",
leads: "Leads",
admin: "Admin Panel",
settings: "Settings",
logout: "Logout",

// RU
dashboard: "Главная",
dashboardWelcome: "Используйте меню для навигации по системе.",
leads: "Лиды",
admin: "Панель Админа",
settings: "Настройки",
logout: "Выйти",
