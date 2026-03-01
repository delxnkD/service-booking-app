document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageDiv = document.getElementById("profileMessage");

  // Load current user data
  async function loadProfile() {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const user = await res.json();

      usernameInput.value = user.username;
      emailInput.value = user.email;

    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }

  // Update profile
  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.user.username);
        messageDiv.innerHTML = `<p style="color:green">${data.message}</p>`;
        passwordInput.value = "";
      } else {
        messageDiv.innerHTML = `<p style="color:red">${data.message}</p>`;
      }

    } catch (err) {
      console.error("Update error:", err);
    }
  });

  loadProfile();
});