const OPENWEATHER_API_KEY = "a6fecd5debc82938efb4e1ebc38c5a9e";
const CHAMBER_LATITUDE = 9.0765;
const CHAMBER_LONGITUDE = 7.3986;

const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");
const spotlightsContainer = document.querySelector("#spotlights");
const forecastList = document.querySelector("#forecast-list");

function setupNavigation() {
  if (!menuButton || !primaryNav) return;

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute(
      "aria-label",
      expanded ? "Open navigation menu" : "Close navigation menu"
    );
    primaryNav.classList.toggle("open", !expanded);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 700) {
      primaryNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

function getMembershipName(level) {
  return level === 3 ? "Gold Member" : "Silver Member";
}

function shuffleMembers(members) {
  return [...members].sort(() => Math.random() - 0.5);
}

function createSpotlightCard(member) {
  const card = document.createElement("article");
  card.className = "spotlight-card";

  const logo = document.createElement("img");
  logo.src = `images/${member.image}`;
  logo.alt = `${member.name} logo`;
  logo.width = 180;
  logo.height = 90;
  logo.loading = "lazy";

  const name = document.createElement("h3");
  name.textContent = member.name;

  const category = document.createElement("p");
  category.className = "spotlight-category";
  category.textContent = member.category;

  const details = document.createElement("div");
  details.className = "spotlight-details";

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const address = document.createElement("p");
  address.textContent = member.address;

  const website = document.createElement("a");
  website.href = member.website;
  website.textContent = "Visit website";
  website.target = "_blank";
  website.rel = "noopener noreferrer";

  const level = document.createElement("span");
  level.className = "spotlight-level";
  level.textContent = getMembershipName(member.membershipLevel);

  details.append(phone, address, website);
  card.append(logo, name, category, details, level);

  return card;
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Member data request failed: ${response.status}`);
    }

    const members = await response.json();
    const eligibleMembers = members.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    const selectedMembers = shuffleMembers(eligibleMembers).slice(0, 3);
    spotlightsContainer.replaceChildren(
      ...selectedMembers.map(createSpotlightCard)
    );
    spotlightsContainer.setAttribute("aria-busy", "false");
  } catch (error) {
    spotlightsContainer.innerHTML =
      '<p class="error-message">Member spotlights could not be loaded. Please run the page with VS Code Live Server.</p>';
    spotlightsContainer.setAttribute("aria-busy", "false");
    console.error(error);
  }
}

function getWeatherIcon(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈";
  if (weatherId >= 300 && weatherId < 600) return "🌧";
  if (weatherId >= 600 && weatherId < 700) return "❄";
  if (weatherId >= 700 && weatherId < 800) return "🌫";
  if (weatherId === 800) return "☀";
  if (weatherId > 800) return "☁";
  return "🌤";
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDay(dateString) {
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(`${dateString}T12:00:00`));
}

function buildThreeDayForecast(forecastData) {
  const today = getLocalDateString();
  const daily = new Map();

  forecastData.list.forEach((item) => {
    const date = item.dt_txt.slice(0, 10);
    if (date === today) return;

    if (!daily.has(date)) {
      daily.set(date, {
        temperatures: [],
        description: item.weather[0].description,
        icon: item.weather[0].id
      });
    }

    daily.get(date).temperatures.push(item.main.temp);
  });

  const days = [...daily.entries()].slice(0, 3);

  forecastList.replaceChildren(
    ...days.map(([date, data]) => {
      const day = document.createElement("article");
      day.className = "forecast-day";

      const title = document.createElement("strong");
      title.textContent = formatDay(date);

      const temperature = document.createElement("span");
      const high = Math.round(Math.max(...data.temperatures));
      const low = Math.round(Math.min(...data.temperatures));
      temperature.textContent = `${high}°C / ${low}°C`;

      const description = document.createElement("span");
      description.textContent = data.description;

      day.append(title, temperature, description);
      return day;
    })
  );
}

async function loadWeather() {
  const currentUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${CHAMBER_LATITUDE}` +
    `&lon=${CHAMBER_LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${CHAMBER_LATITUDE}` +
    `&lon=${CHAMBER_LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  if (OPENWEATHER_API_KEY === "80b08294ce2791b2690a586feb48b903") {
    document.querySelector("#current-temp").textContent = "--°C";
    document.querySelector("#weather-description").textContent =
      "Add your OpenWeatherMap API key in scripts/home.js";
    forecastList.innerHTML =
      '<p class="error-message">OpenWeatherMap API key required for the 3-day forecast.</p>';
    document.querySelector("#weather-updated").textContent =
      "OpenWeatherMap data";
    return;
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("OpenWeatherMap request failed.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    document.querySelector("#current-temp").textContent =
      `${Math.round(currentData.main.temp)}°C`;
    document.querySelector("#weather-description").textContent =
      currentData.weather[0].description;
    document.querySelector("#weather-icon").textContent =
      getWeatherIcon(currentData.weather[0].id);
    document.querySelector("#weather-updated").textContent =
      `Updated ${new Date().toLocaleTimeString("en-NG", {
        hour: "numeric",
        minute: "2-digit"
      })}`;

    buildThreeDayForecast(forecastData);
  } catch (error) {
    document.querySelector("#weather-description").textContent =
      "Weather data is temporarily unavailable.";
    forecastList.innerHTML =
      '<p class="error-message">The forecast could not be loaded. Please check the API key and network connection.</p>';
    console.error(error);
  }
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

setupNavigation();
loadSpotlights();
loadWeather();
