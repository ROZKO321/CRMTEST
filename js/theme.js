function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('crmTheme', theme);
}

function toggleTheme() {
  const current = localStorage.getItem('crmTheme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);

// при загрузке
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('crmTheme') || 'light';
  applyTheme(savedTheme);
});
