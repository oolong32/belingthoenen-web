var elem = document.querySelector('.about-carousel');
var flkty = new Flickity( elem, {
  // options
  watchCSS: true,
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  wrapAround: true,
  autoPlay: false,
  cellAlign: 'center',
  setGallerySize: false // https://flickity.metafizzy.co/options.html#setgallerysize
});
