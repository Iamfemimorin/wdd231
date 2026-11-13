const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
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

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
