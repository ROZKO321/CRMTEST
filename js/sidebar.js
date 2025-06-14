document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const appWrapper = document.getElementById("appWrapper");
  const logoutBtn = document.getElementById("logoutBtn");
  const toggleBtn = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");

  function loadPage(page) {
    fetch(page)
      .then(res => res.text())
      .then(html => {
        appWrapper.innerHTML = html;

        if (page === "leads.html" && typeof initLeads === "function") {
          initLeads();
        }

        if (page === "settings.html" && typeof initSettingsPage === "function") {
          initSettingsPage();
        }

        if (page === "home.html" && typeof initHomePage === "function") {
          initHomePage();
        }
      });
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const page = item.getAttribute("data-page");
      if (page) loadPage(page);
    });
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("crmCurrentUser");
    window.location.href = "login.html";
  });

  // Toggle sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Load home on first launch
  const currentUser = JSON.parse(localStorage.getItem("crmCurrentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.querySelector(`[data-page="home.html"]`)?.classList.add("active");
  loadPage("home.html");
});
