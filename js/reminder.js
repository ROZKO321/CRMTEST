document.addEventListener("DOMContentLoaded", () => {
  const notificationCount = document.getElementById("notificationCount");
  const notificationList = document.getElementById("notificationList");
  const role = localStorage.getItem("role");
  const lang = localStorage.getItem("lang") || "en";

  // Примерные данные — ты заменишь это на загрузку из базы/хранилища позже
  const allReminders = JSON.parse(localStorage.getItem("reminders") || "[]");
  const allClients = JSON.parse(localStorage.getItem("clients") || "[]");
  const manager = localStorage.getItem("username") || "";

  let visibleReminders = allReminders.filter(rem => {
    if (role === "admin") return true;
    return rem.manager === manager;
  });

  // Удаляем старые
  visibleReminders = visibleReminders.filter(r => new Date(r.date) >= new Date());

  notificationCount.innerText = visibleReminders.length;
  notificationCount.style.display = visibleReminders.length > 0 ? "inline-block" : "none";

  // Отображаем список
  notificationList.innerHTML = "";
  visibleReminders.sort((a, b) => new Date(a.date) - new Date(b.date));
  visibleReminders.forEach(rem => {
    const client = allClients.find(c => c.id === rem.clientId) || {};
    const comment = rem.comment || client.lastComment || "No comment";
    const date = new Date(rem.date).toLocaleString();

    const item = document.createElement("div");
    item.className = "note";
    item.innerHTML = `<strong>${client.firstName || "No Name"}:</strong> ${comment} <br><small>${date}</small>`;

    item.onclick = () => {
      window.open(`client-card.html?id=${client.id}`, "_blank");
    };

    notificationList.appendChild(item);
  });
});
