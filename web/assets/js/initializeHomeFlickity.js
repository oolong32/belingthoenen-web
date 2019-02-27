document.addEventListener("DOMContentLoaded", function(event) {
  var elem = document.querySelector('.carousel');
  var flkty = new Flickity( elem, {
    // options
    on: {
      ready: function() {
        // console.log('Slider ready!');
        // pause all videos but the one in the selected cell
      }
    },
    cellAlign: 'center', // Wrap-Around funktioniert nicht (Lücke)
    pageDots: true,
    wrapAround: true,
    autoPlay: 7000,
    //setGallerySize: false, // https://flickity.metafizzy.co/options.html#setgallerysize
    arrowShape: 'M31,58 L78,9 C80.6666667,6.33333333 81,4 79,2 C77,9.32587341e-14 74.3333333,0.333333333 71,3 L24,52 C22,54 21,56 21,58 C21,60 22,62 24,64 L61,97 C64.3333333,99.6666667 67,100 69,98 C71,96 70.6666667,93.3333333 68,90 L31,58 Z'
  });

  // video on for selected, pause for deselected
  flkty.on( 'select', function( index ) {

    var allVids = document.querySelectorAll('video');
    for (var i = 0; i < allVids.length; i++) {
      if (i != index) { // we don’t want to process the currently selected video
        var video = allVids[i];
        if (!video.paused) {
          video.pause();
        }
      }
      // allVids[i].pause();
    }
    var selected_video = allVids[index];
    // start/continue selected video
    selected_video.play();
  });
});
