// Common footer utilities for WDD 131 assignments.

(function setFooterDates() {
  const yearSpan = document.getElementById("currentyear");
  const lastModSpan = document.getElementById("lastModified");

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  if (lastModSpan) {
    lastModSpan.textContent = document.lastModified;
  }
})();
