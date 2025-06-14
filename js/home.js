document.addEventListener("DOMContentLoaded", () => {
  const userRole = localStorage.getItem("userRole");

  const welcome = document.getElementById("welcomeMessage");
  const settingsLink = document.getElementById("settingsLink");

  if (userRole === "admin") {
    welcome.textContent = "Welcome to Coldi CRM — Admin";
    settingsLink.style.display = "block";
  } else if (userRole === "manager") {
    welcome.textContent = "Welcome to Coldi CRM — Manager";
    settingsLink.style.display = "none"; // доступ к Settings можно будет открывать отдельно
  } else {
    window.location.href = "index.html";
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("userRole");
    window.location.href = "index.html";
  });

  // 👉 Мотивационные фразы
  const phrases = [
    "Let's achieve greatness together.",
    "Success starts here.",
    "Your next lead is your next win.",
    "Make every connection count.",
    "One step closer to success.",
    "Efficiency meets excellence.",
    "Fueling your growth, one lead at a time."
  ];

  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const phraseEl = document.getElementById("motivationPhrase");
  if (phraseEl) {
    phraseEl.textContent = randomPhrase;
  }
});
