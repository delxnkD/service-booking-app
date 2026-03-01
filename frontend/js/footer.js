console.log("Footer script loaded");

if (!document.querySelector("footer")) {
  const footer = document.createElement("footer");

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-bottom" style="text-align:center; padding:20px 0;">
        <p>&copy; ${new Date().getFullYear()} ServiceBooking. All rights reserved.</p>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}