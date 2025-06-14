document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  // Применить сохранённую тему
  const currentTheme = localStorage.getItem("crmTheme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
  }

  // Переключение темы
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("crmTheme", newTheme);
  });
});
