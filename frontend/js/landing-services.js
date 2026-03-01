fetch("http://localhost:5000/api/services")
  .then(res => res.json())
  .then(services => {
    const container = document.getElementById("featuredServices");

    // Sort services by price (highest first)
    const topServices = services
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);

    topServices.forEach(service => {
      container.innerHTML += `
        <div class="card">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <p><strong>€${service.price}</strong></p>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error("Failed to load featured services", err);
  });