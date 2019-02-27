document.addEventListener("DOMContentLoaded", function(event) {
  console.log('initialize flickity, forsooth!');

  var elem = document.querySelector('.archive-carousel');
  var cellCount = document.querySelectorAll('.archive-carousel-cell').length;
  var randomCellIndex = Math.floor(cellCount * Math.random());
  console.log(randomCellIndex);

  var flkty = new Flickity( elem, {
    // options
    pageDots: false,
    cellAlign: 'center',
    wrapAround: true,
    freeScroll: true,
    autoPlay: 5000,
    setGallerySize: false,
    initalIndex: randomCellIndex
    // arrowShape: 'M31,58 L78,9 C80.6666667,6.33333333 81,4 79,2 C77,9.32587341e-14 74.3333333,0.333333333 71,3 L24,52 C22,54 21,56 21,58 C21,60 22,62 24,64 L61,97 C64.3333333,99.6666667 67,100 69,98 C71,96 70.6666667,93.3333333 68,90 L31,58 Z'
    // resize: false,
    //watchCSS: true, // no carousell on mobile
    //setGallerySize: false // https://flickity.metafizzy.co/options.html#setgallerysize
  });
});

