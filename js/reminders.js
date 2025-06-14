document.addEventListener("DOMContentLoaded", () => {
  const bell = document.getElementById("bell");
  const container = document.createElement("div");
  container.className = "reminder-popup";
  document.body.appendChild(container);

  bell.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("crmCurrentUser"));
    const allClients = JSON.parse(localStorage.getItem("crmClients")) || [];

    let reminders = [];

    allClients.forEach(client => {
      const shouldInclude = user.role === "admin" || client.manager === user.login;
      if (shouldInclude && Array.isArray(client.reminders)) {
        client.reminders.forEach(rem => {
          reminders.push({
            name: `${client.name} ${client.surname}`,
            comment: rem.comment,
            datetime: rem.datetime,
            clientId: client.id
          });
        });
      }
    });

    if (reminders.length === 0) {
      container.innerHTML = `<div class="reminder-empty">Нет напоминаний</div>`;
    } else {
      container.innerHTML = reminders.map(r => `
        <div class="reminder-item">
          <strong class="reminder-name" data-id="${r.clientId}">${r.name}</strong>
          <div class="reminder-text">${r.comment}</div>
          <div class="reminder-date">${new Date(r.datetime).toLocaleString()}</div>
        </div>
      `).join("");
    }

    container.classList.toggle("visible");

    // переход на карточку клиента
    document.querySelectorAll(".reminder-name").forEach(el => {
      el.addEventListener("click", () => {
        const clientId = el.getAttribute("data-id");
        localStorage.setItem("openClientId", clientId);
        window.open("client.html", "_blank");
      });
    });
  });
});
