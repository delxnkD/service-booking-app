document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return; // auth.js handles redirect

  const container = document.getElementById("bookings");
  let allBookings = [];

  async function loadUserBookings() {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
      allBookings = await res.json();

      renderBookings(allBookings);

      // Populate service filter dynamically
      const serviceSelect = document.getElementById("filterService");
      serviceSelect.innerHTML = '<option value="">All</option>'; // reset
      const services = [...new Set(allBookings.map(b => b.service?.name))];
      services.forEach(s => {
        const option = document.createElement("option");
        option.value = s;
        option.text = s;
        serviceSelect.add(option);
      });

    } catch (err) {
      console.error("Error loading bookings:", err);
      container.innerHTML = "<p>Failed to load bookings. Please try again later.</p>";
    }
  }

  // Render bookings with Cancel button
  function renderBookings(bookings) {
    container.innerHTML = "";

    bookings.forEach(b => {
      container.innerHTML += `
        <div class="card" data-id="${b._id}">
          <h3>${b.service?.name || "Service removed"}</h3>
          <p><strong>Date:</strong> ${new Date(b.date).toLocaleDateString()}</p>
          <span class="status ${b.status}">${b.status}</span>
          ${b.status === "Pending" ? `<button class="btn cancel-btn">Cancel Booking</button>` : ""}
        </div>
      `;
    });

    // Add click listeners for cancel buttons
    container.querySelectorAll(".cancel-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const card = e.target.closest(".card");
        const bookingId = card.dataset.id;

        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
          const cancelRes = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          });

          if (cancelRes.ok) {
            alert("Booking cancelled successfully.");
            loadUserBookings(); // reload bookings
          } else {
            const errData = await cancelRes.json();
            alert("Failed to cancel: " + (errData.message || "Unknown error"));
          }
        } catch (err) {
          console.error("Error cancelling booking:", err);
          alert("Error cancelling booking. See console for details.");
        }
      });
    });
  }

  // Filter bookings
  document.getElementById("filterBtn").addEventListener("click", () => {
    const serviceFilter = document.getElementById("filterService").value;
    const statusFilter = document.getElementById("filterStatus").value;

    const filtered = allBookings.filter(b => {
      return (serviceFilter ? b.service?.name === serviceFilter : true) &&
             (statusFilter ? b.status === statusFilter : true);
    });

    renderBookings(filtered);
  });

  loadUserBookings();
});