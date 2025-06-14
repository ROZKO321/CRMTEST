document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("appWrapper");
  const items = document.querySelectorAll(".nav-item");
  const logoutBtn = document.getElementById("logoutBtn");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");

  const user = JSON.parse(localStorage.getItem("crmCurrentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Скрываем кнопки "только для админа"
  if (user.role !== "admin") {
    document.querySelectorAll(".admin-only").forEach(el => el.remove());
  }

  // Загрузка страницы по умолчанию
  loadPage("home.html");

  // Обработка кликов по вкладкам
  items.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("data-page");
      if (page) {
        loadPage(page);
      }
    });
  });

  // Выход
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("crmCurrentUser");
    window.location.href = "login.html";
  });

  // Сворачивание боковой панели
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  function loadPage(url) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        wrapper.innerHTML = html;
        if (window.loadLanguage) loadLanguage();
        if (window.initLeadsPage) initLeadsPage();
        if (window.initSettingsPage) initSettingsPage();
        if (window.initClientPage) initClientPage();
        if (window.initHomePage) initHomePage();
      });
  }
});
