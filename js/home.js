document.addEventListener("DOMContentLoaded", () => {
  const userRole = localStorage.getItem("userRole");

  const welcome = document.getElementById("welcomeMessage");
  const settingsLink = document.getElementById("settingsLink");

  if (userRole === "admin") {
    welcome.textContent = "Welcome to Coldi CRM — Admin";
    settingsLink.style.display = "block";
  } else if (userRole === "manager") {
    welcome.textContent = "Welcome to Coldi CRM — Manager";
    // Проверка доступа к settings позже добавим
    settingsLink.style.display = "none";
  } else {
    window.location.href = "index.html";
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("userRole");
    window.location.href = "index.html";
  });
});
