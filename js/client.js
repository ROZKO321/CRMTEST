document.addEventListener("DOMContentLoaded", () => {
  const clientCard = document.getElementById("clientCard");

  const urlParams = new URLSearchParams(window.location.search);
  const clientId = parseInt(urlParams.get("id"));

  if (!clientId) {
    clientCard.innerHTML = "<p>Клиент не найден</p>";
    return;
  }

  // Заглушка: получаем клиентов из leads.js (можно заменить fetch или API)
  const allLeads = JSON.parse(localStorage.getItem("leads")) || Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    firstName: `Имя${i + 1}`,
    lastName: `Фамилия${i + 1}`,
    phone: `+38 (0${Math.floor(Math.random() * 1000000000).toString().padStart(9, "0")})`,
    email: `user${i + 1}@example.com`,
    status: ["new", "in-progress", "closed"][i % 3],
    affiliate: ["partnerA", "partnerB"][i % 2],
    manager: i % 2 === 0 ? "manager1" : "manager2",
    country: "Украина",
    date: new Date().toISOString().split("T")[0],
    comment: "",
    reminder: { date: "", note: "" },
  }));

  const lead = allLeads.find((l) => l.id === clientId);

  if (!lead) {
    clientCard.innerHTML = "<p>Клиент не найден</p>";
    return;
  }

  // Левая часть
  const left = document.createElement("div");
  left.className = "client-left";
  left.innerHTML = `
    <div><span class="client-label">Имя:</span> ${lead.firstName}</div>
    <div><span class="client-label">Фамилия:</span> ${lead.lastName}</div>
    <div><span class="client-label">Телефон:</span> ${lead.phone}</div>
    <div><span class="client-label">Email:</span> ${lead.email}</div>
    <div><span class="client-label">Страна:</span> ${lead.country || "—"}</div>
    <div><span class="client-label">Дата загрузки:</span> ${lead.date || "—"}</div>
    <div><span class="client-label">Аффилиат:</span> ${lead.affiliate}</div>
  `;

  // Правая часть
  const right = document.createElement("div");
  right.className = "client-right";

  const statusBlock = document.createElement("div");
  statusBlock.innerHTML = `
    <label class="client-label">Статус:</label>
    <select id="statusSelect">
      <option value="new">Новый</option>
      <option value="in-progress">В работе</option>
      <option value="closed">Закрыт</option>
    </select>
  `;

  const commentBlock = document.createElement("div");
  commentBlock.innerHTML = `
    <label class="client-label">Комментарий:</label>
    <textarea id="commentArea" rows="4">${lead.comment || ""}</textarea>
  `;

  const reminderBlock = document.createElement("div");
  reminderBlock.innerHTML = `
    <label class="client-label">Напоминание:</label>
    <input type="datetime-local" id="reminderDate" value="${lead.reminder?.date || ""}" />
    <input type="text" id="reminderNote" placeholder="Комментарий..." value="${lead.reminder?.note || ""}" />
  `;

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Сохранить";

  saveBtn.onclick = () => {
    const newStatus = document.getElementById("statusSelect").value;
    const newComment = document.getElementById("commentArea").value;
    const reminderDate = document.getElementById("reminderDate").value;
    const reminderNote = document.getElementById("reminderNote").value;

    lead.status = newStatus;
    lead.comment = newComment;
    lead.reminder = {
      date: reminderDate,
      note: reminderNote || newComment || "",
    };

    // Сохраняем в localStorage
    const updatedLeads = allLeads.map((l) => (l.id === lead.id ? lead : l));
    localStorage.setItem("leads", JSON.stringify(updatedLeads));

    alert("Сохранено!");
  };

  document.getElementById("statusSelect").value = lead.status;

  right.append(statusBlock, commentBlock, reminderBlock, saveBtn);

  clientCard.append(left, right);
});
