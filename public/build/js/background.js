/* Configuración */
const STAR_COLOR = '#fff';
const STAR_SIZE = 5;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

/* Variables */
let scale = 1; // Relación de píxeles del dispositivo
let width, height;
let stars = [];

/* Canvas y contexto */
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

/* Generar estrellas */
generate();
resize();
step();

/* Funciones */
function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
    });
  }
}

function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function recycleStar(star) {
  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function resize() {
  scale = window.devicePixelRatio || 1;
  width = window.innerWidth * scale;
  height = window.innerHeight * scale;
  canvas.width = width;
  canvas.height = height;
  stars.forEach(placeStar);
}

function step() {
  context.clearRect(0, 0, width, height);

  // Función render dentro de step
  stars.forEach((star) => {
    star.y -= 0.15;

    if(star.y < 0){
        recycleStar(star)
    }
    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5 * Math.random();
    context.strokeStyle = STAR_COLOR;
    context.moveTo(star.x, star.y);
    context.lineTo(star.x, star.y);
    context.stroke();
  });

  requestAnimationFrame(step);
}
