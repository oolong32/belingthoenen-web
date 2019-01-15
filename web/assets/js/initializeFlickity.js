var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  on: {
    ready: function() {
      console.log('Slider ready!');
      // pause all videos but the one in the selected cell
    }
  },
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  wrapAround: true,
  autoPlay: 5000,
  cellAlign: 'center',
  setGallerySize: false // https://flickity.metafizzy.co/options.html#setgallerysize
});

// video on for selected, pause for deselected
if (videos === 'undefined') {
  const videos = document.querySelectorAll('video');
}

flkty.on( 'select', function( index ) {

  var allVids = document.querySelectorAll('video');
  for (var i = 0; i < allVids.length; i++) {
    if (i != index) { // we don’t want to process the currently selected video
      var video = videos[i];
      if (!video.paused) {
        video.pause();
      }
    }
    // allVids[i].pause();
  }
  var selected_video = videos[index];
  selected_video.play();
  // start/continue selected video
});
