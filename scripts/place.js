const yearSpan = document.querySelector("#currentyear");
const lastModifiedSpan = document.querySelector("#lastModified");

const today = new Date();
yearSpan.textContent = today.getFullYear();
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;

const tempValue = parseInt(document.querySelector("#temp").textContent);
const windValue = parseInt(document.querySelector("#wind").textContent);
const windChillSpan = document.querySelector("#chill");

function calculateWindChill(T, V) {
    return 13.12 + (0.6215 * T) - (11.37 * Math.pow(V, 0.16)) + (0.3965 * T * Math.pow(V, 0.16));
}

if (tempValue <= 10 && windValue > 4.8) {
    const chillFactor = calculateWindChill(tempValue, windValue);
    windChillSpan.textContent = `${chillFactor.toFixed(1)}°C`;
} else {
    windChillSpan.textContent = "N/A";
}