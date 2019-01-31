var elem = document.querySelector('.carousel');
var flkty = new Flickity( elem, {
  // options
  contain: true,
  //dragThreshold: 10,
  //wrapAround: true,
  freeScroll: false,
  contain: true,
  autoPlay: false,
  cellAlign: 'left',
  arrowShape: 'M31,58 L78,9 C80.6666667,6.33333333 81,4 79,2 C77,9.32587341e-14 74.3333333,0.333333333 71,3 L24,52 C22,54 21,56 21,58 C21,60 22,62 24,64 L61,97 C64.3333333,99.6666667 67,100 69,98 C71,96 70.6666667,93.3333333 68,90 L31,58 Z'
  //setGallerySize: false // https://flickity.metafizzy.co/options.html#setgallerysize
});
