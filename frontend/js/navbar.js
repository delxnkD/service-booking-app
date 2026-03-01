const nav = document.createElement("nav");

const isAdmin = localStorage.getItem("isAdmin");
const userId = localStorage.getItem("userId");

let links = `
  <li><a href="index.html">Home</a></li>
`;

if (isAdmin) {
  links += `
    <li><a href="dashboard.html">Bookings</a></li>
    <li><a href="admin.html">Manage Services</a></li>
    <li><a href="admin-users.html">Users</a></li>
    <li><a href="#" onclick="logout()">Logout</a></li>
  `;
} else if (userId) {
  links += `
    <li><a href="services.html">Services</a></li>
    <li><a href="user-dashboard.html">My Bookings</a></li>
    <li><a href="profile.html">Profile</a></li>
    <li><a href="#" onclick="logout()">Logout</a></li>
  `;
} else {
  links += `
    <li><a href="login.html">Login</a></li>
    <li><a href="register.html">Register</a></li>
  `;
}

nav.innerHTML = `
  <div class="logo">ServiceBooking</div>
  <ul>${links}</ul>
`;

document.body.prepend(nav);