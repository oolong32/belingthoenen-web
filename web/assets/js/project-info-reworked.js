// event handlers for home slider
// ==============================
// touch or click on slider-card (project movie)
// shows/hides additional infos
// and hides/shows slider-dots and footer (mobile only)

// set controller to keep track of visibility
var infosVisible = false;

document.addEventListener("DOMContentLoaded", function(event) {

  // list of elements that need an event listener
  // i.e. all slides (containing a project video)
  var videos = document.querySelectorAll('video');

  // all descriptions (hidden by default)
  var descriptions = document.querySelectorAll('.description');

  // visible elements that need to go in case of event
  var footer = document.querySelector('footer');
  var dots = document.querySelector('.flickity-page-dots');

  // attach event listener to all videos/slides
  for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click' || 'touchend', handleClick);

    // pass number in order to select the cell on click when not active
    videos[i].myPrivateNumber = i;
  }

  // attach event listener to all close buttons
  var closeButtons = document.querySelectorAll('.description .close');
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click' || 'touchend', hideDescription);
    // console.log(closeButtons[i]);
  }

  function handleClick(e) {

    // better test if this has effects on right click
    e.preventDefault();

    // check if the click was on an active slide,
    // i.e. the one visible on mobile or in the center on desktop
    if (!e.target.parentNode.classList.contains('is-selected')) {
      // jump to slide
      var index = parseInt(e.target.myPrivateNumber);
      // console.log(index);
      flkty.select(index, false, false);

      return;
    }

    if (infosVisible) {

        // nothing
        return;

    } else {

      // switch controller on
      infosVisible = true;

      // display infos
      for (var i = 0; i < descriptions.length; i++) {
        descriptions[i].classList.remove('hidden');
      }

      // hide footer
      footer.classList.add('hidden');

      // hide dots
      dots.classList.add('hidden');

    }
  }

  function hideDescription(e) {
    infosVisible = false;

    // not neccessary, but better safe than sorry
    e.preventDefault();

    // hide infos
    for (var i = 0; i < descriptions.length; i++) {
      descriptions[i].classList.add('hidden');
    }

    // show footer
    footer.classList.remove('hidden');

    // show dots
    dots.classList.remove('hidden');

  }

});


