/* ============================================
   The Tribunal — Interactivity
   Vanilla JS, no dependencies
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth scroll for nav links (offset for sticky nav) ---
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const nav = document.querySelector(".nav");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // --- Active nav highlighting via Intersection Observer ---
  const sections = document.querySelectorAll(".section[id]");

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      rootMargin: "-20% 0px -75% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // --- Toggle / accordion sections ---
  const toggleHeaders = document.querySelectorAll(".toggle-header");

  toggleHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const toggle = header.closest(".toggle");
      if (toggle) {
        toggle.classList.toggle("open");
      }
    });
  });

  // --- Scroll fade-in for sections ---
  const fadeSections = document.querySelectorAll(".section");

  if (fadeSections.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.08 },
    );

    fadeSections.forEach((section) => fadeObserver.observe(section));
  }
});
