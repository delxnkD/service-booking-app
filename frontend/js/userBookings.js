document.addEventListener("DOMContentLoaded", () => {

  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const container = document.getElementById("bookings");
  let allBookings = [];

  async function loadUserBookings() {

    try {

      const res = await fetch(`/api/bookings/user/${userId}`);
      allBookings = await res.json();

      renderBookings(allBookings);

      const serviceSelect = document.getElementById("filterService");
      serviceSelect.innerHTML = '<option value="">All</option>';

      const services = [...new Set(allBookings.map(b => b.service?.name))];

      services.forEach(s => {

        const option = document.createElement("option");
        option.value = s;
        option.text = s;
        serviceSelect.add(option);

      });

    } catch (err) {

      console.error("Error loading bookings:", err);
      container.innerHTML = "<p>Failed to load bookings.</p>";

    }

  }

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

    container.querySelectorAll(".cancel-btn").forEach(btn => {

      btn.addEventListener("click", async e => {

        const card = e.target.closest(".card");
        const bookingId = card.dataset.id;

        if (!confirm("Cancel this booking?")) return;

        try {

          const res = await fetch(`/api/bookings/${bookingId}`, {
            method: "DELETE"
          });

          if (res.ok) {
            alert("Booking cancelled.");
            loadUserBookings();
          }

        } catch (err) {

          console.error(err);

        }

      });

    });

  }

  document.getElementById("filterBtn").addEventListener("click", () => {

    const serviceFilter = document.getElementById("filterService").value;
    const statusFilter = document.getElementById("filterStatus").value;

    const filtered = allBookings.filter(b =>
      (serviceFilter ? b.service?.name === serviceFilter : true) &&
      (statusFilter ? b.status === statusFilter : true)
    );

    renderBookings(filtered);

  });

  loadUserBookings();

});
