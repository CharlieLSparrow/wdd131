"use strict";


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  
];

const cardsContainer = document.querySelector("#temple-cards");
const filterHeading = document.querySelector("#filter-heading");

const filterLinks = document.querySelectorAll(".navigation a[data-filter]");
const nav = document.querySelector("nav");
const hambutton = document.querySelector("#menu");

function getDedicatedYear(dedicatedString) {

  const yearPart = dedicatedString.split(",")[0].trim();
  const year = Number.parseInt(yearPart, 10);
  return Number.isNaN(year) ? 0 : year;
}

function formatArea(area) {
  return `${Number(area).toLocaleString()} sq ft`;
}

function createTempleCard(temple) {
  const figure = document.createElement("figure");
  figure.classList.add("temple-card");

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = "lazy";
  img.decoding = "async";
  img.width = 400;
  img.height = 250;

  const figcaption = document.createElement("figcaption");

  const title = document.createElement("h3");
  title.textContent = temple.templeName;

  const pLocation = document.createElement("p");
  pLocation.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

  const pDedicated = document.createElement("p");
  pDedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

  const pArea = document.createElement("p");
  pArea.innerHTML = `<span class="label">Area:</span> ${formatArea(temple.area)}`;

  figcaption.append(title, pLocation, pDedicated, pArea);
  figure.append(img, figcaption);

  return figure;
}

function displayTemples(templeList) {
  cardsContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();
  templeList.forEach((temple) => fragment.appendChild(createTempleCard(temple)));

  cardsContainer.appendChild(fragment);
}

function setActiveLink(activeFilter) {
  filterLinks.forEach((link) => {
    const isActive = link.dataset.filter === activeFilter;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function applyFilter(filterName) {
  let filtered = temples;

  switch (filterName) {
    case "old":
      filtered = temples.filter((t) => getDedicatedYear(t.dedicated) < 1900);
      filterHeading.textContent = "Old Temples (Dedicated before 1900)";
      break;

    case "new":
      filtered = temples.filter((t) => getDedicatedYear(t.dedicated) > 2000);
      filterHeading.textContent = "New Temples (Dedicated after 2000)";
      break;

    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      filterHeading.textContent = "Large Temples (Area > 90,000 sq ft)";
      break;

    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      filterHeading.textContent = "Small Temples (Area < 10,000 sq ft)";
      break;

    case "home":
    default:
      filtered = temples;
      filterHeading.textContent = "Home of the Lord";
      break;
  }

  setActiveLink(filterName);
  displayTemples(filtered);
}

function setFooterDates() {
  const yearSpan = document.querySelector("#currentyear");
  const modified = document.querySelector("#lastModified");

  yearSpan.textContent = String(new Date().getFullYear());
  modified.textContent = `Last Modified: ${document.lastModified}`;
}

// ---- Events ----
filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filterName = link.dataset.filter;
    applyFilter(filterName);

    // Nice UX: close the mobile menu after selecting a filter
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
      hambutton.classList.remove("open");
      hambutton.setAttribute("aria-expanded", "false");
      hambutton.setAttribute("aria-label", "Open navigation menu");
    }
  });
});

// Fix: your CSS shows/hides nav via `nav.show`, so toggle `show` on <nav> (not the <ul>)
hambutton.addEventListener("click", (event) => {
  event.preventDefault();
  nav.classList.toggle("show");

  const isOpen = nav.classList.contains("show");
  hambutton.classList.toggle("open", isOpen);
  hambutton.setAttribute("aria-expanded", String(isOpen));
  hambutton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// ---- Init ----
setFooterDates();
applyFilter("home");
