document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const originalOffsetTop = header.offsetTop;

  // Verificar si hay un estado almacenado en el localStorage
  const isHeaderFixed = localStorage.getItem('headerFixed');
  if (isHeaderFixed === 'true') {
      header.classList.add('fixed');
  }

  window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;

      // Verificar si el scroll ha superado la posición original del header
      if (scrollY > originalOffsetTop) {
          header.classList.add('fixed');
          // Almacenar el estado en el localStorage
          localStorage.setItem('headerFixed', 'true');
      } else {
          header.classList.remove('fixed');
          // Almacenar el estado en el localStorage
          localStorage.setItem('headerFixed', 'false');
      }
  });
});
