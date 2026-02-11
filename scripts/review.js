
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
];

(function trackReviewCount() {
  const counterEl = document.getElementById("reviewCount");
  if (!counterEl) return;

  const STORAGE_KEY = "wdd131-review-count";
  const current = Number(localStorage.getItem(STORAGE_KEY)) || 0;
  const next = current + 1;

  localStorage.setItem(STORAGE_KEY, String(next));
  counterEl.textContent = String(next);
})();

(function renderSummary() {
  const summaryEl = document.getElementById("reviewSummary");
  if (!summaryEl) return;

  const params = new URLSearchParams(window.location.search);
  if ([...params.keys()].length === 0) {
    summaryEl.innerHTML = "";

    const wrapper = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = "Notice";

    const dd = document.createElement("dd");
    dd.innerHTML = "No form values were found in the URL. Submit the form on <a href=\"form.html\">form.html</a> to see a summary here.";

    wrapper.append(dt, dd);
    summaryEl.appendChild(wrapper);
    return;
  }

  const productId = params.get("productName");
  const productLookup = new Map(products.map((p) => [p.id, p.name]));
  const productName = productId ? productLookup.get(productId) : null;

  const items = [];

  if (productId) {
    items.push({ label: "Product", value: productName ? `${productName} (${productId})` : productId });
  }

  const rating = params.get("rating");
  if (rating) {
    items.push({ label: "Overall Rating", value: `${rating} / 5` });
  }

  const installDate = params.get("installDate");
  if (installDate) {
    items.push({ label: "Installation Date", value: installDate });
  }

  const features = params.getAll("features");
  if (features.length) {
    items.push({ label: "Useful Features", value: features.join(", ") });
  }

  const writtenReview = params.get("writtenReview");
  if (writtenReview) {
    items.push({ label: "Written Review", value: writtenReview });
  }

  const userName = params.get("userName");
  if (userName) {
    items.push({ label: "User Name", value: userName });
  }

  summaryEl.innerHTML = "";

  items.forEach((item) => {
    const wrapper = document.createElement("div");

    const dt = document.createElement("dt");
    dt.textContent = item.label;

    const dd = document.createElement("dd");
    dd.textContent = item.value;

    wrapper.append(dt, dd);
    summaryEl.appendChild(wrapper);
  });
})();
