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

  /* ---------- Close the mobile menu after tapping a link to a section ---------- */
  if (header) {
    header.querySelectorAll('.main-nav a[href*="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Home page: header turns solid green once you scroll ---------- */
  if (header && header.classList.contains("header-overlay")) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ---------- Tabs (e.g. the two products on the home page) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));

    function select(button, moveFocus) {
      buttons.forEach(function (b) {
        var active = b === button;
        b.setAttribute("aria-selected", String(active));
        b.tabIndex = active ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !active;
      });
      if (moveFocus) button.focus();
    }

    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () { select(button, false); });
      button.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") next = buttons[(index + 1) % buttons.length];
        if (event.key === "ArrowLeft") next = buttons[(index - 1 + buttons.length) % buttons.length];
        if (event.key === "Home") next = buttons[0];
        if (event.key === "End") next = buttons[buttons.length - 1];
        if (next) { event.preventDefault(); select(next, true); }
      });
    });

    // Without JavaScript all panels stay visible; with JavaScript show only the first
    select(buttons[0], false);
    tabs.classList.add("tabs-ready");
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
