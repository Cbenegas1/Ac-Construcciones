document.addEventListener("DOMContentLoaded", () => {
  // 1. CONTROL DE LA PANTALLA DE CARGA (LOADER)
  const loader = document.querySelector(".house-animation-container");

  const hideLoader = () => {
    if (loader) {
      loader.classList.add("hidden");
    }
    // Inicializar y refrescar AOS inmediatamente al ocultar el loader
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        once: true,
        offset: 50
      });
      AOS.refresh();
    }
  };

  // Ocultar loader a los 3.2s o al cargar la página
  setTimeout(hideLoader, 3200);

  // 2. MENÚ HAMBURGUESA MÓVIL
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // 3. CONTADOR ANIMADO PARA LA SECCIÓN DE ESTADÍSTICAS
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  const startCounters = () => {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const increment = target / (duration / 16);

      let current = 0;
      const updateCount = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    window.addEventListener("scroll", () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos && !animated) {
        animated = true;
        startCounters();
      }
    });
  }
});