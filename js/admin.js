document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    document.body.innerHTML = "<p>Access Denied.</p>";
    return;
  }

  loadLogs();
});

function importCSV() {
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split("\n").filter(Boolean);
    const leads = JSON.parse(localStorage.getItem("leads")) || [];

    lines.forEach(line => {
      const [firstName, lastName, phone, email, country, affiliate] = line.split(",");
      leads.push({
        id: crypto.randomUUID(),
        firstName, lastName, phone, email, country, affiliate,
        manager: "", status: "New", uploadDate: new Date().toLocaleDateString()
      });
    });

    localStorage.setItem("leads", JSON.stringify(leads));
    log(`Imported ${lines.length} leads`);
    alert("Leads imported");
  };
  reader.readAsText(file);
}

function exportCSV() {
  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  const csv = leads.map(l =>
    [l.firstName, l.lastName, l.phone, l.email, l.country, l.affiliate].join(",")
  ).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "leads.csv";
  link.click();

  log(`Exported ${leads.length} leads`);
}

function addClient() {
  const get = id => document.getElementById(id).value.trim();
  const client = {
    id: crypto.randomUUID(),
    firstName: get("firstName"),
    lastName: get("lastName"),
    phone: get("phone"),
    email: get("email"),
    country: get("country"),
    affiliate: get("affiliate"),
    status: "New",
    manager: "",
    uploadDate: new Date().toLocaleDateString()
  };

  if (!client.firstName || !client.email) return alert("Missing required fields");

  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  leads.push(client);
  localStorage.setItem("leads", JSON.stringify(leads));

  log(`Client ${client.firstName} ${client.lastName} added`);
  alert("Client added");
}

function addManager() {
  const name = document.getElementById("managerName").value.trim();
  if (!name) return;
  const managers = JSON.parse(localStorage.getItem("managers")) || [];
  if (!managers.includes(name)) {
    managers.push(name);
    localStorage.setItem("managers", JSON.stringify(managers));
    log(`Manager ${name} added`);
    alert("Manager added");
  }
}

function removeManager() {
  const name = document.getElementById("managerName").value.trim();
  if (!name) return;
  let managers = JSON.parse(localStorage.getItem("managers")) || [];
  managers = managers.filter(m => m !== name);
  localStorage.setItem("managers", JSON.stringify(managers));
  log(`Manager ${name} removed`);
  alert("Manager removed");
}

function log(text) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(`[${new Date().toLocaleString()}] ${text}`);
  localStorage.setItem("logs", JSON.stringify(logs));
  loadLogs();
}

function loadLogs() {
  const logBox = document.getElementById("logBox");
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logBox.textContent = logs.slice().reverse().join("\n");
}
