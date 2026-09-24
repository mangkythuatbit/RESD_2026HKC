"use strict";

/**
 * Riêng cho Trang chủ: tương tác với khối nhận diện R.E.S.D trong Hero.
 * Các hành vi dùng chung nằm ở js/site.js.
 */
(function () {
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
})();
