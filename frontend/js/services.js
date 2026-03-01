document.addEventListener("DOMContentLoaded", () => {

  const userId = localStorage.getItem("userId");

  // Load services
  fetch("http://localhost:5000/api/services")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("services");
      const select = document.getElementById("serviceSelect");

      data.forEach(service => {
        container.innerHTML += `
          <div class="card">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p>€${service.price}</p>
          </div>
        `;

        const option = document.createElement("option");
        option.value = service._id;
        option.text = service.name;
        select.add(option);
      });
    });

  // Booking
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const booking = {
      user: userId,
      customerName: document.getElementById("customerName").value,
      service: document.getElementById("serviceSelect").value,
      date: document.getElementById("date").value
    };

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    const data = await res.json();
    document.getElementById("bookingMessage").innerHTML =
      `<p style="color:green">Booking Confirmed for ${data.date}</p>`;

    form.reset();
  });

});