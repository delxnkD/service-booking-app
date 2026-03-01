function requireLogin() {
  const user = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");

  if (!user && !isAdmin) {
    alert("Please login first");
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}