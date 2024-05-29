const $carousel = document.querySelector('.carousel');
const $items = document.querySelectorAll('.carousel--item');
const $images = document.querySelectorAll('.carousel--item img');
let carouselWidth = $carousel.clientWidth;
let itemWidth = $items[0].clientWidth;
let wrapWidth = $items.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;

/*--------------------
Lerp
--------------------*/
const lerp = function(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

/*--------------------
Dispose
--------------------*/
const dispose = function(scroll) {
  gsap.set($items, {
    x: function(i) {
      return i * itemWidth + scroll;
    },
    modifiers: {
      x: function(x, target) {
        const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x));
        return s + 'px';
      }
    }
  });
};
dispose(0);

/*--------------------
Wheel
--------------------*/
const handleMouseWheel = function(e) {
  scrollY -= e.deltaY * 0.9;
};

/*--------------------
Touch
--------------------*/
let touchStart = 0;
let touchX = 0;
let isDragging = false;
const handleTouchStart = function(e) {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  $carousel.classList.add('is-dragging');
};
const handleTouchMove = function(e) {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};
const handleTouchEnd = function() {
  isDragging = false;
  $carousel.classList.remove('is-dragging');
};

/*--------------------
Listeners
--------------------*/
$carousel.addEventListener('wheel', handleMouseWheel);

$carousel.addEventListener('touchstart', handleTouchStart);
$carousel.addEventListener('touchmove', handleTouchMove);
$carousel.addEventListener('touchend', handleTouchEnd);

$carousel.addEventListener('mousedown', handleTouchStart);
$carousel.addEventListener('mousemove', handleTouchMove);
$carousel.addEventListener('mouseleave', handleTouchEnd);
$carousel.addEventListener('mouseup', handleTouchEnd);

$carousel.addEventListener('selectstart', function() { return false; });

/*--------------------
Resize
--------------------*/
window.addEventListener('resize', function() {
  carouselWidth = $carousel.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});

/*--------------------
Render
--------------------*/
const render = function() {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);
  
  scrollSpeed = y - oldScrollY;
  oldScrollY = y;
  
  gsap.to($items, {
    skewX: -scrollSpeed * 0.2,
    rotate: scrollSpeed * 0.01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
  });
};
render();
