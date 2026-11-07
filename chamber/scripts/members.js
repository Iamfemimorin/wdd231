const membersContainer = document.querySelector("#members");
const memberCount = document.querySelector("#member-count");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const image = document.createElement("img");
  image.className = "member-image";
  image.src = `images/${member.image}`;
  image.alt = `${member.name} business illustration`;
  image.width = 640;
  image.height = 360;
  image.loading = "lazy";

  const content = document.createElement("div");
  content.className = "member-content";

  const name = document.createElement("h3");
  name.textContent = member.name;

  const category = document.createElement("p");
  category.className = "member-category";
  category.textContent = member.category;

  const description = document.createElement("p");
  description.className = "member-description";
  description.textContent = member.description;

  const details = document.createElement("div");
  details.className = "member-details";

  const address = document.createElement("p");
  address.textContent = member.address;

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const website = document.createElement("a");
  website.href = member.website;
  website.textContent = "Visit website";
  website.target = "_blank";
  website.rel = "noopener noreferrer";

  const membership = document.createElement("span");
  membership.className = "membership";
  const levelNames = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };
  membership.textContent = levelNames[member.membershipLevel] || "Member";

  details.append(address, phone, website);
  content.append(name, category, description, details, membership);
  card.append(image, content);
  return card;
}

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Unable to load member data (${response.status}).`);
    }
    const members = await response.json();
    membersContainer.replaceChildren(...members.map(createMemberCard));
    memberCount.textContent = `${members.length} businesses listed`;
    membersContainer.setAttribute("aria-busy", "false");
  } catch (error) {
    membersContainer.innerHTML = '<p class="error-message">The directory could not be loaded. Please run this page using VS Code Live Server.</p>';
    memberCount.textContent = "Directory data unavailable";
    membersContainer.setAttribute("aria-busy", "false");
    console.error(error);
  }
}

function setView(view) {
  const isGrid = view === "grid";
  membersContainer.classList.toggle("list-view", !isGrid);
  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);
  gridButton.setAttribute("aria-pressed", String(isGrid));
  listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
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

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
getMembers();
