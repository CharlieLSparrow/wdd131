// Requirement: Dynamically populate the current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Requirement: Dynamically populate the last modified date
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;