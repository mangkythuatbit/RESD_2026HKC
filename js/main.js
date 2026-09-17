"use strict";

const menu = document.querySelector("#main-nav");
const menuToggle = document.querySelector(".navbar-toggler");

if (menu && menuToggle && window.bootstrap) {
  const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a") && menu.classList.contains("show")) {
      collapse.hide();
    }
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("show")) {
      collapse.hide();
      menuToggle.focus();
    }
  });
  menu.addEventListener("shown.bs.collapse", () => {
    menuToggle.setAttribute("aria-label", "Đóng menu điều hướng");
  });
  menu.addEventListener("hidden.bs.collapse", () => {
    menuToggle.setAttribute("aria-label", "Mở menu điều hướng");
  });
}

const exploreButton = document.querySelector("#explore-button");
const planet = document.querySelector("#resd-planet");
let exploreTimer;

exploreButton?.addEventListener("click", () => {
  if (!planet) return;
  clearTimeout(exploreTimer);
  planet.classList.add("is-exploring");
  planet.focus({ preventScroll: true });
  exploreTimer = setTimeout(() => planet.classList.remove("is-exploring"), 1800);
});
