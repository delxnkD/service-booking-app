document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim()
  };

  try {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("message").innerHTML =
        `<p style="color:green">${data.message}</p>`;
      setTimeout(() => window.location.href = "login.html", 1500);
    } else {
      document.getElementById("message").innerHTML =
        `<p style="color:red">${data.message}</p>`;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("message").innerHTML =
      `<p style="color:red">Registration failed</p>`;
  }
});
