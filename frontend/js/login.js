document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // ADMIN LOGIN
  if (email === "admin@system.com" && password === "Admin001") {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "dashboard.html";
    return;
  }

  // USER LOGIN
  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.username);
    window.location.href = "services.html";
  } else {
    document.getElementById("loginMessage").innerText = data.message;
  }
});