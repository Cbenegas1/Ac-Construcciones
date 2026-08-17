/* ==========================================================================
   AC ALVAREZ CONSTRUCCIONES - OPTIMIZACIÓN JAVASCRIPT & UX/SEO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. PANTALLA DE CARGA (LOADER SVG)
     ------------------------------------------------------------------------ */
  const loader = document.querySelector('.house-animation-container');
  
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      
      // Remover del DOM tras animación para liberar recursos del navegador
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  });

  /* ------------------------------------------------------------------------
     2. INICIALIZACIÓN DE ANIMACIONES AOS
     ------------------------------------------------------------------------ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,      // Duración de la animación en ms
      easing: 'ease-out',  // Suavizado de animación
      once: true,          // Ejecutar animación solo 1 vez para ahorrar CPU
      offset: 100          // Distancia de activación
    });
  }

  /* ------------------------------------------------------------------------
     3. MENÚ NAVEGACIÓN HAMBURGUESA (RESPONSIVE)
     ------------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Accesibilidad: Actualizar atributo aria-expanded
      const isExpanded = navLinks.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. CONTADOR ANIMADO EN LA SECCIÓN DE ESTADÍSTICAS
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // Duración total en milisegundos
      const stepTime = 20;   // Intervalo de actualización en ms
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  };

  // Usar IntersectionObserver para iniciar conteo solo al hacer scroll hasta la sección
  const statsSection = document.getElementById('estadisticas');
  
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true; // Garantiza que solo corra una vez
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  } else if (statsSection) {
    // Fallback para navegadores antiguos
    animateCounters();
  }

  /* ------------------------------------------------------------------------
     5. CAMBIO DE ESTILO EN NAVBAR AL HACER SCROLL
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      navbar.style.padding = '0.7rem 5%';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
      navbar.style.padding = '1rem 5%';
    }
  }, { passive: true }); // passive: true mejora el rendimiento del scroll

});
