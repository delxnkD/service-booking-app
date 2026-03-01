document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("usersList");

  async function loadUsers() {
    try {
      const res = await fetch("/api/users");
      const users = await res.json();

      container.innerHTML = "";

      users.forEach(user => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${user.username}</h3>
          <p>${user.email}</p>
          <button class="btn delete-btn" data-id="${user._id}">Delete User</button>
        `;
        container.appendChild(div);
      });

      // Add delete listeners
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;

          if (!confirm("Are you sure you want to delete this user?")) return;

          const res = await fetch(`/api/users/${id}`, {
            method: "DELETE"
          });

          if (res.ok) {
            alert("User deleted successfully");
            loadUsers();
          } else {
            alert("Failed to delete user");
          }
        });
      });

    } catch (err) {
      console.error("Error loading users:", err);
    }
  }

  loadUsers();
});