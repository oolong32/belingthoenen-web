var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  wrapAround: true,
  autoPlay: 5000,
  cellAlign: 'center',
  setGallerySize: false // https://flickity.metafizzy.co/options.html#setgallerysize
});
