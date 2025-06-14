// Пример данных лидов
const leads = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+123456789",
    country: "USA",
    dateAdded: "2025-06-14",
    affiliate: "Partner A",
    status: "New",
    reminder: null,
    comment: "",
  },
  {
    id: 2,
    firstName: "Anna",
    lastName: "Ivanova",
    email: "anna@example.ru",
    phone: "+380501234567",
    country: "Ukraine",
    dateAdded: "2025-06-13",
    affiliate: "Affiliate B",
    status: "In Progress",
    reminder: null,
    comment: "",
  },
  // добавь больше по желанию
];

let filteredLeads = [...leads];
let currentPage = 1;
let leadsPerPage = 10;

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const affiliateFilter = document.getElementById("affiliateFilter");
const paginationSelect = document.getElementById("paginationSelect");
const leadsList = document.getElementById("leadsList");

// МОДАЛЬНОЕ ОКНО
const clientModal = document.getElementById("clientCardModal");
let selectedLead = null;

// Заполняем список аффилиатов
function populateAffiliateFilter() {
  const affiliates = [...new Set(leads.map(lead => lead.affiliate))];
  affiliateFilter.innerHTML = `<option value="">All Affiliates</option>`;
  affiliates.forEach(aff => {
    affiliateFilter.innerHTML += `<option value="${aff}">${aff}</option>`;
  });
}

// Фильтрация и отрисовка
function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const status = statusFilter.value;
  const affiliate = affiliateFilter.value;

  filteredLeads = leads.filter(lead => {
    const fullText = `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.phone}`.toLowerCase();
    const matchesSearch = fullText.includes(search);
    const matchesStatus = !status || lead.status === status;
    const matchesAffiliate = !affiliate || lead.affiliate === affiliate;
    return matchesSearch && matchesStatus && matchesAffiliate;
  });

  currentPage = 1;
  renderLeads();
}

function renderLeads() {
  const start = (currentPage - 1) * leadsPerPage;
  const end = start + leadsPerPage;
  const leadsToShow = filteredLeads.slice(start, end);

  leadsList.innerHTML = leadsToShow.map(lead => `
    <div class="lead-card" onclick="openClientModal(${lead.id})">
      <div><strong>${lead.firstName} ${lead.lastName}</strong></div>
      <div>${lead.email}</div>
      <div>${lead.phone}</div>
      <div>Status: ${lead.status}</div>
      <div>Affiliate: ${lead.affiliate}</div>
    </div>
  `).join("");
}

// Открытие карточки
function openClientModal(id) {
  selectedLead = leads.find(lead => lead.id === id);
  if (!selectedLead) return;

  document.getElementById("clientName").textContent = `${selectedLead.firstName} ${selectedLead.lastName}`;
  document.getElementById("clientEmail").textContent = selectedLead.email;
  document.getElementById("clientPhone").textContent = selectedLead.phone;
  document.getElementById("clientCountry").textContent = selectedLead.country;
  document.getElementById("clientDate").textContent = selectedLead.dateAdded;
  document.getElementById("clientAffiliate").textContent = selectedLead.affiliate;

  document.getElementById("reminderDate").value = selectedLead.reminder || "";
  document.getElementById("reminderComment").value = selectedLead.comment || "";
  document.getElementById("statusSelect").value = selectedLead.status;

  clientModal.style.display = "flex";
}

// Сохранение
function saveClientChanges() {
  if (!selectedLead) return;

  const reminderDate = document.getElementById("reminderDate").value;
  const reminderComment = document.getElementById("reminderComment").value.trim();
  const status = document.getElementById("statusSelect").value;
  const manager = localStorage.getItem("username") || "unknown";

  // Обновляем данные внутри выбранного лида
  selectedLead.reminder = reminderDate;
  selectedLead.comment = reminderComment;
  selectedLead.status = status;

  // Обновляем данные в основном списке leads
  const updatedLeads = leads.map(lead => {
    if (lead.id === selectedLead.id) {
      return { ...lead, reminder: reminderDate, comment: reminderComment, status };
    }
    return lead;
  });

  // Сохраняем обновлённый список leads
  localStorage.setItem("crmClients", JSON.stringify(updatedLeads));

  // Сохраняем напоминание отдельно
  if (reminderDate) {
    const newReminder = {
      clientId: selectedLead.id,
      clientName: `${selectedLead.firstName} ${selectedLead.lastName}`,
      date: reminderDate,
      comment: reminderComment,
      lastComment: reminderComment,
      manager
    };

    const existingReminders = JSON.parse(localStorage.getItem("reminders") || "[]");
    existingReminders.push(newReminder);
    localStorage.setItem("reminders", JSON.stringify(existingReminders));
  }

  closeClientModal();
  renderLeads();
}
// Закрытие
function closeClientModal() {
  clientModal.style.display = "none";
  selectedLead = null;
}

// Слушатели
searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
affiliateFilter.addEventListener("change", applyFilters);
paginationSelect.addEventListener("change", () => {
  leadsPerPage = parseInt(paginationSelect.value);
  currentPage = 1;
  renderLeads();
});

// Инициализация
populateAffiliateFilter();
applyFilters();
