document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const originalOffsetTop = header.offsetTop;
  
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
  
      // Verificar si el scroll ha superado la posición original del header
      if (scrollY > originalOffsetTop) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    });
  });
  