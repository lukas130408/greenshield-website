/* Greenshield & Company – small interactions (no frameworks) */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");

  /* ---------- Mobile menu: open / close ---------- */
  if (header && menuToggle) {
    menuToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* ---------- Dropdown menus (e.g. "Products") ---------- */
  var submenus = document.querySelectorAll(".has-submenu");

  function closeAll(except) {
    submenus.forEach(function (item) {
      if (item === except) return;
      item.classList.remove("open");
      var btn = item.querySelector(".submenu-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  submenus.forEach(function (item) {
    var btn = item.querySelector(".submenu-toggle");
    if (!btn) return;
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      closeAll(item);
    });
  });

  // Click anywhere else or press Escape closes open menus
  document.addEventListener("click", function () { closeAll(null); });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeAll(null);
    if (header && header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
