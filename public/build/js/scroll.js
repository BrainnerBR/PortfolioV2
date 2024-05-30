const { off } = require("gulp");

document.addEventListener('DOMContentLoaded', () => {
  const linksNavigation = document.querySelectorAll('.navigation-bar a');
  const linksFooter = document.querySelectorAll('.footer a'); // Selecciona todos los enlaces dentro de .footer

  // Combina ambas listas de enlaces en un solo array
  const allLinks = [...linksNavigation, ...linksFooter];

  allLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      // Evita el comportamiento por defecto del enlace
      event.preventDefault();

      // Obtiene el ID del elemento objetivo desde el atributo href del enlace
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Desplazamiento suave hacia el elemento objetivo
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});



