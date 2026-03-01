let allBookings = [];

// Load bookings from API
async function loadBookings() {
  try {
    const res = await fetch("http://localhost:5000/api/bookings");
    allBookings = await res.json();
    renderBookings(allBookings);

    // Populate service filter dynamically
    const services = [...new Set(allBookings.map(b => b.service.name))];
    const filterSelect = document.getElementById("filterService");
    filterSelect.innerHTML = '<option value="">All</option>'; // reset
    services.forEach(s => {
      const option = document.createElement("option");
      option.value = s;
      option.text = s;
      filterSelect.add(option);
    });

  } catch (err) {
    console.error("Error loading bookings:", err);
    document.getElementById("bookings").innerHTML = "<p>Failed to load bookings.</p>";
  }
}

// Render booking cards
function renderBookings(bookings) {
  const container = document.getElementById("bookings");
  container.innerHTML = "";

  bookings.forEach(b => {
    const clientEmail = b.user?.email || "Not available";

    container.innerHTML += `
      <div class="card" data-id="${b._id}">
        <h3>${b.service.name}</h3>
        <p><strong>Customer:</strong> ${b.customerName}</p>
        <p><strong>Client Contact:</strong> ${clientEmail}</p>
        <p><strong>Date:</strong> ${new Date(b.date).toLocaleDateString()}</p>
        <span class="status ${b.status}">${b.status}</span>
        ${b.status === "Pending" ? `<button class="btn complete-btn">Mark Complete</button>` : ""}
      </div>
    `;
  });

  // Add event listeners for "Mark Complete" buttons
  container.querySelectorAll(".complete-btn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const card = e.target.closest(".card");
      const bookingId = card.dataset.id;

      if (!confirm("Mark this booking as completed?")) return;

      try {
        const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/complete`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
          alert("Booking marked as completed!");
          loadBookings();
        } else {
          const errData = await res.json();
          alert("Error: " + (errData.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Error completing booking:", err);
        alert("Failed to complete booking. Check console.");
      }
    });
  });
}

// Filter bookings
document.getElementById("filterBtn").addEventListener("click", () => {
  const serviceFilter = document.getElementById("filterService").value;
  const statusFilter = document.getElementById("filterStatus").value;

  const filtered = allBookings.filter(b =>
    (serviceFilter ? b.service.name === serviceFilter : true) &&
    (statusFilter ? b.status === statusFilter : true)
  );

  renderBookings(filtered);
});

// Initialize
loadBookings();