const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("open", !isExpanded);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 700) {
      primaryNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
}
