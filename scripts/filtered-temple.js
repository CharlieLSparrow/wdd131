"use strict";

// added 3 extra
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

  // --- Added 3 more (examples) ---
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-temple/400x250/salt-lake-temple-761829-wallpaper.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-temple-2190090-wallpaper.jpg",
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-hawaii-temple-775369-wallpaper.jpg",
  },
];

const cardsContainer = document.querySelector("#temple-cards");
const filterButtons = document.querySelectorAll(".filter-btn");

function getDedicatedYear(dedicatedString) {
  // expected format: "YYYY, Month, D"
  const yearPart = dedicatedString.split(",")[0].trim();
  const year = Number.parseInt(yearPart, 10);
  return Number.isNaN(year) ? 0 : year;
}

function formatArea(area) {
  return `${Number(area).toLocaleString()} sq ft`;
}

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = "lazy";
  img.decoding = "async";
  // width/height help reduce layout shift (good practice)
  img.width = 400;
  img.height = 250;

  const content = document.createElement("div");
  content.className = "card-content";

  const title = document.createElement("h3");
  title.textContent = temple.templeName;

  const dl = document.createElement("dl");
  dl.className = "meta";

  // helper to add dt/dd rows
  function addRow(label, value) {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    row.append(dt, dd);
    dl.append(row);
  }

  addRow("Location:", temple.location);
  addRow("Dedicated:", temple.dedicated);
  addRow("Area:", formatArea(temple.area));

  content.append(title, dl);
  card.append(img, content);

  return card;
}

function displayTemples(templeList) {
  cardsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  templeList.forEach((temple) => {
    fragment.appendChild(createTempleCard(temple));
  });

  cardsContainer.appendChild(fragment);
}

function setActiveButton(activeFilter) {
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === activeFilter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function applyFilter(filterName) {
  let filtered = temples;

  switch (filterName) {
    case "old":
      filtered = temples.filter((t) => getDedicatedYear(t.dedicated) < 1900);
      break;
    case "new":
      filtered = temples.filter((t) => getDedicatedYear(t.dedicated) > 2000);
      break;
    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;
    case "home":
    default:
      filtered = temples;
      break;
  }

  setActiveButton(filterName);
  displayTemples(filtered);
}

function setFooterDates() {
  const yearSpan = document.querySelector("#currentyear");
  const modified = document.querySelector("#lastModified");

  yearSpan.textContent = String(new Date().getFullYear());
  modified.textContent = `Last Modified: ${document.lastModified}`;
}

// Wire up events
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyFilter(btn.dataset.filter);
  });
});

// Init page
setFooterDates();
applyFilter("home");
