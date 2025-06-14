document.addEventListener("DOMContentLoaded", () => {
  const bell = document.getElementById("bell");
  const popup = document.getElementById("reminderPopup");

  if (!bell || !popup) return;

  bell.addEventListener("click", () => {
    popup.classList.toggle("visible");
    showReminders();
  });

  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !bell.contains(e.target)) {
      popup.classList.remove("visible");
    }
  });
});

function showReminders() {
  const popup = document.getElementById("reminderPopup");
  const user = JSON.parse(localStorage.getItem("crmCurrentUser"));
  const clients = JSON.parse(localStorage.getItem("crmClients") || "[]");

  let html = "";
  let reminders = [];

  const filteredClients = user.role === "admin"
    ? clients
    : clients.filter(c => c.manager === user.login);

  filteredClients.forEach(client => {
    (client.reminders || []).forEach(rem => {
      reminders.push({
        ...rem,
        clientId: client.id,
        fullName: `${client.name} ${client.surname}`
      });
    });
  });

  if (reminders.length === 0) {
    popup.innerHTML = `<div class="reminder-item">Здесь пока пусто</div>`;
    return;
  }

  reminders.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  reminders.forEach(rem => {
    html += `
      <div class="reminder-item" onclick="openClient(${rem.clientId})">
        <strong>${rem.fullName}</strong><br/>
        ${formatDateTime(rem.datetime)}<br/>
        <em>${rem.comment}</em>
      </div>
    `;
  });

  popup.innerHTML = html;
}

function formatDateTime(dt) {
  const d = new Date(dt);
  return d.toLocaleString("ru-RU");
}

function openClient(id) {
  fetch("client.html")
    .then(res => res.text())
    .then(html => {
      const wrapper = document.getElementById("appWrapper");
      wrapper.innerHTML = html;
      if (window.initClientPage) initClientPage(id);
    });
}
