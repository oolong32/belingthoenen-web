var elem = document.querySelector('.carousel');
var flkty = new Flickity( elem, {
  // options
  //contain: true,
  //dragThreshold: 10,
  prevNextButtons: false,
  wrapAround: true,
  freeScroll: false,
  contain: true,
  autoPlay: 7000,
  cellAlign: 'center'
  // arrowShape: 'M31,58 L78,9 C80.666,6.333 81,4 79,2 C77,9.325 74.333,0.333 71,3 L24,52 C22,54 21,56 21,58 C21,60 22,62 24,64 L61,97 C64.333,99.666 67,100 69,98 C71,96 70.666,93.333 68,90 L31,58 Z'
  //setGallerySize: false // https://flickity.metafizzy.co/options.html#setgallerysize
});

// Intro Slide to the right on Desktop
if (window.innerWidth >= 1000) { // Desktop Viewport
  flkty.select(1, false, true);
}
