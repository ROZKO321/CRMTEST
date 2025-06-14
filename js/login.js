document.addEventListener("DOMContentLoaded", () => {
  // Демо-данные, если нет сохранённых
  if (!localStorage.getItem("crmUsers")) {
    const users = [
      { login: "admin", password: "admin123", role: "admin" },
      { login: "manager1", password: "manager1", role: "manager" }
    ];
    localStorage.setItem("crmUsers", JSON.stringify(users));
  }

  const loginBtn = document.getElementById("loginBtn");
  const loginInput = document.getElementById("loginInput");
  const passInput = document.getElementById("passwordInput");
  const errorBox = document.getElementById("loginError");

  loginBtn.addEventListener("click", () => {
    const login = loginInput.value.trim();
    const pass = passInput.value.trim();
    const users = JSON.parse(localStorage.getItem("crmUsers")) || [];

    const found = users.find(u => u.login === login && u.password === pass);
    if (!found) {
      errorBox.textContent = "Неверный логин или пароль";
      playSound("error");
      return;
    }

    localStorage.setItem("crmCurrentUser", JSON.stringify(found));
    window.location.href = "index.html";
  });
});
