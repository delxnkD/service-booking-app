document.addEventListener("DOMContentLoaded", () => {
  const serviceList = document.getElementById("serviceList");
  const serviceForm = document.getElementById("serviceForm");

  // Load services
  async function loadServices() {
    try {
      const res = await fetch("/api/services");
      const services = await res.json();
      renderServices(services);
    } catch (err) {
      console.error("Failed to load services", err);
      serviceList.innerHTML = "<p style='color:red'>Could not load services</p>";
    }
  }
// Only allow if admin logged in
document.addEventListener("DOMContentLoaded", () => {
  const isAdmin = prompt("Enter Admin Key to Access Admin Panel:");
  if(isAdmin !== "Admin001") {
    alert("Access Denied");
    window.location.href = "login.html";
  }
});
  // Render services with edit/delete buttons
  function renderServices(services) {
  const serviceList = document.getElementById("serviceList");
  serviceList.innerHTML = "";

  if (!services.length) {
    serviceList.innerHTML = "<p>No services yet.</p>";
    return;
  }

  services.forEach(s => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${s.name}</h3>
      <p>${s.description || "-"}</p>
      <p><strong>Price:</strong> €${s.price || 0}</p>
      <div style="display:flex; gap:10px; margin-top:10px;">
        <button class="btn" onclick="editService('${s._id}')">Edit</button>
        <button class="btn" onclick="deleteService('${s._id}')">Delete</button>
      </div>
    `;
    serviceList.appendChild(div);
  });
}

  // Add new service
  serviceForm.addEventListener("submit", async e => {
    e.preventDefault();
    const service = {
      name: document.getElementById("serviceName").value,
      description: document.getElementById("serviceDescription").value,
      price: parseFloat(document.getElementById("servicePrice").value) || 0
    };

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service)
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      await loadServices();
      serviceForm.reset();
    } catch (err) {
      console.error("Add service error", err);
      alert("Failed to add service.");
    }
  });

  // Delete service
  window.deleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      loadServices();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete service.");
    }
  };

  // Edit service
  window.editService = async (id) => {
    const name = prompt("Enter new name:");
    if (!name) return;
    const description = prompt("Enter new description:");
    const price = prompt("Enter new price (€):");

    try {
      await fetch(`/api/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: parseFloat(price) })
      });
      loadServices();
    } catch (err) {
      console.error("Edit failed", err);
      alert("Failed to edit service.");
    }
  };

  loadServices();
});